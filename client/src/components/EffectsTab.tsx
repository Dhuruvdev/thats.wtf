import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useProfile } from "@/context/ProfileContext";

const EFFECTS = [
  { id: "snowfall", name: "Snowfall", img: "https://images.unsplash.com/photo-1516912481808-846ec9b29e15?auto=format&fit=crop&q=80&w=200" },
  { id: "rain", name: "Rain", img: "https://images.unsplash.com/photo-1433086720471-80342f3b8fed?auto=format&fit=crop&q=80&w=200" },
  { id: "aurora", name: "Aurora", img: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?auto=format&fit=crop&q=80&w=200" },
  { id: "particles", name: "Particles", img: "https://images.unsplash.com/photo-1569163139394-de4798aa62b1?auto=format&fit=crop&q=80&w=200" },
  { id: "stars", name: "Stars", img: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=200" },
  { id: "none", name: "None", img: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200" }
];

export function EffectsTab() {
  const { config, updateConfig } = useProfile();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Entrance Effects</Label>
        <div className="grid grid-cols-3 gap-3">
          {EFFECTS.map((effect) => (
            <button
              key={effect.id}
              onClick={() => updateConfig({ entranceAnimation: effect.id })}
              className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group ${
                config.entranceAnimation === effect.id
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
              {config.entranceAnimation !== effect.id && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-md">
                  <Plus className="w-3 h-3 text-white/40" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {["snowfall", "rain", "aurora", "particles", "stars"].includes(config.entranceAnimation) && (
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
