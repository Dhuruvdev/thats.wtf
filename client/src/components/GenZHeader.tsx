import { motion } from "framer-motion";
import { MediaCustomizer } from "./MediaCustomizer";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
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
          <Link href="/">
            <img 
              src={logoImg}
              alt="That's.WTF Logo"
              className="w-8 h-8 object-contain rounded-md cursor-pointer hover:opacity-80 transition-opacity"
              data-testid="header-logo-image"
            />
          </Link>
          <Link href="/">
            <span className="hidden sm:block font-display text-lg font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
              that's.wtf
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden md:flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/pricing">
            <Button variant="ghost" size="sm" data-testid="button-header-pricing">
              Pricing
            </Button>
          </Link>
          <a href="#discord" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" data-testid="button-header-discord">
              Discord
            </Button>
          </a>
          <MediaCustomizer />
          <Link href="/login">
            <Button variant="outline" size="sm" data-testid="button-header-login">
              Login
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800" data-testid="button-header-signup">
              Get Started
            </Button>
          </Link>
        </motion.div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <MediaCustomizer />
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
