import { users, blocks, links, type User, type InsertUser, type Block, type InsertBlock, type Link, type InsertLink } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  
  getBlocks(userId: number): Promise<Block[]>;
  createBlock(block: InsertBlock): Promise<Block>;
  updateBlock(id: number, update: Partial<Block>): Promise<Block>;
  deleteBlock(id: number): Promise<void>;
  
  getLinksByUserId(userId: number): Promise<Link[]>;
  createLink(link: InsertLink): Promise<Link>;
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const [updated] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return updated;
  }

  async getBlocks(userId: number): Promise<Block[]> {
    return await db.select().from(blocks).where(eq(blocks.userId, userId)).orderBy(blocks.order);
  }

  async createBlock(insertBlock: InsertBlock): Promise<Block> {
    const [block] = await db.insert(blocks).values(insertBlock).returning();
    return block;
  }

  async updateBlock(id: number, update: Partial<Block>): Promise<Block> {
    const [updated] = await db.update(blocks).set(update).where(eq(blocks.id, id)).returning();
    return updated;
  }

  async deleteBlock(id: number): Promise<void> {
    await db.delete(blocks).where(eq(blocks.id, id));
  }

  async getLinksByUserId(userId: number): Promise<Link[]> {
    return await db.select().from(links).where(eq(links.userId, userId)).orderBy(links.order);
  }

  async createLink(insertLink: InsertLink): Promise<Link> {
    const [link] = await db.insert(links).values(insertLink).returning();
    return link;
  }
}

export const storage = new DatabaseStorage();
