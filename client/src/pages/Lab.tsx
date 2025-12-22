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
import { useLocation } from "wouter";
import { Loader2, Plus, Trash2, Wand2, Link as LinkIcon, Palette, Music, ExternalLink } from "lucide-react";
import { useState } from "react";
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

const blockSchema = insertBlockSchema.omit({ userId: true });

export default function Lab() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [, setLocation] = useLocation();
  
  if (!isUserLoading && !user) {
    setLocation("/login");
    return null;
  }

  const { data: profile } = useProfile(user?.username || "");
  const { mutate: updateProfile } = useUpdateProfile();
  const { mutate: createLink } = useCreateLink();
  const { mutate: deleteLink } = useDeleteLink();

  const [activeTab, setActiveTab] = useState("content");

  if (isUserLoading || !profile) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-black pb-20 overflow-x-hidden">
      <BackgroundMediaManager />
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

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#5865F2]/30 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2] group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold text-white">Discord Presence</div>
                          <div className="text-[11px] font-black text-zinc-600 uppercase tracking-widest">Display real-time status</div>
                        </div>
                      </div>
                      <Button variant="outline" className="h-10 px-6 rounded-xl border-white/5 bg-zinc-900/50 font-bold text-xs hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2] transition-all">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-purple-500/30 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                          <ExternalLink className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-white">Spotify Activity</div>
                          <div className="text-[11px] font-black text-zinc-600 uppercase tracking-widest">Show what you're listening to</div>
                        </div>
                      </div>
                      <Button variant="outline" className="h-10 px-6 rounded-xl border-white/5 bg-zinc-900/50 font-bold text-xs hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                        Connect
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-purple-500/5 border border-purple-500/10">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                        <Wand2 className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-purple-200">Pro Feature: Live Integration</h4>
                        <p className="text-xs text-purple-300/60 leading-relaxed font-medium">
                          Connecting your Discord or Spotify allows you to display rich presence, including your current game, song, or status directly on your profile.
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
                </CardContent>
              </Card>
            </TabsContent>

            {/* MEDIA TAB */}
            <TabsContent value="media" className="space-y-4 mt-4">
              <MediaTab />
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
                          defaultValue={profile.displayName || ""} 
                          onChange={(e) => updateProfile({ displayName: e.target.value })}
                          onBlur={(e) => updateProfile({ displayName: e.target.value })}
                          className="h-[56px] bg-black/40 border-white/5 focus:border-purple-500/50 rounded-2xl px-5 text-white font-medium placeholder:text-zinc-600 transition-all"
                          data-testid="input-display-name"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-[14px] font-bold text-zinc-400 ml-1">Bio</Label>
                      <Textarea 
                        defaultValue={profile.bio || ""}
                        onChange={(e) => updateProfile({ bio: e.target.value })} 
                        onBlur={(e) => updateProfile({ bio: e.target.value })}
                        className="bg-black/40 border-white/5 focus:border-purple-500/50 rounded-2xl px-5 py-4 text-white font-medium placeholder:text-zinc-600 transition-all min-h-[120px] resize-none"
                        placeholder="Tell the multiverse about yourself..."
                        data-testid="textarea-bio"
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

        {/* Live Preview Panel */}
        <div className="lg:col-span-7 sticky top-28 h-fit animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-[13px] font-black text-zinc-500 uppercase tracking-[0.2em]">Real-time Preview</h2>
            <Button variant="ghost" size="sm" className="h-9 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 font-bold" onClick={() => window.open(`/u/${profile.username}`, '_blank')} data-testid="button-open-public">
              View Profile <ExternalLink className="w-3.5 h-3.5 ml-2" />
            </Button>
          </div>
          
          <div className="rounded-[40px] border border-white/5 bg-[#0a0a0a] p-12 min-h-[750px] flex items-center justify-center relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-purple-500/5 blur-[120px] rounded-full translate-y-1/2" />
            
            <div className="w-[340px] h-[680px] bg-black rounded-[3.5rem] border-[12px] border-zinc-900 overflow-hidden relative shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.8)] transform transition-transform hover:scale-[1.02] duration-500">
              <div className="absolute top-0 left-0 right-0 h-full overflow-y-auto scrollbar-hide bg-black">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-900 rounded-b-2xl z-50">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-zinc-800 rounded-full" />
                 </div>
                 <div className="p-4 pt-12">
                    <ProfileRenderer user={profile} blocks={profile.blocks || []} />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AddBlockDialog({ onCreate }: { onCreate: (data: any) => void }) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof blockSchema>>({
    resolver: zodResolver(blockSchema),
    defaultValues: {
      type: "link",
      content: { title: "", url: "", icon: "default" },
      animationConfig: { intensity: 0.5, delay: 0, ease: "power2.out", trigger: "hover" },
      order: 0,
      visible: true
    }
  });

  const onSubmit = (data: z.infer<typeof blockSchema>) => {
    onCreate(data);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2" data-testid="button-add-link"><Plus className="w-4 h-4" /> Add Block</Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-white/10">
        <DialogHeader>
          <DialogTitle>Add New Block</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <select 
              {...form.register("type")}
              className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
            >
              <option value="link">Link</option>
              <option value="bio">Bio</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input 
              onChange={(e) => {
                const content = form.getValues("content") as any;
                form.setValue("content", { ...content, title: e.target.value });
              }} 
              placeholder="My Portfolio" 
              className="bg-background/50" 
            />
          </div>
          <div className="space-y-2">
            <Label>URL</Label>
            <Input 
              onChange={(e) => {
                const content = form.getValues("content") as any;
                form.setValue("content", { ...content, url: e.target.value });
              }} 
              placeholder="https://..." 
              className="bg-background/50" 
            />
          </div>
          <Button type="submit" className="w-full" data-testid="button-create-link">Create Block</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
