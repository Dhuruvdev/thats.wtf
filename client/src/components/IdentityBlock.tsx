import { useEffect, useRef } from "react";
import { blockHover, blockLeave } from "@/lib/motion";
import type { Block } from "@shared/schema";

interface Props {
  block: Block;
}

export function IdentityBlock({ block }: Props) {
  const blockRef = useRef<HTMLDivElement>(null);
  const { intensity, delay, trigger } = block.animationConfig;

  return (
    <div
      ref={blockRef}
      className="identity-block reveal-up"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => trigger === 'hover' && blockHover(blockRef.current!, intensity)}
      onMouseLeave={() => trigger === 'hover' && blockLeave(blockRef.current!)}
      onClick={() => trigger === 'click' && blockHover(blockRef.current!, intensity * 2)}
      data-testid={`block-${block.type}-${block.id}`}
    >
      {block.type === 'bio' && (
        <div style={ { display: 'flex', flexDirection: 'column', gap: '0.5rem' } }>
          <h2 style={ { fontSize: '1.25rem', fontWeight: 'bold' } }>{(block.content as any).title}</h2>
          <p style={ { color: 'var(--text-secondary)' } }>{(block.content as any).text}</p>
        </div>
      )}
      {block.type === 'link' && (
        <a 
          href={(block.content as any).url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={ { display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' } }
        >
          <span style={ { padding: '0.5rem', backgroundColor: 'rgba(124, 58, 237, 0.2)', borderRadius: '0.375rem' } }>🔗</span>
          <span style={ { fontWeight: 500 } }>{(block.content as any).title}</span>
        </a>
      )}
    </div>
  );
}
