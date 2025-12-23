import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FONTS = [
  { name: "Space Grotesk", value: "Space Grotesk" },
  { name: "Inter", value: "Inter" },
  { name: "Poppins", value: "Poppins" },
  { name: "Playfair Display", value: "Playfair Display" },
  { name: "Georgia", value: "Georgia" },
  { name: "Courier New", value: "Courier New" },
  { name: "Comic Sans", value: "Comic Sans MS" },
  { name: "Trebuchet MS", value: "Trebuchet MS" },
];

interface FontCustomizerProps {
  onUpdate?: (data: any) => void;
}

export function FontCustomizer({ onUpdate }: FontCustomizerProps) {
  const [headingFont, setHeadingFont] = useState("Space Grotesk");
  const [bodyFont, setBodyFont] = useState("Inter");

  const handleHeadingChange = (font: string) => {
    setHeadingFont(font);
    onUpdate?.({ headingFont: font });
  };

  const handleBodyChange = (font: string) => {
    setBodyFont(font);
    onUpdate?.({ bodyFont: font });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Heading Font</h3>
        <div className="grid grid-cols-2 gap-2">
          {FONTS.map((font) => (
            <Button
              key={font.value}
              variant={headingFont === font.value ? "default" : "outline"}
              onClick={() => handleHeadingChange(font.value)}
              style={{ fontFamily: font.value }}
            >
              {font.name}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Body Font</h3>
        <div className="grid grid-cols-2 gap-2">
          {FONTS.map((font) => (
            <Button
              key={font.value}
              variant={bodyFont === font.value ? "default" : "outline"}
              onClick={() => handleBodyChange(font.value)}
              style={{ fontFamily: font.value }}
            >
              {font.name}
            </Button>
          ))}
        </div>
      </div>

      <Card className="p-4 bg-muted">
        <p style={{ fontFamily: headingFont }} className="text-xl font-bold mb-2">
          Heading Preview
        </p>
        <p style={{ fontFamily: bodyFont }}>Body text preview with selected font</p>
      </Card>
    </div>
  );
}
