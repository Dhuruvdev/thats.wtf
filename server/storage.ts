import { users, blocks, media, type User, type InsertUser, type Block, type InsertBlock, type Media, type InsertMedia } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  
  // Blocks
  createBlock(block: InsertBlock): Promise<Block>;
  deleteBlock(id: number): Promise<void>;
  getBlocksByUserId(userId: number): Promise<Block[]>;
  
  // Media
  createMedia(media: InsertMedia): Promise<Media>;
  getMediaByUserId(userId: number): Promise<Media[]>;
  deleteMedia(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.verificationToken, token));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    // Filter out undefined values to prevent "No values to set" error
    const cleanedUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined && value !== null)
    );
    
    if (Object.keys(cleanedUpdates).length === 0) {
      // If no valid updates, just return the current user
      const user = await this.getUser(id);
      if (!user) throw new Error("User not found");
      return user;
    }
    
    const [updated] = await db.update(users).set(cleanedUpdates as any).where(eq(users.id, id)).returning();
    return updated;
  }

  async createBlock(insertBlock: InsertBlock): Promise<Block> {
    const [block] = await db.insert(blocks).values({
      type: insertBlock.type,
      userId: insertBlock.userId,
      content: insertBlock.content as any,
      animationConfig: insertBlock.animationConfig,
      order: insertBlock.order,
      visible: insertBlock.visible
    }).returning();
    return block;
  }

  async deleteBlock(id: number): Promise<void> {
    await db.delete(blocks).where(eq(blocks.id, id));
  }
  
  async getBlocksByUserId(userId: number): Promise<Block[]> {
    return await db.select().from(blocks).where(eq(blocks.userId, userId)).orderBy(blocks.order);
  }

  async createMedia(insertMedia: InsertMedia): Promise<Media> {
    const [m] = await db.insert(media).values(insertMedia as any).returning();
    return m;
  }

  async getMediaByUserId(userId: number): Promise<Media[]> {
    return await db.select().from(media).where(eq(media.userId, userId));
  }

  async deleteMedia(id: number): Promise<void> {
    await db.delete(media).where(eq(media.id, id));
  }
}

export const storage = new DatabaseStorage();
