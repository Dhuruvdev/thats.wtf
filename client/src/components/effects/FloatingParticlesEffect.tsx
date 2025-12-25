import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function FloatingParticlesEffect({ intensity = 1, speed = 1 }: { intensity?: number; speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    const particleCount = Math.floor(30 * intensity);

    const createParticle = () => {
      if (particles.length < particleCount) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 2,
          vy: -(Math.random() * 2 + 1) * speed,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.6 + 0.4,
          life: 0,
          maxLife: Math.random() * 2 + 1,
        });
      }
    };

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.3) createParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.016;

        const lifeRatio = p.life / p.maxLife;
        const fadeOpacity = p.opacity * (1 - lifeRatio);

        ctx.globalAlpha = fadeOpacity;
        ctx.fillStyle = "#fff";

        // Draw particle with glow
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = p.size * 2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (lifeRatio >= 1) {
          particles.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowColor = "transparent";
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
