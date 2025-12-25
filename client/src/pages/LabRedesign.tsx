import { useState, useEffect } from "react";
import { Menu, RotateCcw, RotateCw, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LabProfilePreview } from "@/components/LabProfilePreview";
import { LabCustomizationPanel } from "@/components/LabCustomizationPanel";
import { useUser } from "@/hooks/use-auth";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { useLocation } from "wouter";
import LoadingPage from "@/components/LoadingPage";

export default function LabRedesign() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [, setLocation] = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isUserLoading && !user) {
      setLocation("/login");
    }
  }, [isUserLoading, user, setLocation]);
  
  if (!isUserLoading && !user) {
    return null;
  }

  const { data: profile, isLoading: isProfileLoading } = useProfile(user?.username || "");
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<"preview" | "customize">("preview");
  
  // Theme config from database
  const themeConfig = profile?.themeConfig || {
    background: { type: "static", value: "from-slate-950 via-slate-900 to-slate-950", overlayOpacity: 0.5, blur: 0 },
    typography: { 
      accentColor: "#7c3aed",
      displayNameGlowColor: "#7c3aed"
    }
  };

  const [primaryColor, setPrimaryColor] = useState(
    themeConfig.typography?.accentColor === "#7c3aed" 
      ? "from-purple-500 to-pink-500"
      : `from-${themeConfig.typography?.accentColor}`
  );
  const [accentColor, setAccentColor] = useState("from-cyan-400 to-blue-500");
  const [backgroundColor, setBackgroundColor] = useState("from-slate-950 via-slate-900 to-slate-950");
  
  const [profileData, setProfileData] = useState({
    displayName: profile?.displayName || "",
    bio: profile?.bio || "",
    views: profile?.views || 0,
    accentColor: profile?.accentColor || "#7c3aed",
  });

  // Sync profile data when it loads
  useEffect(() => {
    if (profile) {
      setProfileData({
        displayName: profile.displayName || "",
        bio: profile.bio || "",
        views: profile.views || 0,
        accentColor: profile.accentColor || "#7c3aed",
      });
    }
  }, [profile?.displayName, profile?.bio, profile?.views, profile?.accentColor]);

  const handleProfileChange = (data: any) => {
    setProfileData(data);
    // Update profile in database
    updateProfile({
      displayName: data.displayName || profileData.displayName,
      bio: data.bio || profileData.bio,
    });
  };

  const handleColorChange = (type: string, value: string) => {
    if (type === "primary") {
      setPrimaryColor(value);
      // Update accent color in database
      updateProfile({
        accentColor: value,
      });
    }
    if (type === "accent") setAccentColor(value);
    if (type === "background") setBackgroundColor(value);
  };

  const handleUndo = () => {
    console.log("Undo");
  };

  const handleRedo = () => {
    console.log("Redo");
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", { profileData, primaryColor, accentColor, backgroundColor });
    updateProfile({
      displayName: profileData.displayName,
      bio: profileData.bio,
    });
  };

  const handleReset = () => {
    setPrimaryColor("from-purple-500 to-pink-500");
    setAccentColor("from-cyan-400 to-blue-500");
    setBackgroundColor("from-slate-950 via-slate-900 to-slate-950");
    setProfileData({
      displayName: profile?.displayName || "",
      bio: profile?.bio || "",
      views: profile?.views || 0,
      accentColor: "#7c3aed",
    });
  };

  if (isUserLoading || isProfileLoading || !profile) {
    return <LoadingPage />;
  }

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${backgroundColor} overflow-hidden flex flex-col`}>
      {/* Glow particles background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br ${primaryColor} rounded-full mix-blend-multiply filter blur-[160px] opacity-20 animate-pulse`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-bl ${accentColor} rounded-full mix-blend-multiply filter blur-[160px] opacity-15 animate-pulse`} />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Top Navigation - Responsive */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 sm:gap-3" data-testid="logo-lab">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${primaryColor} flex items-center justify-center text-white font-bold text-sm`}>
              ⚗️
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white">Lab</h1>
          </div>

          {/* Middle: Menu - Hide on mobile */}
          <button className="hidden sm:flex text-white/60 hover:text-white transition-colors" data-testid="button-menu">
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right: Actions - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-white/60 hover:text-white h-10 w-10"
              data-testid="button-undo"
              onClick={handleUndo}
              disabled={isUpdating}
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-white/60 hover:text-white h-10 w-10"
              data-testid="button-redo"
              onClick={handleRedo}
              disabled={isUpdating}
            >
              <RotateCw className="w-5 h-5" />
            </Button>
            <Button
              className={`bg-gradient-to-r ${primaryColor} hover:opacity-90 text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm sm:text-base h-10 sm:h-auto`}
              data-testid="button-save-changes"
              onClick={handleSaveChanges}
              disabled={isUpdating}
            >
              <span className="hidden sm:inline">{isUpdating ? "Saving..." : "Save Changes"}</span>
              <span className="sm:hidden">{isUpdating ? "..." : "Save"}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden text-white/60 hover:text-white h-10 w-10"
              data-testid="button-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-white/10 bg-white/5 px-4 py-3 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/60 hover:text-white gap-2"
              data-testid="mobile-menu-undo"
              onClick={() => {
                handleUndo();
                setMobileMenuOpen(false);
              }}
              disabled={isUpdating}
            >
              <RotateCcw className="w-4 h-4" />
              Undo
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white/60 hover:text-white gap-2"
              data-testid="mobile-menu-redo"
              onClick={() => {
                handleRedo();
                setMobileMenuOpen(false);
              }}
              disabled={isUpdating}
            >
              <RotateCw className="w-4 h-4" />
              Redo
            </Button>
          </div>
        )}
      </header>

      {/* Main Content - Stack vertically on mobile */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel: Profile Preview */}
        <div className={`w-full lg:flex-1 lg:border-r border-white/10 bg-white/[0.02] overflow-y-auto ${activePanel === "customize" ? "hidden lg:block" : ""}`}>
          <div className="p-4 sm:p-6 lg:p-8 min-h-full flex flex-col justify-center">
            <h3 className="text-white/60 text-xs sm:text-sm font-semibold px-2 sm:px-4 py-2 mb-4">Profile Preview</h3>
            <LabProfilePreview 
              isMobilePreview={isMobilePreview}
              username={profileData.displayName || user?.username || "Profile"}
              tagline={profileData.bio || "just exploring the world"}
              views={profileData.views}
              primaryColor={primaryColor}
              accentColor={accentColor}
              backgroundColor={backgroundColor}
            />
          </div>
        </div>

        {/* Right Panel: Customization */}
        <div className={`w-full lg:flex-1 overflow-y-auto ${activePanel === "preview" ? "hidden lg:block" : ""}`}>
          <LabCustomizationPanel 
            profileData={profileData}
            onProfileChange={handleProfileChange}
            onColorChange={handleColorChange}
            isUpdating={isUpdating}
          />
        </div>
      </div>

      {/* Mobile Panel Toggle */}
      <div className="lg:hidden border-t border-white/10 bg-white/5 backdrop-blur-md p-4 flex gap-2">
        <Button
          onClick={() => setActivePanel("preview")}
          className={`flex-1 py-2 h-11 font-medium rounded-lg transition-all ${
            activePanel === "preview"
              ? `bg-gradient-to-r ${primaryColor} text-white`
              : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
          }`}
          data-testid="button-toggle-preview"
        >
          Preview
        </Button>
        <Button
          onClick={() => setActivePanel("customize")}
          className={`flex-1 py-2 h-11 font-medium rounded-lg transition-all ${
            activePanel === "customize"
              ? `bg-gradient-to-r ${primaryColor} text-white`
              : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
          }`}
          data-testid="button-toggle-customize"
        >
          Customize
        </Button>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none bg-white/5 border-white/20 text-white/60 hover:text-white hover:bg-white/10 gap-1 sm:gap-2 px-3 sm:px-4 py-2 h-10 text-sm"
              data-testid="button-reset-footer"
              onClick={handleReset}
              disabled={isUpdating}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1 sm:flex-none bg-white/5 border-white/20 text-white/60 hover:text-white hover:bg-white/10 gap-1 sm:gap-2 px-3 sm:px-4 py-2 h-10 text-sm"
              data-testid="button-export"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>

          {/* Preview Toggle */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={() => setIsMobilePreview(false)}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all h-10 ${
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
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all h-10 ${
                isMobilePreview
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-white/40 hover:text-white/60"
              }`}
              data-testid="button-mobile-view"
            >
              📱
            </button>
            <div className="w-px h-6 bg-white/10 hidden sm:block" />
            <div className="text-white/40 text-xs sm:text-sm">Preview</div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
}
