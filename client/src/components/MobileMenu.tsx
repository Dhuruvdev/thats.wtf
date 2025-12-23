import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, HelpCircle, MessageCircle, DollarSign, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  const menuItems = [
    { icon: HelpCircle, label: "Help Center", href: "#" },
    { icon: MessageCircle, label: "Discord", href: "#" },
    { icon: DollarSign, label: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 p-2 hover:bg-white/10 rounded-lg transition-colors"
        data-testid="button-mobile-menu-toggle"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            data-testid="overlay-mobile-menu"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-20 left-0 right-0 mx-4 bg-gradient-to-b from-black/95 to-black/90 border border-white/10 rounded-2xl backdrop-blur-md z-50 md:hidden shadow-xl"
            data-testid="panel-mobile-menu"
          >
            <div className="p-6 space-y-6">
              {/* Menu Items */}
              <div className="space-y-3">
                {menuItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link href={item.href}>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-medium transition-all flex items-center gap-3 group"
                          data-testid={`menu-item-${item.label.toLowerCase()}`}
                        >
                          <Icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                          <span className="flex-1 text-left">{item.label}</span>
                        </button>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Language Selector */}
              <motion.div
                custom={3}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="pt-4 border-t border-white/10"
              >
                <button 
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-medium transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                    <span>English (US)</span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-muted-foreground transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </motion.div>

              {/* Auth Buttons */}
              <motion.div
                custom={4}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3 pt-4 border-t border-white/10"
              >
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/5"
                    onClick={() => setIsOpen(false)}
                    data-testid="button-mobile-login"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-full"
                    onClick={() => setIsOpen(false)}
                    data-testid="button-mobile-signup"
                  >
                    Sign Up Free
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
