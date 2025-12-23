import { useUser } from "@/hooks/use-auth";
import { useUpdateProfile, useCreateLink, useDeleteLink, useProfile } from "@/hooks/use-profile";
import { Navigation } from "@/components/Navigation";
import { ProfileRenderer } from "@/components/ProfileRenderer";
import { BackgroundMediaManager } from "@/components/BackgroundMediaManager";
import { ProfileOverlays } from "@/components/ProfileOverlays";
import { MediaTab } from "@/components/MediaTab";
import { IdentityCard } from "@/components/IdentityCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";
import { Loader2, Plus, Trash2, Wand2, Link as LinkIcon, Palette, ExternalLink, Upload, Type, Sparkles, Settings, Zap } from "lucide-react";
import { SiDiscord, SiX, SiGithub, SiInstagram, SiSpotify, SiYoutube, SiTiktok, SiTwitch } from "react-icons/si";
import { useState, useRef, useEffect } from "react";
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
import { motion } from "framer-motion";
import Lenis from "lenis";

import LoadingPage from "@/components/LoadingPage";
import { MediaPlayer } from "@/components/MediaPlayer";
import { CursorCustomizer } from "@/components/CursorCustomizer";
import { FontCustomizer } from "@/components/FontCustomizer";
import { DecorationsPanel } from "@/components/DecorationsPanel";

const blockSchema = insertBlockSchema.omit({ userId: true });

export default function Lab() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [, setLocation] = useLocation();
  
  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    } as any);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  
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
  const [activeOverlay, setActiveOverlay] = useState<"none" | "snowfall" | "particles" | "sparkles" | "aurora" | "rain" | "floating-orbs" | "light-streaks">("none");
  
  // Lab-specific media state (supports GIFs, video, and audio)
  const [media, setMedia] = useState({
    videoUrl: "",
    videoVolume: 0.5,
    videoPlaying: false,
    audioUrl: "",
    audioVolume: 0.5,
    audioDuration: 0,
  });

  // Update state when profile loads
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || "");
      setBio(profile.bio || "");
    }
  }, [profile?.displayName, profile?.bio]);

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
            </TabsList>

            {/* CONTENT TAB (Blocks + Identity) */}
            <TabsContent value="content" className="space-y-6 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
                {/* Identity Card Preview */}
                {profile && <IdentityCard user={profile} />}

                {/* Edit Identity Information */}
                <Card className="bg-[#121212]/80 border-white/5 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-2xl">
                  <CardContent className="p-8 space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-white">Edit Profile</h3>
                      <p className="text-xs text-zinc-500 font-medium">Customize how you appear to the world</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-[14px] font-bold text-zinc-400 ml-1">Display Name</Label>
                        <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                          <Input 
                            value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)}
                            onBlur={(e) => {
                              updateProfile({ displayName: e.target.value });
                            }}
                            className="h-[56px] bg-black/40 border-white/5 focus:border-purple-500/50 rounded-2xl px-5 text-white font-medium placeholder:text-zinc-600 transition-all"
                            placeholder="Your display name"
                            data-testid="input-display-name"
                            disabled={isUpdating}
                          />
                        </motion.div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-[14px] font-bold text-zinc-400 ml-1">Bio / About</Label>
                        <Textarea 
                          value={bio}
                          onChange={(e) => setBio(e.target.value)} 
                          onBlur={(e) => {
                            updateProfile({ bio: e.target.value });
                          }}
                          className="bg-black/40 border-white/5 focus:border-purple-500/50 rounded-2xl px-5 py-4 text-white font-medium placeholder:text-zinc-600 transition-all min-h-[120px] resize-none"
                          placeholder="Tell the multiverse about yourself..."
                          data-testid="textarea-bio"
                          disabled={isUpdating}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[14px] font-bold text-zinc-400 ml-1">Public Profile URL</Label>
                        <motion.div whileHover={{ scale: 1.01 }} className="flex items-center gap-2 p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-purple-500/20 transition-colors">
                          <span className="text-zinc-500 font-bold text-sm">lab.dev/u/</span>
                          <span className="text-white font-bold text-sm">{profile?.username}</span>
                          <div className="ml-auto flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                             <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Live</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/40 border border-white/5">
                        <div className="text-center">
                          <div className="text-2xl font-black text-white">{profile?.level || 1}</div>
                          <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Level</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-white">{profile?.xp || 0}</div>
                          <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">XP</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-white">{profile?.views || 0}</div>
                          <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Views</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Identity Blocks Section */}
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
                      { name: "Discord", color: "#5865F2", Icon: SiDiscord },
                      { name: "Twitter", color: "#000000", Icon: SiX },
                      { name: "GitHub", color: "#ffffff", Icon: SiGithub },
                      { name: "Instagram", color: "#E4405F", Icon: SiInstagram },
                      { name: "Spotify", color: "#1DB954", Icon: SiSpotify },
                      { name: "YouTube", color: "#FF0000", Icon: SiYoutube },
                      { name: "TikTok", color: "#000000", Icon: SiTiktok },
                      { name: "Twitch", color: "#9146FF", Icon: SiTwitch }
                    ].map((platform) => (
                      <button
                        key={platform.name}
                        className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 hover:bg-black/60 transition-all active:scale-95"
                        style={{ "--hover-color": platform.color } as any}
                      >
                        <div className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{ background: `${platform.color}20` }}>
                          <platform.Icon className="w-6 h-6" style={{ color: platform.color }} />
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
                  {/* Color & Theming */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white">Colors & Theme</h3>
                    
                    <div className="space-y-3">
                      <Label className="text-[14px] font-bold text-zinc-300">Brand Accent Color</Label>
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

                    <div className="space-y-3">
                      <Label className="text-[14px] font-bold text-zinc-300">Username Glow Color</Label>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                        {["#7c3aed", "#2563eb", "#059669", "#dc2626", "#d97706", "#db2777", "#14b8a6", "#ffffff"].map((color) => (
                          <button
                            key={color}
                            onClick={() => updateProfile({
                              themeConfig: {
                                ...profile.themeConfig,
                                typography: {
                                  ...profile.themeConfig.typography,
                                  displayNameGlowColor: color
                                }
                              }
                            })}
                            className={`w-full aspect-square rounded-2xl border-2 transition-all hover:scale-110 active:scale-90 ${profile.themeConfig?.typography?.displayNameGlowColor === color ? 'border-white ring-4 ring-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'border-white/5'}`}
                            style={{ background: color }}
                            data-testid={`displayname-glow-color-${color.slice(1)}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Frame Settings */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white">Frame & Border</h3>
                    
                    <div className="space-y-3">
                      <Label className="text-[14px] font-bold text-zinc-300">Frame Style</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {["none", "glass", "neon", "minimal", "transparent", "glowing-border"].map((style) => (
                          <Button
                            key={style}
                            variant="outline"
                            className={`h-10 rounded-2xl capitalize font-bold text-xs transition-all border-white/5 ${profile.themeConfig?.frameOverlay?.style === style ? "bg-white text-black border-white shadow-xl" : "bg-zinc-900/50 text-zinc-400 hover:border-white/20 hover:bg-white/5"}`}
                            onClick={() => updateProfile({ 
                              themeConfig: {
                                ...profile.themeConfig,
                                frameOverlay: {
                                  ...profile.themeConfig?.frameOverlay,
                                  style: style as any
                                }
                              }
                            })}
                            data-testid={`frame-overlay-${style}`}
                          >
                            {style}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[14px] font-bold text-zinc-300">Frame Color</Label>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                        {["#7c3aed", "#2563eb", "#059669", "#dc2626", "#d97706", "#db2777", "#14b8a6", "#ffffff"].map((color) => (
                          <button
                            key={color}
                            onClick={() => updateProfile({
                              themeConfig: {
                                ...profile.themeConfig,
                                frameOverlay: {
                                  ...profile.themeConfig?.frameOverlay,
                                  color: color
                                }
                              }
                            })}
                            className={`w-full aspect-square rounded-2xl border-2 transition-all hover:scale-110 active:scale-90 ${(profile.themeConfig?.frameOverlay as any)?.color === color ? 'border-white ring-4 ring-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'border-white/5'}`}
                            style={{ background: color }}
                            data-testid={`frame-overlay-color-${color.slice(1)}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white">Typography</h3>
                    
                    <div className="space-y-3">
                      <Label className="text-[14px] font-bold text-zinc-300">Username Font</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {FONTS.map((font) => (
                          <Button
                            key={font.value}
                            variant="outline"
                            onClick={() => updateProfile({ 
                              themeConfig: {
                                ...profile.themeConfig,
                                typography: {
                                  ...profile.themeConfig.typography,
                                  displayNameFont: font.value
                                }
                              }
                            })}
                            className={`h-10 rounded-2xl capitalize font-bold text-xs transition-all border-white/5 ${profile.themeConfig?.typography?.displayNameFont === font.value ? "bg-white text-black border-white shadow-xl" : "bg-zinc-900/50 text-zinc-400 hover:border-white/20 hover:bg-white/5"}`}
                            style={{ fontFamily: font.value }}
                            data-testid={`button-displayname-font-${font.value.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {font.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[14px] font-bold text-zinc-300">Bio Font</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {FONTS.map((font) => (
                          <Button
                            key={font.value}
                            variant="outline"
                            onClick={() => updateProfile({ 
                              themeConfig: {
                                ...profile.themeConfig,
                                typography: {
                                  ...profile.themeConfig.typography,
                                  bioFont: font.value
                                }
                              }
                            })}
                            className={`h-10 rounded-2xl capitalize font-bold text-xs transition-all border-white/5 ${profile.themeConfig?.typography?.bioFont === font.value ? "bg-white text-black border-white shadow-xl" : "bg-zinc-900/50 text-zinc-400 hover:border-white/20 hover:bg-white/5"}`}
                            style={{ fontFamily: font.value }}
                            data-testid={`button-bio-font-${font.value.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {font.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Effects & Animation */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white">Effects</h3>
                    
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
                      <div className="space-y-1">
                        <Label className="text-[14px] font-bold text-white">Ambient Glow</Label>
                        <div className="text-[11px] text-zinc-500">Background glow effect</div>
                      </div>
                      <Switch 
                        checked={profile.glowEnabled ?? true}
                        onCheckedChange={(checked) => updateProfile({ glowEnabled: checked })}
                        data-testid="switch-glow"
                        className="data-[state=checked]:bg-purple-600"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-[14px] font-bold text-white">Username Animation</Label>
                        <Switch 
                          checked={profile.themeConfig?.animations?.displayName?.enabled ?? true}
                          onCheckedChange={(checked) => updateProfile({ 
                            themeConfig: {
                              ...profile.themeConfig,
                              animations: {
                                ...profile.themeConfig?.animations,
                                displayName: {
                                  ...profile.themeConfig?.animations?.displayName,
                                  enabled: checked
                                }
                              }
                            }
                          })}
                          data-testid="switch-displayname-animation"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {["fade", "slide", "scale", "wave", "glow-pulse"].map((type) => (
                          <Button
                            key={type}
                            variant="ghost"
                            size="sm"
                            className={`capitalize text-xs ${profile.themeConfig?.animations?.displayName?.type === type ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-white"}`}
                            onClick={() => updateProfile({ 
                              themeConfig: {
                                ...profile.themeConfig,
                                animations: {
                                  ...profile.themeConfig?.animations,
                                  displayName: {
                                    ...profile.themeConfig?.animations?.displayName,
                                    type: type as any
                                  }
                                }
                              }
                            })}
                            data-testid={`displayname-animation-${type}`}
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </TabsContent>

            {/* MEDIA TAB */}
            <TabsContent value="media" className="space-y-4 mt-4">
              <MediaTab media={media} setMedia={setMedia as any} />
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
            <ProfileOverlays activeOverlay={activeOverlay} onOverlayChange={setActiveOverlay} showSelector={true} />
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
