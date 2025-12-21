import { motion } from "framer-motion";
import iconImg from "/icon.png";

export function WalkingIcon() {
  return (
    <div className="w-full h-20 bg-gradient-to-b from-background via-background/50 to-transparent flex items-center justify-center overflow-hidden border-b border-white/5">
      <motion.div
        animate={{
          x: ["-5%", "95%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex-shrink-0"
      >
        <motion.img
          src={iconImg}
          alt="Walking Icon"
          className="w-16 h-16 object-contain drop-shadow-lg"
          data-testid="walking-icon"
        />
      </motion.div>
    </div>
  );
}
