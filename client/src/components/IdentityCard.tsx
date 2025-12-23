import { useRef, useEffect, useState } from "react";
import { User } from "@shared/schema";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";

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
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const profileUrl = `${import.meta.env.VITE_DOMAIN || "https://lab.dev"}/u/${user.username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (compact) {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        <Card className="bg-gradient-to-br from-purple-500/10 via-black/40 to-black/60 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 backdrop-blur-xl">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white tracking-tight">
                {user.displayName || user.username}
              </h3>
              <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
                @{user.username}
              </p>
            </div>

            {user.bio && (
              <p className="text-sm text-zinc-300 leading-relaxed">
                {user.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-full text-xs">
                Level {user.level}
              </Badge>
              <Badge variant="outline" className="rounded-full text-xs">
                {user.xp} XP
              </Badge>
              <Badge variant="outline" className="rounded-full text-xs">
                {user.views} Views
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full space-y-6"
    >
      <Card className="bg-gradient-to-br from-purple-500/20 via-black/50 to-black/70 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 backdrop-blur-xl overflow-hidden relative group">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <CardContent className="p-8 space-y-8 relative z-10">
          {/* Profile Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <h2 className="text-3xl font-black text-white tracking-tighter">
                  {user.displayName || user.username}
                </h2>
                <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest">
                  @{user.username}
                </p>
              </div>
              {user.isPro && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-black animate-pulse">
                  PRO
                </Badge>
              )}
            </div>

            {user.bio && (
              <p className="text-base text-zinc-300 leading-relaxed max-w-2xl">
                {user.bio}
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Level", value: user.level },
              { label: "Experience", value: `${user.xp} XP` },
              { label: "Profile Views", value: user.views },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-purple-500/20 transition-colors text-center"
              >
                <div className="text-2xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Profile URL */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-purple-500/30 cursor-pointer transition-all group/url"
            onClick={copyToClipboard}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                  Public Profile
                </p>
                <p className="text-sm text-white font-bold truncate mt-1">
                  {profileUrl}
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-zinc-400 group-hover/url:text-white transition-colors" />
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Theme & Design Info */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2"
            >
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                Accent Color
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg shadow-lg border border-white/20"
                  style={{
                    backgroundColor: user.accentColor || "#7c3aed",
                  }}
                />
                <p className="text-sm font-mono text-white">
                  {user.accentColor || "#7c3aed"}
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2"
            >
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                Frame Style
              </p>
              <p className="text-sm font-bold text-white capitalize">
                {user.frame || "none"}
              </p>
            </motion.div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-sm font-bold text-green-400">
              Profile Active
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
