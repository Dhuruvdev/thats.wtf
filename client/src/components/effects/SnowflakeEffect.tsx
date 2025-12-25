import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
  driftAmount: number;
}

export function SnowflakeEffect({ intensity = 1, speed = 1 }: { intensity?: number; speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const snowflakes: Snowflake[] = [];
    const snowflakeCount = Math.floor(50 * intensity);

    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: (Math.random() * 0.5 + 0.2) * speed,
        opacity: Math.random() * 0.7 + 0.3,
        drift: Math.random() * 2 - 1,
        driftSpeed: (Math.random() * 0.02 + 0.01) * speed,
        driftAmount: Math.random() * 2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";

      snowflakes.forEach((flake) => {
        flake.y += flake.speed;
        flake.drift += flake.driftSpeed;
        flake.x += Math.sin(flake.drift) * flake.driftAmount;

        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }

        if (flake.x < 0) flake.x = canvas.width;
        if (flake.x > canvas.width) flake.x = 0;

        ctx.globalAlpha = flake.opacity;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw snowflake pattern
        ctx.globalAlpha = flake.opacity * 0.7;
        for (let i = 0; i < 6; i++) {
          ctx.save();
          ctx.translate(flake.x, flake.y);
          ctx.rotate((i * Math.PI) / 3);
          ctx.fillRect(0, -flake.size * 2, flake.size * 0.5, flake.size * 4);
          ctx.restore();
        }
      });

      ctx.globalAlpha = 1;
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
