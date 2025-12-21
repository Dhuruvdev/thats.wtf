import { db } from "../server/db";
import { users, links } from "../shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await hashPassword("password123");

  // Create Admin/Cool User
  const [user] = await db.insert(users).values({
    username: "void",
    password: hashedPassword,
    displayName: "The Void",
    bio: "I am the beginning and the end. #001",
    level: 99,
    xp: 99999,
    views: 1337,
    theme: "void",
    accentColor: "#ffffff",
    frame: "glitch",
    isPro: true,
  }).returning();

  console.log("Created user:", user.username);

  // Add links
  await db.insert(links).values([
    { userId: user.id, title: "Discord", url: "https://discord.gg/void", icon: "message-circle", order: 0 },
    { userId: user.id, title: "GitHub", url: "https://github.com/void", icon: "github", order: 1 },
    { userId: user.id, title: "Twitter", url: "https://twitter.com/void", icon: "twitter", order: 2 },
  ]);

  console.log("Seeding complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
