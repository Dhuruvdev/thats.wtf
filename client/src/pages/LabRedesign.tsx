import { useState } from "react";
import { Menu, RotateCcw, RotateCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LabProfilePreview } from "@/components/LabProfilePreview";
import { LabCustomizationPanel } from "@/components/LabCustomizationPanel";

export default function LabRedesign() {
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Glow particles background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      {/* Top Navigation */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-3" data-testid="logo-lab">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
              ⚗️
            </div>
            <h1 className="text-xl font-bold text-white">Lab</h1>
          </div>

          {/* Middle: Menu */}
          <button className="text-white/60 hover:text-white transition-colors" data-testid="button-menu">
            <Menu className="w-6 h-6" />
          </button>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/60 hover:text-white"
              data-testid="button-undo"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/60 hover:text-white"
              data-testid="button-redo"
            >
              <RotateCw className="w-5 h-5" />
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              data-testid="button-save-changes"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel: Profile Preview */}
        <div className="flex-1 border-r border-white/10 bg-white/[0.02] overflow-y-auto">
          <div className="p-4">
            <h3 className="text-white/60 text-sm font-semibold px-4 py-2">Profile Preview</h3>
            <LabProfilePreview isMobilePreview={isMobilePreview} />
          </div>
        </div>

        {/* Right Panel: Customization */}
        <div className="flex-1 overflow-y-auto">
          <LabCustomizationPanel />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="bg-white/5 border-white/20 text-white/60 hover:text-white hover:bg-white/10 gap-2"
              data-testid="button-reset-footer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border-white/20 text-white/60 hover:text-white hover:bg-white/10 gap-2"
              data-testid="button-export"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          {/* Preview Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobilePreview(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                !isMobilePreview
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-white/40 hover:text-white/60"
              }`}
              data-testid="button-desktop-view"
            >
              💻
            </button>
            <button
              onClick={() => setIsMobilePreview(true)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isMobilePreview
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-white/40 hover:text-white/60"
              }`}
              data-testid="button-mobile-view"
            >
              📱
            </button>
            <div className="w-px h-6 bg-white/10 mx-2" />
            <div className="text-white/40 text-sm">Preview</div>
          </div>
        </div>
      </footer>

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
      `}</style>
    </div>
  );
}
