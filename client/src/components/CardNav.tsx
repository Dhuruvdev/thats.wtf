import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, HelpCircle, MessageCircle, DollarSign, Globe } from "lucide-react";
import { useState } from "react";
import logoImg from "/logo.png";

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
        // Animate menu entrance with a slight bounce
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, scale: 0.95, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "elastic.out(1, 0.8)" }
        );

        // Stagger cards entrance with a slide-up effect
        gsap.fromTo(
          mobileCards,
          { opacity: 0, y: 20, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.7)"
          }
        );

        // Animate CTA button
        if (ctaBtn) {
          gsap.fromTo(
            ctaBtn,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: "power2.out" }
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
    navigate("/login");
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
            className="md:hidden pb-8 pt-4 px-4 space-y-6 bg-black/90 backdrop-blur-2xl rounded-b-3xl border-t border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            data-testid="mobile-nav-menu"
          >
            {/* Navigation Items */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pl-2 mb-2">Main Menu</p>
              {items.map((item, index) => (
                <Link key={index} href={item.href}>
                  <div
                    className={`card-nav-item-mobile group flex items-center justify-between px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 font-bold text-base tracking-tight active:scale-95 ${
                      location === item.href
                        ? "ring-2 ring-white/20"
                        : "hover:brightness-110"
                    }`}
                    style={{
                      backgroundColor: item.bgColor,
                      color: item.textColor || "#000000",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)"
                    }}
                    data-testid={`card-nav-mobile-${item.label.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Additional Menu Items */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pl-2 mb-2">Explore</p>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="card-nav-item-mobile">
                  <div className="px-4 py-4 rounded-2xl cursor-pointer transition-all duration-300 font-bold text-sm tracking-tight flex flex-col gap-2 active:scale-95"
                    style={{
                      backgroundColor: "#f59e0b",
                      color: "#000000",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)"
                    }}
                    onClick={() => setIsMenuOpen(false)}
                    data-testid="menu-item-help">
                    <HelpCircle className="w-5 h-5" />
                    <span>Help Center</span>
                  </div>
                </a>
                
                <a href="#" className="card-nav-item-mobile">
                  <div className="px-4 py-4 rounded-2xl cursor-pointer transition-all duration-300 font-bold text-sm tracking-tight flex flex-col gap-2 active:scale-95"
                    style={{
                      backgroundColor: "#06b6d4",
                      color: "#ffffff",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)"
                    }}
                    onClick={() => setIsMenuOpen(false)}
                    data-testid="menu-item-discord">
                    <MessageCircle className="w-5 h-5" />
                    <span>Discord</span>
                  </div>
                </a>
              </div>
              
              <Link href="/pricing" className="card-nav-item-mobile block">
                <div className="w-full px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 font-bold text-sm tracking-tight flex items-center justify-between active:scale-95"
                  style={{
                    backgroundColor: "#ec4899",
                    color: "#ffffff",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)"
                  }}
                  onClick={() => setIsMenuOpen(false)}
                  data-testid="menu-item-pricing">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5" />
                    <span>View Pricing</span>
                  </div>
                  <div className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">Pro</div>
                </div>
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="px-4 space-y-4 pt-4 border-t border-white/10">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pl-2 mb-2">Account</p>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="w-full h-12 bg-white/5 border border-white/5 focus:border-purple-500/50 rounded-xl pl-11 text-sm text-white placeholder:text-white/20 transition-all outline-none"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="w-full h-12 bg-white/5 border border-white/5 focus:border-purple-500/50 rounded-xl pl-11 text-sm text-white placeholder:text-white/20 transition-all outline-none"
                    />
                  </div>
                  <div className="flex justify-end px-1">
                    <button className="text-[11px] font-bold text-white/40 hover:text-white transition-colors">
                      Forgot password?
                    </button>
                  </div>
                </div>

                <Button 
                  className="w-full h-12 bg-white text-black hover:bg-white/90 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>
              </div>

              <div className="pt-2">
                <Button
                  className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_10px_20px_rgba(124,58,237,0.3)] active:scale-[0.95]"
                  onClick={() => {
                    handleGetStarted();
                    setIsMenuOpen(false);
                  }}
                  data-testid="button-mobile-cta"
                >
                  Get Started Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
