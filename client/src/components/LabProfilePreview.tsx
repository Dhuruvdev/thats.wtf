import { Eye } from "lucide-react";
import { SiInstagram, SiThreads, SiRoblox, SiSpotify, SiSnapchat } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LabProfilePreviewProps {
  username?: string;
  tagline?: string;
  views?: number;
  avatarUrl?: string;
  isMobilePreview?: boolean;
}

export function LabProfilePreview({
  username = "kinjal.fr",
  tagline = "just exploring the world",
  views = 45,
  avatarUrl,
  isMobilePreview = false,
}: LabProfilePreviewProps) {
  return (
    <div className={`relative transition-all duration-700 flex items-center justify-center min-h-[500px] w-full ${isMobilePreview ? "scale-90" : ""}`}>
      {/* Background with Bokeh Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-300 to-blue-200 opacity-80 backdrop-blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,192,203,0.4)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(173,216,230,0.4)_0%,transparent_50%)] animate-pulse" />

      {/* Main Frosted Glass Card */}
      <div className="relative w-full max-w-sm bg-white/20 backdrop-blur-md border border-white/30 rounded-[32px] p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] flex flex-col items-center">
        
        {/* Avatar with Neon Glow Ring */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400 to-blue-400 blur-md opacity-50 animate-pulse" />
          <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-pink-300 to-blue-300 shadow-[0_0_15px_rgba(255,182,193,0.5)]">
            <Avatar className="w-24 h-24 border-2 border-white/50">
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback className="bg-slate-200 text-slate-500 font-bold text-2xl">K</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Identity Info */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            {username}
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            {tagline}
          </p>
        </div>

        {/* Social Icons Array */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <a href="#" className="group relative transition-transform hover:scale-110" data-testid="link-spotify">
             <SiSpotify className="w-6 h-6 text-[#1DB954] drop-shadow-[0_0_8px_rgba(29,185,84,0.3)]" />
          </a>
          <a href="#" className="group relative transition-transform hover:scale-110" data-testid="link-instagram">
             <SiInstagram className="w-6 h-6 text-[#E4405F] drop-shadow-[0_0_8px_rgba(228,64,95,0.3)]" />
          </a>
          <a href="#" className="group relative transition-transform hover:scale-110" data-testid="link-snapchat">
             <SiSnapchat className="w-6 h-6 text-[#FFFC00] drop-shadow-[0_0_8px_rgba(255,252,0,0.3)]" />
          </a>
          <a href="#" className="group relative transition-transform hover:scale-110" data-testid="link-threads">
             <SiThreads className="w-6 h-6 text-slate-800 drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]" />
          </a>
          <a href="#" className="group relative transition-transform hover:scale-110" data-testid="link-roblox">
             <SiRoblox className="w-6 h-6 text-slate-800 drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]" />
          </a>
        </div>

        {/* Views Counter */}
        <div className="flex items-center gap-2 text-slate-400">
          <Eye className="w-4 h-4" />
          <span className="text-xs font-semibold tracking-wide">{views} views</span>
        </div>
      </div>
    </div>
  );
}
