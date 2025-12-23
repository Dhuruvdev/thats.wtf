import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Music, Video, X, User, MousePointer2, Trash2, FolderOpen, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateProfile, useProfile } from "@/hooks/use-profile";
import { useUser } from "@/hooks/use-auth";
import { ObjectUploader } from "@/components/ObjectUploader";
import { useUpload } from "@/hooks/use-upload";

export function MediaTab() {
  const { data: user } = useUser();
  const { data: profile } = useProfile(user?.username || "");
  const { mutate: updateProfile } = useUpdateProfile();
  const { getUploadParameters } = useUpload();

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

  const handleUploadComplete = (result: any) => {
    if (result.successful && result.successful.length > 0) {
      const uploadedFile = result.successful[0];
      const objectPath = uploadedFile.meta?.objectPath;
      if (objectPath) {
        // Serve from the objects endpoint
        const fileUrl = `/objects/${objectPath.replace(/^\/objects\//, '')}`;
        setMedia((prev: any) => ({ ...prev, videoUrl: fileUrl }));
      }
    }
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
                <div className="h-56 w-full bg-black/60 rounded-[32px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center transition-all group-hover:border-purple-500/30 overflow-hidden relative shadow-inner">
                  {media.videoUrl ? (
                    <>
                      <video src={media.videoUrl} className="absolute inset-0 w-full h-full object-cover opacity-40" muted loop autoPlay />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 z-10"
                        onClick={() => setMedia((prev: any) => ({ ...prev, videoUrl: "" }))}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                        <Video className="w-8 h-8 text-zinc-500" />
                      </div>
                      <p className="text-[15px] font-bold text-zinc-500">Drop media here</p>
                      <p className="text-[11px] font-black text-zinc-700 uppercase tracking-widest mt-1">or click to upload</p>
                      <ObjectUploader
                        maxNumberOfFiles={1}
                        maxFileSize={52428800}
                        onGetUploadParameters={getUploadParameters}
                        onComplete={handleUploadComplete}
                        buttonClassName="absolute inset-0 opacity-0"
                      >
                        Upload Video
                      </ObjectUploader>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Audio Section */}
              <div 
                className="space-y-4"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.querySelector('div')?.classList.add('dragover');
                }}
                onDragLeave={(e) => {
                  e.currentTarget.querySelector('div')?.classList.remove('dragover');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.querySelector('div')?.classList.remove('dragover');
                  const url = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text');
                  if (url) setMedia((prev: any) => ({ ...prev, audioUrl: url }));
                }}
              >
                <Label className="text-[15px] font-bold text-zinc-400 ml-1">Audio Track</Label>
                <div className="h-44 w-full bg-black/60 rounded-[28px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center transition-all hover:border-purple-500/30 group-[.dragover]:border-purple-500/50 group-[.dragover]:bg-purple-500/5 group relative cursor-grab active:cursor-grabbing">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Music className="w-7 h-7 text-zinc-500" />
                  </div>
                  <p className="text-sm font-bold text-zinc-500">Audio manager</p>
                  <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mt-1">MP3, WAV, OGG</p>
                  <Input
                    type="text"
                    placeholder="Audio URL"
                    value={media.audioUrl}
                    onChange={(e) => setMedia((prev: any) => ({ ...prev, audioUrl: e.target.value }))}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Avatar Section */}
              <div 
                className="space-y-4"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.querySelector('div[class*="bg-black"]')?.classList.add('dragover');
                }}
                onDragLeave={(e) => {
                  e.currentTarget.querySelector('div[class*="bg-black"]')?.classList.remove('dragover');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.querySelector('div[class*="bg-black"]')?.classList.remove('dragover');
                  const url = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text');
                  if (url) handleUpdateAvatar(url);
                }}
              >
                <Label className="text-[15px] font-bold text-zinc-400 ml-1">Identity Avatar</Label>
                <div className="h-44 w-full bg-black/60 rounded-[28px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center transition-all hover:border-purple-500/30 group-[.dragover]:border-purple-500/50 group-[.dragover]:bg-purple-500/5 group relative overflow-hidden cursor-grab active:cursor-grabbing">
                  {profile?.avatarUrl ? (
                    <>
                      <img src={profile.avatarUrl} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-500" alt="Avatar" />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 z-10"
                        onClick={() => handleUpdateAvatar("")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <User className="w-7 h-7 text-zinc-500" />
                      </div>
                      <p className="text-sm font-bold text-zinc-500">Upload avatar</p>
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
            </div>

            {/* Cursor Section */}
            <div className="space-y-4">
              <Label className="text-[15px] font-bold text-zinc-400 ml-1">Custom Hardware</Label>
              <div className="p-6 w-full bg-black/60 rounded-[28px] border border-white/5 flex items-center justify-between transition-all hover:border-purple-500/30 group">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
                      <MousePointer2 className="w-7 h-7 text-zinc-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-white">Interactive Cursor</span>
                      <span className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.15em] mt-0.5">Upload .PNG or .SVG</span>
                    </div>
                 </div>
                 <Button variant="ghost" className="h-10 px-5 rounded-xl border border-white/5 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
                    Select File
                 </Button>
              </div>
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
