import { useEffect, useRef, useMemo, useState } from "react";
import { Block, User } from "@shared/schema";
import { IdentityBlock } from "@/components/IdentityBlock";
import { springReveal, idlePulse } from "@/lib/motion";
import { useLogicEngine } from "@/hooks/use-logic-engine";
import { resolveMediaUrl } from "@/lib/url-utils";
import { gsap } from "gsap";
import { Play, Volume2, VolumeX, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileRendererProps {
  user: User;
  blocks: Block[];
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '124, 58, 237';
}

function getFrameStyles(activeTheme: any): string {
  const style = activeTheme?.frameOverlay?.style || 'none';
  if (style === 'none') return '';
  
  const colorRgb = hexToRgb(activeTheme?.frameOverlay?.color || '#7c3aed');
  const opacity = activeTheme?.frameOverlay?.opacity || 0.5;
  const blur = activeTheme?.frameOverlay?.blur || 10;
  
  let css = `.profile-header { backdrop-filter: blur(${blur}px); `;
  
  if (style === 'glass') {
    css += `background: rgba(${colorRgb}, ${opacity * 0.1}); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 40px; padding: 40px 30px; }`;
  } else if (style === 'neon') {
    css += `background: rgba(${colorRgb}, ${opacity * 0.15}); border: 2px solid rgba(${colorRgb}, 0.6); border-radius: 40px; padding: 40px 30px; box-shadow: 0 0 40px rgba(${colorRgb}, 0.3); }`;
  } else if (style === 'minimal') {
    css += `border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 40px; padding: 40px 30px; }`;
  } else if (style === 'transparent') {
    css += `background: rgba(0, 0, 0, ${opacity * 0.3}); border: 1px solid rgba(${colorRgb}, 0.2); border-radius: 40px; padding: 40px 30px; }`;
  } else if (style === 'glowing-border') {
    css += `border: 2px solid rgba(${colorRgb}, 0.4); border-radius: 40px; padding: 40px 30px; box-shadow: inset 0 0 30px rgba(${colorRgb}, 0.2); }`;
  } else {
    css += '}';
  }
  
  return css;
}

export function ProfileRenderer({ user, blocks }: ProfileRendererProps) {
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
    root.style.setProperty("--displayname-font", activeTheme.typography.displayNameFont || activeTheme.typography.headingFont);
    root.style.setProperty("--bio-font", activeTheme.typography.bioFont || activeTheme.typography.bodyFont);
    
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
      {/* Background Image/GIF */}
      {backgroundUrl && (
        <div className="absolute inset-0 -z-20 bg-video-container" style={{ contain: 'strict', willChange: 'transform' }}>
          {backgroundUrl.toLowerCase().endsWith('.gif') ? (
            <img 
              src={backgroundUrl} 
              alt="Profile background" 
              className="w-full h-full object-cover bg-video-element"
              crossOrigin="anonymous"
              loading="eager"
              onError={(e) => console.error("Background image failed to load:", backgroundUrl)}
            />
          ) : (
            <video
              src={backgroundUrl}
              className="w-full h-full object-cover bg-video-element"
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              crossOrigin="anonymous"
              style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
              onError={(e) => console.error("Background video failed to load:", backgroundUrl)}
            />
          )}
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
        {/* Profile Header */}
        <div className="flex flex-col items-center pt-12 profile-header">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-[var(--accent-color)] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-3 border-[var(--accent-color)]/50 hover:border-[var(--accent-color)] transition-all duration-300 shadow-2xl">
              <img 
                src={user.avatarUrl || `https://avatar.vercel.sh/${user.username}`} 
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 
            className="text-5xl font-black mb-4 text-white text-center tracking-tight displayname-text"
            style={{ 
              fontFamily: "var(--displayname-font)",
              animation: activeTheme.animations?.displayName?.enabled 
                ? `${activeTheme.animations.displayName.type}-in ${activeTheme.animations.displayName.duration}s ease-out forwards`
                : 'none',
              textShadow: `0 0 20px ${activeTheme.typography?.displayNameGlowColor || '#7c3aed'}80`
            }}
          >
            {user.displayName || user.username}
          </h1>
          
          {user.bio && (
            <p 
              className="text-[15px] text-zinc-400 text-center max-w-sm leading-relaxed font-medium bio-text"
              style={{ 
                fontFamily: "var(--bio-font)",
                animation: activeTheme.animations?.bio?.enabled 
                  ? `${activeTheme.animations.bio.type}-in ${activeTheme.animations.bio.duration}s ease-out forwards`
                  : 'none'
              }}
            >
              {user.bio}
            </p>
          )}
          
          <div className="flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Level {user.level}</span>
          </div>
        </div>

        {/* Dynamic Blocks */}
        <div className="space-y-4 pb-8">
          {blocks.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/10">
              <p className="text-sm font-bold text-zinc-600">No links published yet</p>
            </div>
          )}
          {blocks
            .filter(b => b.visible)
            .sort((a, b) => a.order - b.order)
            .map((block) => (
              <IdentityBlock key={block.id} block={block} />
            ))
          }
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `.profile-container {
          background: var(--profile-bg);
          color: white;
        }
        
        .profile-header {
          transition: all 0.3s ease;
        }
        
        ` + getFrameStyles(activeTheme) + `
        
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
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes wave-in {
          0% { opacity: 0; transform: skewY(-5deg); }
          100% { opacity: 1; transform: skewY(0); }
        }
        @keyframes glow-pulse-in {
          0% { opacity: 0; text-shadow: 0 0 0 rgba(124, 58, 237, 0); }
          100% { opacity: 1; text-shadow: 0 0 20px rgba(124, 58, 237, 0.5); }
        }
      `}} />
    </div>
  );
}
