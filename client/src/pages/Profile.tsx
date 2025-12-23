import { useParams, useLocation } from "wouter";
import { useProfile, useAddView } from "@/hooks/use-profile";
import { Navigation } from "@/components/Navigation";
import { ProfileRenderer } from "@/components/ProfileRenderer";
import { BackgroundMediaManager } from "@/components/BackgroundMediaManager";
import { ProfileOverlays } from "@/components/ProfileOverlays";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading, error } = useProfile(username!);
  const { mutate: addView } = useAddView();
  
  // Media state for background and audio
  const [media, setMedia] = useState({
    videoUrl: "",
    videoVolume: 0.5,
    videoPlaying: true,
    audioUrl: "",
    audioVolume: 0.3,
    audioDuration: 0,
  });

  // Overlay state
  const [activeOverlay, setActiveOverlay] = useState<"none" | "snowfall" | "particles" | "sparkles" | "aurora" | "rain" | "floating-orbs" | "light-streaks">("none");

  useEffect(() => {
    if (username) {
      addView(username);
    }
  }, [username, addView]);

  // Update media when profile loads with audio
  useEffect(() => {
    if (profile?.audioUrl) {
      setMedia((prev) => ({
        ...prev,
        audioUrl: profile.audioUrl,
        audioPlaying: true,
      }));
    }
  }, [profile?.audioUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="text-6xl font-black text-white">404</div>
        <div className="text-zinc-400 text-lg">User not found in this dimension.</div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <BackgroundMediaManager media={media} setMedia={setMedia} playAudio={true} />
      <ProfileOverlays activeOverlay={activeOverlay} onOverlayChange={setActiveOverlay} />
      <Navigation />
      
      {/* Accent gradient glow effect */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div 
          className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] rounded-full blur-[150px] opacity-30" 
          style={{ background: profile.accentColor || "#7c3aed" }}
        />
        <div 
          className="absolute bottom-[-30%] right-[-20%] w-[60%] h-[60%] rounded-full blur-[150px] opacity-20" 
          style={{ background: profile.accentColor || "#7c3aed" }}
        />
      </div>

      <main className="pt-16 pb-12 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] relative z-10">
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ProfileRenderer user={profile} blocks={profile.blocks || []} />
        </div>
        
        <div className="mt-12 text-center text-xs text-white/30 font-display tracking-widest uppercase">
          Powered by Lab.dev
        </div>
      </main>
    </div>
  );
}
