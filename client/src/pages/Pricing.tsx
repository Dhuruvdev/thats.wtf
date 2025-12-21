import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Custom profile page",
        "Basic theme customization",
        "Up to 5 links",
        "Basic analytics",
        "Community support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Creator",
      price: "$9",
      period: "/month",
      description: "For growing creators",
      features: [
        "Everything in Starter",
        "Unlimited links",
        "Advanced customization",
        "Custom domain support",
        "Advanced analytics",
        "Priority support",
        "A/B testing"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For professionals",
      features: [
        "Everything in Creator",
        "Team collaboration",
        "API access",
        "Advanced integrations",
        "White-label options",
        "24/7 dedicated support",
        "Custom analytics dashboard"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <main className="relative pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl font-display font-black text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan to grow your digital presence
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {plans.map((plan, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card 
                  className={`p-8 h-full border transition-all ${
                    plan.popular 
                      ? "border-primary bg-gradient-to-br from-primary/20 to-primary/5 relative" 
                      : "border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-xs font-black">
                      POPULAR
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-display font-black text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                  </div>

                  <Button 
                    className={`w-full mb-8 h-12 rounded-lg font-bold ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90"
                        : "border border-white/20 bg-transparent hover:bg-white/5"
                    }`}
                    data-testid={`button-pricing-${plan.name.toLowerCase()}`}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-display font-black text-white mb-8">
              Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8">
              Check out our <a href="#" className="text-primary hover:text-primary/80 font-bold">FAQ page</a> or <a href="#" className="text-primary hover:text-primary/80 font-bold">contact us</a> for more information.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
