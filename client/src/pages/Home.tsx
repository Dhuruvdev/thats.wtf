import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WalkingIcon } from "@/components/WalkingIcon";
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
      <WalkingIcon />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <main className="relative pt-16 pb-0 overflow-hidden" ref={heroRef}>
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16">
          <h1 ref={textRef} className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter mb-6 leading-tight text-white">
            Gamified Identity <br /> from Prototype <br /> to Premium
          </h1>
          
          <p className="hero-desc text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl leading-relaxed">
            That's.WTF helps you build your best digital presence by bringing structure to identity creation with progression, customization, and cinematic animations.
          </p>
          
          <div className="hero-btns flex flex-col sm:flex-row items-start justify-start gap-4 mb-16">
            <Link href="/auth" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-black rounded-full shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] transition-all bg-primary">
                Claim Your Username
              </Button>
            </Link>
            <Link href="/u/demo" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-black rounded-full border-white/30 bg-transparent hover:bg-white/5 backdrop-blur-sm transition-all">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Demo Screenshot Section */}
        <div className="w-full bg-card/30 border-t border-b border-white/5 py-16">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <div className="rounded-2xl bg-gradient-to-b from-card/60 to-card/20 border border-white/5 p-4 backdrop-blur-sm">
              <div className="aspect-video bg-muted/20 rounded-xl border border-white/5 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Product preview coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers className="w-6 h-6 text-primary" />,
                title: "The Customization Lab",
                desc: "Deep control over your profile. Themes, accent colors, frame effects, and motion settings. Everything."
              },
              {
                icon: <Zap className="w-6 h-6 text-primary" />,
                title: "Progression System",
                desc: "Every view and interaction earns you XP. Level up and unlock new customization options for your profile."
              },
              {
                icon: <Sparkles className="w-6 h-6 text-primary" />,
                title: "Premium Motion",
                desc: "GSAP-powered cinematic animations. Your profile feels alive, expensive, and premium. Never cheap."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="mb-6 p-4 rounded-xl bg-primary/10 w-fit border border-primary/20 group-hover:border-primary/40 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-display font-black mb-3 text-white">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Purple Gradient Section */}
        <div className="w-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 py-24 mt-12">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
            <h2 className="text-5xl sm:text-6xl font-display font-black tracking-tighter mb-6 text-white leading-tight">
              Build something real <br /> in minutes
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              Get started for free and start leveling up your digital presence today.
            </p>
            <Link href="/auth">
              <Button size="lg" className="h-14 px-8 text-base font-black rounded-full bg-white text-primary hover:bg-white/90 shadow-2xl">
                Share Download Link
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
