import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const DECORATIONS = [
  { id: "pixel_border", name: "Pixel Border", description: "Sharp yellow pixelated card border", category: "decorations" },
  { id: "glow", name: "Glow Effect", description: "Ambient glow around profile", category: "decorations" },
  { id: "particles", name: "Floating Particles", description: "Animated particles", category: "decorations" },
  { id: "gradient", name: "Gradient Overlay", description: "Smooth gradient background", category: "decorations" },
  { id: "blur", name: "Blur Effect", description: "Motion blur animation", category: "decorations" },
  { id: "shimmer", name: "Shimmer Effect", description: "Shimmering light effect", category: "decorations" },
  { id: "pulse", name: "Pulse Animation", description: "Pulsing accent color", category: "decorations" },
  { id: "stars", name: "Star Field", description: "Animated star background", category: "decorations" },
  { id: "waves", name: "Wave Animation", description: "Wavy distortion effect", category: "decorations" },
];

interface DecorationsPanelProps {
  onUpdate?: (data: any) => void;
}

export function DecorationsPanel({ onUpdate }: DecorationsPanelProps) {
  const [enabled, setEnabled] = useState<Set<string>>(new Set(["glow", "shimmer"]));

  const toggleDecoration = (id: string) => {
    const newEnabled = new Set(enabled);
    if (newEnabled.has(id)) {
      newEnabled.delete(id);
    } else {
      newEnabled.add(id);
    }
    setEnabled(newEnabled);
    onUpdate?.({ decorations: Array.from(newEnabled) });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Profile Decorations</h3>
      <div className="grid gap-3">
        {DECORATIONS.map((dec) => (
          <Card key={dec.id} className="p-4 flex items-start gap-3 cursor-pointer hover:bg-muted"
            onClick={() => toggleDecoration(dec.id)}>
            <Checkbox
              checked={enabled.has(dec.id)}
              onCheckedChange={() => toggleDecoration(dec.id)}
            />
            <div className="flex-1">
              <p className="font-medium">{dec.name}</p>
              <p className="text-sm text-muted-foreground">{dec.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-muted space-y-2">
        <h4 className="font-medium">Preview</h4>
        <div className="h-32 rounded bg-background flex items-center justify-center text-muted-foreground">
          {enabled.size > 0 ? `${enabled.size} decorations enabled` : "No decorations"}
        </div>
      </Card>
    </div>
  );
}
