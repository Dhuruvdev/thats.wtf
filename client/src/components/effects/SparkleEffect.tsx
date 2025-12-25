import { motion } from "framer-motion";
import { useMemo } from "react";

interface SparkleEffectProps {
  enabled?: boolean;
  intensity?: number;
  speed?: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function SparkleEffect({ 
  enabled = true, 
  intensity = 1, 
  speed = 1 
}: SparkleEffectProps) {
  if (!enabled) return null;

  const sparkles = useMemo(() => {
    const count = Math.floor(12 * intensity);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 0.5
    }));
  }, [intensity]);

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [0, -40, -80]
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden rounded-full">
      {sparkles.map((sparkle: Sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute bg-white rounded-full blur-sm"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`
          }}
          variants={sparkleVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: sparkle.duration / speed,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 1 / speed
          }}
        />
      ))}
    </div>
  );
}
