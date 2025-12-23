import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Music, Palette, Type, Sparkles } from "lucide-react";
import { MediaPlayer } from "./MediaPlayer";
import { CursorCustomizer } from "./CursorCustomizer";
import { FontCustomizer } from "./FontCustomizer";
import { DecorationsPanel } from "./DecorationsPanel";

interface ProfileCustomizerProps {
  onUpdate?: (data: any) => void;
}

export function ProfileCustomizer({ onUpdate }: ProfileCustomizerProps) {
  const [activeTab, setActiveTab] = useState<"background" | "audio" | "cursor" | "fonts" | "decorations">("background");
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current?.classList.add("opacity-60");
  };

  const handleDragLeave = () => {
    dragRef.current?.classList.remove("opacity-60");
  };

  const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current?.classList.remove("opacity-60");

    const files = Array.from(e.dataTransfer.files);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();

        if (file.type.startsWith("image/") || file.type === "image/gif") {
          setBackgroundUrl(data.url);
          onUpdate?.({ backgroundUrl: data.url });
        } else if (file.type.startsWith("audio/")) {
          setAudioUrl(data.url);
          onUpdate?.({ audioUrl: data.url });
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={activeTab === "background" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("background")}
        >
          <Palette className="w-4 h-4 mr-2" />
          Background
        </Button>
        <Button
          variant={activeTab === "audio" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("audio")}
        >
          <Music className="w-4 h-4 mr-2" />
          Audio
        </Button>
        <Button
          variant={activeTab === "cursor" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("cursor")}
        >
          Cursor
        </Button>
        <Button
          variant={activeTab === "fonts" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("fonts")}
        >
          <Type className="w-4 h-4 mr-2" />
          Fonts
        </Button>
        <Button
          variant={activeTab === "decorations" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("decorations")}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Decorations
        </Button>
      </div>

      <Card className="p-6">
        {activeTab === "background" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Background</h3>
            <div
              ref={dragRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center cursor-pointer transition-opacity"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag GIF or image here</p>
            </div>
            {backgroundUrl && (
              <div className="relative rounded-lg overflow-hidden h-48">
                <img src={backgroundUrl} alt="Background" className="w-full h-full object-cover" />
                <button
                  onClick={() => { setBackgroundUrl(""); onUpdate?.({ backgroundUrl: "" }); }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "audio" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Audio</h3>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center cursor-pointer transition-opacity"
            >
              <Music className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag audio file here</p>
            </div>
            {audioUrl && <MediaPlayer src={audioUrl} type="audio" />}
          </div>
        )}

        {activeTab === "cursor" && <CursorCustomizer onUpdate={onUpdate} />}
        {activeTab === "fonts" && <FontCustomizer onUpdate={onUpdate} />}
        {activeTab === "decorations" && <DecorationsPanel onUpdate={onUpdate} />}
      </Card>
    </div>
  );
}
