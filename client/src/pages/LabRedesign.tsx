import { useState, useEffect } from "react";
import { Menu, RotateCcw, RotateCw, Save, X, Beaker, Undo2, Redo2 } from "lucide-react";
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

  /* Removing redirect for "without login" access
  useEffect(() => {
    if (!isUserLoading && !user) {
      setLocation("/login");
    }
  }, [isUserLoading, user, setLocation]);
  */
  
  /* Returning the component regardless of user status */

  const { data: profile, isLoading: isProfileLoading } = useProfile(user?.username || "demo");
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<"preview" | "customize">("customize");
  
  const themeConfig = profile?.themeConfig || {
    background: { type: "static", value: "from-slate-950 via-slate-900 to-slate-950", overlayOpacity: 0.5, blur: 0 },
    typography: { 
      accentColor: "#7c3aed",
      displayNameGlowColor: "#7c3aed"
    }
  };

  const [primaryColor, setPrimaryColor] = useState("from-purple-500 to-pink-500");
  const [accentColor, setAccentColor] = useState("from-cyan-400 to-blue-500");
  const [backgroundColor, setBackgroundColor] = useState("from-slate-950 via-slate-900 to-slate-950");
  
  const [profileData, setProfileData] = useState({
    displayName: profile?.displayName || "",
    bio: profile?.bio || "",
    views: profile?.views || 0,
    accentColor: profile?.accentColor || "#7c3aed",
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        displayName: profile.displayName || "",
        bio: profile.bio || "",
        views: profile.views || 0,
        accentColor: profile.accentColor || "#7c3aed",
      });
    }
  }, [profile]);

  const handleProfileChange = (data: any) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const handleColorChange = (type: string, value: string) => {
    if (type === "primary") setPrimaryColor(value);
    if (type === "accent") setAccentColor(value);
    if (type === "background") setBackgroundColor(value);
  };

  const handleSaveChanges = () => {
    updateProfile({
      displayName: profileData.displayName,
      bio: profileData.bio,
      accentColor: profileData.accentColor,
    });
  };

  if (isUserLoading || isProfileLoading || !profile) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] text-white overflow-hidden flex flex-col relative">
      {/* Neon Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Top Navigation */}
      <header className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setLocation("/")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform">
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Lab</span>
          </div>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <Button variant="ghost" size="icon" className="text-white/40 hover:text-white transition-colors">
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/5">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white">
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white">
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            onClick={handleSaveChanges}
            disabled={isUpdating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] border-t border-white/20 transition-all active:scale-95"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left: Profile Preview */}
        <section className={`flex-1 flex flex-col p-8 overflow-y-auto bg-gradient-to-b from-white/[0.02] to-transparent ${activePanel === "customize" ? "hidden lg:flex" : "flex"}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">Profile Preview</h2>
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/5">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMobilePreview(false)}
                className={`h-8 px-3 rounded-md text-xs transition-all ${!isMobilePreview ? "bg-white/10 text-white shadow-sm" : "text-white/40"}`}
              >
                Desktop
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMobilePreview(true)}
                className={`h-8 px-3 rounded-md text-xs transition-all ${isMobilePreview ? "bg-white/10 text-white shadow-sm" : "text-white/40"}`}
              >
                Mobile
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div className={`transition-all duration-500 ease-out ${isMobilePreview ? "w-[320px] aspect-[9/19]" : "w-full max-w-2xl aspect-video"}`}>
              <LabProfilePreview 
                isMobilePreview={isMobilePreview}
                username={profileData.displayName || user?.username || "User"}
                tagline={profileData.bio || "Just exploring the Lab"}
                views={profileData.views}
                primaryColor={primaryColor}
                accentColor={accentColor}
                backgroundColor={backgroundColor}
              />
            </div>
          </div>
        </section>

        {/* Right: Customization Panel */}
        <section className={`w-full lg:w-[480px] border-l border-white/5 bg-[#0f0f12]/80 backdrop-blur-2xl flex flex-col ${activePanel === "preview" ? "hidden lg:flex" : "flex"}`}>
          <LabCustomizationPanel 
            profileData={profileData}
            onProfileChange={handleProfileChange}
            onColorChange={handleColorChange}
            isUpdating={isUpdating}
          />
        </section>
      </main>

      {/* Mobile Toggle */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex bg-black/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl z-50">
        <Button
          variant="ghost"
          onClick={() => setActivePanel("preview")}
          className={`h-11 px-6 rounded-xl transition-all ${activePanel === "preview" ? "bg-white/10 text-white" : "text-white/40"}`}
        >
          Preview
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActivePanel("customize")}
          className={`h-11 px-6 rounded-xl transition-all ${activePanel === "customize" ? "bg-white/10 text-white" : "text-white/40"}`}
        >
          Custom
        </Button>
      </div>
    </div>
  );
}
