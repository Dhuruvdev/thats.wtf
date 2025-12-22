import { useRef, useEffect } from "react";
import { Block } from "@shared/schema";
import { blockHover, blockLeave } from "@/lib/motion";
import { useLogicEngine } from "@/hooks/use-logic-engine";
import { ExternalLink, Twitter, Github, Instagram, Youtube, Globe } from "lucide-react";
import { gsap } from "gsap";

interface IdentityBlockProps {
  block: Block;
}

export function IdentityBlock({ block }: IdentityBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const logic = useLogicEngine();

  useEffect(() => {
    if (blockRef.current && logic.scrollSpeed > 20) {
      gsap.to(blockRef.current, {
        skewX: logic.scrollSpeed * 0.1,
        duration: 0.1,
        overwrite: "auto"
      });
    } else if (blockRef.current) {
      gsap.to(blockRef.current, { skewX: 0, duration: 0.4 });
    }
  }, [logic.scrollSpeed]);

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

  const renderContent = () => {
    switch (block.type) {
      case "link":
        const { title, url, icon } = block.content as any;
        return (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full group"
          >
            <div className="flex items-center gap-3">
              {getIcon(icon)}
              <span className="font-medium text-lg">{title}</span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        );
      case "bio":
        return <p className="text-gray-300 leading-relaxed">{block.content.text}</p>;
      default:
        return <pre className="text-xs opacity-50">{JSON.stringify(block.content, null, 2)}</pre>;
    }
  };

  return (
    <div
      ref={blockRef}
      className="identity-block cursor-pointer overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderContent()}
    </div>
  );
}

function getIcon(name: string) {
  const props = { className: "w-6 h-6" };
  switch (name?.toLowerCase()) {
    case "twitter": return <Twitter {...props} />;
    case "github": return <Github {...props} />;
    case "instagram": return <Instagram {...props} />;
    case "youtube": return <Youtube {...props} />;
    default: return <Globe {...props} />;
  }
}
