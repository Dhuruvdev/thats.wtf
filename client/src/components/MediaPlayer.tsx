import { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface MediaPlayerProps {
  src: string;
  type: "audio" | "video" | "gif";
}

export function MediaPlayer({ src, type }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (mediaRef.current) {
      setDuration(mediaRef.current.duration);
    }
  };

  if (type === "gif") {
    return (
      <div className="rounded-lg overflow-hidden bg-black/50 h-48">
        <img src={src} alt="GIF" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {type === "audio" && (
        <audio
          ref={mediaRef as React.RefObject<HTMLAudioElement>}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          src={src}
        />
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        <div className="flex-1">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <Volume2 className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
