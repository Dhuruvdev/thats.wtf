import { useUser } from "@/hooks/use-auth";
import { useUpdateProfile, useCreateLink, useDeleteLink, useProfile } from "@/hooks/use-profile";
import { Navigation } from "@/components/Navigation";
import { ProfileRenderer } from "@/components/ProfileRenderer";
import { BackgroundMediaManager } from "@/components/BackgroundMediaManager";
import { MediaTab } from "@/components/MediaTab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";
import { Loader2, Plus, Trash2, Wand2, Link as LinkIcon, Palette, Music, ExternalLink, Upload, Type, Sparkles, Music as MusicIcon } from "lucide-react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBlockSchema } from "@shared/schema";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import LoadingPage from "@/components/LoadingPage";
import { MediaPlayer } from "@/components/MediaPlayer";
import { CursorCustomizer } from "@/components/CursorCustomizer";
import { FontCustomizer } from "@/components/FontCustomizer";
import { DecorationsPanel } from "@/components/DecorationsPanel";

const blockSchema = insertBlockSchema.omit({ userId: true });

export default function Lab() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [, setLocation] = useLocation();
  
  if (!isUserLoading && !user) {
    setLocation("/login");
    return null;
  }

  const { data: profile } = useProfile(user?.username || "");
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: createLink, isPending: isCreating } = useCreateLink();
  const { mutate: deleteLink, isPending: isDeleting } = useDeleteLink();

  const [activeTab, setActiveTab] = useState("content");
  const [displayName, setDisplayName] = useState(profile?.displayName || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const dragRef = useRef<HTMLDivElement>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  
  // Lab-specific media state (supports GIFs, video, and audio)
  const [media, setMedia] = useState({
    videoUrl: "",
    videoVolume: 0.5,
    videoPlaying: false,
    audioUrl: "",
    audioVolume: 0.5,
    audioDuration: 0,
  });

  const FONTS = [
    { name: "Space Grotesk", value: "Space Grotesk" },
    { name: "Inter", value: "Inter" },
    { name: "Poppins", value: "Poppins" },
    { name: "Playfair Display", value: "Playfair Display" },
  ];

  const PREMADE_CURSORS = [
    { name: "Default", value: "default" },
    { name: "Pointer", value: "pointer" },
    { name: "Hand", value: "grab" },
    { name: "Text", value: "text" },
  ];

  const DECORATIONS = [
    { id: "glow", name: "Glow Effect" },
    { id: "particles", name: "Floating Particles" },
    { id: "gradient", name: "Gradient Overlay" },
    { id: "shimmer", name: "Shimmer Effect" },
  ];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current?.classList.add("opacity-60");
  };

  const handleDragLeave = () => {
    dragRef.current?.classList.remove("opacity-60");
  };

  const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current?.classList.remove("opacity-60");
    const files = Array.from(e.dataTransfer.files);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (file.type.startsWith("image/") || file.type === "image/gif") {
          setBackgroundUrl(data.url);
          // Persist background image/gif to database
          updateProfile({ backgroundUrl: data.url });
        } else if (file.type.startsWith("audio/")) {
          setAudioUrl(data.url);
          // Persist audio to database
          updateProfile({ audioUrl: data.url });
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  if (isUserLoading || !profile) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-black pb-20 overflow-x-hidden">
      {/* Video only in Lab, audio disabled */}
      <BackgroundMediaManager media={media} setMedia={setMedia} playAudio={false} />
      <Navigation />
      
      <main className="pt-28 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Editor Panel */}
        <div className="lg:col-span-5 space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                <Wand2 className="w-6 h-6 text-purple-400" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white">The Lab</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-zinc-900 rounded-full border border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Level {profile.level}</span>
              </div>
              <div className="px-3 py-1 bg-zinc-900 rounded-full border border-white/5 text-[11px] font-black text-zinc-400 uppercase tracking-widest">
                XP: {profile.xp}
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-[#121212] p-1.5 rounded-2xl border border-white/5">
              <TabsTrigger value="content" className="rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-bold text-xs transition-all">
                Content
              </TabsTrigger>
              <TabsTrigger value="design" className="rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-bold text-xs transition-all">
                Design
              </TabsTrigger>
              <TabsTrigger value="media" className="rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-bold text-xs transition-all">
                Assets
              </TabsTrigger>
              <TabsTrigger value="connections" className="rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-bold text-xs transition-all">
                Connections
              </TabsTrigger>
              <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-bold text-xs transition-all">
                Identity
              </TabsTrigger>
            </TabsList>

            {/* CONTENT TAB (Blocks) */}
            <TabsContent value="content" className="space-y-6 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-[#121212]/80 border-white/5 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-2xl">
                  <CardContent className="p-8 space-y-8">
                    <div className="flex justify-between items-center px-2">
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Identity Blocks</h3>
                        <p className="text-[13px] font-medium text-zinc-500 mt-1">Design your personal multiverse presence</p>
                      </div>
                      <AddBlockDialog onCreate={createLink} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(profile.blocks || []).length === 0 && (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[40px] bg-black/20 group hover:border-purple-500/20 transition-colors">
                          <div className="p-5 bg-white/5 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
                            <LinkIcon className="w-10 h-10 text-zinc-600" />
                          </div>
                          <p className="text-[15px] font-bold text-zinc-500">No blocks discovered in this sector</p>
                          <p className="text-xs text-zinc-700 mt-1 uppercase tracking-widest font-black">Add your first link to start</p>
                        </div>
                      )}
                      {(profile.blocks || []).map((block: any) => (
                        <Card key={block.id} className="group relative bg-black/40 border border-white/5 rounded-[28px] hover:border-purple-500/30 hover:bg-black/60 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-purple-500/5">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-5">
                              <div className="relative shrink-0">
                                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-sm font-black uppercase text-purple-400 group-hover:rotate-12 transition-transform">
                                  {block.type.slice(0, 1)}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-[#121212] rounded-full" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-[15px] text-white truncate">{block.content.title || block.type}</span>
                                  {block.visible && (
                                    <div className="px-1.5 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded-md text-[9px] font-black text-purple-400 uppercase tracking-tighter">
                                      Live
                                    </div>
                                  )}
                                </div>
                                <div className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.15em] truncate mt-1">
                                  {block.content.url || block.type}
                                </div>
                              </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="w-10 h-10 rounded-xl text-zinc-500 hover:text-white hover:bg-white/10"
                                  data-testid={`button-edit-block-${block.id}`}
                                >
                                  <LinkIcon className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="w-10 h-10 rounded-xl text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                                  onClick={() => deleteLink(block.id)}
                                  data-testid={`button-delete-block-${block.id}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* CONNECTIONS TAB */}
            <TabsContent value="connections" className="space-y-6 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="bg-[#121212]/80 border-white/5 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-2xl">
                <CardContent className="p-8 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-white">Social Connections</h3>
                    <p className="text-xs text-zinc-500 font-medium">Link your accounts to display presence and status</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: "Discord", color: "#5865F2", icon: "discord" },
                      { name: "Twitter", color: "#000000", icon: "twitter" },
                      { name: "GitHub", color: "#ffffff", icon: "github" },
                      { name: "Instagram", color: "#E4405F", icon: "instagram" },
                      { name: "Spotify", color: "#1DB954", icon: "spotify" },
                      { name: "YouTube", color: "#FF0000", icon: "youtube" },
                      { name: "TikTok", color: "#000000", icon: "tiktok" },
                      { name: "Twitch", color: "#9146FF", icon: "twitch" }
                    ].map((platform) => (
                      <button
                        key={platform.name}
                        className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 hover:bg-black/60 transition-all active:scale-95"
                        style={{ "--hover-color": platform.color } as any}
                      >
                        <div className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{ background: `${platform.color}20` }}>
                          {platform.icon === "discord" && (
                            <svg className="w-6 h-6" fill="currentColor" style={{ color: platform.color }} viewBox="0 0 24 24">
                              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                            </svg>
                          )}
                          {platform.icon === "twitter" && (
                            <svg className="w-6 h-6" fill="currentColor" style={{ color: platform.color }} viewBox="0 0 24 24">
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                            </svg>
                          )}
                          {platform.icon === "github" && (
                            <svg className="w-6 h-6" fill="currentColor" style={{ color: platform.color }} viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          )}
                          {platform.icon === "instagram" && (
                            <svg className="w-6 h-6" fill="currentColor" style={{ color: platform.color }} viewBox="0 0 24 24">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                            </svg>
                          )}
                          {platform.icon === "spotify" && (
                            <svg className="w-6 h-6" fill="currentColor" style={{ color: platform.color }} viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2"/>
                              <path d="M8 12a4 4 0 0 1 6-3.464" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          )}
                          {platform.icon === "youtube" && (
                            <svg className="w-6 h-6" fill="currentColor" style={{ color: platform.color }} viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          )}
                          {platform.icon === "tiktok" && (
                            <svg className="w-6 h-6" fill="currentColor" style={{ color: platform.color }} viewBox="0 0 24 24">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.92-2.32 2.9 2.9 0 0 1 2.31 1.39V9.4a6.15 6.15 0 1 0 10.25 5.53V9.59a7.97 7.97 0 0 0 3.86 1.04V7.02a4.9 4.9 0 0 1-.58-.06z" />
                            </svg>
                          )}
                          {platform.icon === "twitch" && (
                            <svg className="w-6 h-6" fill="currentColor" style={{ color: platform.color }} viewBox="0 0 24 24">
                              <path d="M11 2v5h3V2m6 6h2v5h-2m-11 0H4v5h2M2 2v13a2 2 0 0 0 2 2h3v3l4-3h5a2 2 0 0 0 2-2V2m0 0h5v13a2 2 0 0 1-2 2h-3v3l-4-3H2" />
                            </svg>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-[11px] font-bold text-white">{platform.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-6 rounded-3xl bg-purple-500/5 border border-purple-500/10">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                        <Wand2 className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-purple-200">Pro Feature: Live Integration</h4>
                        <p className="text-xs text-purple-300/60 leading-relaxed font-medium">
                          Connect accounts to display real-time status, currently playing music, or live stream info directly on your profile.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* DESIGN TAB */}
            <TabsContent value="design" className="space-y-6 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="bg-[#121212]/80 border-white/5 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-2xl">
                <CardContent className="p-8 space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between ml-1">
                      <Label className="text-[15px] font-bold text-zinc-300">Accent Color</Label>
                      <span className="text-[11px] font-black text-zinc-600 uppercase tracking-widest">Brand Personality</span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                      {["#7c3aed", "#2563eb", "#059669", "#dc2626", "#d97706", "#db2777", "#14b8a6", "#ffffff"].map((color) => (
                        <button
                          key={color}
                          onClick={() => updateProfile({ accentColor: color })}
                          className={`w-full aspect-square rounded-2xl border-2 transition-all hover:scale-110 active:scale-90 ${profile.accentColor === color ? 'border-white ring-4 ring-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'border-white/5'}`}
                          style={{ background: color }}
                          data-testid={`color-${color.slice(1)}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[15px] font-bold text-zinc-300 ml-1">Frame Style</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {["none", "neon", "minimal", "glass"].map((frame) => (
                        <Button
                          key={frame}
                          variant="outline"
                          className={`h-14 rounded-2xl capitalize font-bold text-sm transition-all border-white/5 bg-zinc-900/50 ${profile.frame === frame ? "bg-white text-black border-white shadow-xl scale-[1.02]" : "text-zinc-400 hover:border-white/20 hover:bg-white/5"}`}
                          onClick={() => updateProfile({ frame })}
                          data-testid={`frame-${frame}`}
                        >
                          {frame}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 rounded-2xl bg-black/40 border border-white/5">
                    <div className="space-y-1">
                      <Label className="text-[15px] font-bold text-white">Ambient Glow</Label>
                      <div className="text-[11px] font-black text-zinc-600 uppercase tracking-widest">Atmospheric background effects</div>
                    </div>
                    <Switch 
                      checked={profile.glowEnabled ?? true}
                      onCheckedChange={(checked) => updateProfile({ glowEnabled: checked })}
                      data-testid="switch-glow"
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[15px] font-bold text-zinc-300 ml-1">Font Customization</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {FONTS.slice(0, 4).map((font) => (
                        <Button
                          key={font.value}
                          variant="outline"
                          onClick={() => updateProfile({ 
                            themeConfig: {
                              ...profile.themeConfig,
                              typography: {
                                ...profile.themeConfig.typography,
                                bodyFont: font.value
                              }
                            }
                          })}
                          className={`h-12 rounded-2xl capitalize font-bold text-xs transition-all border-white/5 ${profile.themeConfig?.typography?.bodyFont === font.value ? "bg-white text-black border-white shadow-xl scale-[1.02]" : "bg-zinc-900/50 text-zinc-400 hover:border-white/20 hover:bg-white/5"}`}
                          style={{ fontFamily: font.value }}
                          data-testid={`button-font-${font.value.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {font.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[15px] font-bold text-zinc-300 ml-1">Discord-like Decorations</Label>
                    <div className="space-y-2">
                      {DECORATIONS.map((deco) => {
                        const decorations = (profile.themeConfig?.motion as any)?.decorations || [];
                        const isChecked = decorations.includes(deco.id);
                        return (
                          <div key={deco.id} className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                            <Checkbox 
                              id={deco.id} 
                              className="rounded-lg"
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const newDecorations = checked 
                                  ? [...decorations, deco.id]
                                  : decorations.filter((d: string) => d !== deco.id);
                                updateProfile({ 
                                  themeConfig: {
                                    ...profile.themeConfig,
                                    motion: {
                                      ...profile.themeConfig.motion,
                                      decorations: newDecorations
                                    }
                                  }
                                });
                              }}
                              data-testid={`checkbox-decoration-${deco.id}`}
                            />
                            <label htmlFor={deco.id} className="text-sm font-medium text-zinc-300 cursor-pointer">
                              {deco.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* MEDIA TAB */}
            <TabsContent value="media" className="space-y-4 mt-4">
              <MediaTab media={media} setMedia={setMedia} />
            </TabsContent>

            {/* IDENTITY TAB */}
            <TabsContent value="profile" className="space-y-6 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="bg-[#121212]/80 border-white/5 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-2xl">
                <CardContent className="p-8 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-white">Identity Profile</h3>
                    <p className="text-xs text-zinc-500 font-medium">How the multiverse sees you</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-[14px] font-bold text-zinc-400 ml-1">Display Name</Label>
                      <div className="relative group">
                        <Input 
                          value={displayName} 
                          onChange={(e) => setDisplayName(e.target.value)}
                          onBlur={(e) => updateProfile({ displayName: e.target.value })}
                          className="h-[56px] bg-black/40 border-white/5 focus:border-purple-500/50 rounded-2xl px-5 text-white font-medium placeholder:text-zinc-600 transition-all"
                          placeholder="Your display name"
                          data-testid="input-display-name"
                          disabled={isUpdating}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-[14px] font-bold text-zinc-400 ml-1">Bio</Label>
                      <Textarea 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)} 
                        onBlur={(e) => updateProfile({ bio: e.target.value })}
                        className="bg-black/40 border-white/5 focus:border-purple-500/50 rounded-2xl px-5 py-4 text-white font-medium placeholder:text-zinc-600 transition-all min-h-[120px] resize-none"
                        placeholder="Tell the multiverse about yourself..."
                        data-testid="textarea-bio"
                        disabled={isUpdating}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[14px] font-bold text-zinc-400 ml-1">Custom URL</Label>
                      <div className="flex items-center gap-2 p-4 rounded-2xl bg-black/40 border border-white/5">
                        <span className="text-zinc-500 font-bold text-sm">lab.dev/</span>
                        <span className="text-white font-bold text-sm">{profile.username}</span>
                        <div className="ml-auto flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-green-500" />
                           <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview Panel - Discord Style */}
        <div className="lg:col-span-7 sticky top-28 h-fit animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-[13px] font-black text-zinc-500 uppercase tracking-[0.2em]">Live Preview</h2>
            <Button variant="ghost" size="sm" className="h-9 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 font-bold" onClick={() => window.open(`/u/${profile.username}`, '_blank')} data-testid="button-open-public">
              View Profile <ExternalLink className="w-3.5 h-3.5 ml-2" />
            </Button>
          </div>
          
          {/* Clean Discord-style Profile Card */}
          <div className="relative rounded-[32px] border border-white/10 bg-gradient-to-b from-white/5 to-black/40 overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent pointer-events-none" />
            
            {/* Profile Preview Content */}
            <div className="relative z-10 max-h-[820px] overflow-y-auto scrollbar-hide">
              <ProfileRenderer user={profile} blocks={profile.blocks || []} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AddBlockDialog({ onCreate }: { onCreate: (data: any) => void }) {
  const [open, setOpen] = useState(false);
  const [blockType, setBlockType] = useState("link");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      type: blockType,
      content: { title, url, icon: "default" },
      animationConfig: { intensity: 0.5, delay: 0, ease: "power2.out", trigger: "hover" },
      order: 0,
      visible: true
    });
    setOpen(false);
    setTitle("");
    setUrl("");
    setBlockType("link");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2" data-testid="button-add-link"><Plus className="w-4 h-4" /> Add Block</Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0a0a0a] border border-white/10 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Block</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">Block Type</Label>
            <select 
              value={blockType}
              onChange={(e) => setBlockType(e.target.value)}
              className="w-full h-10 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
              data-testid="select-block-type"
            >
              <option value="link">Link</option>
              <option value="bio">Bio</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Title</Label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Portfolio" 
              className="bg-black/40 border-white/10 rounded-xl text-white"
              data-testid="input-block-title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">URL</Label>
            <Input 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com" 
              className="bg-black/40 border-white/10 rounded-xl text-white"
              data-testid="input-block-url"
              required
            />
          </div>
          <Button type="submit" className="w-full rounded-xl bg-purple-600 hover:bg-purple-700" data-testid="button-create-link">
            Create Block
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
