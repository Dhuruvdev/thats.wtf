import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const PREMADE_CURSORS = [
  { name: "Default", value: "default" },
  { name: "Pointer", value: "pointer" },
  { name: "Hand", value: "grab" },
  { name: "Text", value: "text" },
  { name: "Crosshair", value: "crosshair" },
  { name: "Cell", value: "cell" },
  { name: "Not Allowed", value: "not-allowed" },
];

interface CursorCustomizerProps {
  onUpdate?: (data: any) => void;
}

export function CursorCustomizer({ onUpdate }: CursorCustomizerProps) {
  const [selectedCursor, setSelectedCursor] = useState("default");
  const [customUrl, setCustomUrl] = useState("");

  const handleSelect = (cursor: string) => {
    setSelectedCursor(cursor);
    onUpdate?.({ cursor });
  };

  const handleCustomUrl = (url: string) => {
    setCustomUrl(url);
    onUpdate?.({ customCursorUrl: url });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Cursor Style</h3>

      <div className="grid grid-cols-2 gap-2">
        {PREMADE_CURSORS.map((cursor) => (
          <Button
            key={cursor.value}
            variant={selectedCursor === cursor.value ? "default" : "outline"}
            onClick={() => handleSelect(cursor.value)}
            style={{ cursor: cursor.value as any }}
          >
            {cursor.name}
          </Button>
        ))}
      </div>

      <Card className="p-4 space-y-3">
        <h4 className="font-medium">Custom Cursor URL</h4>
        <Input
          placeholder="Paste cursor URL (or SVG data URL)"
          value={customUrl}
          onChange={(e) => handleCustomUrl(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Recommended size: 32x32px. Supports PNG, SVG, CUR formats.
        </p>
      </Card>
    </div>
  );
}
