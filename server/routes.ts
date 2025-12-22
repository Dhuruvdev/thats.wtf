import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Public Profile
  app.get("/api/users/:username", async (req, res) => {
    const user = await storage.getUserByUsername(req.params.username);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  });

  // Modular Blocks
  app.get("/api/blocks/:userId", async (req, res) => {
    const blocks = await storage.getBlocks(Number(req.params.userId));
    res.json(blocks);
  });

  // Identity Builder API
  app.patch("/api/user", async (req, res) => {
    // In a real app, get current user from session
    const user = await storage.getUser(1); 
    if (!user) return res.status(401).send("Unauthorized");
    const updated = await storage.updateUser(user.id, req.body);
    res.json(updated);
  });

  app.post("/api/blocks", async (req, res) => {
    const block = await storage.createBlock(req.body);
    res.json(block);
  });

  const httpServer = createServer(app);
  return httpServer;
}
