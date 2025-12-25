import { useEffect, useRef } from "react";

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export function RainEffect({ intensity = 1, speed = 1 }: { intensity?: number; speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const raindrops: Raindrop[] = [];
    const raindropCount = Math.floor(100 * intensity);

    for (let i = 0; i < raindropCount; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        length: Math.random() * 15 + 10,
        speed: (Math.random() * 4 + 3) * speed,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      raindrops.forEach((drop) => {
        drop.y += drop.speed;
        drop.x += Math.sin(drop.y * 0.01) * 0.5; // Slight wind effect

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }

        if (drop.x < 0) drop.x = canvas.width;
        if (drop.x > canvas.width) drop.x = 0;

        ctx.globalAlpha = drop.opacity;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + 1, drop.y + drop.length);
        ctx.stroke();
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
