import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as DiscordStrategy } from "passport-discord";
import { Express } from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { pool } from "./db";
import { storage } from "./storage";
import { users } from "@shared/schema";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { sendVerificationEmail } from "./email";

const scryptAsync = promisify(scrypt);
const crypto = {
  hash: async (password: string) => {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  },
  compare: async (supplied: string, stored: string) => {
    const [hashed, salt] = stored.split(".");
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedBuf, suppliedBuf);
  },
};

export async function setupAuth(app: Express) {
  // Ensure session table exists
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      ) WITH (OIDS=FALSE);
      
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'session_pkey') THEN
          ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
        END IF;
      END $$;

      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
    `);
    console.log("Session table verified/created successfully");
  } catch (err) {
    console.error("Error ensuring session table exists:", err);
  }

  const store = new (pgSession(session))({
    pool,
    createTableIfMissing: false,
    tableName: "session",
  });

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "r3pl1t_s3cr3t_k3y",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: app.get("env") === "production",
    },
  };

  if (app.get("env") === "production") {
    app.set("trust proxy", 1);
  }

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // Try to find user by email first, then username
        let user = await storage.getUserByEmail(username);
        if (!user) {
          user = await storage.getUserByUsername(username);
        }
        
        if (!user || !(await crypto.compare(password, user.password))) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET) {
    passport.use(
      new DiscordStrategy(
        {
          clientID: process.env.DISCORD_CLIENT_ID,
          clientSecret: process.env.DISCORD_CLIENT_SECRET,
          callbackURL: `https://thats-wtf.onrender.com/api/auth/discord/callback`,
          scope: ["identify", "connections", "guilds", "guilds.join", "bot"],
        },
        async (accessToken, _refreshToken, profile, done) => {
          try {
            let user = await storage.getUserByDiscordId(profile.id);
            const profileAny = profile as any;
            const discordAvatar = profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : 
                                  (profileAny.discriminator === '0' ? `https://cdn.discordapp.com/embed/avatars/${Number((BigInt(profile.id) >> BigInt(22)) % BigInt(6))}.png` : `https://cdn.discordapp.com/embed/avatars/${Number(profileAny.discriminator) % 5}.png`);
            
            // Fetch connections from Discord API
            let discordConnections = [];
            try {
              const response = await fetch('https://discord.com/api/users/@me/connections', {
                headers: { Authorization: `Bearer ${accessToken}` }
              });
              if (response.ok) {
                discordConnections = await response.json();
              }
            } catch (err) {
              console.error("Failed to fetch Discord connections:", err);
            }

            if (!user) {
              // Try by email if discord didn't give id match
              const discordEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
              if (discordEmail) {
                user = await storage.getUserByEmail(discordEmail);
              }
              
              if (user) {
                // Link account
                user = await storage.updateUser(user.id, { 
                  discordId: profile.id,
                  avatarUrl: discordAvatar,
                  displayName: profileAny.global_name || profile.username,
                  bio: profileAny.bio || "",
                  discordConnections: discordConnections
                });
              } else {
                // Create new user
                user = await storage.createUser({
                  username: profile.username,
                  email: discordEmail || `${profile.id}@discord.com`,
                  password: randomBytes(16).toString("hex"), // Random password for OAuth users
                  discordId: profile.id,
                  avatarUrl: discordAvatar,
                  displayName: profileAny.global_name || profile.username,
                  bio: profileAny.bio || "",
                  discordConnections: discordConnections,
                  themeConfig: {
                    background: { type: "static", value: "#000000", overlayOpacity: 0.5, blur: 0 },
                    cursor: { type: "default", color: "#ffffff", size: 24 },
                    typography: { headingFont: "Space Grotesk", bodyFont: "Inter", displayNameFont: "Space Grotesk", bioFont: "Inter", accentColor: "#7c3aed", displayNameGlowColor: "#7c3aed" },
                    motion: { intensity: 1, reduced: false },
                    frameOverlay: { style: "glass", opacity: 0.5, blur: 10, color: "#7c3aed" },
                    animations: {
                      displayName: { enabled: true, type: "fade", duration: 0.6 },
                      bio: { enabled: true, type: "fade", duration: 0.8 }
                    },
                    entranceMode: {
                      enabled: true,
                      type: "particles",
                      text: "reveal"
                    },
                    screenEffects: {
                      enabled: false,
                      type: "none",
                      intensity: 1
                    }
                  },
                  geometry: { radius: 40, blur: 20, opacity: 3 },
                  entranceAnimation: "none",
                  isPro: false,
                });
              }

              // Automatically add social link for Discord if not already present
              const existingBlocks = await storage.getBlocksByUserId(user.id);
              const discordBlock = existingBlocks.find(b => b.type === 'social' && (b.content as any).platform === 'discord');
              if (!discordBlock) {
                await storage.createBlock({
                  userId: user.id,
                  type: 'social',
                  content: { 
                    platform: 'discord', 
                    username: profile.username,
                    url: `https://discord.com/users/${profile.id}`
                  },
                  order: existingBlocks.length,
                  visible: true
                });
              }
            } else {
              // Update profile data on every login
              user = await storage.updateUser(user.id, {
                avatarUrl: discordAvatar,
                displayName: profileAny.global_name || profile.username,
                bio: profileAny.bio || user.bio, // Keep existing bio if Discord has none
                discordConnections: discordConnections
              });
            }
            return done(null, user);
          } catch (err) {
            return done(err);
          }
        },
      ),
    );

    app.get("/api/auth/discord", passport.authenticate("discord"));
    app.get(
      "/api/auth/discord/callback",
      passport.authenticate("discord", {
        successRedirect: "/lab",
        failureRedirect: "/auth",
      }),
    );
  }

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: any, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await crypto.hash(password);
      const verificationToken = randomBytes(32).toString("hex");
      
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        themeConfig: {
          background: { type: "static", value: "#000000", overlayOpacity: 0.5, blur: 0 },
          cursor: { type: "default", color: "#ffffff", size: 24 },
          typography: { headingFont: "Space Grotesk", bodyFont: "Inter", displayNameFont: "Space Grotesk", bioFont: "Inter", accentColor: "#7c3aed", displayNameGlowColor: "#7c3aed" },
          motion: { intensity: 1, reduced: false },
          frameOverlay: { style: "glass", opacity: 0.5, blur: 10, color: "#7c3aed" },
          animations: {
            displayName: { enabled: true, type: "fade", duration: 0.6 },
            bio: { enabled: true, type: "fade", duration: 0.8 }
          },
          entranceMode: {
            enabled: true,
            type: "particles",
            text: "reveal"
          },
          screenEffects: {
            enabled: false,
            type: "none",
            intensity: 1
          }
        },
        geometry: { radius: 40, blur: 20, opacity: 3 },
        entranceAnimation: "none",
        isPro: false,
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/verify-email", async (req, res, next) => {
    try {
      const { token } = req.body;
      const user = await storage.getUserByVerificationToken(token);
      
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired verification token" });
      }

      const updatedUser = await storage.updateUser(user.id, {
        isEmailVerified: true,
        verificationToken: null as any
      });

      req.login(updatedUser, (err) => {
        if (err) return next(err);
        res.json({ message: "Email verified successfully!" });
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}
