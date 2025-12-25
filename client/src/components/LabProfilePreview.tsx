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
  username = "kinjal.fr",
  tagline = "just exploring the world",
  views = 45,
  avatarInitial = "K",
  isMobilePreview = false,
  primaryColor = "from-purple-500 to-pink-500",
  accentColor = "from-cyan-400 to-blue-500",
  backgroundColor = "from-slate-950 via-slate-900 to-slate-950",
}: LabProfilePreviewProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-sm">
        {/* Glow background */}
        <div className={`absolute -inset-4 bg-gradient-to-r ${primaryColor} rounded-3xl blur-2xl opacity-30`} />
        
        {/* Card */}
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Avatar Container */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              {/* Neon glow rings */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${primaryColor} opacity-60 blur-lg`} />
              <div className={`absolute inset-1 rounded-full bg-gradient-to-r ${primaryColor} opacity-40 blur-md`} />

              {/* Avatar */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-slate-600 to-slate-900 flex items-center justify-center border-2 border-white/30 text-white font-bold text-5xl`}>
                {avatarInitial}
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">{username}</h2>
          </div>

          {/* Tagline */}
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm font-medium">{tagline}</p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Social Icons */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <a href="#" className="group relative" data-testid="link-spotify">
              <div className="absolute -inset-2 bg-green-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <SiSpotify className="w-6 h-6 text-green-400 relative z-10 group-hover:scale-110 transition-transform" />
            </a>

            <a href="#" className="group relative" data-testid="link-instagram">
              <div className="absolute -inset-2 bg-pink-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <SiInstagram className="w-6 h-6 text-pink-400 relative z-10 group-hover:scale-110 transition-transform" />
            </a>

            <a href="#" className="group relative" data-testid="link-snapchat">
              <div className="absolute -inset-2 bg-yellow-300/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <SiSnapchat className="w-6 h-6 text-yellow-300 relative z-10 group-hover:scale-110 transition-transform" />
            </a>

            <a href="#" className="group relative" data-testid="link-threads">
              <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <SiThreads className="w-6 h-6 text-white relative z-10 group-hover:scale-110 transition-transform" />
            </a>

            <a href="#" className="group relative" data-testid="link-roblox">
              <div className="absolute -inset-2 bg-red-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <SiRoblox className="w-6 h-6 text-red-400 relative z-10 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          {/* Views Counter */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <Eye className="w-5 h-5 text-gray-400" data-testid="icon-eye" />
            <span className="text-gray-400 text-sm font-medium" data-testid="text-views">{views} views</span>
          </div>

          {/* View Profile Button */}
          <Button 
            className={`w-full bg-gradient-to-r ${primaryColor} hover:opacity-90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all`}
            data-testid="button-view-profile"
          >
            View Profile →
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="mt-6 flex justify-center">
          <button className="px-4 py-2 rounded-lg border border-white/20 text-white/60 text-sm hover:border-white/40 hover:text-white/80 transition-all" data-testid="button-mobile-toggle">
            {isMobilePreview ? "📱 Mobile" : "💻 Desktop"}
          </button>
        </div>
      </div>
    </div>
  );
}
