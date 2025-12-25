import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type OverlayType = "none" | "snowfall" | "particles" | "sparkles" | "aurora" | "rain" | "floating-orbs" | "light-streaks" | "aura" | "cosmic" | "cyber";

interface ProfileOverlaysProps {
  activeOverlay?: OverlayType;
  onOverlayChange?: (overlay: OverlayType) => void;
  showSelector?: boolean;
}

const OVERLAY_OPTIONS: { id: OverlayType; name: string; description: string; thumbnail?: string }[] = [
  { id: "none", name: "None", description: "No overlay" },
  { id: "aura", name: "Aura", description: "Mystical energy aura", thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200" },
  { id: "cosmic", name: "Cosmic", description: "Deep space nebula", thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=200" },
  { id: "cyber", name: "Cyber", description: "Digital grid matrix", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200" },
  { id: "snowfall", name: "Snowfall", description: "Gentle snow effect" },
  { id: "particles", name: "Particle Burst", description: "Dynamic particles" },
  { id: "sparkles", name: "Sparkles", description: "Twinkling sparkles" },
  { id: "aurora", name: "Aurora", description: "Aurora borealis effect" },
  { id: "rain", name: "Rain", description: "Falling rain drops" },
  { id: "floating-orbs", name: "Floating Orbs", description: "Glowing orbs" },
  { id: "light-streaks", name: "Light Streaks", description: "Light beam effect" },
];

function AuraEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 animate-pulse blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_70%)] animate-pulse" />
    </div>
  );
}

function CosmicEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.2)_0%,transparent_80%)]" />
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white blur-[1px] animate-pulse"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animationDelay: Math.random() * 5 + "s",
            opacity: Math.random() * 0.5 + 0.2,
          }}
        />
      ))}
    </div>
  );
}

function CyberEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_14px]" />
    </div>
  );
}

function Snowfall() {
  const snowflakes = Array.from({ length: 50 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-70 animate-pulse"
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            left: Math.random() * 100 + "%",
            animation: `snowfall ${Math.random() * 10 + 8}s linear infinite`,
            animationDelay: Math.random() * 2 + "s",
            top: "-10px",
          }}
        />
      ))}
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-10px) translateX(0); opacity: 1; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(100px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function ParticleBurst() {
  const particles = Array.from({ length: 80 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const velocity = Math.random() * 3 + 2;
        
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              background: `hsl(${Math.random() * 360}, 100%, 50%)`,
              left: "50%",
              top: "50%",
              animation: `particle-burst 2s ease-out forwards`,
              animationDelay: Math.random() * 0.5 + "s",
              transform: `translate(${Math.cos(angle) * velocity * 100}px, ${Math.sin(angle) * velocity * 100}px)`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes particle-burst {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }
      `}</style>
    </div>
  );
}

function Sparkles() {
  const sparkles = Array.from({ length: 60 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: "2px",
            height: "2px",
            background: "white",
            borderRadius: "50%",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            boxShadow: "0 0 6px #fff, 0 0 10px #fff",
            animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: Math.random() * 3 + "s",
          }}
        />
      ))}
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Aurora() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(45deg, #00ff88 0%, #00ffff 25%, #0088ff 50%, #8800ff 75%, #ff0088 100%)",
            filter: "blur(80px)",
            animation: "aurora-wave 8s ease-in-out infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes aurora-wave {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}

function Rain() {
  const raindrops = Array.from({ length: 100 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {raindrops.map((i) => (
        <div
          key={i}
          className="absolute bg-white/20"
          style={{
            width: "1px",
            height: Math.random() * 20 + 10 + "px",
            left: Math.random() * 100 + "%",
            top: "-20px",
            animation: `rain-fall ${Math.random() * 1 + 0.5}s linear infinite`,
            animationDelay: Math.random() * 2 + "s",
          }}
        />
      ))}
      <style>{`
        @keyframes rain-fall {
          0% { transform: translateY(0) translateX(0); opacity: 1; }
          100% { transform: translateY(100vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function FloatingOrbs() {
  const orbs = Array.from({ length: 6 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {orbs.map((i) => {
        const colors = ["#7c3aed", "#2563eb", "#059669", "#dc2626", "#d97706", "#db2777"];
        
        return (
          <div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: Math.random() * 150 + 100 + "px",
              height: Math.random() * 150 + 100 + "px",
              background: colors[i % colors.length],
              opacity: 0.15,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `float-orb ${Math.random() * 10 + 15}s ease-in-out infinite`,
              animationDelay: i * 2 + "s",
            }}
          />
        );
      })}
      <style>{`
        @keyframes float-orb {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(30px); }
          50% { transform: translateY(0) translateX(60px); }
          75% { transform: translateY(30px) translateX(30px); }
        }
      `}</style>
    </div>
  );
}

function LightStreaks() {
  const streaks = Array.from({ length: 8 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {streaks.map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: "2px",
            height: "200px",
            background: `linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)`,
            left: (i / streaks.length) * 100 + "%",
            top: "-100px",
            animation: `light-streak ${5 + i}s ease-in infinite`,
            animationDelay: i * 0.5 + "s",
            transform: "rotateZ(20deg)",
            filter: "blur(1px)",
          }}
        />
      ))}
      <style>{`
        @keyframes light-streak {
          0% { transform: translateY(0) rotateZ(20deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) rotateZ(20deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export function ProfileOverlays({ activeOverlay = "none", onOverlayChange, showSelector = true }: ProfileOverlaysProps) {
  const [selectedOverlay, setSelectedOverlay] = useState<OverlayType>(activeOverlay);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOverlay = (overlay: OverlayType) => {
    setSelectedOverlay(overlay);
    onOverlayChange?.(overlay);
    setIsOpen(false);
  };

  const renderOverlay = () => {
    switch (selectedOverlay) {
      case "aura":
        return <AuraEffect />;
      case "cosmic":
        return <CosmicEffect />;
      case "cyber":
        return <CyberEffect />;
      case "snowfall":
        return <Snowfall />;
      case "particles":
        return <ParticleBurst />;
      case "sparkles":
        return <Sparkles />;
      case "aurora":
        return <Aurora />;
      case "rain":
        return <Rain />;
      case "floating-orbs":
        return <FloatingOrbs />;
      case "light-streaks":
        return <LightStreaks />;
      default:
        return null;
    }
  };

  const currentOverlay = OVERLAY_OPTIONS.find((o) => o.id === selectedOverlay);

  return (
    <>
      {renderOverlay()}

      {showSelector && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-3 bg-black/60 backdrop-blur-md border border-white/20 rounded-full hover:border-white/40 transition-all duration-200 group"
              data-testid="button-overlay-selector"
              title="Select profile overlay"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-blue-400" />
              <span className="text-sm font-semibold text-white text-xs">
                {currentOverlay?.name || "Effects"}
              </span>
              <ChevronDown className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </button>

            {isOpen && (
              <div className="absolute bottom-full right-0 mb-3 w-56 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
                  {OVERLAY_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOverlay(option.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        selectedOverlay === option.id
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                      data-testid={`overlay-option-${option.id}`}
                    >
                      <div className="font-semibold text-sm">{option.name}</div>
                      <div className="text-xs text-white/50 mt-0.5">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
