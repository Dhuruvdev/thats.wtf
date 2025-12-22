import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Zap, 
  Users, 
  TrendingUp, 
  Lock, 
  Palette,
  Layout,
  MousePointer2,
  Share2,
  Globe,
  Flame,
  Gamepad2,
  Code2
} from "lucide-react";
import iconImg from "/icon.png";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-primary/30">
      <Navigation />
      
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">The Next Generation of Bio Links</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "out" }}
              className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.9] lg:leading-[0.85]"
            >
              Level Up Your <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">Digital Identity</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Build cinematic, high-performance profiles with gamified progression. 
              Join the elite tier of creators on <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/login" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto h-16 px-12 text-lg font-black rounded-2xl bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(155,88,255,0.4)] transition-all hover:scale-105 active:scale-95 group"
                >
                  Start Building <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/u/demo" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto h-16 px-12 text-lg font-bold rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-xl transition-all"
                >
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {/* Large Feature 1 */}
            <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-4 h-[400px]">
              <Card className="h-full p-10 border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent rounded-[2.5rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
                <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Palette className="w-40 h-40 text-primary rotate-12" />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-end">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30">
                    <Layout className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-3xl font-display font-black mb-3">Customization Lab</h3>
                  <p className="text-muted-foreground text-lg max-w-md font-medium">
                    A high-performance theme engine with full-spectrum control over colors, custom fonts, and cinematic animations.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Small Stat 1 */}
            <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2 h-[400px]">
              <Card className="h-full p-10 border-white/5 bg-[#0a0a0a] rounded-[2.5rem] flex flex-col justify-center items-center text-center space-y-4 hover:border-accent/30 transition-all duration-500">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-4xl font-display font-black tracking-tight">100%</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Aesthetic Score</p>
              </Card>
            </motion.div>

            {/* Small Stat 2 */}
            <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2 h-[400px]">
              <Card className="h-full p-10 border-white/5 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-[2.5rem] flex flex-col justify-end group hover:border-orange-500/30 transition-all duration-500">
                <div className="mb-6">
                  <Flame className="w-10 h-10 text-orange-500 animate-bounce" />
                </div>
                <h3 className="text-2xl font-display font-black mb-2">Gamified XP</h3>
                <p className="text-sm text-muted-foreground font-medium">Earn XP from every visit. Level up to unlock elite profile themes.</p>
              </Card>
            </motion.div>

            {/* Large Feature 2 */}
            <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-4 h-[400px]">
              <Card className="h-full p-10 border-white/5 bg-gradient-to-bl from-white/[0.05] to-transparent rounded-[2.5rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col h-full justify-center text-center">
                  <div className="mx-auto w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center mb-8 border border-primary/30 group-hover:scale-110 transition-transform">
                    <MousePointer2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-4xl font-display font-black mb-4 tracking-tight">Interactive Effects</h3>
                  <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">
                    Premium cursor effects, background animations, and GSAP-powered transitions that captivate your audience.
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Global Reach Section */}
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight">Built for the <span className="text-primary">Creator Economy</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Gamepad2, label: "Gamers", color: "text-red-500" },
                { icon: Code2, label: "Developers", color: "text-blue-500" },
                { icon: Users, label: "Influencers", color: "text-purple-500" },
                { icon: Globe, label: "Brands", color: "text-emerald-500" }
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-white/20 transition-all cursor-default">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <p className="font-bold text-sm uppercase tracking-widest text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <div className="max-w-7xl mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full h-[500px] rounded-[3rem] bg-gradient-to-br from-primary via-primary/80 to-accent relative overflow-hidden shadow-[0_40px_100px_rgba(155,88,255,0.4)] flex items-center justify-center text-center p-10"
          >
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="relative z-10 space-y-10 max-w-2xl">
              <h2 className="text-5xl sm:text-7xl font-display font-black tracking-tighter text-white leading-[0.9]">
                Claim Your Unique <br /> Space Today.
              </h2>
              <Link href="/login">
                <Button size="lg" className="h-16 px-12 text-xl font-black rounded-2xl bg-white text-primary hover:bg-white/90 shadow-2xl transition-all hover:scale-105 active:scale-95">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
