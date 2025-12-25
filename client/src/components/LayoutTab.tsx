import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useProfile } from "@/context/ProfileContext";

export function LayoutTab() {
  const { config, updateLayout } = useProfile();

  return (
    <div className="space-y-6">
      <div className="space-y-6 p-6 bg-white/5 border border-white/5 rounded-2xl">
        <div className="space-y-4">
          <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Visibility</Label>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-sm font-medium text-white/70">Show View Counter</span>
            <Switch
              checked={config.layout.showViews}
              onCheckedChange={(checked) => updateLayout("showViews", checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-sm font-medium text-white/70">Show About Section</span>
            <Switch
              checked={config.layout.showAbout}
              onCheckedChange={(checked) => updateLayout("showAbout", checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-white/70">Element Spacing</span>
            <span className="text-sm font-bold text-purple-400">{config.layout.spacing}px</span>
          </div>
          <Slider
            value={[config.layout.spacing]}
            onValueChange={(v) => updateLayout("spacing", v[0])}
            min={8}
            max={32}
            step={1}
            className="[&_[role=slider]]:bg-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
