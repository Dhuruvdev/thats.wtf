import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useProfile } from "@/context/ProfileContext";

export function EffectsTab() {
  const { config, updateConfig } = useProfile();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Frame Decorations</Label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "pixel_border", name: "Pixel Frame", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200" },
            { id: "none_frame", name: "None", img: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200" }
          ].map((effect) => {
            const isActive = effect.id === "none_frame" 
              ? !config.decorations?.includes("pixel_border")
              : config.decorations?.includes(effect.id);
            return (
              <button
                key={effect.id}
                onClick={() => {
                  const currentDecs = config.decorations || [];
                  if (effect.id === "none_frame") {
                    updateConfig({ decorations: currentDecs.filter((d: string) => d !== "pixel_border") });
                  } else {
                    if (!currentDecs.includes(effect.id)) {
                      updateConfig({ decorations: [...currentDecs, effect.id] });
                    }
                  }
                }}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group ${
                  isActive
                    ? "border-purple-500 scale-95"
                    : "border-white/5 hover:border-white/20"
                }`}
                data-testid={`button-frame-${effect.id}`}
              >
                <img
                  src={effect.img}
                  alt={effect.name}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">{effect.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Avatar Decorations</Label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "avatar_decor", name: "Pixel Aura", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200" },
            { id: "none_avatar", name: "None", img: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200" }
          ].map((effect) => {
            const isActive = effect.id === "none_avatar"
              ? !config.decorations?.includes("avatar_decor")
              : config.decorations?.includes(effect.id);
            return (
              <button
                key={effect.id}
                onClick={() => {
                  const currentDecs = config.decorations || [];
                  if (effect.id === "none_avatar") {
                    updateConfig({ decorations: currentDecs.filter((d: string) => d !== "avatar_decor") });
                  } else {
                    if (!currentDecs.includes(effect.id)) {
                      updateConfig({ decorations: [...currentDecs, effect.id] });
                    }
                  }
                }}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group ${
                  isActive
                    ? "border-purple-500 scale-95"
                    : "border-white/5 hover:border-white/20"
                }`}
                data-testid={`button-avatar-${effect.id}`}
              >
                <img
                  src={effect.img}
                  alt={effect.name}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">{effect.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Entrance Effects</Label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "aura", name: "Aura Glow", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200" },
            { id: "sparkles", name: "Sparkles", img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=200" },
            { id: "burst", name: "Burst Pop", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200" },
            { id: "none", name: "None", img: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200" }
          ].map((effect) => {
            const isActive = config.entranceAnimation === effect.id;
            return (
              <button
                key={effect.id}
                onClick={() => updateConfig({ entranceAnimation: effect.id })}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group ${
                  isActive
                    ? "border-purple-500 scale-95"
                    : "border-white/5 hover:border-white/20"
                }`}
                data-testid={`button-effect-${effect.id}`}
              >
                <img
                  src={effect.img}
                  alt={effect.name}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">{effect.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {["snowfall", "rain", "aurora", "particles", "stars", "aura", "sparkles", "burst"].includes(config.entranceAnimation || "") && (
        <div className="space-y-6 p-6 bg-white/5 border border-white/5 rounded-2xl">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-white/70">Effect Intensity</span>
              <span className="text-sm font-bold text-purple-400">{config.effectIntensity.toFixed(2)}</span>
            </div>
            <Slider
              value={[config.effectIntensity]}
              onValueChange={(v) => updateConfig({ effectIntensity: v[0] })}
              min={0.5}
              max={2}
              step={0.1}
              className="[&_[role=slider]]:bg-purple-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-white/70">Animation Speed</span>
              <span className="text-sm font-bold text-purple-400">{config.effectSpeed.toFixed(2)}x</span>
            </div>
            <Slider
              value={[config.effectSpeed]}
              onValueChange={(v) => updateConfig({ effectSpeed: v[0] })}
              min={0.5}
              max={2}
              step={0.1}
              className="[&_[role=slider]]:bg-purple-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
