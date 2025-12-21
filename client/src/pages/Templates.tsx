import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useUser } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

const SAMPLE_TEMPLATES = [
  {
    id: 1,
    name: "Neon Dream",
    description: "Bold purple neon aesthetic with glowing effects",
    layout: "default",
    accentColor: "#7c3aed",
    bgColor: "#000000",
    frame: "neon",
    isPremium: false,
    uses: 2840
  },
  {
    id: 2,
    name: "Minimal Glass",
    description: "Clean glass morphism with minimal borders",
    layout: "minimal",
    accentColor: "#2563eb",
    bgColor: "#000000",
    frame: "glass",
    isPremium: false,
    uses: 1540
  },
  {
    id: 3,
    name: "Cyber Grid",
    description: "Advanced grid layout with cyan accents",
    layout: "grid",
    accentColor: "#14b8a6",
    bgColor: "#000000",
    frame: "neon",
    isPremium: true,
    uses: 890
  },
  {
    id: 4,
    name: "Premium Showcase",
    description: "Portfolio-style showcase layout for creators",
    layout: "showcase",
    accentColor: "#db2777",
    bgColor: "#000000",
    frame: "minimal",
    isPremium: true,
    uses: 640
  },
  {
    id: 5,
    name: "Abyss",
    description: "Dark theme with white text and subtle borders",
    layout: "default",
    accentColor: "#ffffff",
    bgColor: "#000000",
    frame: "minimal",
    isPremium: false,
    uses: 1200
  },
  {
    id: 6,
    name: "Sunset",
    description: "Warm gradient with orange and red accents",
    layout: "default",
    accentColor: "#d97706",
    bgColor: "#000000",
    frame: "neon",
    isPremium: false,
    uses: 950
  }
];

export default function Templates() {
  const { data: user } = useUser();

  const handleApplyTemplate = (templateId: number) => {
    // TODO: Apply template to user profile
    console.log(`Applied template ${templateId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Footer />

      <main className="pt-24 pb-20 px-6 sm:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl sm:text-6xl font-display font-black tracking-tighter mb-4 text-white">
            Profile Templates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse and apply professionally designed templates to customize your profile instantly. Choose from free and premium options.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-12 flex-wrap">
          <Button variant="default" size="sm" className="rounded-full">
            All Templates
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Free
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Premium
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Most Popular
          </Button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_TEMPLATES.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 border-white/5 hover:border-white/10 transition-all group overflow-hidden cursor-pointer h-full flex flex-col">
                {/* Preview */}
                <div className="relative h-48 bg-gradient-to-br from-card to-card/50 overflow-hidden">
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: template.bgColor,
                      borderColor: template.frame === "neon" ? template.accentColor : "rgba(255,255,255,0.1)"
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-32 h-32 rounded-3xl border-2 transition-all ${template.frame === "neon" ? "border-2" : "border"}`}
                        style={{
                          borderColor: template.accentColor,
                          boxShadow: `0 0 20px ${template.accentColor}40`
                        }}
                      />
                    </div>
                  </div>

                  {/* Premium Badge */}
                  {template.isPremium && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="default" className="bg-primary">Pro</Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pb-4 flex flex-col justify-between">
                  {/* Template Details */}
                  <div className="flex gap-2 mb-4 flex-wrap text-xs">
                    <Badge variant="outline" className="text-white/70">{template.layout}</Badge>
                    <Badge variant="outline" className="text-white/70">Uses: {template.uses}</Badge>
                  </div>

                  {/* Apply Button */}
                  <Button 
                    onClick={() => handleApplyTemplate(template.id)}
                    className="w-full rounded-full font-bold bg-primary hover:bg-primary/90"
                    disabled={!user}
                  >
                    {user ? "Apply Template" : "Sign in to Apply"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
