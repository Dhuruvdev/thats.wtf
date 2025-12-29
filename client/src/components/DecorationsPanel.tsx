import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Image as ImageIcon, MousePointer2, User as UserIcon, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const PROFILE_EFFECTS = [
  { id: "aura", name: "Aura Glow", description: "Soft radiating glow around your avatar", intensity: true },
  { id: "glitch", name: "Cyber Glitch", description: "Digital distortion effect", intensity: true },
  { id: "electric", name: "Electric Border", description: "High-energy rotating border", intensity: true },
  { id: "spotlight", name: "Spotlight Card", description: "Interactive hover illumination", intensity: false },
  { id: "pixel", name: "Pixel Card", description: "Retro-futuristic pixelated grid", intensity: false },
  { id: "profile_card", name: "Profile Card", description: "Premium glass-morphism style", intensity: false },
];

const BACKGROUND_EFFECTS = [
  { id: "particles", name: "Stardust", description: "Floating cosmic particles", intensity: true },
  { id: "matrix", name: "Digital Rain", description: "Falling code sequences", intensity: true },
  { id: "waves", name: "Oceanic Waves", description: "Fluid liquid motion", intensity: true },
  { id: "aurora", name: "Boreal Aurora", description: "Shifting light curtains", intensity: false },
];

const CURSOR_EFFECTS = [
  { id: "fluid", name: "Fluid Trail", description: "Liquid smoke follows your path" },
  { id: "sparkle", name: "Sparkle Trail", description: "Glittering trail behind cursor" },
  { id: "custom", name: "Custom Image/GIF", description: "Upload your own cursor icon" },
];

interface DecorationsPanelProps {
  onUpdate?: (data: any) => void;
  profileEffect?: string;
  backgroundEffect?: string;
  cursorEffect?: string;
  cursorUrl?: string;
  effectIntensity?: number;
}

export function DecorationsPanel({ onUpdate }: DecorationsPanelProps) {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<"profile" | "background" | "cursor">("profile");

  const handleUpdate = (category: string, effectId: string, settings: any = {}) => {
    onUpdate?.({
      [category + "Effect"]: effectId,
      ...settings
    });
    toast({
      title: "Effect Updated",
      description: `Applied ${effectId} to your ${category}`,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      handleUpdate("cursor", "custom", { cursorUrl: data.url });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-black/40 rounded-2xl border border-white/5">
        {[
          { id: "profile", label: "Profile", icon: UserIcon },
          { id: "background", label: "Background", icon: ImageIcon },
          { id: "cursor", label: "Cursor", icon: MousePointer2 },
        ].map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "secondary" : "ghost"}
            onClick={() => setActiveCategory(cat.id as any)}
            className="flex-1 gap-2 rounded-xl h-10 text-xs font-bold uppercase tracking-wider"
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {activeCategory === "profile" && PROFILE_EFFECTS.map((effect) => (
            <Card 
              key={effect.id} 
              className="bg-zinc-900/50 border-white/5 hover:border-purple-500/30 cursor-pointer transition-all group overflow-hidden"
              onClick={() => handleUpdate("profile", effect.id)}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white">{effect.name}</h4>
                  <p className="text-xs text-zinc-500 font-medium">{effect.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {activeCategory === "background" && BACKGROUND_EFFECTS.map((effect) => (
            <Card 
              key={effect.id} 
              className="bg-zinc-900/50 border-white/5 hover:border-blue-500/30 cursor-pointer transition-all group overflow-hidden"
              onClick={() => handleUpdate("background", effect.id)}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                  <Palette className="w-5 h-5 text-blue-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white">{effect.name}</h4>
                  <p className="text-xs text-zinc-500 font-medium">{effect.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {activeCategory === "cursor" && (
            <>
              {CURSOR_EFFECTS.map((effect) => (
                <Card 
                  key={effect.id} 
                  className="bg-zinc-900/50 border-white/5 hover:border-green-500/30 cursor-pointer transition-all group overflow-hidden"
                  onClick={() => effect.id !== "custom" && handleUpdate("cursor", effect.id)}
                >
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                      <MousePointer2 className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-white">{effect.name}</h4>
                      <p className="text-xs text-zinc-500 font-medium">{effect.description}</p>
                      {effect.id === "custom" && (
                        <div className="pt-3">
                          <label className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 cursor-pointer transition-colors">
                            <ImageIcon className="w-3 h-3 text-zinc-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Upload Image/GIF</span>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, "cursor")} />
                          </label>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
