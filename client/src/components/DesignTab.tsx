import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useProfile } from "@/context/ProfileContext";

export function DesignTab() {
  const { config, updateGeometry } = useProfile();

  return (
    <div className="space-y-6">
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
            onValueChange={(v) => updateGeometry("radius", v[0])}
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
            onValueChange={(v) => updateGeometry("blur", v[0])}
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
            onValueChange={(v) => updateGeometry("opacity", v[0])}
            max={20}
            step={1}
            className="[&_[role=slider]]:bg-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
