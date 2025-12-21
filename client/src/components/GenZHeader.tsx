import { motion } from "framer-motion";
import { MediaCustomizer } from "./MediaCustomizer";
import { Button } from "@/components/ui/button";
import logoImg from "/logo.png";

export function GenZHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 border-b border-white/5 bg-gradient-to-b from-background/80 to-background/0 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <img 
            src={logoImg}
            alt="Lab.dev Logo"
            className="w-24 h-24 object-contain rounded-lg"
            data-testid="header-logo-image"
          />
          <span className="font-display text-lg font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Lab.dev
          </span>
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MediaCustomizer />
          <Button variant="outline" size="sm" data-testid="button-header-theme">
            Features
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
