import { useEffect, useRef, useMemo } from "react";
import { Block, User } from "@shared/schema";
import { IdentityBlock } from "@/components/IdentityBlock";
import { springReveal, idlePulse } from "@/lib/motion";
import { useLogicEngine } from "@/hooks/use-logic-engine";
import { gsap } from "gsap";

interface ProfileRendererProps {
  user: User;
  blocks: Block[];
}

export function ProfileRenderer({ user, blocks }: ProfileRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logic = useLogicEngine();
  const idleAnimationRef = useRef<gsap.core.Tween | null>(null);

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

  return (
    <div 
      ref={containerRef}
      className="profile-container min-h-screen w-full flex flex-col items-center py-20 px-4 transition-colors duration-500"
      style={{
        backgroundColor: "var(--profile-bg, #000)",
        fontFamily: "var(--body-font, sans-serif)"
      }}
    >
      <div className="max-w-2xl w-full space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-12 profile-header identity-block">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--accent-color)] mb-4">
            <img 
              src={user.avatarUrl || `https://avatar.vercel.sh/${user.username}`} 
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 
            className="text-4xl font-bold mb-2 text-white"
            style={{ fontFamily: "var(--heading-font)" }}
          >
            {user.displayName || user.username}
          </h1>
          <p className="text-gray-400 text-center max-w-md">
            {user.bio}
          </p>
        </div>

        {/* Dynamic Blocks */}
        {blocks
          .filter(b => b.visible)
          .sort((a, b) => a.order - b.order)
          .map((block) => (
            <IdentityBlock key={block.id} block={block} />
          ))
        }
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .profile-container {
          background: var(--profile-bg);
          color: white;
        }
        .identity-block {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          transition: border-color 0.3s ease;
        }
        .identity-block:hover {
          border-color: var(--accent-color);
        }
      `}} />
    </div>
  );
}
