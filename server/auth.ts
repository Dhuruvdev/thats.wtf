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
  const store = new (pgSession(session))({
    pool,
    createTableIfMissing: true,
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
          scope: ["identify", "email"],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            let user = await storage.getUserByDiscordId(profile.id);
            if (!user) {
              // Try by email if discord didn't give id match
              const discordEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
              if (discordEmail) {
                user = await storage.getUserByEmail(discordEmail);
              }
              
              if (user) {
                // Link account
                user = await storage.updateUser(user.id, { discordId: profile.id });
              } else {
                // Create new user
                user = await storage.createUser({
                  username: profile.username,
                  email: discordEmail || `${profile.id}@discord.com`,
                  password: randomBytes(16).toString("hex"), // Random password for OAuth users
                  discordId: profile.id,
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
