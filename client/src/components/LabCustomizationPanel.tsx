import { useState, useCallback } from "react";
import { 
  User, 
  Palette, 
  Layout as LayoutIcon, 
  Sparkles, 
  Layers, 
  Upload, 
  Plus, 
  Trash2, 
  GripVertical,
  Type,
  Smartphone,
  Monitor,
  Music,
  FileVideo,
  Image as ImageIcon,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { SiInstagram, SiThreads, SiRoblox, SiSpotify, SiSnapchat } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

interface SocialLink {
  id: string;
  platform: string;
  icon: React.ReactNode;
  color: string;
  url: string;
}

interface LabCustomizationPanelProps {
  profileData?: {
    displayName?: string;
    bio?: string;
    views?: number;
    accentColor?: string;
    backgroundUrl?: string;
    audioUrl?: string;
    avatarUrl?: string;
    geometry?: {
      radius: number;
      blur: number;
      opacity: number;
    };
    entranceAnimation?: string;
    effectIntensity?: number;
    effectSpeed?: number;
  };
  onProfileChange?: (data: any) => void;
  onColorChange?: (type: string, value: string) => void;
  isUpdating?: boolean;
}

export function LabCustomizationPanel({ 
  profileData, 
  onProfileChange, 
  onColorChange,
  isUpdating 
}: LabCustomizationPanelProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [socialLinks] = useState<SocialLink[]>([
    { id: "1", platform: "Spotify", icon: <SiSpotify />, color: "text-[#1DB954]", url: "" },
    { id: "2", platform: "Instagram", icon: <SiInstagram />, color: "text-[#E4405F]", url: "" },
    { id: "3", platform: "Snapchat", icon: <SiSnapchat />, color: "text-[#FFFC00]", url: "" },
    { id: "4", platform: "Threads", icon: <SiThreads />, color: "text-white", url: "" },
    { id: "5", platform: "Roblox", icon: <SiRoblox />, color: "text-[#FF0000]", url: "" },
  ]);

  const updateField = (field: string, value: any) => {
    onProfileChange?.({ [field]: value });
  };

  const updateGeometry = (key: string, value: number[]) => {
    onProfileChange?.({
      geometry: {
        ...profileData?.geometry,
        [key]: value[0]
      }
    });
  };

  const handleFileUpload = useCallback(async (file: File, type: 'background' | 'audio' | 'avatar') => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      if (type === 'background') {
        updateField('backgroundUrl', data.url);
      } else if (type === 'audio') {
        updateField('audioUrl', data.url);
      } else if (type === 'avatar') {
        updateField('avatarUrl', data.url);
      }

      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [onProfileChange, toast]);

  const onDrop = useCallback((e: React.DragEvent, type: 'background' | 'audio' | 'avatar') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file, type);
    }
  }, [handleFileUpload]);

  const ANIMATIONS = [
    { id: "none", name: "None", icon: <X className="w-4 h-4" /> },
    { id: "fade", name: "Soft Fade", icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { id: "zoom", name: "Elastic Zoom", icon: <Sparkles className="w-4 h-4 text-blue-400" /> },
    { id: "slide", name: "Upward Flow", icon: <Sparkles className="w-4 h-4 text-pink-400" /> },
    { id: "glitch", name: "Discord Pulse", icon: <Sparkles className="w-4 h-4 text-indigo-400" /> },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 pb-2">
        <h2 className="text-xl font-bold text-white tracking-tight">Customization Center</h2>
        <p className="text-sm text-white/40 mt-1">Personalize your high-fidelity identity</p>
      </div>

      <Tabs defaultValue="profile" className="flex-1 flex flex-col">
        <div className="px-6 py-4">
          <TabsList className="w-full bg-white/5 p-1 border border-white/5 rounded-xl h-12">
            <TabsTrigger value="profile" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="design" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Geometry</span>
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Assets</span>
            </TabsTrigger>
            <TabsTrigger value="effects" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Profile Effect</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24">
          <TabsContent value="profile" className="space-y-6 mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Profile Identity</Label>
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDrop(e, 'avatar')}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-colors cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center group-hover:border-purple-500/50 transition-colors overflow-hidden">
                    {profileData?.avatarUrl ? (
                      <img src={profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-6 h-6 text-white/40 group-hover:text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">Profile Image</h4>
                    <p className="text-xs text-white/40">Drag or click to upload</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Username</Label>
                <Input 
                  value={profileData?.displayName} 
                  onChange={(e) => updateField('displayName', e.target.value)}
                  className="h-12 bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl px-4 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Tagline</Label>
                <Input 
                  value={profileData?.bio} 
                  onChange={(e) => updateField('bio', e.target.value)}
                  className="h-12 bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl px-4 text-white"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="design" className="space-y-8 mt-0">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Card Geometry</Label>
                <div className="space-y-8 p-6 bg-white/5 border border-white/5 rounded-2xl">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-white/70">Corner Radius</span>
                      <span className="text-sm font-bold text-purple-400">{profileData?.geometry?.radius}px</span>
                    </div>
                    <Slider 
                      value={[profileData?.geometry?.radius || 40]} 
                      onValueChange={(v) => updateGeometry('radius', v)}
                      max={100} 
                      step={1} 
                      className="[&_[role=slider]]:bg-purple-500" 
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-white/70">Glass Blur</span>
                      <span className="text-sm font-bold text-purple-400">{profileData?.geometry?.blur}px</span>
                    </div>
                    <Slider 
                      value={[profileData?.geometry?.blur || 20]} 
                      onValueChange={(v) => updateGeometry('blur', v)}
                      max={50} 
                      step={1} 
                      className="[&_[role=slider]]:bg-purple-500" 
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-white/70">Glass Opacity</span>
                      <span className="text-sm font-bold text-purple-400">{profileData?.geometry?.opacity}%</span>
                    </div>
                    <Slider 
                      value={[profileData?.geometry?.opacity || 3]} 
                      onValueChange={(v) => updateGeometry('opacity', v)}
                      max={20} 
                      step={1} 
                      className="[&_[role=slider]]:bg-purple-500" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="theme" className="space-y-6 mt-0">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Background Media</Label>
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDrop(e, 'background')}
                  className="relative group cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-white/[0.08] transition-all">
                    {profileData?.backgroundUrl ? (
                      <div className="flex items-center gap-3 text-purple-400">
                        <FileVideo className="w-6 h-6" />
                        <span className="text-sm font-medium text-white/70 truncate max-w-[200px]">{profileData.backgroundUrl.split('/').pop()}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-white/20 hover:text-red-400"
                          onClick={(e) => { e.stopPropagation(); updateField('backgroundUrl', null); }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-6 h-6 text-white/40" />
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm font-semibold text-white">Drag Background</h4>
                          <p className="text-xs text-white/40">MP4, GIF, PNG, JPG</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Background Audio</Label>
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDrop(e, 'audio')}
                  className="relative group cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-white/[0.08] transition-all">
                    {profileData?.audioUrl ? (
                      <div className="flex items-center gap-3 text-purple-400">
                        <Music className="w-6 h-6" />
                        <span className="text-sm font-medium text-white/70 truncate max-w-[200px]">{profileData.audioUrl.split('/').pop()}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-white/20 hover:text-red-400"
                          onClick={(e) => { e.stopPropagation(); updateField('audioUrl', null); }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Music className="w-6 h-6 text-white/40" />
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm font-semibold text-white">Drag Audio</h4>
                          <p className="text-xs text-white/40">MP3, WAV</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-6 mt-0">
            <div className="space-y-4">
              <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Frame Decorations</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "pixel_border", name: "Pixel Frame", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200" },
                  { id: "none_frame", name: "None", img: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200" }
                ].map((effect) => {
                  const isActive = effect.id === "none_frame" 
                    ? !((profileData as any)?.decorations || []).includes("pixel_border")
                    : ((profileData as any)?.decorations || []).includes(effect.id);
                  return (
                    <button
                      key={effect.id}
                      onClick={() => {
                        const currentDecs = (profileData as any)?.decorations || [];
                        if (effect.id === "none_frame") {
                          onProfileChange?.({ decorations: currentDecs.filter((d: string) => d !== "pixel_border") });
                        } else {
                          if (!currentDecs.includes(effect.id)) {
                            onProfileChange?.({ decorations: [...currentDecs, effect.id] });
                          }
                        }
                      }}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group ${isActive ? "border-purple-500 scale-95" : "border-white/5 hover:border-white/20"}`}
                      data-testid={`button-frame-${effect.id}`}
                    >
                      <img src={effect.img} alt={effect.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{effect.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Avatar Decorations</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "avatar_decor", name: "Pixel Aura", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200" },
                  { id: "none_avatar", name: "None", img: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200" }
                ].map((effect) => {
                  const isActive = effect.id === "none_avatar"
                    ? !((profileData as any)?.decorations || []).includes("avatar_decor")
                    : ((profileData as any)?.decorations || []).includes(effect.id);
                  return (
                    <button
                      key={effect.id}
                      onClick={() => {
                        const currentDecs = (profileData as any)?.decorations || [];
                        if (effect.id === "none_avatar") {
                          onProfileChange?.({ decorations: currentDecs.filter((d: string) => d !== "avatar_decor") });
                        } else {
                          if (!currentDecs.includes(effect.id)) {
                            onProfileChange?.({ decorations: [...currentDecs, effect.id] });
                          }
                        }
                      }}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group ${isActive ? "border-purple-500 scale-95" : "border-white/5 hover:border-white/20"}`}
                      data-testid={`button-avatar-${effect.id}`}
                    >
                      <img src={effect.img} alt={effect.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{effect.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Entrance Effects</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "aura", name: "Aura Glow", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200" },
                  { id: "sparkles", name: "Sparkles", img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=200" },
                  { id: "burst", name: "Burst Pop", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200" },
                  { id: "none", name: "None", img: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200" }
                ].map((effect) => {
                  const isActive = profileData?.entranceAnimation === effect.id;
                  return (
                    <button
                      key={effect.id}
                      onClick={() => updateField('entranceAnimation', effect.id)}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group ${isActive ? "border-purple-500 scale-95" : "border-white/5 hover:border-white/20"}`}
                      data-testid={`button-effect-${effect.id}`}
                    >
                      <img src={effect.img} alt={effect.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{effect.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

             {["aura", "sparkles", "burst", "cosmic", "cyber"].includes(profileData?.entranceAnimation ?? "") && (
               <div className="space-y-6 p-6 bg-white/5 border border-white/5 rounded-2xl">
                 <div className="space-y-4">
                   <div className="flex justify-between">
                     <span className="text-sm font-medium text-white/70">Effect Intensity</span>
                     <span className="text-sm font-bold text-purple-400">{(profileData?.effectIntensity || 1).toFixed(2)}</span>
                   </div>
                   <Slider 
                     value={[profileData?.effectIntensity || 1]} 
                     onValueChange={(v) => updateField('effectIntensity', v[0])}
                     min={0.5}
                     max={2} 
                     step={0.1} 
                     className="[&_[role=slider]]:bg-purple-500" 
                   />
                 </div>

                 <div className="space-y-4">
                   <div className="flex justify-between">
                     <span className="text-sm font-medium text-white/70">Animation Speed</span>
                     <span className="text-sm font-bold text-purple-400">{(profileData?.effectSpeed || 1).toFixed(2)}x</span>
                   </div>
                   <Slider 
                     value={[profileData?.effectSpeed || 1]} 
                     onValueChange={(v) => updateField('effectSpeed', v[0])}
                     min={0.5}
                     max={2} 
                     step={0.1} 
                     className="[&_[role=slider]]:bg-purple-500" 
                   />
                 </div>
               </div>
             )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
