import { motion } from "framer-motion";
import iconImg from "/icon.png";

export function WalkingIcon() {
  return (
    <div className="w-full h-20 bg-gradient-to-b from-background to-transparent flex items-center overflow-hidden border-b border-white/5">
      <motion.div
        animate={{
          x: ["0vw", "100vw"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex-shrink-0"
      >
        <motion.img
          src={iconImg}
          alt="Walking Icon"
          className="w-12 h-12 object-contain"
          animate={{
            scaleX: [1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          data-testid="walking-icon"
        />
      </motion.div>
    </div>
  );
}
