import { CardNav, type CardNavItem } from "@/components/CardNav";
import { Footer } from "@/components/Footer";

const navItems: CardNavItem[] = [
  {
    label: "Home",
    href: "/",
    bgColor: "#7c3aed",
    textColor: "#ffffff"
  },
  {
    label: "Lab",
    href: "/lab",
    bgColor: "#14b8a6",
    textColor: "#000000"
  },
  {
    label: "Templates",
    href: "/templates",
    bgColor: "#f472b6",
    textColor: "#ffffff"
  },
  {
    label: "Analytics",
    href: "/analytics",
    bgColor: "#0ea5e9",
    textColor: "#ffffff"
  },
  {
    label: "Profile",
    href: "/u/demo",
    bgColor: "#f59e0b",
    textColor: "#000000"
  }
];

export default function CardNavDemo() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CardNav
        items={navItems}
        baseColor="#0a0a0a"
        menuColor="#ffffff"
        buttonBgColor="#7c3aed"
        buttonTextColor="#ffffff"
        ease="power3.out"
        className="bg-background/80"
      />

      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-24">
        <div className="text-center mb-24">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black tracking-tighter mb-6 text-white">
            Card Navigation <br /> Component
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            A beautiful, animated card-based navigation system with smooth GSAP animations and dark theme support. Hover over the cards above to see the animation effect.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-xl bg-card/50 border border-white/5">
            <h3 className="text-lg font-display font-black mb-3 text-primary">
              🎨 Customizable Colors
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Each nav item can have its own background and text color. Perfect for creating visually distinct sections.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card/50 border border-white/5">
            <h3 className="text-lg font-display font-black mb-3 text-accent">
              ✨ Smooth Animations
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              GSAP-powered animations with hover effects. Cards lift up with shadow effects on interaction.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card/50 border border-white/5">
            <h3 className="text-lg font-display font-black mb-3 text-pink-400">
              📱 Responsive Design
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Mobile-friendly with a hamburger menu. Automatically adapts to smaller screens.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card/50 border border-white/5">
            <h3 className="text-lg font-display font-black mb-3 text-blue-400">
              🔗 Easy Integration
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Works seamlessly with Wouter routing. Active states automatically highlighted.
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-6 rounded-xl bg-card/50 border border-white/5 mb-16">
          <h3 className="text-lg font-display font-black mb-4">Usage Example</h3>
          <pre className="text-sm text-muted-foreground overflow-x-auto p-4 bg-background rounded-lg">
{`import { CardNav } from "@/components/CardNav";

const items = [
  { label: "Home", href: "/", bgColor: "#7c3aed", textColor: "#ffffff" },
  { label: "Lab", href: "/lab", bgColor: "#14b8a6", textColor: "#000000" },
];

<CardNav
  items={items}
  baseColor="#0a0a0a"
  buttonBgColor="#7c3aed"
  buttonTextColor="#ffffff"
/>`}
          </pre>
        </div>

        {/* Props Documentation */}
        <div className="p-6 rounded-xl bg-card/50 border border-white/5">
          <h3 className="text-lg font-display font-black mb-4">Props</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <span className="text-white font-medium">items</span> - Array of navigation items with label, href, bgColor, and optional textColor
            </div>
            <div>
              <span className="text-white font-medium">baseColor</span> - Background color of the navbar (default: #ffffff)
            </div>
            <div>
              <span className="text-white font-medium">buttonBgColor</span> - CTA button background color (default: #111)
            </div>
            <div>
              <span className="text-white font-medium">buttonTextColor</span> - CTA button text color (default: white)
            </div>
            <div>
              <span className="text-white font-medium">ease</span> - GSAP easing function (default: power3.out)
            </div>
            <div>
              <span className="text-white font-medium">menuColor</span> - Hamburger menu color on mobile
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
