import { useParams, useLocation } from "wouter";
import { useProfile, useAddView } from "@/hooks/use-profile";
import { ProfileRenderer } from "@/components/ProfileRenderer";
import { BackgroundMediaManager } from "@/components/BackgroundMediaManager";
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
    <div className="fixed inset-0 bg-black relative overflow-hidden">
      <BackgroundMediaManager media={media} setMedia={setMedia} playAudio={true} />
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <LabProfilePreview
          username={profile.displayName || profile.username}
          tagline={profile.bio || ""}
          views={profile.views}
          avatarUrl={profile.avatarUrl || ""}
          backgroundUrl={profile.backgroundUrl || ""}
          audioUrl={profile.audioUrl || ""}
          geometry={profile.geometry || { radius: 40, blur: 20, opacity: 3 }}
          entranceAnimation={profile.entranceAnimation || "none"}
          decorations={(profile as any).decorations || []}
        />
      </div>
    </div>
  );
}
