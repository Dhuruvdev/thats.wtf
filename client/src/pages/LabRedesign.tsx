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

  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [activePanel, setActivePanel] = useState<"preview" | "customize">("customize");
  
  // These states can be used for more advanced theme controls later
  const [primaryColor, setPrimaryColor] = useState("from-purple-500 to-pink-500");
  const [accentColor, setAccentColor] = useState("from-cyan-400 to-blue-500");
  const [backgroundColor, setBackgroundColor] = useState("from-slate-950 via-slate-900 to-slate-950");

  const { data: profileDataFromQuery, isLoading: isProfileLoading } = useProfile(user?.username || "demo");
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const [profileData, setProfileData] = useState({
    displayName: "Alex Rivera",
    bio: "creative director & product designer",
    views: 1240,
    accentColor: "#7c3aed",
  });

  // Sync with initial query data
  useEffect(() => {
    if (profileDataFromQuery) {
      setProfileData({
        displayName: profileDataFromQuery.displayName || "Alex Rivera",
        bio: profileDataFromQuery.bio || "creative director & product designer",
        views: profileDataFromQuery.views || 1240,
        accentColor: profileDataFromQuery.accentColor || "#7c3aed",
      });
    }
  }, [profileDataFromQuery]);

  const handleProfileChange = (data: any) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const handleColorChange = (type: string, value: string) => {
    if (type === "primary") setPrimaryColor(value);
    if (type === "accent") setAccentColor(value);
    if (type === "background") setBackgroundColor(value);
  };

  const handleSaveChanges = () => {
    if (!user) {
      setLocation("/login");
      return;
    }
    updateProfile({
      displayName: profileData.displayName,
      bio: profileData.bio,
      accentColor: profileData.accentColor,
    });
  };

  if (isUserLoading || isProfileLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] text-white overflow-hidden flex flex-col relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <header className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setLocation("/")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:scale-105 transition-transform">
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
            className="bg-white text-black hover:bg-white/90 font-bold px-6 rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {isUpdating ? "Saving..." : !user ? "Login to Save" : "Save Changes"}
          </Button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <section className={`flex-1 flex flex-col p-8 overflow-y-auto ${activePanel === "customize" ? "hidden lg:flex" : "flex"}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Live Environment</h2>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMobilePreview(false)}
                className={`h-8 px-4 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${!isMobilePreview ? "bg-white/10 text-white" : "text-white/30"}`}
              >
                Desktop
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMobilePreview(true)}
                className={`h-8 px-4 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${isMobilePreview ? "bg-white/10 text-white" : "text-white/30"}`}
              >
                Mobile
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div className={`transition-all duration-700 ease-in-out flex items-center justify-center ${isMobilePreview ? "w-[360px] h-[640px]" : "w-full max-w-4xl h-full"}`}>
              <LabProfilePreview 
                isMobilePreview={isMobilePreview}
                username={profileData.displayName}
                tagline={profileData.bio}
                views={profileData.views}
                avatarUrl={profileDataFromQuery?.avatarUrl || undefined}
              />
            </div>
          </div>
        </section>

        <section className={`w-full lg:w-[480px] border-l border-white/5 bg-[#0f0f12]/80 backdrop-blur-3xl flex flex-col ${activePanel === "preview" ? "hidden lg:flex" : "flex"}`}>
          <LabCustomizationPanel 
            profileData={profileData}
            onProfileChange={handleProfileChange}
            onColorChange={handleColorChange}
            isUpdating={isUpdating}
          />
        </section>
      </main>

      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 flex bg-black/60 backdrop-blur-2xl p-2 rounded-2xl border border-white/10 shadow-2xl z-50">
        <Button
          variant="ghost"
          onClick={() => setActivePanel("preview")}
          className={`h-11 px-8 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${activePanel === "preview" ? "bg-white/10 text-white" : "text-white/30"}`}
        >
          Preview
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActivePanel("customize")}
          className={`h-11 px-8 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${activePanel === "customize" ? "bg-white/10 text-white" : "text-white/30"}`}
        >
          Editor
        </Button>
      </div>
    </div>
  );
}
