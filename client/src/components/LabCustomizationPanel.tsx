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
  Image as ImageIcon
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
              <span className="hidden sm:inline">Design</span>
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Assets</span>
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
                  {profileData?.avatarUrl && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-white/20 hover:text-red-400"
                      onClick={(e) => { e.stopPropagation(); updateField('avatarUrl', null); }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Username</Label>
                <Input 
                  value={profileData?.displayName} 
                  onChange={(e) => updateField('displayName', e.target.value)}
                  className="h-12 bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl px-4 text-white"
                  placeholder="e.g. NeonExplorer"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Tagline</Label>
                <Input 
                  value={profileData?.bio} 
                  onChange={(e) => updateField('bio', e.target.value)}
                  className="h-12 bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl px-4 text-white"
                  placeholder="Briefly describe yourself..."
                />
              </div>

              <div className="space-y-4">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Social Presence</Label>
                <div className="space-y-2">
                  {socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl group hover:border-white/10 transition-all">
                      <GripVertical className="w-4 h-4 text-white/20" />
                      <div className={`w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center ${link.color}`}>
                        {link.icon}
                      </div>
                      <span className="flex-1 text-sm font-medium text-white/70">{link.platform}</span>
                    </div>
                  ))}
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
                          <h4 className="text-sm font-semibold text-white">Drag Background Here</h4>
                          <p className="text-xs text-white/40">MP4, GIF, PNG, JPG supported</p>
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
                          <h4 className="text-sm font-semibold text-white">Drag Audio Here</h4>
                          <p className="text-xs text-white/40">MP3, WAV supported</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="design" className="space-y-8 mt-0">
             <div className="p-8 bg-white/5 border border-white/5 rounded-2xl text-center space-y-4">
                <Palette className="w-12 h-12 text-purple-400 mx-auto opacity-50" />
                <h4 className="text-sm font-bold text-white">Advanced Geometry</h4>
                <p className="text-xs text-white/40">Fine-tune card corner radius and glass effects coming soon.</p>
             </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
