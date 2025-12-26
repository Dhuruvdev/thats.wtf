import { Eye, Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { SiInstagram, SiThreads, SiRoblox, SiSpotify, SiSnapchat } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import stockAvatar from '@assets/stock_images/professional_portrai_594a4b95.jpg';
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { SnowflakeEffect, RainEffect, AuroraEffect, FloatingParticlesEffect, StarsEffect } from "@/components/effects";

interface LabProfilePreviewProps {
  username?: string;
  tagline?: string;
  views?: number;
  avatarUrl?: string;
  backgroundUrl?: string;
  audioUrl?: string;
  isMobilePreview?: boolean;
  geometry?: {
    radius: number;
    blur: number;
    opacity: number;
  };
  entranceAnimation?: string;
  effectIntensity?: number;
  effectSpeed?: number;
  decorations?: string[];
  onFullScreen?: () => void;
}

export function LabProfilePreview({
  username = "Alex Rivera",
  tagline = "creative director & product designer",
  views = 1240,
  avatarUrl,
  backgroundUrl,
  audioUrl,
  isMobilePreview = false,
  geometry = { radius: 40, blur: 20, opacity: 3 },
  entranceAnimation = "none",
  effectIntensity = 1,
  effectSpeed = 1,
  decorations = [],
  onFullScreen,
}: LabProfilePreviewProps) {
  const displayAvatar = avatarUrl || stockAvatar;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showContent, setShowContent] = useState(entranceAnimation === "none");

  useEffect(() => {
    if (entranceAnimation !== "none") {
      setShowContent(false);
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [entranceAnimation]);

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

  const animationVariants: Record<string, Variants> = {
    none: {
      initial: { opacity: 1, scale: 1 },
      animate: { opacity: 1, scale: 1 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    zoom: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    },
    glitch: {
      initial: { opacity: 0, x: -20 },
      animate: { 
        opacity: 1, 
        x: [0, -5, 5, -2, 2, 0],
        transition: { duration: 0.5 }
      }
    },
    snowfall: {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0 }
    },
    rain: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    aurora: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    particles: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 }
    },
    stars: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    }
  };

  const currentVariant = animationVariants[entranceAnimation] || animationVariants.none;

  return (
    <div className={`relative transition-all duration-700 flex items-center justify-center min-h-[500px] w-full overflow-hidden rounded-[40px] ${isMobilePreview ? "scale-95" : ""}`}>
      {/* Pixel Border Overlay */}
      {decorations.includes("pixel_border") && (
        <div 
          className="absolute inset-0 pointer-events-none z-[100]"
          style={{
            borderImageSource: "url('/assets/borders/pixel_border.svg')",
            borderImageSlice: "40",
            borderImageRepeat: "stretch",
            borderStyle: "solid",
            borderWidth: "32px",
            margin: "-16px",
            imageRendering: "pixelated",
            filter: "drop-shadow(8px 8px 0px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 230, 0, 0.3))"
          }}
        />
      )}
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
      <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center">
        {audioUrl ? (
          <div className="flex gap-2">
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
        ) : <div />}

        {onFullScreen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onFullScreen}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-90"
            data-testid="button-fullscreen-preview"
          >
            <Maximize2 className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Main Frosted Glass Card */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div 
            key={entranceAnimation}
            variants={currentVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
              borderRadius: `${geometry.radius}px`,
              backdropFilter: `blur(${geometry.blur}px)`,
              backgroundColor: `rgba(255, 255, 255, ${geometry.opacity / 100})`
            }}
            className="relative z-10 w-full max-w-[340px] border border-white/[0.08] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center group transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05]"
          >
            
            {/* Avatar with Entrance Effects */}
            <div className="relative mb-8">
              {/* Effect layers */}
              {entranceAnimation === "snowfall" && (
                <div className="absolute inset-[-50px] rounded-full overflow-hidden">
                  <SnowflakeEffect intensity={effectIntensity} speed={effectSpeed} />
                </div>
              )}
              {entranceAnimation === "rain" && (
                <div className="absolute inset-[-50px] rounded-full overflow-hidden">
                  <RainEffect intensity={effectIntensity} speed={effectSpeed} />
                </div>
              )}
              {entranceAnimation === "aurora" && (
                <div className="absolute inset-[-50px] rounded-full overflow-hidden">
                  <AuroraEffect intensity={effectIntensity} speed={effectSpeed} />
                </div>
              )}
              {entranceAnimation === "particles" && (
                <div className="absolute inset-[-50px] rounded-full overflow-hidden">
                  <FloatingParticlesEffect intensity={effectIntensity} speed={effectSpeed} />
                </div>
              )}
              {entranceAnimation === "stars" && (
                <div className="absolute inset-[-50px] rounded-full overflow-hidden">
                  <StarsEffect intensity={effectIntensity} />
                </div>
              )}
              
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-purple-500/30 to-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-white/10 to-white/5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                {/* Avatar Decoration Asset */}
                {decorations.includes("avatar_decor") && (
                  <div className="absolute -inset-6 pointer-events-none z-20 scale-110">
                    {/* High-Fidelity Animated Glow Ring */}
                    <div className="absolute inset-0 rounded-full border-[8px] border-[#FFE600] opacity-90 shadow-[0_0_30px_#FFE600,inset_0_0_20px_#FFE600] animate-pulse" />
                    
                    {/* Rotating Tech Ornaments */}
                    <div className="absolute inset-[-6px] rounded-full border-t-[4px] border-r-[4px] border-[#FFE600] animate-[spin_4s_linear_infinite]" />
                    <div className="absolute inset-[-10px] rounded-full border-b-[4px] border-l-[4px] border-[#FFE600]/40 animate-[spin_6s_linear_infinite_reverse]" />
                    
                    {/* Floating Tech Corners */}
                    <div className="absolute top-0 right-0 w-6 h-6 bg-[#FFE600] rounded-tr-xl rounded-bl-xl shadow-[0_0_15px_rgba(255,230,0,1)] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-black rounded-sm animate-ping" />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#FFE600] rounded-bl-lg" />
                    
                    {/* Moving Pixel Particles */}
                    <div className="absolute top-1/2 -left-4 w-2 h-2 bg-[#FFE600] shadow-[0_0_12px_#FFE600] animate-bounce" />
                    <div className="absolute top-1/2 -right-4 w-2 h-2 bg-[#FFE600] shadow-[0_0_12px_#FFE600] animate-bounce" style={{ animationDelay: '1s' }} />
                  </div>
                )}
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

            {/* Social Icons Array */}
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

            {/* Views Counter */}
            <div className="flex items-center gap-2.5 text-white/20 group-hover:text-white/30 transition-colors">
              <Eye className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase">{views} views</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
