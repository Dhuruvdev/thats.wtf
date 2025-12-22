import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isEmailVerified: boolean("is_email_verified").default(false).notNull(),
  verificationToken: text("verification_token"),
  displayName: text("display_name"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  
  // New Identity-Driven Configuration
  themeConfig: jsonb("theme_config").$type<{
    background: {
      type: "static" | "animated" | "shader";
      value: string;
      overlayOpacity: number;
    };
    cursor: {
      type: string;
      color: string;
    };
    audio: {
      url: string;
      enabled: boolean;
    };
    intro: {
      enabled: boolean;
      type: string;
    };
  }>().default({
    background: { type: "static", value: "#000000", overlayOpacity: 0.5 },
    cursor: { type: "default", color: "#ffffff" },
    audio: { url: "", enabled: false },
    intro: { enabled: true, type: "fade" }
  }).notNull(),

  logicRules: jsonb("logic_rules").$type<Array<{
    trigger: "mobile" | "night" | "idle" | "scroll";
    action: string;
    value: any;
  }>>().default([]).notNull(),

  // Stats
  level: integer("level").default(1).notNull(),
  xp: integer("xp").default(0).notNull(),
  views: integer("views").default(0).notNull(),
  likes: integer("likes").default(0).notNull(),
  clicks: integer("clicks").default(0).notNull(),
  
  isPro: boolean("is_pro").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blocks = pgTable("blocks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // bio, link, embed, widget
  content: jsonb("content").notNull(),
  animationConfig: jsonb("animation_config").$type<{
    intensity: number;
    delay: number;
    ease: string;
    trigger: "hover" | "click" | "scroll" | "idle";
  }>().notNull(),
  order: integer("order").default(0).notNull(),
});

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  order: integer("order").default(0).notNull(),
  clicks: integer("clicks").default(0).notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true, 
  level: true, 
  xp: true, 
  views: true, 
  likes: true,
  clicks: true,
  isEmailVerified: true
}).extend({
  email: z.string().email(),
});

export const insertBlockSchema = createInsertSchema(blocks).omit({ id: true });
export const insertLinkSchema = createInsertSchema(links).omit({ id: true, clicks: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Block = typeof blocks.$inferSelect;
export type InsertBlock = z.infer<typeof insertBlockSchema>;
export type Link = typeof links.$inferSelect;
export type InsertLink = z.infer<typeof insertLinkSchema>;
