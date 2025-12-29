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
  discordId: text("discord_id").unique(),
  discordConnections: jsonb("discord_connections").$type<Array<{
    type: string;
    id: string;
    name: string;
    visibility: number;
    friend_sync: boolean;
    show_activity: boolean;
    verified: boolean;
  }>>().default([]).notNull(),
  
  // Backwards compatibility fields for old UI components
  accentColor: text("accent_color").default("#7c3aed"),
  frame: text("frame").default("none"),
  glowEnabled: boolean("glow_enabled").default(true),
  backgroundUrl: text("background_url"),
  audioUrl: text("audio_url"),
  cursorUrl: text("cursor_url"),
  
  // High-Fidelity Identity Config
  themeConfig: jsonb("theme_config").$type<{
    background: {
      type: "static" | "animated" | "shader" | "video" | "image" | "gif";
      value: string;
      overlayOpacity: number;
      blur: number;
    };
    cursor: {
      type: "default" | "custom" | "fluid";
      color: string;
      size: number;
      url?: string;
    };
    typography: {
      headingFont: string;
      bodyFont: string;
      displayNameFont: string;
      bioFont: string;
      accentColor: string;
      displayNameGlowColor?: string;
    };
    motion: {
      intensity: number; // 0 to 1
      reduced: boolean;
    };
    frameOverlay: {
      style: "none" | "glass" | "neon" | "minimal" | "transparent" | "glowing-border";
      opacity: number;
      blur: number;
      color?: string;
    };
    animations: {
      displayName: {
        enabled: boolean;
        type: "fade" | "slide" | "scale" | "wave" | "glow-pulse";
        duration: number;
      };
      bio: {
        enabled: boolean;
        type: "fade" | "slide" | "scale" | "wave" | "glow-pulse";
        duration: number;
      };
    };
    entranceMode: {
      enabled: boolean;
      type: "particles" | "glitch" | "fade" | "none";
      text?: string;
    };
    screenEffects: {
      enabled: boolean;
      type: "none" | "cinema" | "bloom" | "vignette" | "neon" | "phosphor" | "chromatic" | "minimal";
      intensity: number;
    };
    profileEffects: {
      id: string;
      enabled: boolean;
      intensity: number;
    }[];
  }>().default({
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
    },
    profileEffects: []
  }).notNull(),

  geometry: jsonb("geometry").$type<{
    radius: number;
    blur: number;
    opacity: number;
  }>().default({ radius: 40, blur: 20, opacity: 3 }),

  entranceAnimation: text("entrance_animation").default("none"),
  profileEffect: text("profile_effect").default("none"),
  backgroundEffect: text("background_effect").default("none"),
  cursorEffect: text("cursor_effect").default("none"),
  effectIntensity: integer("effect_intensity").default(1),

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

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // background, audio, hardware, cursor
  url: text("url").notNull(),
  name: text("name"),
  uploadedBy: text("uploaded_by"),
  metadata: jsonb("metadata").$type<{
    duration?: number;
    width?: number;
    height?: number;
    size?: number;
    mimeType?: string;
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true, 
  level: true, 
  xp: true, 
  views: true, 
  isEmailVerified: true 
}).extend({
  themeConfig: z.any().optional(),
  geometry: z.any().optional(),
  logicRules: z.any().optional(),
});
export const insertBlockSchema = createInsertSchema(blocks).omit({ id: true });
export const insertMediaSchema = createInsertSchema(media).omit({ id: true, createdAt: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Block = typeof blocks.$inferSelect;
export type InsertBlock = z.infer<typeof insertBlockSchema>;
export type Media = typeof media.$inferSelect;
export type InsertMedia = z.infer<typeof insertMediaSchema>;
