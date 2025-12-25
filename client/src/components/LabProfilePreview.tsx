import { useState, useRef, useEffect } from "react";
import { Eye, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { SiInstagram, SiThreads, SiRoblox, SiSpotify, SiSnapchat } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import stockAvatar from '@assets/stock_images/professional_portrai_594a4b95.jpg';
import { Button } from "@/components/ui/button";

interface LabProfilePreviewProps {
  username?: string;
  tagline?: string;
  views?: number;
  avatarUrl?: string;
  backgroundUrl?: string;
  audioUrl?: string;
  isMobilePreview?: boolean;
}

export function LabProfilePreview({
  username = "Alex Rivera",
  tagline = "creative director & product designer",
  views = 1240,
  avatarUrl,
  backgroundUrl,
  audioUrl,
  isMobilePreview = false,
}: LabProfilePreviewProps) {
  const displayAvatar = avatarUrl || stockAvatar;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const isVideo = backgroundUrl?.endsWith('.mp4') || backgroundUrl?.endsWith('.webm');
  const isGif = backgroundUrl?.endsWith('.gif');
  const isImage = backgroundUrl && !isVideo && !isGif;

  return (
    <div className={`relative transition-all duration-700 flex items-center justify-center min-h-[500px] w-full overflow-hidden rounded-[40px] ${isMobilePreview ? "scale-95" : ""}`}>
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {backgroundUrl ? (
          <>
            {isVideo ? (
              <video 
                src={backgroundUrl} 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img 
                src={backgroundUrl} 
                className="absolute inset-0 w-full h-full object-cover" 
                alt="Background"
              />
            )}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[#0a0a0c]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(88,28,135,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(30,58,138,0.15)_0%,transparent_50%)] animate-pulse" />
          </>
        )}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Audio Controls */}
      {audioUrl && (
        <div className="absolute top-6 left-6 z-50">
          <audio ref={audioRef} src={audioUrl} loop />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleAudio}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-90"
          >
            {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>
      )}

      {/* Main Frosted Glass Card - Dark Edition */}
      <div className="relative z-10 w-full max-w-[340px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center group transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05]">
        
        {/* Avatar with Neon Glow Ring */}
        <div className="relative mb-8">
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-purple-500/30 to-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-white/10 to-white/5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
            <Avatar className="w-28 h-28 border-[1.5px] border-white/20">
              <AvatarImage src={displayAvatar} alt={username} className="object-cover" />
              <AvatarFallback className="bg-[#16161a] text-white/40 font-bold text-2xl">{username ? username.charAt(0) : 'A'}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Identity Info */}
        <div className="text-center space-y-2.5 mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
            {username}
          </h2>
          <p className="text-white/40 text-[13px] font-medium tracking-wide">
            {tagline}
          </p>
        </div>

        {/* Social Icons Array - Polished Dark */}
        <div className="flex items-center justify-center gap-7 mb-12">
          <a href="#" className="text-white/30 hover:text-[#1DB954] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(29,185,84,0.4)]" data-testid="link-spotify">
             <SiSpotify className="w-6 h-6" />
          </a>
          <a href="#" className="text-white/30 hover:text-[#E4405F] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(228,64,95,0.4)]" data-testid="link-instagram">
             <SiInstagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-white/30 hover:text-[#FFFC00] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(255,252,0,0.4)]" data-testid="link-snapchat">
             <SiSnapchat className="w-6 h-6" />
          </a>
          <a href="#" className="text-white/30 hover:text-white transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]" data-testid="link-threads">
             <SiThreads className="w-6 h-6" />
          </a>
          <a href="#" className="text-white/30 hover:text-[#00A2FF] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(0,162,255,0.4)]" data-testid="link-roblox">
             <SiRoblox className="w-6 h-6" />
          </a>
        </div>

        {/* Views Counter - Minimalist */}
        <div className="flex items-center gap-2.5 text-white/20 group-hover:text-white/30 transition-colors">
          <Eye className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold tracking-[0.1em] uppercase">{views} views</span>
        </div>
      </div>
    </div>
  );
}
