import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth"; // We'll create this or inline it
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// We need to implement setupAuth or inline it. 
// For "that's.wtf", let's inline the basic Passport setup here or in a separate file.
// Since I can only write server/routes.ts in this batch, I'll put it here or create auth.ts if I could.
// But I can't create auth.ts in this tool call block easily without splitting logic?
// No, I can write multiple files. I will write server/auth.ts as well.

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Set up Auth (defined in auth.ts which I will write in this batch)
  await setupAuth(app);

  // === User Routes ===
  
  // Get Public Profile
  app.get(api.users.get.path, async (req, res) => {
    const username = req.params.username;
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const links = await storage.getLinksByUserId(user.id);
    res.json({ ...user, links });
  });

  // Update Profile (Protected)
  app.patch(api.users.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const input = api.users.update.input.parse(req.body);
      // Ensure we don't overwrite critical fields if they were hacked into the body
      // Zod schema handles most, but let's be safe.
      const user = req.user as any;
      const updatedUser = await storage.updateUser(user.id, input);
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

  // === Link Routes ===

  app.post(api.links.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const input = api.links.create.input.parse(req.body);
      const user = req.user as any;
      const link = await storage.createLink({ ...input, userId: user.id });
      res.status(201).json(link);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err);
      throw err;
    }
  });

  app.delete(api.links.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const linkId = parseInt(req.params.id);
    const user = req.user as any;
    // Verify ownership... 
    // For MVP, assuming ID is enough, but strictly should check if link belongs to user.
    // Since getLinksByUserId exists, I can check.
    const links = await storage.getLinksByUserId(user.id);
    const ownsLink = links.some(l => l.id === linkId);
    if (!ownsLink) return res.sendStatus(403);
    
    await storage.deleteLink(linkId);
    res.sendStatus(204);
  });

  return httpServer;
}
