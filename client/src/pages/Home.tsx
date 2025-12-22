import { motion } from "framer-motion";
import { Link } from "wouter";
import { useUser } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Home() {
  const { data: user } = useUser();

  // Update mouse position for the global spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
      {/* High-performance radial wash */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-gradient-to-b from-purple-900/10 to-black pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 text-center space-y-12 max-w-4xl w-full"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ 
              rotate: [0, 2, -2, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-lg blur-xl absolute animate-pulse" />
            <div className="w-8 h-8 bg-white rounded-md z-10" />
          </motion.div>
        </div>

        <div className="space-y-6">
          <h1 className="text-7xl font-black tracking-tighter sm:text-8xl lg:text-9xl leading-tight">
            LAB<span className="text-purple-500">.</span>DEV
          </h1>
          <p className="text-zinc-400 text-xl sm:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
            The digital identity engine for the next generation.
            Express yourself through <span className="text-white">motion</span> and <span className="text-white">interactive art</span>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          {user ? (
            <Link href="/~">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-14 px-10 rounded-full font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-14 px-10 rounded-full font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Start Building
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 h-14 px-10 rounded-full font-bold text-xl transition-all hover:scale-105 active:scale-95">
                  Learn More
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="pt-20 flex items-center justify-center gap-12 text-zinc-500">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-white">10k+</span>
            <span className="text-xs uppercase tracking-[0.3em] font-bold">Identities</span>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-white">∞</span>
            <span className="text-xs uppercase tracking-[0.3em] font-bold">Possibilities</span>
          </div>
        </div>
      </motion.div>

      {/* System Status Overlay */}
      <div className="fixed bottom-10 left-10 right-10 flex justify-between items-end pointer-events-none z-20">
        <div className="text-zinc-600 font-mono text-xs tracking-widest uppercase flex flex-col gap-1">
          <span>System_Identity_v1.0.4</span>
          <span className="text-purple-900/50">Status: Optimized</span>
        </div>
        <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
