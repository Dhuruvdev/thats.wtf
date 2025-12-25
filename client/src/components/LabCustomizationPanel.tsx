import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, GripVertical, Trash2 } from "lucide-react";
import { SiInstagram, SiThreads, SiRoblox, SiSpotify, SiSnapchat } from "react-icons/si";

interface SocialLink {
  id: string;
  platform: string;
  icon: React.ReactNode;
  color: string;
  url: string;
}

export function LabCustomizationPanel() {
  const [username, setUsername] = useState("kinjal.fr");
  const [tagline, setTagline] = useState("just exploring the world");
  const [showViews, setShowViews] = useState(true);
  const [showFollowButton, setShowFollowButton] = useState(true);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: "1", platform: "Spotify", icon: <SiSpotify />, color: "text-green-400", url: "https://spotify.com" },
    { id: "2", platform: "Instagram", icon: <SiInstagram />, color: "text-pink-400", url: "https://instagram.com" },
    { id: "3", platform: "Snapchat", icon: <SiSnapchat />, color: "text-yellow-300", url: "https://snapchat.com" },
    { id: "4", platform: "Threads", icon: <SiThreads />, color: "text-white", url: "https://threads.net" },
    { id: "5", platform: "Roblox", icon: <SiRoblox />, color: "text-red-400", url: "https://roblox.com" },
  ]);

  const handleRemoveSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Customization Center</h2>

      <Tabs defaultValue="profile" className="w-full flex-1 flex flex-col">
        <TabsList className="bg-white/5 border border-white/10 rounded-lg p-1 mb-6">
          <TabsTrigger value="profile" className="text-white" data-testid="tab-profile">Profile</TabsTrigger>
          <TabsTrigger value="design" className="text-white" data-testid="tab-design">Design</TabsTrigger>
          <TabsTrigger value="theme" className="text-white" data-testid="tab-theme">Theme</TabsTrigger>
          <TabsTrigger value="effects" className="text-white" data-testid="tab-effects">Effects</TabsTrigger>
          <TabsTrigger value="layout" className="text-white" data-testid="tab-layout">Layout</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 mt-0">
          {/* Profile Picture */}
          <div className="space-y-3">
            <label className="text-white font-semibold text-sm">Profile Picture</label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-900 flex items-center justify-center text-white font-bold">
                K
              </div>
              <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10" data-testid="button-upload">
                Upload
              </Button>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white text-sm font-semibold">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 rounded-lg"
              data-testid="input-username"
            />
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <Label htmlFor="tagline" className="text-white text-sm font-semibold">Tagline</Label>
            <Input
              id="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 rounded-lg"
              data-testid="input-tagline"
            />
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <label className="text-white font-semibold text-sm">Social Links</label>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3"
                  data-testid={`social-link-${link.platform.toLowerCase()}`}
                >
                  <GripVertical className="w-4 h-4 text-white/40" />
                  <div className={`w-5 h-5 ${link.color}`}>{link.icon}</div>
                  <span className="text-white text-sm flex-1">{link.platform}</span>
                  <button
                    onClick={() => handleRemoveSocialLink(link.id)}
                    className="text-white/40 hover:text-red-400 transition-colors"
                    data-testid={`button-remove-${link.platform.toLowerCase()}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 gap-2"
              data-testid="button-add-link"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </Button>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">Show: Views counter</span>
              <Switch
                checked={showViews}
                onCheckedChange={setShowViews}
                data-testid="toggle-views"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">Follow button</span>
              <Switch
                checked={showFollowButton}
                onCheckedChange={setShowFollowButton}
                data-testid="toggle-follow"
              />
            </div>
          </div>
        </TabsContent>

        {/* Design Tab */}
        <TabsContent value="design" className="space-y-4 mt-0">
          <div className="text-white/60 text-sm p-4 bg-white/5 rounded-lg">
            Design customization options coming soon
          </div>
        </TabsContent>

        {/* Theme Tab */}
        <TabsContent value="theme" className="space-y-4 mt-0">
          <div className="text-white/60 text-sm p-4 bg-white/5 rounded-lg">
            Theme customization options coming soon
          </div>
        </TabsContent>

        {/* Effects Tab */}
        <TabsContent value="effects" className="space-y-4 mt-0">
          <div className="text-white/60 text-sm p-4 bg-white/5 rounded-lg">
            Effects customization options coming soon
          </div>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-4 mt-0">
          <div className="text-white/60 text-sm p-4 bg-white/5 rounded-lg">
            Layout customization options coming soon
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Actions */}
      <div className="flex gap-3 pt-6 border-t border-white/10 mt-6">
        <Button
          variant="outline"
          className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 rounded-lg"
          data-testid="button-reset"
        >
          Reset
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg"
          data-testid="button-publish"
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
