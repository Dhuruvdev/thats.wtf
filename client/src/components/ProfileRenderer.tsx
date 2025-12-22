import { Block, User } from "@shared/schema";
import { IdentityBlock } from "./IdentityBlock";
import { useEffect, useRef } from "react";
import { springReveal } from "@/lib/motion";

interface ProfileRendererProps {
  user: User;
  blocks: Block[];
}

export function ProfileRenderer({ user, blocks }: ProfileRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.identity-block');
      springReveal(Array.from(elements) as HTMLElement[]);
    }
  }, [blocks]);

  return (
    <div 
      ref={containerRef}
      className="profile-container"
      style={{
        '--bg-opacity': user.themeConfig.background.overlayOpacity,
      } as React.CSSProperties}
    >
      <div className="background-layer">
        {user.themeConfig.background.type === 'animated' ? (
          <video autoPlay loop muted src={user.themeConfig.background.value} />
        ) : (
          <div className="static-bg" style={{ backgroundColor: user.themeConfig.background.value }} />
        )}
      </div>
      
      <div className="blocks-grid">
        {blocks.map((block) => (
          <IdentityBlock key={block.id} block={block} user={user} />
        ))}
      </div>

      {user.themeConfig.cursor.type === 'custom' && (
        <div 
          className="custom-cursor"
          style={{
            backgroundColor: user.themeConfig.cursor.color,
            boxShadow: `0 0 20px ${user.themeConfig.cursor.color}`,
          } as React.CSSProperties}
        />
      )}
    </div>
  );
}
