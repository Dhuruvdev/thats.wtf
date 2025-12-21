import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export interface CardNavItem {
  label: string;
  href: string;
  bgColor: string;
  textColor?: string;
}

interface CardNavProps {
  logo?: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

export function CardNav({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#ffffff",
  menuColor,
  buttonBgColor = "#111",
  buttonTextColor = "white"
}: CardNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".card-nav-item");
      
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 20,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: ease,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -4,
            boxShadow: `0 20px 40px rgba(124, 58, 237, 0.3)`,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, navRef);

    return () => ctx.revert();
  }, [ease]);

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-40 border-b border-white/5 backdrop-blur-xl transition-all ${className}`}
      style={{ backgroundColor: baseColor }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          {logo && (
            <img
              src={logo}
              alt={logoAlt}
              className="h-8 w-auto"
            />
          )}

          {/* Desktop Navigation - Card Style */}
          <div className="hidden md:flex items-center gap-6 flex-1 mx-8">
            {items.map((item, index) => (
              <Link key={index} href={item.href}>
                <div
                  className={`card-nav-item px-6 py-2.5 rounded-xl cursor-pointer transition-all duration-300 font-medium text-sm ${
                    location === item.href
                      ? "ring-2 ring-offset-2"
                      : ""
                  }`}
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.textColor || "#000000",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }}
                  data-testid={`card-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Button
              size="sm"
              className="font-black rounded-full uppercase tracking-wider text-xs px-6"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor
              }}
              data-testid="button-card-nav-cta"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            data-testid="button-card-nav-menu-toggle"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" style={{ color: menuColor }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: menuColor }} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {items.map((item, index) => (
              <Link key={index} href={item.href}>
                <div
                  className={`card-nav-item px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 font-medium text-sm ${
                    location === item.href
                      ? "ring-2 ring-offset-2"
                      : ""
                  }`}
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.textColor || "#000000"
                  }}
                  data-testid={`card-nav-mobile-${item.label.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </div>
              </Link>
            ))}
            <Button
              size="sm"
              className="w-full font-black rounded-lg uppercase tracking-wider text-xs mt-2"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor
              }}
              data-testid="button-card-nav-cta-mobile"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
