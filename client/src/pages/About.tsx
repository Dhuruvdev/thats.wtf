import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Target, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <main className="relative pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl font-display font-black text-white mb-4">
              About That's.WTF
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering creators to own their digital presence
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="p-8 border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
              <h2 className="text-3xl font-display font-black text-white mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At That's.WTF, we believe every creator deserves a stunning, interactive digital presence. We're building the next generation of bio link platforms—one that's not just functional, but truly premium. With gamified progression, cinematic animations, and complete customization, we're helping creators and professionals build digital identities that stand out and convert.
              </p>
            </Card>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-black text-white mb-8 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Target className="w-6 h-6" />,
                  title: "Creator-First",
                  desc: "Everything we build is designed with creators in mind"
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "Premium Quality",
                  desc: "No cheap solutions. Every feature is crafted with excellence"
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Constant Innovation",
                  desc: "We ship new features weekly based on creator feedback"
                }
              ].map((value, i) => (
                <Card key={i} className="p-6 border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit border border-primary/20">
                    <div className="text-primary">{value.icon}</div>
                  </div>
                  <h3 className="text-lg font-display font-black text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="p-8 border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
              <h2 className="text-3xl font-display font-black text-white mb-4">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                That's.WTF started with a simple observation: bio link platforms are boring. They're functional, sure, but they lack personality and polish. We saw an opportunity to create something different—something that felt premium and exciting.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we're proud to have 10,000+ active creators using That's.WTF to build stunning profiles. From content creators to indie developers to small businesses, creators are leveling up their digital presence with our platform. And we're just getting started.
              </p>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-display font-black text-white mb-4">
              Join the Community
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Become part of the fastest-growing creator community and build your premium digital presence today.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
