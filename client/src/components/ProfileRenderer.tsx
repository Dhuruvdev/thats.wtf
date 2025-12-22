import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IdentityBlock } from "@/components/IdentityBlock";
import { initMotionEngine, springReveal } from "@/lib/motion";
import type { User, Block } from "@shared/schema";

interface Props {
  username: string;
}

export function ProfileRenderer({ username }: Props) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/users", username],
  });

  const { data: blocks, isLoading: blocksLoading } = useQuery<Block[]>({
    queryKey: ["/api/blocks", user?.id],
    enabled: !!user,
  });

  useEffect(() => {
    initMotionEngine();
    
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    if (blocks && blocks.length > 0) {
      springReveal(".identity-block");
    }
  }, [blocks]);

  if (userLoading || blocksLoading) {
    return (
      <div className="dopamine-container" style={ { justifyContent: 'center' } }>
        <div className="animate-pulse" style={ { color: 'var(--accent)' } }>Loading Identity...</div>
      </div>
    );
  }

  if (!user) return <div>Identity not found</div>;

  const themeStyle = {
    '--bg-primary': user.themeConfig.background.value,
    '--accent': user.themeConfig.cursor.color,
  } as React.CSSProperties;

  return (
    <div 
      className="dopamine-container"
      onPointerDown={() => setHasInteracted(true)}
      style={themeStyle}
    >
      <div ref={cursorRef} className="custom-cursor" />

      {user.themeConfig.intro.enabled && !hasInteracted && (
        <div style={ { position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' } }>
          <h1 className="text-4xl font-bold reveal-up">Click to Enter</h1>
        </div>
      )}

      <div className="identity-block text-center" style={ { border: 'none', background: 'transparent', textAlign: 'center' } }>
        <div style={ { width: '6rem', height: '6rem', backgroundColor: 'var(--accent)', margin: '0 auto 1rem auto', borderRadius: '9999px' } } />
        <h1 className="text-3xl font-bold">{user.displayName || user.username}</h1>
        <p className="text-secondary">{user.bio}</p>
      </div>

      {blocks?.map((block) => (
        <IdentityBlock key={block.id} block={block} />
      ))}

      {user.themeConfig.audio.enabled && hasInteracted && (
        <button className="audio-toggle">
          🔊
        </button>
      )}
    </div>
  );
}
