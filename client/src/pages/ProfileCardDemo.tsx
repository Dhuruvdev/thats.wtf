import { Eye, Music, LogIn } from "lucide-react";
import { SiInstagram, SiThreads, SiRoblox, SiSpotify, SiSnapchat } from "react-icons/si";

export default function ProfileCardDemo() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative">
      {/* Bokeh Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 opacity-40" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Profile Card */}
      <div className="relative w-96 h-auto">
        <div className="frosted-card-container">
          {/* Glow effect behind card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 rounded-4xl blur-2xl opacity-50" />

          {/* Main Card */}
          <div className="relative bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* Avatar Container */}
            <div className="flex justify-center mb-8">
              <div className="relative w-28 h-28">
                {/* Neon glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 opacity-60 blur-lg" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-pink-300 to-blue-300 opacity-40 blur-md" />

                {/* Avatar */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden border-2 border-white/30">
                  <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-900 flex items-center justify-center text-white font-bold text-3xl">
                    K
                  </div>
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="text-center mb-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">kinjal.fr</h1>
            </div>

            {/* Tagline */}
            <div className="text-center mb-8">
              <p className="text-gray-300 text-sm font-medium">just exploring the world</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

            {/* Social Icons */}
            <div className="flex justify-center items-center gap-6 mb-8">
              {/* Spotify */}
              <a
                href="#"
                className="group relative"
                data-testid="link-spotify"
              >
                <div className="absolute -inset-2 bg-green-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <SiSpotify className="w-8 h-8 text-green-400 relative z-10 group-hover:scale-110 transition-transform" />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="group relative"
                data-testid="link-instagram"
              >
                <div className="absolute -inset-2 bg-pink-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <SiInstagram className="w-8 h-8 text-pink-400 relative z-10 group-hover:scale-110 transition-transform" />
              </a>

              {/* Snapchat */}
              <a
                href="#"
                className="group relative"
                data-testid="link-snapchat"
              >
                <div className="absolute -inset-2 bg-yellow-300/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <SiSnapchat className="w-8 h-8 text-yellow-300 relative z-10 group-hover:scale-110 transition-transform" />
              </a>

              {/* Threads */}
              <a
                href="#"
                className="group relative"
                data-testid="link-threads"
              >
                <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <SiThreads className="w-8 h-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
              </a>

              {/* Roblox */}
              <a
                href="#"
                className="group relative"
                data-testid="link-roblox"
              >
                <div className="absolute -inset-2 bg-red-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <SiRoblox className="w-8 h-8 text-red-400 relative z-10 group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

            {/* Views Counter */}
            <div className="flex justify-center items-center gap-2">
              <Eye className="w-5 h-5 text-gray-300" data-testid="icon-eye" />
              <span className="text-gray-300 text-sm font-medium" data-testid="text-views">45 views</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes blob-delay-2000 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 50px) scale(0.9); }
          66% { transform: translate(20px, -20px) scale(1.1); }
        }

        @keyframes blob-delay-4000 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, 30px) scale(1.05); }
          66% { transform: translate(-30px, -30px) scale(0.95); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .frosted-card-container {
          position: relative;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
