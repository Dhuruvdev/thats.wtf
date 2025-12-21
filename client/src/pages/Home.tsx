import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layers, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-badge", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .from(".hero-desc", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(".hero-btns", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" ref={heroRef}>
        <div className="text-center max-w-4xl mx-auto">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-white/70">New: Level system & custom frames</span>
          </div>
          
          <h1 ref={textRef} className="text-6xl sm:text-8xl font-display font-black tracking-tighter mb-8 leading-tight text-white">
            Gamified Identity <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent relative inline-block">
              for the Future
              {/* Underline glow */}
              <div className="absolute -bottom-3 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent blur-[2px]" />
            </span>
          </h1>
          
          <p className="hero-desc text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Your profile is your game board. Earn XP, level up, unlock themes, and showcase your presence with premium motion and customization.
          </p>
          
          <div className="hero-btns flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth">
              <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] transition-all bg-gradient-to-r from-primary to-primary/90">
                CLAIM YOUR USERNAME <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/u/demo">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold rounded-full border-white/20 bg-transparent hover:bg-white/5 backdrop-blur-sm transition-all">
                VIEW DEMO
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Layers className="w-8 h-8 text-primary" />,
              title: "The Lab",
              desc: "Customize your profile with themes, accent colors, frames, and motion settings."
            },
            {
              icon: <Zap className="w-8 h-8 text-primary" />,
              title: "Progression",
              desc: "Every view increases your XP. Level up and unlock exclusive customization frames."
            },
            {
              icon: <Sparkles className="w-8 h-8 text-primary" />,
              title: "Premium Motion",
              desc: "GSAP-powered animations for a cinematic, luxury feel. Your profile feels alive."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card/40 border border-white/5 backdrop-blur-sm hover:bg-card/60 hover:border-white/10 transition-all"
            >
              <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit">
                {feature.icon}
              </div>
              <h3 className="text-lg font-display font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
