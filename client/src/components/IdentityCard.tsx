import { useRef, useEffect, useState } from "react";
import { User } from "@shared/schema";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface IdentityCardProps {
  user: User;
  compact?: boolean;
}

export function IdentityCard({ user, compact = false }: IdentityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.8)" }
      );
    }
  }, []);

  const profileUrl = `${window.location.origin}/u/${user.username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accentColor = user.accentColor || "#7c3aed";

  return (
    <motion.div
      ref={cardRef}
      className="w-full relative group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Premium Glow Aura */}
      <div 
        className="absolute -inset-1 rounded-[32px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ background: `linear-gradient(45deg, ${accentColor}, transparent, ${accentColor})` }}
      />

      <Card className="relative overflow-hidden bg-[#0a0a0c]/80 border-white/5 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-2xl">
        {/* Discord-style Banner */}
        <div 
          className="h-32 w-full relative overflow-hidden"
          style={{ backgroundColor: accentColor }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <CardContent className="p-0">
          {/* Avatar Section */}
          <div className="relative px-8 -mt-12 mb-4 flex justify-between items-end">
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-50"
                style={{ backgroundColor: accentColor }}
              />
              <Avatar className="w-24 h-24 border-8 border-[#0a0a0c] rounded-full shadow-2xl relative z-10">
                <AvatarImage src={user.avatarUrl || ""} className="object-cover" />
                <AvatarFallback className="bg-zinc-800 text-2xl font-black text-white">
                  {user.displayName?.[0] || user.username[0]}
                </AvatarFallback>
              </Avatar>
              {/* Online Status */}
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-[#0a0a0c] rounded-full z-20" />
            </div>

            <div className="flex gap-2 mb-2">
              <Badge 
                variant="outline" 
                className="bg-black/40 border-white/10 text-white rounded-lg px-3 py-1 font-black text-[10px] uppercase tracking-widest backdrop-blur-md"
              >
                <Zap className="w-3 h-3 mr-1 text-yellow-400" fill="currentColor" />
                LVL {user.level}
              </Badge>
              {user.isPro && (
                <Badge 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg px-3 py-1 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-purple-500/20"
                >
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  PRO
                </Badge>
              )}
            </div>
          </div>

          <div className="px-8 pb-8 space-y-6">
            {/* Identity Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white tracking-tighter">
                  {user.displayName || user.username}
                </h2>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-zinc-500 font-bold text-sm tracking-tight">
                @{user.username}
              </p>
            </div>

            {/* Custom Divider */}
            <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

            {/* Bio Section */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">About Me</h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                {user.bio || "No bio set yet. Discovering the multiverse..."}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">XP Points</p>
                <p className="text-lg font-black text-white">{user.xp.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total Views</p>
                <p className="text-lg font-black text-white">{user.views.toLocaleString()}</p>
              </div>
            </div>

            {/* Copy Link CTA */}
            <button 
              onClick={copyToClipboard}
              className="w-full group/btn relative flex items-center justify-between p-4 rounded-2xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/btn:bg-white/10 transition-colors">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                </div>
                <span className="text-xs font-bold text-zinc-400 group-hover/btn:text-white transition-colors">
                  {copied ? "Copied!" : "lab.dev/u/" + user.username}
                </span>
              </div>
              <div className="px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-[9px] font-black text-purple-400 uppercase tracking-tighter">
                Copy Link
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

