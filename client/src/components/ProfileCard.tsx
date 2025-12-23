import { User, Link as LinkType } from "@shared/schema";
import { ExternalLink, Twitter, Github, Linkedin, Globe, Youtube, Twitch, Instagram, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface ProfileCardProps {
  user: User;
  links: LinkType[];
  isPreview?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  twitter: <Twitter className="w-5 h-5" />,
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  youtube: <Youtube className="w-5 h-5" />,
  twitch: <Twitch className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  default: <Globe className="w-5 h-5" />,
};

export function ProfileCard({ user, links, isPreview = false }: ProfileCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Custom styles based on user preferences
  const accentColor = user.accentColor || "#7c3aed";
  const glowEnabled = user.glowEnabled;
  const frameStyle = user.frame || "none";
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  useEffect(() => {
    if (containerRef.current && !isPreview) {
      gsap.from(containerRef.current.querySelectorAll(".link-item"), {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
      
      gsap.from(containerRef.current.querySelector(".profile-header"), {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }
  }, [isPreview]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full max-w-md mx-auto p-8 rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500",
        frameStyle === "neon" && "border-2",
        frameStyle === "minimal" && "border",
        frameStyle === "glass" && "bg-white/5 border border-white/10"
      )}
      style={{
        borderColor: frameStyle === "neon" ? accentColor : "rgba(255,255,255,0.1)",
        boxShadow: glowEnabled ? `0 0 60px -20px ${accentColor}40` : "none",
        background: frameStyle === "glass" ? undefined : `linear-gradient(180deg, rgba(17,24,39,0.8) 0%, rgba(11,14,20,0.95) 100%)`
      }}
    >
      {/* Background Video/Image */}
      {user.backgroundUrl && (
        <div className="absolute inset-0 -z-20">
          {user.backgroundUrl.toLowerCase().endsWith('.gif') ? (
            <img 
              src={user.backgroundUrl} 
              alt="Profile background" 
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={user.backgroundUrl}
              className="w-full h-full object-cover"
              muted
              loop
              autoPlay
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--accent-color)]/10 pointer-events-none" />
        </div>
      )}

      {/* Background Audio */}
      {user.audioUrl && (
        <audio 
          ref={audioRef}
          src={user.audioUrl}
          onPlay={() => setIsAudioPlaying(true)}
          onPause={() => setIsAudioPlaying(false)}
        />
      )}

      {/* Audio Controls */}
      {user.audioUrl && (
        <div className="absolute top-6 left-6 z-40 flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full p-3 border border-white/10 hover:border-white/20 transition-all duration-200">
          <button
            onClick={toggleAudio}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 group"
            data-testid="button-audio-play"
            title={isAudioPlaying ? "Pause" : "Play"}
          >
            {isAudioPlaying ? (
              <div className="flex items-center gap-1">
                <div className="w-1 h-3 bg-purple-400 animate-pulse" />
                <div className="w-1 h-5 bg-purple-400 animate-pulse" style={{ animationDelay: "0.1s" }} />
                <div className="w-1 h-3 bg-purple-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
              </div>
            ) : (
              <Play className="w-4 h-4 text-white" fill="white" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            data-testid="button-audio-mute"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white/60" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      )}

      {/* Decorative background elements */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] -z-10 opacity-30 pointer-events-none"
        style={{ background: accentColor }}
      />

      {/* Header */}
      <div className="profile-header flex flex-col items-center text-center mb-8">
        <div className="relative group mb-4">
          <div 
            className="absolute inset-0 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-500"
            style={{ background: accentColor }}
          />
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 bg-black">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.displayName || ""} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary text-4xl font-display font-bold text-muted-foreground">
                {(user.displayName || user.username).slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          {/* Level Badge */}
          <div className="absolute -bottom-2 -right-2 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-xl">
            <span style={{ color: accentColor }}>LVL</span> {user.level}
          </div>
        </div>

        <h1 className="text-3xl font-display font-bold text-white mb-1 tracking-tight">
          {user.displayName || user.username}
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
          {user.bio || "No bio yet."}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-6 mt-6 p-3 rounded-2xl bg-white/5 border border-white/5">
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Views</div>
            <div className="text-lg font-mono font-bold text-white">{user.views.toLocaleString()}</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">XP</div>
            <div className="text-lg font-mono font-bold text-white">{user.xp.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-3">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-item block w-full group"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-4 overflow-hidden"
              style={{
                borderColor: "rgba(255,255,255,0.05)"
              }}
            >
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: accentColor }}
              />
              
              <div className="text-white/70 group-hover:text-white transition-colors">
                {iconMap[link.icon.toLowerCase()] || <ExternalLink className="w-5 h-5" />}
              </div>
              
              <span className="font-medium text-white/90 group-hover:text-white flex-1 text-left">
                {link.title}
              </span>

              <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors opacity-0 group-hover:opacity-100" />
            </motion.div>
          </a>
        ))}

        {links.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm italic">
            No links added yet.
          </div>
        )}
      </div>
    </div>
  );
}
