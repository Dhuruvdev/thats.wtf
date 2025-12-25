import { useState, useCallback } from "react";
import { Upload, Trash2, Plus, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/context/ProfileContext";
import { SiInstagram, SiThreads, SiRoblox, SiSpotify, SiSnapchat } from "react-icons/si";

const SOCIAL_PLATFORMS = [
  { name: "Spotify", icon: SiSpotify, color: "text-[#1DB954]" },
  { name: "Instagram", icon: SiInstagram, color: "text-[#E4405F]" },
  { name: "Snapchat", icon: SiSnapchat, color: "text-[#FFFC00]" },
  { name: "Threads", icon: SiThreads, color: "text-white" },
  { name: "Roblox", icon: SiRoblox, color: "text-[#FF0000]" },
];

export function ProfileTabFull() {
  const { toast } = useToast();
  const { config, updateConfig, addSocialLink, removeSocialLink, updateSocialLink } = useProfile();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback(
    async (file: File, type: "avatar" | "background" | "audio") => {
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
        const fieldMap = {
          avatar: "avatarUrl",
          background: "backgroundUrl",
          audio: "audioUrl",
        };

        updateConfig({
          [fieldMap[type]]: data.url,
        });

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
    },
    [updateConfig, toast]
  );

  const onDrop = useCallback(
    (e: React.DragEvent, type: "avatar" | "background" | "audio") => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileUpload(file, type);
      }
    },
    [handleFileUpload]
  );

  return (
    <div className="space-y-6">
      {/* Identity */}
      <div className="space-y-4">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Profile Identity</Label>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, "avatar")}
          className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-colors cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center group-hover:border-purple-500/50 transition-colors overflow-hidden">
            {config.avatarUrl ? (
              <img src={config.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
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
          value={config.displayName}
          onChange={(e) => updateConfig({ displayName: e.target.value })}
          className="h-12 bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl px-4 text-white"
          placeholder="Your name"
          data-testid="input-username"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Tagline</Label>
        <Input
          value={config.bio}
          onChange={(e) => updateConfig({ bio: e.target.value })}
          className="h-12 bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl px-4 text-white"
          placeholder="Your tagline"
          data-testid="input-tagline"
        />
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Social Links</Label>
        <div className="space-y-2">
          {config.socialLinks.map((link) => (
            <div
              key={link.id}
              className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl"
            >
              <GripVertical className="w-4 h-4 text-white/30" />
              <span className="text-sm font-medium text-white/60 w-20">{link.platform}</span>
              <Input
                value={link.url}
                onChange={(e) => updateSocialLink(link.id, e.target.value)}
                placeholder="https://..."
                className="flex-1 h-9 bg-white/5 border-white/5 focus:border-purple-500/50 rounded-lg px-3 text-white text-sm"
                data-testid={`input-social-${link.id}`}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-white/20 hover:text-red-400"
                onClick={() => removeSocialLink(link.id)}
                data-testid={`button-remove-social-${link.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {SOCIAL_PLATFORMS.map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              size="sm"
              onClick={() => addSocialLink(platform.name)}
              className="border-white/10 text-white/70 hover:text-white hover:border-white/20"
              data-testid={`button-add-social-${platform.name}`}
            >
              <Plus className="w-3 h-3 mr-1" />
              {platform.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Background Media */}
      <div className="space-y-4">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Background Media</Label>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, "background")}
          className="relative group cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-white/[0.08] transition-all">
            {config.backgroundUrl ? (
              <div className="flex items-center gap-3 text-purple-400">
                <span className="text-sm font-medium text-white/70 truncate max-w-[200px]">
                  {config.backgroundUrl.split("/").pop()}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white/20 hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateConfig({ backgroundUrl: "" });
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-white/40" />
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

      {/* Background Audio */}
      <div className="space-y-4">
        <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Background Audio</Label>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, "audio")}
          className="relative group cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-white/[0.08] transition-all">
            {config.audioUrl ? (
              <div className="flex items-center gap-3 text-purple-400">
                <span className="text-sm font-medium text-white/70 truncate max-w-[200px]">
                  {config.audioUrl.split("/").pop()}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white/20 hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateConfig({ audioUrl: "" });
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-white/40" />
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
  );
}
