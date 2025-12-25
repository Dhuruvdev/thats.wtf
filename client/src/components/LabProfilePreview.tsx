import { Eye } from "lucide-react";
import { SiInstagram, SiThreads, SiRoblox, SiSpotify, SiSnapchat } from "react-icons/si";
import { Button } from "@/components/ui/button";

interface LabProfilePreviewProps {
  username?: string;
  tagline?: string;
  views?: number;
  avatarInitial?: string;
  isMobilePreview?: boolean;
  primaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
}

export function LabProfilePreview({
  username = "NeonExplorer",
  tagline = "Lost in the neon code of the future",
  views = 1240,
  avatarInitial = "N",
  isMobilePreview = false,
  primaryColor = "from-purple-600 to-pink-500",
  accentColor = "from-cyan-400 to-blue-500",
  backgroundColor = "from-slate-950 via-slate-900 to-slate-950",
}: LabProfilePreviewProps) {
  return (
    <div className={`relative transition-all duration-700 ${isMobilePreview ? "w-full h-full rounded-[40px]" : "w-full max-w-lg mx-auto"}`}>
      {/* Dynamic Glow Orbs */}
      <div className={`absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r ${primaryColor} rounded-full blur-[100px] opacity-20 animate-pulse`} />
      <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r ${accentColor} rounded-full blur-[100px] opacity-10 animate-pulse`} style={{ animationDelay: '1s' }} />

      {/* Main Glass Card */}
      <div className={`relative h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 ${isMobilePreview ? "rounded-[32px]" : "rounded-[40px] shadow-[0_32px_128px_-12px_rgba(0,0,0,0.8)]"} p-8 overflow-hidden group`}>
        {/* Animated Border Glow */}
        <div className={`absolute inset-0 bg-gradient-to-r ${primaryColor} opacity-[0.05] group-hover:opacity-[0.1] transition-opacity`} />
        
        {/* Profile Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar with Glow Ring */}
          <div className="relative mb-10 group/avatar">
            <div className={`absolute -inset-4 bg-gradient-to-tr ${primaryColor} rounded-full blur-2xl opacity-40 group-hover/avatar:opacity-60 transition-opacity animate-pulse`} />
            <div className={`absolute -inset-1 bg-gradient-to-tr ${primaryColor} rounded-full p-[2px]`}>
              <div className="absolute inset-0 bg-black rounded-full" />
            </div>
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center border border-white/20 shadow-2xl overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
               <span className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl">{avatarInitial}</span>
            </div>
          </div>

          {/* Identity Info */}
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-4xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {username}
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <p className="text-white/60 font-medium max-w-[280px] leading-relaxed italic">
              "{tagline}"
            </p>
          </div>

          {/* Social Array */}
          <div className="grid grid-cols-5 gap-4 mb-12 w-full max-w-[320px]">
            {[
              { id: 'spot', icon: SiSpotify, color: 'text-[#1DB954]', glow: 'bg-[#1DB954]/20' },
              { id: 'insta', icon: SiInstagram, color: 'text-[#E4405F]', glow: 'bg-[#E4405F]/20' },
              { id: 'snap', icon: SiSnapchat, color: 'text-[#FFFC00]', glow: 'bg-[#FFFC00]/20' },
              { id: 'threads', icon: SiThreads, color: 'text-white', glow: 'bg-white/20' },
              { id: 'roblox', icon: SiRoblox, color: 'text-[#FF0000]', glow: 'bg-[#FF0000]/20' },
            ].map((social) => (
              <div key={social.id} className="relative group/icon cursor-pointer">
                <div className={`absolute inset-0 ${social.glow} rounded-2xl blur-xl opacity-0 group-hover/icon:opacity-100 transition-all duration-300 scale-50 group-hover/icon:scale-110`} />
                <div className="relative h-12 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md flex items-center justify-center group-hover/icon:bg-white/10 group-hover/icon:-translate-y-1 transition-all duration-300">
                  <social.icon className={`w-5 h-5 ${social.color} drop-shadow-[0_0_8px_currentColor]`} />
                </div>
              </div>
            ))}
          </div>

          {/* Performance Section */}
          <div className="w-full space-y-8">
            <div className="flex items-center justify-center gap-4 text-white/40">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/5" />
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5">
                <Eye className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{views.toLocaleString()} Views</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/5" />
            </div>

            <Button className={`w-full h-14 bg-gradient-to-r ${primaryColor} hover:opacity-90 text-white font-bold text-sm uppercase tracking-[0.2em] rounded-2xl shadow-[0_10px_40px_-10px_rgba(168,85,247,0.4)] border-t border-white/20 group-hover:scale-[1.02] transition-all`}>
              View Profile →
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-6 text-[8px] font-mono text-white/20 uppercase tracking-widest">Lab-Ref-2025</div>
        <div className="absolute bottom-4 left-6 flex gap-1">
           {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white/20" />)}
        </div>
      </div>
    </div>
  );
}
