import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Zap, Palette, Sparkles, Layers, Eye, Hash, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function AccountOverview() {
  const stats = [
    {
      label: "Platform Purpose",
      title: "Gamified Identity",
      description: "Build your best digital presence",
      icon: Sparkles,
      color: "from-primary/20 to-primary/5"
    },
    {
      label: "Customization",
      title: "Deep Control",
      description: "Themes, colors, effects, everything",
      icon: Palette,
      color: "from-accent/20 to-accent/5"
    },
    {
      label: "Progression System",
      title: "XP-Based Leveling",
      description: "Unlock new options as you advance",
      icon: Zap,
      color: "from-primary/20 to-primary/5"
    },
    {
      label: "Animation",
      title: "Premium Motion",
      description: "GSAP-powered cinematic effects",
      icon: FileText,
      color: "from-accent/20 to-accent/5"
    },
    {
      label: "Design System",
      title: "shadcn/ui",
      description: "Built with modern React components",
      icon: Layers,
      color: "from-primary/20 to-primary/5"
    },
    {
      label: "Community",
      title: "Multi-User Support",
      description: "Collaborative profiles and sharing",
      icon: Users,
      color: "from-accent/20 to-accent/5"
    }
  ];

  const features = [
    {
      title: "The Customization Lab",
      desc: "Deep control over your profile. Themes, accent colors, frame effects, and motion settings."
    },
    {
      title: "Progression System",
      desc: "Every view and interaction earns you XP. Level up and unlock new customization options."
    },
    {
      title: "Premium Motion",
      desc: "GSAP-powered cinematic animations. Your profile feels alive, expensive, and premium."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <main className="relative pt-20 pb-16 overflow-hidden">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-black mb-2 text-white">
                Account Overview
              </h1>
              <p className="text-muted-foreground">Explore the That's.WTF ecosystem</p>
            </div>
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-full border-white/30">
                <ArrowRight className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={i}
                  className={`relative overflow-hidden border-white/10 bg-gradient-to-br ${stat.color} backdrop-blur-sm p-6 hover-elevate`}
                  data-testid={`card-stat-${i}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        {stat.label}
                      </p>
                      <h3 className="text-xl font-display font-bold text-white mb-1">
                        {stat.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                    <Icon className="w-6 h-6 text-primary ml-3 flex-shrink-0" />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-black text-white mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <Card
                  key={i}
                  className="border-white/10 bg-card/40 backdrop-blur-sm p-6 hover-elevate"
                  data-testid={`card-feature-${i}`}
                >
                  <h3 className="text-lg font-display font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-black text-white mb-8">
              Technology Stack
            </h2>
            <Card className="border-white/10 bg-card/40 backdrop-blur-sm p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-display font-bold text-primary mb-4">Frontend</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      React 18 + TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Vite Build Tool
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Wouter Routing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      TanStack React Query
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      GSAP + Framer Motion
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Tailwind CSS + shadcn/ui
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-primary mb-4">Backend</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Express.js
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      PostgreSQL
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Drizzle ORM
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Zod Validation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Passport Authentication
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Design Philosophy */}
          <div>
            <h2 className="text-3xl font-display font-black text-white mb-8">
              Design Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-white/10 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm p-8 hover-elevate">
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  Premium Dark Aesthetic
                </h3>
                <p className="text-muted-foreground">
                  Pure black background with neon purple and teal accents create a modern, tech-forward look inspired by Kiro.dev style.
                </p>
              </Card>
              <Card className="border-white/10 bg-gradient-to-br from-accent/20 to-accent/5 backdrop-blur-sm p-8 hover-elevate">
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  Glassmorphism Design
                </h3>
                <p className="text-muted-foreground">
                  Heavy use of backdrop blur, semi-transparent elements, and subtle gradients for depth and visual hierarchy.
                </p>
              </Card>
              <Card className="border-white/10 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm p-8 hover-elevate">
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  Cinematic Motion
                </h3>
                <p className="text-muted-foreground">
                  GSAP-powered animations and Framer Motion transitions create premium, smooth interactions throughout the platform.
                </p>
              </Card>
              <Card className="border-white/10 bg-gradient-to-br from-accent/20 to-accent/5 backdrop-blur-sm p-8 hover-elevate">
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  High Contrast Typography
                </h3>
                <p className="text-muted-foreground">
                  Space Grotesk for bold headlines and Inter for body text ensure readability and visual impact.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
