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
              alt="Lab.dev Icon"
              className="w-24 h-24 rounded-lg object-contain"
              data-testid="footer-logo-icon"
            />
            <img 
              src={logoImg}
              alt="Lab.dev Logo"
              className="h-24 w-24 object-contain"
              data-testid="footer-logo-image"
            />
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Product */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/lab" className="text-white hover:text-primary transition-colors">
                  Customization Lab
                </Link>
              </li>
              <li>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  Progression System
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  Downloads
                </a>
              </li>
            </ul>
          </div>

          {/* For */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-4">
              For
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  Creators
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  Developers
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  Teams
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  Changelog
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  FAQs
                </a>
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
            © 2025 That's.WTF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
