import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layers, Zap, Users, TrendingUp, Lock, Palette } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import iconImg from "/icon.png";

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
      }, "-=0.4")
      .from(".hero-visual", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3");
    }, heroRef);

    return () => ctx.revert();
  }, []);

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
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <main className="relative overflow-hidden" ref={heroRef}>
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hero-badge inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 w-fit"
              >
                <img src={iconImg} alt="Icon" className="w-6 h-6 object-contain" />
                <span className="text-sm font-semibold text-primary">Your Identity, Leveled Up</span>
              </motion.div>

              <h1 ref={textRef} className="text-5xl sm:text-6xl lg:text-7xl font-display font-black tracking-tighter mb-8 leading-[1.1] text-white">
                Own Your <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">Digital Presence</span>
              </h1>
              
              <p className="hero-desc text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-light">
                <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span> is the premium bio link platform where creators and professionals build stunning, interactive profiles with gamified progression and cinematic animations.
              </p>
              
              <div className="hero-btns flex flex-col sm:flex-row items-center gap-6 mb-16">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto h-16 px-10 text-lg font-bold rounded-2xl shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:shadow-[0_0_60px_rgba(124,58,237,0.7)] transition-all bg-primary hover:scale-[1.02] active:scale-[0.98]"
                    data-testid="button-claim-username"
                  >
                    Claim Your Username <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
                </Link>
                <Link href="/u/demo" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto h-16 px-10 text-lg font-bold rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all hover:border-white/40"
                    data-testid="button-view-demo"
                  >
                    View Demo Profile
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-8"
              >
                <div>
                  <p className="text-3xl font-black text-white">10K+</p>
                  <p className="text-sm text-muted-foreground">Active Profiles</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-3xl font-black text-white">150K+</p>
                  <p className="text-sm text-muted-foreground">Monthly Visitors</p>
                </div>
              </motion.div>
            </div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-visual hidden lg:flex"
            >
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-3xl border border-white/10 backdrop-blur-sm" />
                <div className="absolute inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-white/5" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
                      <Sparkles className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-white font-bold">Premium Profile Ready</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-4">
              Powerful Features Built for Creators
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build a stunning profile that converts visitors into followers
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                type: "lucide",
                lucideIcon: Palette,
                title: "Customization Lab",
                desc: "Full-spectrum theme engine. Control colors, fonts, and pixel-perfect animations."
              },
              {
                type: "lucide",
                lucideIcon: TrendingUp,
                title: "Progression System",
                desc: "Earn XP from every visit. Unlock elite tiers and limited-edition profile themes."
              },
              {
                type: "image",
                title: "Cinematic Motion",
                desc: "Premium GSAP-powered transitions. A smooth, high-end experience for your audience."
              },
              {
                type: "lucide",
                lucideIcon: Lock,
                title: "Creator Control",
                desc: "Privacy-first architecture. You own your data, your audience, and your brand."
              }
            ].map((feature, i) => {
              const Icon = feature.type === "lucide" && feature.lucideIcon ? feature.lucideIcon : null;
              return (
              <motion.div key={i} variants={itemVariants}>
                <Card className="p-6 h-full border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-primary/30 transition-all group hover-elevate">
                  <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit border border-primary/20 group-hover:border-primary/40 transition-colors">
                    {feature.type === "image" ? (
                      <img src={iconImg} alt="Icon" className="w-6 h-6 object-contain" />
                    ) : Icon ? (
                      <Icon className="w-6 h-6 text-primary" />
                    ) : null}
                  </div>
                  <h3 className="text-lg font-display font-black text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </Card>
              </motion.div>
            );
            })}
          </motion.div>
        </div>

        {/* Use Cases / Creators */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-4">
              Built for Everyone
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From content creators to indie developers to small businesses
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Content Creators",
                desc: "Monetize your audience with custom link experiences",
                icon: Users
              },
              {
                title: "Indie Developers",
                desc: "Showcase your projects with interactive portfolios",
                icon: Layers
              },
              {
                title: "Small Business",
                desc: "Direct customers to your services and shop",
                icon: Zap
              }
            ].map((use, i) => {
              const Icon = use.icon;
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="p-8 h-full border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-primary/30 transition-all hover-elevate">
                    <div className="mb-6 p-4 rounded-xl bg-primary/10 w-fit border border-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-black text-white mb-2">{use.title}</h3>
                    <p className="text-muted-foreground">{use.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-y border-white/5 py-16 my-12"
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {[
                { label: "Profiles Created", value: "10,000+" },
                { label: "Clicks Generated", value: "1.2M+" },
                { label: "Countries", value: "140+" },
                { label: "Avg. Daily Views", value: "50K+" }
              ].map((stat, i) => (
                <motion.div key={i} variants={itemVariants} className="text-center">
                  <p className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 mb-24"
        >
          <div className="w-full bg-gradient-to-br from-primary via-primary/90 to-accent rounded-[2rem] p-12 sm:p-20 relative overflow-hidden shadow-[0_20px_50px_rgba(124,58,237,0.3)]">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-5xl sm:text-6xl font-display font-black tracking-tighter mb-8 text-white leading-tight">
                Ready to Level Up Your <span className="text-black/40">Brand?</span>
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
                Join 10,000+ creators building their premium digital presence on <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span>
              </p>
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="h-16 px-12 text-lg font-bold rounded-2xl bg-white text-primary hover:bg-white/90 shadow-2xl transition-all transform hover:scale-105 active:scale-95"
                  data-testid="button-get-started"
                >
                  Get Started Free <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* FAQ / Trust */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-black text-white mb-4">
              Why Choose <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span>?
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              { title: "Free Forever", desc: "Get started with our free tier. Upgrade anytime." },
              { title: "No Ads", desc: "Your profile stays clean. No third-party tracking." },
              { title: "Custom Domain", desc: "Use your own domain or our that's.wtf namespace." },
              { title: "Analytics", desc: "Track clicks, views, and engagement in real-time." },
              { title: "Community", desc: "Join thousands of creators sharing experiences." },
              { title: "Always Evolving", desc: "New features added weekly based on feedback." }
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
