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
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-white/80">Identity gamified for the future</span>
          </div>
          
          <h1 ref={textRef} className="text-5xl sm:text-7xl font-display font-bold tracking-tighter mb-8 leading-tight">
            Level up your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative inline-block">
              digital presence
              {/* Underline glow */}
              <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent blur-[2px]" />
            </span>
          </h1>
          
          <p className="hero-desc text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Create a stunning profile that evolves with you. 
            Gain XP, unlock badges, and showcase your links in a high-fidelity interface designed for the modern web.
          </p>
          
          <div className="hero-btns flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all">
                Claim your username <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/u/demo">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm">
                View Demo Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Layers className="w-8 h-8 text-primary" />,
              title: "The Lab",
              desc: "Deep customization with themes, frames, and motion controls."
            },
            {
              icon: <Zap className="w-8 h-8 text-accent" />,
              title: "Progression",
              desc: "Earn XP for every view and click. Level up your profile."
            },
            {
              icon: <Sparkles className="w-8 h-8 text-purple-400" />,
              title: "Visuals",
              desc: "Cinematic animations powered by GSAP for premium feel."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-card/50 border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit border border-white/5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
