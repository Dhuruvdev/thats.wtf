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
              <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-bold text-xs transition-all">
                Identity
              </TabsTrigger>
            </TabsList>

            {/* CONTENT TAB (Blocks) */}
            <TabsContent value="content" className="space-y-4 mt-4">
              <Card className="bg-card/50 border-white/5">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Your Identity Blocks</h3>
                    <AddBlockDialog onCreate={createLink} />
                  </div>
                  
                  <div className="space-y-2">
                    {(profile.blocks || []).map((block: any) => (
                      <div key={block.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/5">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-xs font-bold uppercase">
                            {block.type.slice(0, 1)}
                          </div>
                          <div className="truncate">
                            <div className="font-medium truncate">{block.content.title || block.type}</div>
                            <div className="text-xs text-muted-foreground truncate">{block.content.url || ""}</div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => deleteLink(block.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* DESIGN TAB */}
            <TabsContent value="design" className="space-y-4 mt-4">
              <Card className="bg-card/50 border-white/5">
                <CardContent className="p-4 space-y-6">
                  <div className="space-y-3">
                    <Label>Accent Color</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {["#7c3aed", "#2563eb", "#059669", "#dc2626", "#d97706", "#db2777", "#14b8a6", "#ffffff"].map((color) => (
                        <button
                          key={color}
                          onClick={() => updateProfile({ accentColor: color })}
                          className={`w-full aspect-square rounded-lg border-2 transition-transform hover:scale-105 ${profile.accentColor === color ? 'border-white ring-2 ring-white/20' : 'border-transparent'}`}
                          style={{ background: color }}
                          data-testid={`color-${color.slice(1)}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Frame Style</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["none", "neon", "minimal", "glass"].map((frame) => (
                        <Button
                          key={frame}
                          variant={profile.frame === frame ? "default" : "outline"}
                          className="capitalize"
                          onClick={() => updateProfile({ frame })}
                          data-testid={`frame-${frame}`}
                        >
                          {frame}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Glow Effect</Label>
                      <div className="text-xs text-muted-foreground">Ambient background glow</div>
                    </div>
                    <Switch 
                      checked={profile.glowEnabled ?? true}
                      onCheckedChange={(checked) => updateProfile({ glowEnabled: checked })}
                      data-testid="switch-glow"
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
            <TabsContent value="profile" className="space-y-4 mt-4">
              <Card className="bg-card/50 border-white/5">
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input 
                      defaultValue={profile.displayName || ""} 
                      onChange={(e) => updateProfile({ displayName: e.target.value })}
                      onBlur={(e) => updateProfile({ displayName: e.target.value })}
                      className="bg-background/50"
                      data-testid="input-display-name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea 
                      defaultValue={profile.bio || ""}
                      onChange={(e) => updateProfile({ bio: e.target.value })} 
                      onBlur={(e) => updateProfile({ bio: e.target.value })}
                      className="bg-background/50 min-h-[100px]"
                      placeholder="Tell the multiverse about yourself..."
                      data-testid="textarea-bio"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Avatar URL</Label>
                    <Input 
                      defaultValue={profile.avatarUrl || ""}
                      onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
                      onBlur={(e) => updateProfile({ avatarUrl: e.target.value })}
                      className="bg-background/50"
                      placeholder="https://..."
                      data-testid="input-avatar-url"
                    />
                    <div className="text-xs text-muted-foreground">Use any image URL for now.</div>
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
