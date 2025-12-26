import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useProfile } from "@/context/ProfileContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Trash2, Music, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DesignTab() {
  const { config, updateGeometry, updateConfig } = useProfile();
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "avatarUrl" | "backgroundUrl" | "audioUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) throw new Error("Upload failed");
      
      const data = await res.json();
      updateConfig({ [field]: data.url });
      
      // Also save to database if authenticated
      await apiRequest("PATCH", "/api/user", { [field]: data.url });
      
      toast({ title: "Success", description: "File uploaded and saved!" });
    } catch (error) {
      toast({ title: "Error", description: "Upload failed", variant: "destructive" });
    }
  };

  const handleUpdateConfig = async (update: Partial<typeof config>) => {
    updateConfig(update);
    try {
      await apiRequest("PATCH", "/api/user", update);
    } catch (error) {
      console.error("Failed to sync config:", error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Visual Identity</Label>
        
        <div className="grid gap-6">
          <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/5 rounded-2xl group hover:border-white/10 transition-all">
            <div className="relative group/avatar">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border-2 border-dashed border-white/10 overflow-hidden">
                {config.avatarUrl ? (
                  <img src={config.avatarUrl} className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-6 h-6 text-white/20" />
                )}
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileUpload(e, "avatarUrl")}
                accept="image/*"
              />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-sm font-bold">Profile Picture</h4>
              <p className="text-xs text-white/40">JPG, PNG or GIF. Max 5MB.</p>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold">Background Media</h4>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase font-bold tracking-wider" onClick={() => handleUpdateConfig({ backgroundUrl: "" })}>
                  <Trash2 className="w-3 h-3 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
            <div className="relative h-32 rounded-xl bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 overflow-hidden">
              {config.backgroundUrl ? (
                <>
                  <img src={config.backgroundUrl} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                  <div className="relative z-10 text-[10px] font-bold text-white uppercase bg-black/50 px-3 py-1 rounded-full">Background Set</div>
                </>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-white/20" />
                  <span className="text-[10px] font-bold text-white/20 uppercase">Drop image or video</span>
                </>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileUpload(e, "backgroundUrl")}
                accept="image/*,video/*"
              />
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold">Ambient Audio</h4>
              <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase font-bold tracking-wider" onClick={() => handleUpdateConfig({ audioUrl: "" })}>
                <Trash2 className="w-3 h-3 mr-2" />
                Clear
              </Button>
            </div>
            <div className="relative p-4 rounded-xl bg-white/5 border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Music className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-white/60 uppercase">{config.audioUrl ? "Audio track loaded" : "No track selected"}</span>
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileUpload(e, "audioUrl")}
                accept="audio/*"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Decorations (Merged from Effects Tab) */}
      <div className="space-y-4">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Profile Decorations</Label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "pixel_border", name: "Pixel Frame", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200" },
            { id: "avatar_decor", name: "Cyber Aura", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200" },
            { id: "none", name: "None", img: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200" }
          ].map((effect) => {
            const isActive = effect.id === "none" 
              ? (!config.decorations || config.decorations.length === 0)
              : config.decorations?.includes(effect.id);
            return (
              <button
                key={effect.id}
                onClick={() => {
                  if (effect.id === "none") {
                    handleUpdateConfig({ decorations: [] });
                  } else {
                    const currentDecs = config.decorations || [];
                    const newDecs = currentDecs.includes(effect.id)
                      ? currentDecs.filter(d => d !== effect.id)
                      : [...currentDecs, effect.id];
                    handleUpdateConfig({ decorations: newDecs });
                  }
                }}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group ${
                  isActive
                    ? "border-purple-500 scale-95"
                    : "border-white/5 hover:border-white/20"
                }`}
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

      <div className="space-y-6 p-6 bg-white/5 border border-white/5 rounded-2xl">
        <div className="space-y-4">
          <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Card Geometry</Label>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-white/70">Corner Radius</span>
            <span className="text-sm font-bold text-purple-400">{config.geometry.radius}px</span>
          </div>
          <Slider
            value={[config.geometry.radius]}
            onValueChange={(v) => {
              updateGeometry("radius", v[0]);
              handleUpdateConfig({ geometry: { ...config.geometry, radius: v[0] } });
            }}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-purple-500"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-white/70">Glass Blur</span>
            <span className="text-sm font-bold text-purple-400">{config.geometry.blur}px</span>
          </div>
          <Slider
            value={[config.geometry.blur]}
            onValueChange={(v) => {
              updateGeometry("blur", v[0]);
              handleUpdateConfig({ geometry: { ...config.geometry, blur: v[0] } });
            }}
            max={50}
            step={1}
            className="[&_[role=slider]]:bg-purple-500"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-white/70">Glass Opacity</span>
            <span className="text-sm font-bold text-purple-400">{config.geometry.opacity}%</span>
          </div>
          <Slider
            value={[config.geometry.opacity]}
            onValueChange={(v) => {
              updateGeometry("opacity", v[0]);
              handleUpdateConfig({ geometry: { ...config.geometry, opacity: v[0] } });
            }}
            max={20}
            step={1}
            className="[&_[role=slider]]:bg-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
