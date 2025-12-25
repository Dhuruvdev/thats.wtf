import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useProfile } from "@/context/ProfileContext";

const GRADIENTS = [
  { id: "purple-pink", name: "Purple Pink", gradient: "from-purple-500 to-pink-500" },
  { id: "cyan-blue", name: "Cyan Blue", gradient: "from-cyan-400 to-blue-500" },
  { id: "emerald-teal", name: "Emerald Teal", gradient: "from-emerald-400 to-teal-500" },
  { id: "rose-orange", name: "Rose Orange", gradient: "from-rose-500 to-orange-500" },
  { id: "indigo-purple", name: "Indigo Purple", gradient: "from-indigo-500 to-purple-500" },
];

export function ThemeTab() {
  const { config, updateTheme } = useProfile();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Accent Gradient</Label>
        <div className="grid grid-cols-2 gap-3">
          {GRADIENTS.map((g) => (
            <button
              key={g.id}
              onClick={() => updateTheme("gradient", g.gradient)}
              className={`p-4 rounded-xl border-2 transition-all ${
                config.theme.gradient === g.gradient
                  ? "border-white/40"
                  : "border-white/5 hover:border-white/20"
              }`}
            >
              <div className={`w-full h-12 rounded-lg bg-gradient-to-r ${g.gradient} mb-2`} />
              <span className="text-xs font-medium text-white/70">{g.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 p-6 bg-white/5 border border-white/5 rounded-2xl">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-white/70">Background Blur</span>
            <span className="text-sm font-bold text-purple-400">{config.theme.blurAmount}px</span>
          </div>
          <Slider
            value={[config.theme.blurAmount]}
            onValueChange={(v) => updateTheme("blurAmount", v[0])}
            max={50}
            step={1}
            className="[&_[role=slider]]:bg-purple-500"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
          <span className="text-sm font-medium text-white/70">Show Background</span>
          <Switch
            checked={config.theme.showBackground}
            onCheckedChange={(checked) => updateTheme("showBackground", checked)}
          />
        </div>
      </div>
    </div>
  );
}
