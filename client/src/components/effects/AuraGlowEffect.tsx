import { motion } from "framer-motion";

interface AuraGlowEffectProps {
  enabled?: boolean;
  intensity?: number;
  speed?: number;
}

export function AuraGlowEffect({ 
  enabled = true, 
  intensity = 1, 
  speed = 1 
}: AuraGlowEffectProps) {
  if (!enabled) return null;

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const ringVariants = {
    animate: {
      boxShadow: [
        `0 0 20px rgba(168, 85, 247, ${0.4 * intensity})`,
        `0 0 40px rgba(168, 85, 247, ${0.6 * intensity}), 0 0 20px rgba(236, 72, 153, ${0.4 * intensity})`,
        `0 0 20px rgba(168, 85, 247, ${0.4 * intensity})`
      ],
      scale: [1, 1.15, 1]
    }
  };

  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 blur-lg"
        variants={ringVariants}
        animate="animate"
        transition={{
          duration: 2 / speed,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-xl opacity-30"
        animate={{
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3 / speed,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
