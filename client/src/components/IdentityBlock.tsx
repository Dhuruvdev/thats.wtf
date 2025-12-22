import { Block, User } from "@shared/schema";
import { useEffect, useRef } from "react";
import { blockHover, blockLeave } from "@/lib/motion";

interface IdentityBlockProps {
  block: Block;
  user: User;
}

export function IdentityBlock({ block, user }: IdentityBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (blockRef.current) {
      blockHover(blockRef.current, block.animationConfig.intensity);
    }
  };

  const handleMouseLeave = () => {
    if (blockRef.current) {
      blockLeave(blockRef.current);
    }
  };

  return (
    <div 
      ref={blockRef}
      className="identity-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={`block-${block.type}-${block.id}`}
      style={{
        '--delay': `${block.animationConfig.delay}s`,
        '--ease': block.animationConfig.ease,
      } as React.CSSProperties}
    >
      <div className="block-content">
        {block.type === 'bio' && (
          <div className="bio-block">
            <h2 className="display-name">{user.displayName}</h2>
            <p className="bio-text">{user.bio}</p>
          </div>
        )}
        {block.type === 'link' && (
          <a href={block.content.url as string} target="_blank" rel="noopener noreferrer" className="link-block">
            <span className="link-title">{block.content.title as string}</span>
          </a>
        )}
      </div>
    </div>
  );
}
