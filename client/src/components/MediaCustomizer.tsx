import { useState } from "react";
import { Settings, Palette } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PRESET_VIDEOS = [
  {
    title: "Cyberpunk Grid",
    url: "https://cdn.pixabay.com/vimeo/797850620/neon-grid-218980.mp4",
  },
  {
    title: "Dark Ocean",
    url: "https://cdn.pixabay.com/vimeo/785048225/ocean-waves-184976.mp4",
  },
  {
    title: "Particle Flow",
    url: "https://cdn.pixabay.com/vimeo/735743373/particles-151918.mp4",
  },
];

const PRESET_AUDIOS = [
  {
    title: "Ambient Zen",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Lo-fi Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
];

export function MediaCustomizer() {
  const [selectedTheme, setSelectedTheme] = useState<string>("dark");

  const applyTheme = (theme: string) => {
    setSelectedTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("selectedTheme", theme);
  };

  const themes = [
    {
      id: "dark",
      name: "Dark Mode",
      colors: "from-slate-900 to-purple-900",
    },
    {
      id: "neon",
      name: "Neon Cyber",
      colors: "from-pink-500 to-cyan-500",
    },
    {
      id: "sunset",
      name: "Sunset",
      colors: "from-orange-500 to-red-600",
    },
    {
      id: "forest",
      name: "Forest",
      colors: "from-green-600 to-emerald-700",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          data-testid="button-media-customizer"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Media & Theme Customizer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Theme Selector */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
              Color Themes
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <Card
                  key={theme.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedTheme === theme.id
                      ? "ring-2 ring-accent"
                      : "hover-elevate"
                  }`}
                  onClick={() => applyTheme(theme.id)}
                  data-testid={`card-theme-${theme.id}`}
                >
                  <div
                    className={`h-12 rounded-md bg-gradient-to-r ${theme.colors} mb-2`}
                  />
                  <p className="text-xs font-semibold">{theme.name}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Preset Videos */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
              Background Videos
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {PRESET_VIDEOS.map((video) => (
                <Card
                  key={video.title}
                  className="p-3 hover-elevate cursor-pointer"
                  onClick={() => {
                    const media = JSON.parse(
                      localStorage.getItem("backgroundMedia") || "{}"
                    );
                    media.videoUrl = video.url;
                    media.videoPlaying = true;
                    localStorage.setItem("backgroundMedia", JSON.stringify(media));
                    window.location.reload();
                  }}
                  data-testid={`card-video-${video.title.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <p className="text-xs font-semibold">{video.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click to apply
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Preset Audio */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
              Background Audio
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {PRESET_AUDIOS.map((audio) => (
                <Card
                  key={audio.title}
                  className="p-3 hover-elevate cursor-pointer"
                  onClick={() => {
                    const media = JSON.parse(
                      localStorage.getItem("backgroundMedia") || "{}"
                    );
                    media.audioUrl = audio.url;
                    media.audioPlaying = true;
                    localStorage.setItem("backgroundMedia", JSON.stringify(media));
                    window.location.reload();
                  }}
                  data-testid={`card-audio-${audio.title.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <p className="text-xs font-semibold">{audio.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click to apply
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Gen Z Tips */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-2">
              Pro Tips for Gen Z Vibes
            </h4>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Pair dark themes with neon colors for maximum contrast</li>
              <li>• Use lo-fi or ambient audio for productive vibes</li>
              <li>• Cyberpunk videos work great with neon theme</li>
              <li>• Keep volumes low for immersive, non-intrusive experience</li>
              <li>• Mix and match themes based on your mood</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
