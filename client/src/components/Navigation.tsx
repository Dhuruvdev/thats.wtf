import { CardNav, type CardNavItem } from "@/components/CardNav";
import { useUser } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Sparkles } from "lucide-react";

export function Navigation() {
  const { data: user } = useUser();
  const [location] = useLocation();

  const navItems: CardNavItem[] = user 
    ? [
        {
          label: "Profile",
          href: `/u/${user.username}`,
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
        }
      ]
    : [
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
        }
      ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4">
      <CardNav
        logoIcon={<Sparkles className="w-6 h-6 text-purple-500" data-testid="nav-brand-icon" />}
        items={navItems}
        baseColor="rgba(0, 0, 0, 1)"
        menuColor="#ffffff"
        buttonBgColor="#7c3aed"
        buttonTextColor="#ffffff"
        ease="power3.out"
        className="mx-3 sm:mx-4 lg:mx-6 rounded-xl sm:rounded-2xl bg-black backdrop-blur-xl border border-white/5 shadow-2xl"
      />
    </div>
  );
}
