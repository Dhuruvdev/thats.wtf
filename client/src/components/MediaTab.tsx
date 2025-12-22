import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Music, Video, X, User, MousePointer2, Trash2, FolderOpen, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateProfile, useProfile } from "@/hooks/use-profile";
import { useUser } from "@/hooks/use-auth";

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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold tracking-tight text-white">Assets Uploader</h2>
        <div className="bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-purple-500/20">
          Cloud Storage
        </div>
      </div>

      <Card className="bg-[#121212]/80 border-white/5 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-2xl">
        <CardContent className="p-8 space-y-10">
          
          {/* Background Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-[15px] font-bold text-zinc-300 ml-1">Background</Label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Presets</span>
                <div className="flex gap-1.5">
                  {["#7c3aed", "#ec4899", "#06b6d4"].map(color => (
                    <button key={color} className="w-3 h-3 rounded-full border border-white/10" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="h-44 w-full bg-black/60 rounded-3xl border border-white/5 flex flex-col items-center justify-center transition-all group-hover:border-purple-500/30 overflow-hidden relative">
                {media.videoUrl ? (
                  <>
                    <video src={media.videoUrl} className="absolute inset-0 w-full h-full object-cover opacity-40" muted loop autoPlay />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">
                        .MP4
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                        onClick={() => setMedia((prev: any) => ({ ...prev, videoUrl: "" }))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Video className="w-7 h-7 text-zinc-500" />
                    </div>
                    <p className="text-sm font-bold text-zinc-500">Drop background media here</p>
                    <Input
                      type="text"
                      placeholder="Paste URL (MP4, WEBM, JPG)"
                      value={media.videoUrl}
                      onChange={(e) => setMedia((prev: any) => ({ ...prev, videoUrl: e.target.value }))}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Audio Section */}
          <div className="space-y-4">
            <Label className="text-[15px] font-bold text-zinc-300 ml-1">Audio</Label>
            <div className="h-36 w-full bg-black/60 rounded-3xl border border-white/5 flex flex-col items-center justify-center transition-all hover:border-purple-500/30 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FolderOpen className="w-7 h-7 text-zinc-500" />
              </div>
              <p className="text-sm font-bold text-zinc-500">Click to open audio manager</p>
              <Input
                type="text"
                placeholder="Audio URL"
                value={media.audioUrl}
                onChange={(e) => setMedia((prev: any) => ({ ...prev, audioUrl: e.target.value }))}
                className="absolute opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Avatar Section */}
          <div className="space-y-4">
            <Label className="text-[15px] font-bold text-zinc-300 ml-1">Profile Avatar</Label>
            <div className="h-44 w-full bg-black/60 rounded-3xl border border-white/5 flex flex-col items-center justify-center transition-all hover:border-purple-500/30 group relative overflow-hidden">
              {profile?.avatarUrl ? (
                <>
                  <img src={profile.avatarUrl} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" alt="Avatar" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">
                      .WEBP
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                      onClick={() => handleUpdateAvatar("")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <User className="w-7 h-7 text-zinc-500" />
                  </div>
                  <p className="text-sm font-bold text-zinc-500">Upload custom avatar</p>
                  <Input
                    type="text"
                    placeholder="Avatar URL"
                    value={profile?.avatarUrl || ""}
                    onChange={(e) => handleUpdateAvatar(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>

          {/* Cursor Section */}
          <div className="space-y-4">
            <Label className="text-[15px] font-bold text-zinc-300 ml-1">Custom Cursor</Label>
            <div className="h-28 w-full bg-black/60 rounded-3xl border border-white/5 flex flex-col items-center justify-center transition-all hover:border-purple-500/30 group">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <MousePointer2 className="w-6 h-6 text-zinc-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-400">Custom Mouse Cursor</span>
                    <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest">Upload .PNG or .SVG</span>
                  </div>
               </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Control Panel */}
      <Card className="bg-[#121212]/80 border-white/5 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-2xl mt-8">
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-[13px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">
                Video Volume
              </Label>
              <div className="relative pt-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={media.videoVolume}
                  onChange={(e) => setMedia((prev: any) => ({ ...prev, videoVolume: parseFloat(e.target.value) }))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[13px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">
                Audio Volume
              </Label>
              <div className="relative pt-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={media.audioVolume}
                  onChange={(e) => setMedia((prev: any) => ({ ...prev, audioVolume: parseFloat(e.target.value) }))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
