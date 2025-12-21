import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackgroundMedia {
  audioUrl?: string;
  videoUrl?: string;
  audioVolume: number;
  videoVolume: number;
  audioPlaying: boolean;
  videoPlaying: boolean;
  showControls: boolean;
}

export function BackgroundMediaManager() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [media, setMedia] = useState<BackgroundMedia>(() => {
    const stored = localStorage.getItem("backgroundMedia");
    const defaultMedia = {
      audioUrl: "",
      videoUrl: "",
      audioVolume: 0.3,
      videoVolume: 0.5,
      audioPlaying: false,
      videoPlaying: false,
      showControls: false,
    };
    
    if (!stored) return defaultMedia;
    
    try {
      const parsed = JSON.parse(stored);
      return {
        audioUrl: parsed.audioUrl || "",
        videoUrl: parsed.videoUrl || "",
        audioVolume: isFinite(parsed.audioVolume) ? parsed.audioVolume : 0.3,
        videoVolume: isFinite(parsed.videoVolume) ? parsed.videoVolume : 0.5,
        audioPlaying: parsed.audioPlaying || false,
        videoPlaying: parsed.videoPlaying || false,
        showControls: parsed.showControls || false,
      };
    } catch {
      return defaultMedia;
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("backgroundMedia", JSON.stringify(media));
  }, [media]);

  // Sync audio state
  useEffect(() => {
    if (!audioRef.current || !media.audioUrl) return;
    if (media.audioPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [media.audioPlaying]);

  // Sync video state
  useEffect(() => {
    if (!videoRef.current || !media.videoUrl) return;
    if (media.videoPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [media.videoPlaying]);

  // Update volumes (with validation to prevent non-finite values)
  useEffect(() => {
    if (audioRef.current && isFinite(media.audioVolume)) {
      audioRef.current.volume = Math.max(0, Math.min(1, media.audioVolume));
    }
  }, [media.audioVolume]);

  useEffect(() => {
    if (videoRef.current && isFinite(media.videoVolume)) {
      videoRef.current.volume = Math.max(0, Math.min(1, media.videoVolume));
    }
  }, [media.videoVolume]);

  const setAudioUrl = (url: string) =>
    setMedia((prev) => ({ ...prev, audioUrl: url }));
  const setVideoUrl = (url: string) =>
    setMedia((prev) => ({ ...prev, videoUrl: url }));

  return (
    <>
      {/* Background Video */}
      {media.videoUrl && (
        <video
          ref={videoRef}
          src={media.videoUrl}
          loop
          muted={media.videoVolume === 0}
          className="fixed inset-0 w-full h-full object-cover -z-10"
          style={{
            opacity: media.videoPlaying ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      )}

      {/* Background Audio (hidden) */}
      {media.audioUrl && (
        <audio ref={audioRef} src={media.audioUrl} loop className="hidden" />
      )}

      {/* Floating Media Controls */}
      {media.showControls && (
        <div className="fixed bottom-4 right-4 z-50 glass-panel p-4 rounded-lg space-y-3 animate-enter">
          {/* Video Controls */}
          {media.videoUrl && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider">
                Video
              </label>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    setMedia((prev) => ({
                      ...prev,
                      videoPlaying: !prev.videoPlaying,
                    }))
                  }
                  data-testid="button-video-toggle"
                >
                  {media.videoPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={media.videoVolume}
                  onChange={(e) => {
                    const vol = parseFloat(e.target.value);
                    setMedia((prev) => ({
                      ...prev,
                      videoVolume: isFinite(vol) ? vol : 0.5,
                    }))
                  }}
                  className="w-24 h-1 bg-secondary rounded cursor-pointer"
                  data-testid="slider-video-volume"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setVideoUrl("")}
                  data-testid="button-video-remove"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Audio Controls */}
          {media.audioUrl && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider">
                Audio
              </label>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    setMedia((prev) => ({
                      ...prev,
                      audioPlaying: !prev.audioPlaying,
                    }))
                  }
                  data-testid="button-audio-toggle"
                >
                  {media.audioPlaying ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={media.audioVolume}
                  onChange={(e) => {
                    const vol = parseFloat(e.target.value);
                    setMedia((prev) => ({
                      ...prev,
                      audioVolume: isFinite(vol) ? vol : 0.3,
                    }))
                  }}
                  className="w-24 h-1 bg-secondary rounded cursor-pointer"
                  data-testid="slider-audio-volume"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setAudioUrl("")}
                  data-testid="button-audio-remove"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Add Media Section */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider">
              Add Media
            </label>
            <input
              type="text"
              placeholder="Video URL"
              value={media.videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-2 py-1 text-xs bg-secondary/50 border border-white/10 rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              data-testid="input-video-url"
            />
            <input
              type="text"
              placeholder="Audio URL"
              value={media.audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              className="w-full px-2 py-1 text-xs bg-secondary/50 border border-white/10 rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              data-testid="input-audio-url"
            />
          </div>
        </div>
      )}

      {/* Toggle Controls Button */}
      <button
        onClick={() =>
          setMedia((prev) => ({ ...prev, showControls: !prev.showControls }))
        }
        className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary hover-elevate active-elevate-2 flex items-center justify-center text-white transition-all duration-300 shadow-lg"
        data-testid="button-media-controls-toggle"
        title="Toggle Media Controls"
      >
        <span className="text-xl font-bold">♪</span>
      </button>
    </>
  );
}
