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
  const [primaryColor, setPrimaryColor] = useState("from-purple-500 to-pink-500");
  const [accentColor, setAccentColor] = useState("from-cyan-400 to-blue-500");
  const [backgroundColor, setBackgroundColor] = useState("from-slate-950 via-slate-900 to-slate-950");

  const [profileData, setProfileData] = useState({
    displayName: "kinjal.fr",
    bio: "just exploring the world",
    views: 45,
    accentColor: "#7c3aed",
  });

  const { data: profileDataFromQuery } = useProfile(user?.username || "demo");

  const themeConfig = profileDataFromQuery?.themeConfig || {
    background: { type: "static", value: "from-slate-950 via-slate-900 to-slate-950", overlayOpacity: 0.5, blur: 0 },
    typography: { 
      accentColor: "#7c3aed",
      displayNameGlowColor: "#7c3aed"
    }
  };

  const profile = profileDataFromQuery || { ...profileData, themeConfig };
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  useEffect(() => {
    if (profileDataFromQuery) {
      setProfileData({
        displayName: profileDataFromQuery.displayName || "kinjal.fr",
        bio: profileDataFromQuery.bio || "just exploring the world",
        views: profileDataFromQuery.views || 45,
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

  if (isUserLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 overflow-hidden flex flex-col relative">
      <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setLocation("/")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">Lab</span>
          </div>
          <div className="h-6 w-px bg-slate-200 mx-2" />
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 transition-colors">
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            onClick={handleSaveChanges}
            disabled={isUpdating}
            className="bg-gradient-to-r from-pink-400 to-blue-400 hover:opacity-90 text-white font-semibold px-6 rounded-xl shadow-md transition-all active:scale-95 border-none"
          >
            {!user ? "Login to Save" : isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <section className={`flex-1 flex flex-col p-8 overflow-y-auto bg-slate-50 ${activePanel === "customize" ? "hidden lg:flex" : "flex"}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Profile Preview</h2>
            <div className="flex bg-slate-200/50 p-1 rounded-lg border border-slate-200">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMobilePreview(false)}
                className={`h-8 px-3 rounded-md text-xs transition-all ${!isMobilePreview ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
              >
                Desktop
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMobilePreview(true)}
                className={`h-8 px-3 rounded-md text-xs transition-all ${isMobilePreview ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
              >
                Mobile
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div className={`transition-all duration-500 ease-out flex items-center justify-center ${isMobilePreview ? "w-[360px] h-[640px]" : "w-full max-w-4xl h-full"}`}>
              <LabProfilePreview 
                isMobilePreview={isMobilePreview}
                username={profileData.displayName || user?.username || "kinjal.fr"}
                tagline={profileData.bio || "just exploring the world"}
                views={profileData.views}
              />
            </div>
          </div>
        </section>

        <section className={`w-full lg:w-[480px] border-l border-slate-200 bg-white flex flex-col ${activePanel === "preview" ? "hidden lg:flex" : "flex"}`}>
          <LabCustomizationPanel 
            profileData={profileData}
            onProfileChange={handleProfileChange}
            onColorChange={handleColorChange}
            isUpdating={isUpdating}
          />
        </section>
      </main>

      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex bg-white/90 backdrop-blur-xl p-1.5 rounded-2xl border border-slate-200 shadow-xl z-50">
        <Button
          variant="ghost"
          onClick={() => setActivePanel("preview")}
          className={`h-11 px-6 rounded-xl transition-all ${activePanel === "preview" ? "bg-slate-100 text-slate-900" : "text-slate-500"}`}
        >
          Preview
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActivePanel("customize")}
          className={`h-11 px-6 rounded-xl transition-all ${activePanel === "customize" ? "bg-slate-100 text-slate-900" : "text-slate-500"}`}
        >
          Custom
        </Button>
      </div>
    </div>
  );
}
