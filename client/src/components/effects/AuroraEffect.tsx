import { useEffect, useRef } from "react";

export function AuroraEffect({ intensity = 1, speed = 1 }: { intensity?: number; speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01 * speed;

      // Create aurora gradient
      for (let y = 0; y < canvas.height; y++) {
        const hue = (120 + Math.sin(time + y * 0.005) * 40) % 360;
        const lightness = 30 + Math.sin(time * 2 + y * 0.01) * 20;
        const saturation = 60 + Math.sin(time + y * 0.002) * 30;

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fillRect(0, y, canvas.width, 1);
      }

      // Add wave distortion
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < canvas.width; i++) {
        const wave = Math.sin(time + i * 0.01) * 20;
        const displacement = Math.floor(wave);

        for (let j = 0; j < canvas.height - Math.abs(displacement); j++) {
          const sourceY = j + displacement;
          if (sourceY >= 0 && sourceY < canvas.height) {
            const sourceIdx = (sourceY * canvas.width + i) * 4;
            const destIdx = (j * canvas.width + i) * 4;

            data[destIdx] = data[sourceIdx];
            data[destIdx + 1] = data[sourceIdx + 1];
            data[destIdx + 2] = data[sourceIdx + 2];
            data[destIdx + 3] = data[sourceIdx + 3];
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
    />
  );
}
