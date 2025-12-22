import { motion } from "framer-motion";
import { Link } from "wouter";
import { useUser } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: user } = useUser();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center space-y-8"
      >
        <div className="flex justify-center">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-32 h-32 bg-yellow-400 rounded-xl relative overflow-hidden shadow-[0_0_50px_rgba(250,204,21,0.3)]"
            style={{ clipPath: 'polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)' }}
          >
            <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-black rounded-sm" />
            <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-black rounded-sm" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-12 h-2 bg-black rounded-full opacity-20" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tighter sm:text-7xl lg:text-8xl">
            LAB<span className="text-purple-500">.</span>DEV
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl max-w-lg mx-auto font-medium">
            The digital identity engine for the next generation.
            Express yourself through motion and interactive art.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {user ? (
            <Link href="/~">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-12 px-8 rounded-full font-bold text-lg transition-transform active:scale-95">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-12 px-8 rounded-full font-bold text-lg transition-transform active:scale-95">
                  Start Building
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-zinc-800 text-white hover:bg-zinc-900 h-12 px-8 rounded-full font-bold text-lg transition-transform active:scale-95">
                  Learn More
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="pt-12 flex items-center justify-center gap-8 text-zinc-600">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-zinc-400">10k+</span>
            <span className="text-xs uppercase tracking-widest">Identities</span>
          </div>
          <div className="w-px h-8 bg-zinc-800" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-zinc-400">∞</span>
            <span className="text-xs uppercase tracking-widest">Possibilities</span>
          </div>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-zinc-800 font-mono text-sm tracking-widest uppercase">
        System_Identity_v1.0.4
      </div>
    </div>
  );
}
