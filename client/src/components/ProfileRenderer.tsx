import { useEffect, useRef, useMemo, useState } from "react";
import { Block, User } from "@shared/schema";
import { IdentityBlock } from "@/components/IdentityBlock";
import { springReveal, idlePulse } from "@/lib/motion";
import { useLogicEngine } from "@/hooks/use-logic-engine";
import { resolveMediaUrl } from "@/lib/url-utils";
import { gsap } from "gsap";
import { Play, Volume2, VolumeX, Lock, Link as LinkIcon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileRendererExtendedProps {
  user: User;
  blocks: Block[];
  activeOverlay?: "none" | "snowfall" | "particles" | "sparkles" | "aurora" | "rain" | "floating-orbs" | "light-streaks";
}

type ProfileRendererProps = ProfileRendererExtendedProps;

export function ProfileRenderer({ user, blocks, activeOverlay }: ProfileRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logic = useLogicEngine();
  const idleAnimationRef = useRef<gsap.core.Tween | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Resolve media URLs to absolute paths for iframe compatibility
  const backgroundUrl = useMemo(() => resolveMediaUrl(user.backgroundUrl), [user.backgroundUrl]);
  const audioUrl = useMemo(() => resolveMediaUrl(user.audioUrl), [user.audioUrl]);

  // Apply logic rules
  const activeTheme = useMemo(() => {
    let config = { ...user.themeConfig };
    user.logicRules.forEach(rule => {
      const isTriggered = 
        (rule.trigger === "mobile" && logic.isMobile) ||
        (rule.trigger === "night" && logic.isNight) ||
        (rule.trigger === "idle" && logic.isIdle) ||
        (rule.trigger === "returning" && logic.isReturning);
      
      if (isTriggered && rule.action === "switch_theme") {
        config = { ...config, ...rule.value };
      }
    });
    return config;
  }, [user.logicRules, user.themeConfig, logic]);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(".identity-block");
      springReveal(Array.from(elements) as HTMLElement[]);
    }
  }, [blocks]);

  useEffect(() => {
    if (logic.isIdle && containerRef.current) {
      const header = containerRef.current.querySelector(".profile-header");
      if (header) {
        idleAnimationRef.current = idlePulse(header as HTMLElement);
      }
    } else if (idleAnimationRef.current) {
      idleAnimationRef.current.kill();
      gsap.to(".profile-header", { y: 0, duration: 0.5 });
    }
  }, [logic.isIdle]);

  useEffect(() => {
    // Inject dynamic theme variables
    const root = document.documentElement;
    root.style.setProperty("--accent-color", activeTheme.typography.accentColor);
    root.style.setProperty("--heading-font", activeTheme.typography.headingFont);
    root.style.setProperty("--body-font", activeTheme.typography.bodyFont);
    
    if (activeTheme.background.type === "static") {
      root.style.setProperty("--profile-bg", activeTheme.background.value);
    }
  }, [activeTheme]);

  const toggleAudio = () => {
    if (!isUnlocked) return;
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        audioRef.current.play();
        setIsAudioPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Auto-play audio on mount
  useEffect(() => {
    if (audioUrl && audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => {});
      setIsAudioPlaying(true);
    }
  }, [audioUrl, isMuted]);

  const handleUnlock = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.6,
        ease: "power2.inOut",
      });
    }
    setIsUnlocked(true);
  };

  return (
    <div 
      ref={containerRef}
      className="profile-container w-full min-h-screen flex flex-col items-center justify-center transition-colors duration-500 relative overflow-hidden"
      style={{
        backgroundColor: user.backgroundUrl ? "transparent" : "var(--profile-bg, #000)",
        fontFamily: "var(--body-font, sans-serif)"
      }}
    >
      {/* Background Image/GIF with Dark Overlay */}
      {backgroundUrl && (
        <div className="absolute inset-0 -z-20">
          {backgroundUrl.toLowerCase().endsWith('.gif') ? (
            <img 
              src={backgroundUrl} 
              alt="Profile background" 
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
              onError={(e) => console.error("Background image failed to load:", backgroundUrl)}
            />
          ) : (
            <video
              src={backgroundUrl}
              className="w-full h-full object-cover"
              muted
              loop
              autoPlay
              crossOrigin="anonymous"
              onError={(e) => console.error("Background video failed to load:", backgroundUrl)}
            />
          )}
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/50 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--accent-color)]/10 pointer-events-none" />
        </div>
      )}

      {/* Audio Player */}
      {audioUrl && (
        <>
          <audio 
            ref={audioRef}
            src={audioUrl}
            crossOrigin="anonymous"
            onPlay={() => setIsAudioPlaying(true)}
            onPause={() => setIsAudioPlaying(false)}
            onError={(e) => console.error("Audio failed to load:", audioUrl)}
          />
          <button
            onClick={toggleMute}
            className="absolute top-6 right-6 z-40 p-3 rounded-full hover:bg-white/10 transition-all duration-200 group"
            data-testid="button-audio-toggle-mute"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white/50" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </button>
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--accent-color)]/5 pointer-events-none" />
      
      <div className="relative z-10 max-w-md w-full space-y-8 px-4">
        {/* Profile Header with Enhanced Styling */}
        <div className="flex flex-col items-center pt-12 profile-header space-y-6">
          {/* Enhanced Avatar with Gradient Border & Glow */}
          <div className="relative mb-2 group animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)] via-[var(--accent-color)]/60 to-transparent rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-br from-[var(--accent-color)] to-blue-500 p-1 hover:scale-105 transition-transform duration-300 shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-black bg-black">
                <img 
                  src={user.avatarUrl || `https://avatar.vercel.sh/${user.username}`} 
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Username with Shadow */}
          <h1 
            className="text-6xl font-black text-white text-center tracking-tight drop-shadow-2xl animate-in fade-in slide-in-from-top-6 duration-700"
            style={{ fontFamily: "var(--heading-font)", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
          >
            {user.displayName || user.username}
          </h1>
          
          {/* Bio */}
          {user.bio && (
            <p className="text-[15px] text-zinc-200 text-center max-w-sm leading-relaxed font-medium drop-shadow-lg animate-in fade-in slide-in-from-top-8 duration-700" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
              {user.bio}
            </p>
          )}
          
          {/* Polished Level Badge with Gradient */}
          <div className="flex items-center gap-4 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 border border-white/20 backdrop-blur-sm hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[12px] font-black text-white uppercase tracking-widest">Level {user.level}</span>
              </div>
            </div>
            
            {/* Stats: Views & XP */}
            <div className="px-4 py-2.5 rounded-full bg-white/5 border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 shadow-lg flex items-center gap-2">
              <Eye className="w-4 h-4 text-white/70" />
              <span className="text-[12px] font-bold text-white/80">{user.views || 0} Views</span>
            </div>
            
            <div className="px-4 py-2.5 rounded-full bg-white/5 border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 shadow-lg">
              <span className="text-[12px] font-bold text-white/80">{user.xp || 0} XP</span>
            </div>
          </div>
          
          {/* Overlay Effect Indicator */}
          {activeOverlay && activeOverlay !== "none" && (
            <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm animate-in fade-in duration-700">
              <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">✨ {activeOverlay} enabled</span>
            </div>
          )}
        </div>

        {/* Dynamic Blocks */}
        <div className="space-y-4 pb-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {blocks.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-colors">
              <LinkIcon className="w-12 h-12 text-white/40 mb-4" />
              <p className="text-sm font-bold text-white/60 mb-2">No links published yet</p>
              <p className="text-xs text-white/40">Add your first link from the Lab</p>
            </div>
          )}
          {blocks
            .filter(b => b.visible)
            .sort((a, b) => a.order - b.order)
            .map((block, idx) => (
              <div key={block.id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <IdentityBlock block={block} />
              </div>
            ))
          }
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .profile-container {
          background: var(--profile-bg);
          color: white;
        }
        .identity-block {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 1.5rem;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        .identity-block::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .identity-block:hover {
          border-color: rgba(var(--accent-color-rgb, 124, 58, 237), 0.4);
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .identity-block:hover::before {
          opacity: 1;
        }
      `}} />
    </div>
  );
}
