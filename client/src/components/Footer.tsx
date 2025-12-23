import { Link } from "wouter";
import { Github, Linkedin, Twitter, Instagram, Youtube, MessageCircle } from "lucide-react";
import logoImg from "/logo.png";
import iconImg from "/icon.png";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <img 
              src={iconImg}
              alt="thats.wtf Icon"
              className="w-24 h-24 rounded-lg object-contain"
              data-testid="footer-logo-icon"
            />
            <img 
              src={logoImg}
              alt="thats.wtf Logo"
              className="h-24 w-24 object-contain"
              data-testid="footer-logo-image"
            />
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {/* Product */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/pricing" className="text-white hover:text-primary transition-colors" data-testid="link-footer-pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/lab" className="text-white hover:text-primary transition-colors" data-testid="link-footer-lab">
                  Customization Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white hover:text-primary transition-colors" data-testid="link-footer-about">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white hover:text-primary transition-colors" data-testid="link-footer-blog">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-white hover:text-primary transition-colors" data-testid="link-footer-privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white hover:text-primary transition-colors" data-testid="link-footer-terms">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-4">
              Social
            </h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8">
          <p className="text-xs text-muted-foreground">
            © 2025 <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
