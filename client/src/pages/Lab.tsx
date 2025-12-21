import { useUser } from "@/hooks/use-auth";
import { useUpdateProfile, useCreateLink, useDeleteLink, useProfile } from "@/hooks/use-profile";
import { Navigation } from "@/components/Navigation";
import { ProfileCard } from "@/components/ProfileCard";
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
import { insertLinkSchema } from "@shared/schema";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const linkSchema = insertLinkSchema.omit({ userId: true });

export default function Lab() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [, setLocation] = useLocation();
  
  if (!isUserLoading && !user) {
    setLocation("/auth");
    return null;
  }

  const { data: profile } = useProfile(user?.username || "");
  const { mutate: updateProfile } = useUpdateProfile();
  const { mutate: createLink } = useCreateLink();
  const { mutate: deleteLink } = useDeleteLink();

  const [activeTab, setActiveTab] = useState("content");

  if (isUserLoading || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <BackgroundMediaManager />
      <Navigation />
      
      <main className="pt-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-display font-bold">The Lab</h1>
            <div className="text-sm text-muted-foreground">Level {profile.level}</div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-secondary/50 p-1">
              <TabsTrigger value="content" className="data-[state=active]:bg-background">
                <LinkIcon className="w-4 h-4 mr-2" /> Content
              </TabsTrigger>
              <TabsTrigger value="design" className="data-[state=active]:bg-background">
                <Palette className="w-4 h-4 mr-2" /> Design
              </TabsTrigger>
              <TabsTrigger value="media" className="data-[state=active]:bg-background">
                <Music className="w-4 h-4 mr-2" /> Media
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-background">
                <Wand2 className="w-4 h-4 mr-2" /> Identity
              </TabsTrigger>
            </TabsList>

            {/* CONTENT TAB (Links) */}
            <TabsContent value="content" className="space-y-4 mt-4">
              <Card className="bg-card/50 border-white/5">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Your Links</h3>
                    <AddLinkDialog onCreate={createLink} />
                  </div>
                  
                  <div className="space-y-2">
                    {profile.links.map((link) => (
                      <div key={link.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/5">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-xs font-bold uppercase">
                            {link.icon.slice(0, 1)}
                          </div>
                          <div className="truncate">
                            <div className="font-medium truncate">{link.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{link.url}</div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => deleteLink(link.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {profile.links.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground text-sm border border-dashed border-white/10 rounded-lg">
                        No links yet. Add one to get started.
                      </div>
                    )}
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
                      checked={profile.glowEnabled}
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
        <div className="lg:col-span-7 sticky top-24 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Live Preview</h2>
            <Button variant="outline" size="sm" className="h-8" onClick={() => window.open(`/u/${profile.username}`, '_blank')} data-testid="button-open-public">
              Open Public Page <ExternalLink className="w-3 h-3 ml-2" />
            </Button>
          </div>
          
          <div className="rounded-3xl border border-white/5 bg-background/50 backdrop-blur-sm p-8 min-h-[600px] flex items-center justify-center relative overflow-hidden">
            <div className="w-[375px] h-[667px] bg-black rounded-[3rem] border-[8px] border-zinc-800 overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-full overflow-y-auto scrollbar-hide bg-background p-4 pt-12">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-50"></div>
                 <ProfileCard user={profile} links={profile.links} isPreview />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AddLinkDialog({ onCreate }: { onCreate: (data: any) => void }) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
      icon: "default",
      order: 0
    }
  });

  const onSubmit = (data: z.infer<typeof linkSchema>) => {
    onCreate(data);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2" data-testid="button-add-link"><Plus className="w-4 h-4" /> Add Link</Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-white/10">
        <DialogHeader>
          <DialogTitle>Add New Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input {...form.register("title")} placeholder="My Portfolio" className="bg-background/50" data-testid="input-link-title" />
          </div>
          <div className="space-y-2">
            <Label>URL</Label>
            <Input {...form.register("url")} placeholder="https://..." className="bg-background/50" data-testid="input-link-url" />
          </div>
          <div className="space-y-2">
            <Label>Icon</Label>
            <select 
              {...form.register("icon")}
              className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid="select-link-icon"
            >
              <option value="default">Globe (Default)</option>
              <option value="twitter">Twitter / X</option>
              <option value="github">GitHub</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="twitch">Twitch</option>
            </select>
          </div>
          <Button type="submit" className="w-full" data-testid="button-create-link">Create Link</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
