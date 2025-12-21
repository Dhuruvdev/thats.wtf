import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(), // Using local auth for MVP as per standard template, can overlay Discord later
  displayName: text("display_name"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  
  // Gamification & Stats
  level: integer("level").default(1).notNull(),
  xp: integer("xp").default(0).notNull(),
  views: integer("views").default(0).notNull(),
  likes: integer("likes").default(0).notNull(),
  
  // Customization (The "Lab")
  theme: text("theme").default("default").notNull(), // 'default', 'neon', 'void', etc.
  accentColor: text("accent_color").default("#7c3aed").notNull(),
  frame: text("frame").default("none").notNull(),
  glowEnabled: boolean("glow_enabled").default(true).notNull(),
  
  // Meta
  isPro: boolean("is_pro").default(false).notNull(),
  discordId: text("discord_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(), // Foreign key to users.id
  title: text("title").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull(), // lucide icon name
  order: integer("order").default(0).notNull(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true, 
  level: true, 
  xp: true, 
  views: true, 
  likes: true 
});

export const insertLinkSchema = createInsertSchema(links).omit({ 
  id: true 
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Link = typeof links.$inferSelect;
export type InsertLink = z.infer<typeof insertLinkSchema>;

// API Types
export type CreateUserRequest = InsertUser;
export type UpdateUserRequest = Partial<InsertUser> & {
  // Allow updating customization fields explicitly
  theme?: string;
  accentColor?: string;
  frame?: string;
  glowEnabled?: boolean;
};

export type PublicProfileResponse = User & {
  links: Link[];
};

export type CreateLinkRequest = InsertLink;
