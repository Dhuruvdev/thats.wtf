import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Music, Video, X } from "lucide-react";
import { useState, useEffect } from "react";

export function MediaTab() {
  const [media, setMedia] = useState(() => {
    const stored = localStorage.getItem("backgroundMedia");
    return stored
      ? JSON.parse(stored)
      : {
          audioUrl: "",
          videoUrl: "",
          audioVolume: 0.3,
          videoVolume: 0.5,
          audioPlaying: false,
          videoPlaying: false,
        };
  });

  useEffect(() => {
    localStorage.setItem("backgroundMedia", JSON.stringify(media));
  }, [media]);

  return (
    <div className="space-y-6">
      {/* Video Background */}
      <Card className="bg-card/50 border-white/5">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Background Video</h3>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider">Video URL</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="https://example.com/video.mp4"
                value={media.videoUrl}
                onChange={(e) => setMedia((prev: any) => ({ ...prev, videoUrl: e.target.value }))}
                className="bg-background/50 border-white/5 text-sm"
                data-testid="input-lab-video-url"
              />
              {media.videoUrl && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setMedia((prev: any) => ({ ...prev, videoUrl: "" }))}
                  data-testid="button-lab-video-remove"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider">
              Video Volume: {Math.round(media.videoVolume * 100)}%
            </Label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={media.videoVolume}
              onChange={(e) =>
                setMedia((prev: any) => ({
                  ...prev,
                  videoVolume: parseFloat(e.target.value),
                }))
              }
              className="w-full h-2 bg-secondary/50 rounded cursor-pointer"
              data-testid="slider-lab-video-volume"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="video-playing"
              checked={media.videoPlaying}
              onChange={(e) =>
                setMedia((prev: any) => ({
                  ...prev,
                  videoPlaying: e.target.checked,
                }))
              }
              className="w-4 h-4 rounded"
              data-testid="checkbox-lab-video-playing"
            />
            <Label htmlFor="video-playing" className="text-sm cursor-pointer">
              Enable video playback
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Audio Background */}
      <Card className="bg-card/50 border-white/5">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Background Audio</h3>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider">Audio URL</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="https://example.com/audio.mp3"
                value={media.audioUrl}
                onChange={(e) => setMedia((prev: any) => ({ ...prev, audioUrl: e.target.value }))}
                className="bg-background/50 border-white/5 text-sm"
                data-testid="input-lab-audio-url"
              />
              {media.audioUrl && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setMedia((prev: any) => ({ ...prev, audioUrl: "" }))}
                  data-testid="button-lab-audio-remove"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider">
              Audio Volume: {Math.round(media.audioVolume * 100)}%
            </Label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={media.audioVolume}
              onChange={(e) =>
                setMedia((prev: any) => ({
                  ...prev,
                  audioVolume: parseFloat(e.target.value),
                }))
              }
              className="w-full h-2 bg-secondary/50 rounded cursor-pointer"
              data-testid="slider-lab-audio-volume"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="audio-playing"
              checked={media.audioPlaying}
              onChange={(e) =>
                setMedia((prev: any) => ({
                  ...prev,
                  audioPlaying: e.target.checked,
                }))
              }
              className="w-4 h-4 rounded"
              data-testid="checkbox-lab-audio-playing"
            />
            <Label htmlFor="audio-playing" className="text-sm cursor-pointer">
              Enable audio playback
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Presets */}
      <Card className="bg-card/50 border-white/5">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm">Quick Presets</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() =>
                setMedia((prev: any) => ({
                  ...prev,
                  videoUrl: "https://cdn.pixabay.com/vimeo/797850620/neon-grid-218980.mp4",
                }))
              }
              className="p-2 rounded-lg bg-primary/10 border border-primary/30 hover:border-primary/60 transition-colors text-left"
              data-testid="button-preset-cyberpunk"
            >
              <div className="font-semibold">Cyberpunk</div>
              <div className="text-muted-foreground text-xs">Grid video</div>
            </button>
            <button
              onClick={() =>
                setMedia((prev: any) => ({
                  ...prev,
                  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                }))
              }
              className="p-2 rounded-lg bg-accent/10 border border-accent/30 hover:border-accent/60 transition-colors text-left"
              data-testid="button-preset-lofi"
            >
              <div className="font-semibold">Lo-Fi</div>
              <div className="text-muted-foreground text-xs">Ambient audio</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
