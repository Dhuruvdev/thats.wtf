import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Music, Video, X, User, MousePointer2, Trash2, FolderOpen, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateProfile, useProfile } from "@/hooks/use-profile";
import { useUser } from "@/hooks/use-auth";
import { AdvancedUploader } from "@/components/AdvancedUploader";

export function MediaTab() {
  const { data: user } = useUser();
  const { data: profile } = useProfile(user?.username || "");
  const { mutate: updateProfile } = useUpdateProfile();

  const [media, setMedia] = useState(() => {
    const stored = localStorage.getItem("backgroundMedia");
    return stored
      ? JSON.parse(stored)
      : {
          audioUrl: "",
          videoUrl: "",
          audioVolume: 0.3,
          videoVolume: 0.5,
          audioPlaying: false,
          videoPlaying: false,
        };
  });

  useEffect(() => {
    localStorage.setItem("backgroundMedia", JSON.stringify(media));
  }, [media]);

  const handleUpdateAvatar = (url: string) => {
    updateProfile({ avatarUrl: url });
  };

  const handleVideoUploadComplete = (fileUrl: string) => {
    // Immediately set the video to play
    setMedia((prev: any) => ({ ...prev, videoUrl: fileUrl, videoPlaying: true }));
    // Update profile background if needed
    updateProfile({ backgroundUrl: fileUrl });
  };

  const handleAudioUploadComplete = (fileUrl: string) => {
    setMedia((prev: any) => ({ ...prev, audioUrl: fileUrl, audioPlaying: true }));
  };

  const handleAvatarUploadComplete = (fileUrl: string) => {
    // Update local state immediately for instant feedback
    const newProfile = { ...profile, avatarUrl: fileUrl };
    // Refetch will happen automatically
    updateProfile({ avatarUrl: fileUrl });
  };

  const handleCursorUploadComplete = (fileUrl: string) => {
    updateProfile({ cursorUrl: fileUrl });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">Assets Library</h2>
        <div className="flex flex-wrap items-center gap-2">
           <div className="bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-purple-500/20">
            Cloud
          </div>
          <div className="bg-zinc-900 text-zinc-500 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-white/5">
            2.4 MB / 50 MB
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-[#121212]/80 border-white/5 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-2xl md:col-span-2">
          <CardContent className="p-8 space-y-10">
            
            {/* Background Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-[17px] font-bold text-white ml-1">Profile Background</Label>
                  <p className="text-xs text-zinc-500 font-medium ml-1 mt-0.5">MP4, WebM, or static imagery</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black text-zinc-600 uppercase tracking-widest">Presets</span>
                  <div className="flex gap-1.5 p-1 bg-black/40 rounded-full border border-white/5">
                    {["#7c3aed", "#ec4899", "#06b6d4"].map(color => (
                      <button key={color} className="w-3 h-3 rounded-full border border-white/10" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                {media.videoUrl ? (
                  <div className="h-56 w-full bg-black/60 rounded-[32px] overflow-hidden relative shadow-inner flex items-center justify-center">
                    <video src={media.videoUrl} className="w-full h-full object-cover" muted loop autoPlay />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 z-10"
                      onClick={() => setMedia((prev: any) => ({ ...prev, videoUrl: "" }))}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                ) : (
                  <AdvancedUploader 
                    onComplete={handleVideoUploadComplete}
                    maxSize={500 * 1024 * 1024}
                    accept="video/*,image/*"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Audio Section */}
              <div className="space-y-4">
                <Label className="text-[15px] font-bold text-zinc-400 ml-1">Audio Track</Label>
                {media.audioUrl ? (
                  <div className="h-44 w-full bg-black/60 rounded-[28px] overflow-hidden relative shadow-inner flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center animate-pulse">
                        <Music className="w-6 h-6 text-purple-400" />
                      </div>
                      <p className="text-sm font-bold text-zinc-400 text-center">{media.audioUrl.split('/').pop()}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 z-10"
                      onClick={() => setMedia((prev: any) => ({ ...prev, audioUrl: "" }))}
                      data-testid="button-remove-audio"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                ) : (
                  <AdvancedUploader 
                    onComplete={handleAudioUploadComplete}
                    maxSize={200 * 1024 * 1024}
                    accept="audio/*"
                  />
                )}
              </div>

              {/* Avatar Section */}
              <div className="space-y-4">
                <Label className="text-[15px] font-bold text-zinc-400 ml-1">Identity Avatar</Label>
                {profile?.avatarUrl ? (
                  <div className="h-44 w-full bg-black/60 rounded-[28px] overflow-hidden relative shadow-inner flex items-center justify-center">
                    <img src={profile.avatarUrl} className="absolute inset-0 w-full h-full object-cover" alt="Avatar" />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 z-10"
                      onClick={() => handleUpdateAvatar("")}
                      data-testid="button-remove-avatar"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                ) : (
                  <AdvancedUploader 
                    onComplete={handleAvatarUploadComplete}
                    maxSize={50 * 1024 * 1024}
                    accept="image/*"
                  />
                )}
              </div>
            </div>

            {/* Cursor Section */}
            <div className="space-y-4">
              <Label className="text-[15px] font-bold text-zinc-400 ml-1">Custom Hardware</Label>
              <AdvancedUploader 
                onComplete={handleCursorUploadComplete}
                maxSize={10 * 1024 * 1024}
                accept="image/*"
              />
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Control Panel */}
      <Card className="bg-[#121212]/80 border-white/5 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-2xl mt-8">
        <CardContent className="p-8 space-y-8">
          <div className="flex items-center gap-3 ml-1">
             <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Music className="w-4 h-4 text-purple-400" />
             </div>
             <h4 className="text-[15px] font-bold text-white">Level Controls</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[12px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                  Video Gain
                </Label>
                <span className="text-[11px] font-black text-purple-400">{Math.round(media.videoVolume * 100)}%</span>
              </div>
              <div className="relative pt-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={media.videoVolume}
                  onChange={(e) => setMedia((prev: any) => ({ ...prev, videoVolume: parseFloat(e.target.value) }))}
                  className="w-full accent-purple-500 h-1.5 bg-zinc-900 rounded-full cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[12px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                  Audio Gain
                </Label>
                <span className="text-[11px] font-black text-purple-400">{Math.round(media.audioVolume * 100)}%</span>
              </div>
              <div className="relative pt-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={media.audioVolume}
                  onChange={(e) => setMedia((prev: any) => ({ ...prev, audioVolume: parseFloat(e.target.value) }))}
                  className="w-full accent-purple-500 h-1.5 bg-zinc-900 rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
