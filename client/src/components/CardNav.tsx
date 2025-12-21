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
  logoIcon?: React.ReactNode;
  favicon?: string;
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
  logoIcon,
  favicon,
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#ffffff",
  menuColor,
  buttonBgColor = "#111",
  buttonTextColor = "white"
}: CardNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  // Desktop card animations
  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      const desktopCards = gsap.utils.toArray<HTMLElement>(".card-nav-item-desktop");
      
      desktopCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -6,
            boxShadow: `0 24px 48px rgba(124, 58, 237, 0.4)`,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, navRef);

    return () => ctx.revert();
  }, [ease]);

  // Mobile menu animations
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      const mobileCards = gsap.utils.toArray<HTMLElement>(".card-nav-item-mobile");
      const ctaBtn = mobileMenuRef.current?.querySelector(".mobile-cta-btn");

      if (isMenuOpen) {
        // Animate menu entrance
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );

        // Stagger cards entrance
        gsap.fromTo(
          mobileCards,
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out"
          }
        );

        // Animate CTA button
        if (ctaBtn) {
          gsap.fromTo(
            ctaBtn,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, delay: 0.32, ease: "power2.out" }
          );
        }
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // Hamburger icon animation
  useEffect(() => {
    if (!hamburgerRef.current) return;

    const ctx = gsap.context(() => {
      if (isMenuOpen) {
        gsap.to(hamburgerRef.current, {
          rotation: 90,
          duration: 0.4,
          ease: "back.out(1.7)"
        });
      } else {
        gsap.to(hamburgerRef.current, {
          rotation: 0,
          duration: 0.4,
          ease: "back.out(1.7)"
        });
      }
    }, hamburgerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // Blackout backdrop animation
  useEffect(() => {
    if (!backdropRef.current) return;

    const ctx = gsap.context(() => {
      if (isMenuOpen) {
        gsap.to(backdropRef.current, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(backdropRef.current, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }, backdropRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  const [, navigate] = useLocation();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <>
      {/* Blackout Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden opacity-0 pointer-events-none"
        onClick={() => setIsMenuOpen(false)}
        data-testid="cardnav-backdrop"
      />
      
      <nav
        ref={navRef}
        className={`sticky top-0 z-40 border-b border-white/5 backdrop-blur-xl transition-all ${className}`}
        style={{ backgroundColor: baseColor }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Logo / Icon - Left Side */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {favicon && (
              <img
                src={favicon}
                alt="Favicon"
                className="h-12 w-12 object-contain"
                data-testid="nav-favicon"
              />
            )}
            {logo ? (
              <img
                src={logo}
                alt={logoAlt}
                className="h-12 w-12 object-contain"
                data-testid="nav-logo-image"
              />
            ) : logoIcon ? (
              <div className="flex items-center justify-center h-12 w-12" data-testid="nav-logo-icon">
                {logoIcon}
              </div>
            ) : null}
          </div>

          {/* Desktop Navigation - Card Style */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
            {items.map((item, index) => (
              <Link key={index} href={item.href}>
                <div
                  className={`card-nav-item-desktop px-5 py-2 rounded-xl cursor-pointer transition-all duration-300 font-semibold text-sm tracking-wide ${
                    location === item.href
                      ? "ring-2 ring-white/40 ring-offset-2 ring-offset-transparent"
                      : ""
                  }`}
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.textColor || "#000000",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)"
                  }}
                  data-testid={`card-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex">
            <Button
              size="sm"
              className="font-black rounded-full uppercase tracking-wider text-xs px-6 transition-all hover:scale-105"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor
              }}
              onClick={handleGetStarted}
              data-testid="button-card-nav-cta"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button with Animation - Right Side */}
          <button
            ref={hamburgerRef}
            onClick={toggleMenu}
            className="md:hidden p-2.5 hover:bg-white/10 rounded-lg transition-colors duration-200 flex-shrink-0"
            data-testid="button-card-nav-menu-toggle"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" style={{ color: menuColor || "#ffffff" }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: menuColor || "#ffffff" }} />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Animated */}
        {isMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden pb-4 pt-2 space-y-2"
            data-testid="mobile-nav-menu"
          >
            {items.map((item, index) => (
              <Link key={index} href={item.href}>
                <div
                  className={`card-nav-item-mobile px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 font-semibold text-sm tracking-wide ${
                    location === item.href
                      ? "ring-2 ring-white/40 ring-offset-2 ring-offset-transparent"
                      : ""
                  }`}
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.textColor || "#000000",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.12)"
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
              className="w-full font-black rounded-xl uppercase tracking-wider text-xs mt-3 mobile-cta-btn transition-all hover:scale-105"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor
              }}
              data-testid="button-card-nav-cta-mobile"
              onClick={() => {
                setIsMenuOpen(false);
                handleGetStarted();
              }}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
