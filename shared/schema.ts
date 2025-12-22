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
  
  // Backwards compatibility fields for old UI components
  accentColor: text("accent_color").default("#7c3aed"),
  frame: text("frame").default("none"),
  glowEnabled: boolean("glow_enabled").default(true),
  
  // High-Fidelity Identity Config
  themeConfig: jsonb("theme_config").$type<{
    background: {
      type: "static" | "animated" | "shader" | "video";
      value: string;
      overlayOpacity: number;
      blur: number;
    };
    cursor: {
      type: "default" | "custom" | "fluid";
      color: string;
      size: number;
    };
    typography: {
      headingFont: string;
      bodyFont: string;
      accentColor: string;
    };
    motion: {
      intensity: number; // 0 to 1
      reduced: boolean;
    };
  }>().default({
    background: { type: "static", value: "#000000", overlayOpacity: 0.5, blur: 0 },
    cursor: { type: "default", color: "#ffffff", size: 24 },
    typography: { headingFont: "Space Grotesk", bodyFont: "Inter", accentColor: "#7c3aed" },
    motion: { intensity: 1, reduced: false }
  }).notNull(),

  logicRules: jsonb("logic_rules").$type<Array<{
    trigger: "mobile" | "night" | "idle" | "scroll" | "returning";
    action: "switch_theme" | "skip_intro" | "scale_motion" | "ambient_move";
    value: any;
  }>>().default([]).notNull(),

  // Stats & Gamification
  level: integer("level").default(1).notNull(),
  xp: integer("xp").default(0).notNull(),
  views: integer("views").default(0).notNull(),
  
  isPro: boolean("is_pro").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blocks = pgTable("blocks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // bio, link, stats, social, media
  content: jsonb("content").notNull(),
  animationConfig: jsonb("animation_config").$type<{
    intensity: number;
    delay: number;
    ease: string;
    trigger: "hover" | "scroll" | "idle";
  }>().default({ intensity: 0.5, delay: 0, ease: "power2.out", trigger: "hover" }).notNull(),
  order: integer("order").default(0).notNull(),
  visible: boolean("visible").default(true).notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true, 
  level: true, 
  xp: true, 
  views: true, 
  isEmailVerified: true 
});
export const insertBlockSchema = createInsertSchema(blocks).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Block = typeof blocks.$inferSelect;
export type InsertBlock = z.infer<typeof insertBlockSchema>;
