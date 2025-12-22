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
  credentialId: text("credential_id"),
  credentialPublicKey: text("credential_public_key"),
  
  // Gamification & Stats
  level: integer("level").default(1).notNull(),
  xp: integer("xp").default(0).notNull(),
  views: integer("views").default(0).notNull(),
  likes: integer("likes").default(0).notNull(),
  clicks: integer("clicks").default(0).notNull(),
  
  // Advanced Customization (guns.lol style)
  layout: text("layout").default("default").notNull(),
  theme: text("theme").default("default").notNull(),
  accentColor: text("accent_color").default("#7c3aed").notNull(),
  bgColor: text("bg_color").default("#000000").notNull(),
  textColor: text("text_color").default("#ffffff").notNull(),
  frame: text("frame").default("none").notNull(),
  glowEnabled: boolean("glow_enabled").default(true).notNull(),
  backgroundOpacity: integer("background_opacity").default(100).notNull(),
  backgroundBlur: integer("background_blur").default(10).notNull(),
  gradientEnabled: boolean("gradient_enabled").default(false).notNull(),
  fontFamily: text("font_family").default("inter").notNull(),
  customFont: text("custom_font"),
  
  // Profile Effects
  typewriterAnimation: boolean("typewriter_animation").default(false).notNull(),
  typewriterSpeed: integer("typewriter_speed").default(50).notNull(),
  cursorEffect: text("cursor_effect").default("none").notNull(),
  backgroundEffect: text("background_effect").default("none").notNull(),
  backgroundUrl: text("background_url"),
  
  // Meta
  isPro: boolean("is_pro").default(false).notNull(),
  discordId: text("discord_id"),
  discordShowStatus: boolean("discord_show_status").default(false).notNull(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoImage: text("seo_image"),
  createdAt: timestamp("created_at").defaultNow(),
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

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  preview: text("preview_url"),
  layout: text("layout").notNull(),
  accentColor: text("accent_color").notNull(),
  bgColor: text("bg_color").notNull(),
  frame: text("frame").notNull(),
  isPremium: boolean("is_premium").default(false).notNull(),
  uses: integer("uses").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: text("date").notNull(),
  viewCount: integer("view_count").default(0).notNull(),
  clickCount: integer("click_count").default(0).notNull(),
  uniqueVisitors: integer("unique_visitors").default(0).notNull(),
});

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size").notNull(),
  fileType: text("file_type").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true, 
  level: true, 
  xp: true, 
  views: true, 
  likes: true,
  clicks: true,
  credentialId: true,
  credentialPublicKey: true,
  isEmailVerified: true
}).extend({
  email: z.string().email(),
}).partial({
  verificationToken: true
});

export const insertLinkSchema = createInsertSchema(links).omit({ 
  id: true,
  clicks: true
});

export const insertTemplateSchema = createInsertSchema(templates).omit({ 
  id: true,
  createdAt: true,
  uses: true
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({ 
  id: true 
});

export const insertFileSchema = createInsertSchema(files).omit({ 
  id: true,
  uploadedAt: true
});

export const insertBadgeSchema = createInsertSchema(badges).omit({ 
  id: true,
  unlockedAt: true
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Link = typeof links.$inferSelect;
export type InsertLink = z.infer<typeof insertLinkSchema>;
export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type File = typeof files.$inferSelect;
export type InsertFile = z.infer<typeof insertFileSchema>;
export type Badge = typeof badges.$inferSelect;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;

// API Types
export type CreateUserRequest = InsertUser;
export type UpdateUserRequest = Partial<InsertUser> & {
  layout?: string;
  theme?: string;
  accentColor?: string;
  bgColor?: string;
  textColor?: string;
  frame?: string;
  glowEnabled?: boolean;
  backgroundOpacity?: number;
  backgroundBlur?: number;
  gradientEnabled?: boolean;
  fontFamily?: string;
  customFont?: string;
  typewriterAnimation?: boolean;
  typewriterSpeed?: number;
  cursorEffect?: string;
  backgroundEffect?: string;
  backgroundUrl?: string;
  discordShowStatus?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
};

export type PublicProfileResponse = User & {
  links: Link[];
  badges: Badge[];
};

export type CreateLinkRequest = InsertLink;
