import { useEffect, useState } from "react";

export function PacManIntro() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes pacman-move {
          0% { transform: translateX(-100px); }
          50% { transform: translateX(calc(100vw + 100px)); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        
        @keyframes pacman-mouth {
          0% { clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%); }
          25% { clip-path: polygon(50% 0%, 80% 20%, 80% 80%, 50% 100%); }
          50% { clip-path: polygon(50% 0%, 100% 50%, 100% 50%, 50% 100%); }
          75% { clip-path: polygon(50% 0%, 80% 20%, 80% 80%, 50% 100%); }
          100% { clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%); }
        }
        
        @keyframes dot-fade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes ghost-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes fade-out {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .pacman {
          width: 40px;
          height: 40px;
          background: #FFFF00;
          border-radius: 50%;
          animation: pacman-move 2.2s ease-in-out forwards, pacman-mouth 0.6s ease-in-out infinite;
        }
        
        .dot {
          width: 6px;
          height: 6px;
          background: #FFC600;
          border-radius: 50%;
          animation: dot-fade 0.8s ease-in-out infinite;
        }
        
        .intro-container {
          animation: fade-out 2.8s ease-in forwards;
        }
      `}</style>

      <div className="intro-container w-full h-full flex items-center justify-center bg-background relative">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
        </div>

        {/* Game area */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Pacman */}
          <div className="pacman" />

          {/* Dots trail */}
          <div className="absolute top-1/2 left-0 right-0 h-6 -translate-y-1/2 flex items-center gap-3 px-4">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="dot"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          {/* Ghosts (decoration) */}
          <div className="absolute top-1/4 left-1/4 text-2xl animate-bounce" style={{ animationDelay: "0s" }}>
            👻
          </div>
          <div className="absolute top-1/4 right-1/4 text-2xl animate-bounce" style={{ animationDelay: "0.2s" }}>
            👻
          </div>

          {/* Loading text */}
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-center">
            <div className="text-foreground/60 text-sm font-display tracking-widest">
              LOADING YOUR PROFILE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
