import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth"; // We'll create this or inline it
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import type { Multer } from "multer";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage_multer = multer.diskStorage({
  destination: uploadsDir,
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, name + "-" + uniqueSuffix + ext);
  },
});

const upload: Multer = multer({
  storage: storage_multer,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Set up Auth (defined in auth.ts which I will write in this batch)
  await setupAuth(app);
  
  // === Custom File Upload Routes ===
  
  // Upload file endpoint
  app.post("/api/upload", upload.single("file"), async (req: Request, res) => {
    const file = (req as any).file as Express.Multer.File | undefined;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    const fileUrl = `/uploads/${file.filename}`;
    res.json({ 
      success: true,
      url: fileUrl,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size
    });
  });

  // === User Routes ===
  
  // Get Public Profile
  app.get(api.users.get.path, async (req, res) => {
    const username = req.params.username;
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const blocks = await storage.getBlocksByUserId(user.id);
    res.json({ ...user, blocks });
  });

  // Update Profile (Protected)
  app.patch(api.users.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const input = api.users.update.input.parse(req.body);
      const user = req.user as any;
      
      // Map theme variables if needed to satisfy type safety or just pass through
      const updatedUser = await storage.updateUser(user.id, input as any);
      res.json(updatedUser);
    } catch (err) {
       if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Gamification: Add View
  app.post(api.users.addView.path, async (req, res) => {
    const username = req.params.username;
    const user = await storage.getUserByUsername(username);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Increment views
    // In a real app, we'd debounce or check IP.
    const newViews = user.views + 1;
    
    // Level up logic (simple): 
    // Level = 1 + floor(sqrt(views / 10))
    // or just increment XP?
    // Let's increment views. Level update happens on XP.
    // Let's say 1 view = 1 XP.
    const newXp = user.xp + 5; // 5 XP per view?
    const newLevel = Math.floor(0.1 * Math.sqrt(newXp)) + 1;

    const updated = await storage.updateUser(user.id, { 
      views: newViews,
      xp: newXp,
      level: newLevel > user.level ? newLevel : user.level
    });
    
    res.json({ views: updated.views });
  });

  // === Block Routes ===

  app.post(api.blocks.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const input = api.blocks.create.input.parse(req.body);
      const user = req.user as any;
      const block = await storage.createBlock({ ...input, userId: user.id });
      res.status(201).json(block);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err);
      throw err;
    }
  });

  app.delete(api.blocks.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const blockId = parseInt(req.params.id);
    const user = req.user as any;
    
    const blocks = await storage.getBlocksByUserId(user.id);
    const ownsBlock = blocks.some(b => b.id === blockId);
    if (!ownsBlock) return res.sendStatus(403);
    
    await storage.deleteBlock(blockId);
    res.sendStatus(204);
  });

  return httpServer;
}
