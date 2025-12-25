import { motion } from "framer-motion";

interface BurstEntranceEffectProps {
  enabled?: boolean;
  intensity?: number;
  speed?: number;
}

export function BurstEntranceEffect({ 
  enabled = true, 
  intensity = 1, 
  speed = 1 
}: BurstEntranceEffectProps) {
  if (!enabled) return null;

  const burstVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1.2, 1],
      opacity: [1, 0.5, 0],
      transition: {
        duration: 0.8 / speed,
        ease: "easeOut"
      }
    }
  };

  const shockwaveVariants = {
    initial: { scale: 0.8, opacity: 1 },
    animate: {
      scale: [0.8, 2, 2.5],
      opacity: [1, 0.5, 0],
      transition: {
        duration: 1 / speed,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <motion.div
        className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 blur-2xl"
        variants={burstVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute inset-[-10px] rounded-full border-2 border-purple-400/40"
        variants={shockwaveVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            `0 0 30px rgba(168, 85, 247, 0.6)`,
            `0 0 60px rgba(168, 85, 247, 0.3)`,
            `0 0 0px rgba(168, 85, 247, 0)`
          ]
        }}
        transition={{
          duration: 0.8 / speed,
          ease: "easeOut"
        }}
      />
    </>
  );
}
