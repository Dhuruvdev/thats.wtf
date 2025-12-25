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

interface LabCustomizationPanelProps {
  onProfileChange?: (data: any) => void;
  onColorChange?: (type: string, value: string) => void;
}

const COLOR_PRESETS = [
  { name: "Purple-Pink", primary: "from-purple-500 to-pink-500", accent: "from-cyan-400 to-blue-500" },
  { name: "Orange-Red", primary: "from-orange-500 to-red-500", accent: "from-yellow-300 to-orange-400" },
  { name: "Blue-Cyan", primary: "from-blue-600 to-cyan-500", accent: "from-green-400 to-emerald-500" },
  { name: "Pink-Purple", primary: "from-pink-600 to-purple-600", accent: "from-pink-400 to-purple-400" },
];

const BACKGROUND_PRESETS = [
  { name: "Dark Slate", value: "from-slate-950 via-slate-900 to-slate-950" },
  { name: "Dark Navy", value: "from-slate-950 via-blue-950 to-slate-950" },
  { name: "Deep Purple", value: "from-slate-950 via-purple-950 to-slate-950" },
  { name: "Carbon Black", value: "from-black via-slate-900 to-black" },
];

export function LabCustomizationPanel({ onProfileChange, onColorChange }: LabCustomizationPanelProps) {
  const [username, setUsername] = useState("kinjal.fr");
  const [tagline, setTagline] = useState("just exploring the world");
  const [views, setViews] = useState("45");
  const [showViews, setShowViews] = useState(true);
  const [showFollowButton, setShowFollowButton] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("from-purple-500 to-pink-500");
  const [backgroundColor, setBackgroundColor] = useState("from-slate-950 via-slate-900 to-slate-950");
  const [accentColor, setAccentColor] = useState("from-cyan-400 to-blue-500");

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

  const handleProfileUpdate = () => {
    const data = { username, tagline, views: parseInt(views), showViews, showFollowButton };
    onProfileChange?.(data);
  };

  const handleColorUpdate = () => {
    onColorChange?.("primary", primaryColor);
    onColorChange?.("accent", accentColor);
    onColorChange?.("background", backgroundColor);
  };

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Customization Center</h2>

      <Tabs defaultValue="profile" className="w-full flex-1 flex flex-col">
        <TabsList className="bg-white/5 border border-white/10 rounded-lg p-1 mb-6 overflow-x-auto">
          <TabsTrigger value="profile" className="text-white whitespace-nowrap" data-testid="tab-profile">Profile</TabsTrigger>
          <TabsTrigger value="design" className="text-white whitespace-nowrap" data-testid="tab-design">Design</TabsTrigger>
          <TabsTrigger value="theme" className="text-white whitespace-nowrap" data-testid="tab-theme">Theme</TabsTrigger>
          <TabsTrigger value="effects" className="text-white whitespace-nowrap" data-testid="tab-effects">Effects</TabsTrigger>
          <TabsTrigger value="layout" className="text-white whitespace-nowrap" data-testid="tab-layout">Layout</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 mt-0 flex-1">
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

          {/* View Count */}
          <div className="space-y-2">
            <Label htmlFor="views" className="text-white text-sm font-semibold">View Count</Label>
            <Input
              id="views"
              type="number"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 rounded-lg"
              data-testid="input-views"
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
        <TabsContent value="design" className="space-y-6 mt-0 flex-1">
          <div className="space-y-4">
            <label className="text-white font-semibold text-sm block">Primary Color</label>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setPrimaryColor(preset.primary)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    primaryColor === preset.primary ? "border-white" : "border-white/20"
                  }`}
                  data-testid={`color-preset-${preset.name.toLowerCase()}`}
                >
                  <div className={`h-8 rounded bg-gradient-to-r ${preset.primary}`} />
                  <p className="text-white text-xs mt-2 text-center">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-white font-semibold text-sm block">Background</label>
            <div className="grid grid-cols-2 gap-2">
              {BACKGROUND_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setBackgroundColor(preset.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    backgroundColor === preset.value ? "border-white" : "border-white/20"
                  }`}
                  data-testid={`bg-preset-${preset.name.toLowerCase()}`}
                >
                  <div className={`h-8 rounded bg-gradient-to-r ${preset.value}`} />
                  <p className="text-white text-xs mt-2 text-center">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleColorUpdate} className="w-full bg-purple-600 hover:bg-purple-700 text-white" data-testid="button-apply-colors">
            Apply Design
          </Button>
        </TabsContent>

        {/* Theme Tab */}
        <TabsContent value="theme" className="space-y-4 mt-0 flex-1">
          <div className="space-y-3">
            <label className="text-white font-semibold text-sm">Theme Options</label>
            <div className="space-y-2">
              <button className="w-full p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="theme-option-light">
                <div className="text-white font-medium">Light Mode</div>
                <div className="text-white/40 text-sm">Bright, clean aesthetic</div>
              </button>
              <button className="w-full p-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="theme-option-dark">
                <div className="text-white font-medium">Dark Mode</div>
                <div className="text-white/40 text-sm">Current theme (Recommended)</div>
              </button>
              <button className="w-full p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="theme-option-neon">
                <div className="text-white font-medium">Neon Mode</div>
                <div className="text-white/40 text-sm">Bright neon colors</div>
              </button>
            </div>
          </div>
        </TabsContent>

        {/* Effects Tab */}
        <TabsContent value="effects" className="space-y-4 mt-0 flex-1">
          <div className="space-y-3">
            <label className="text-white font-semibold text-sm">Visual Effects</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-white text-sm">Glow Effect</span>
                <Switch defaultChecked data-testid="toggle-glow" />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-white text-sm">Animation</span>
                <Switch defaultChecked data-testid="toggle-animation" />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-white text-sm">Blur Background</span>
                <Switch defaultChecked data-testid="toggle-blur" />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-white text-sm">Particles</span>
                <Switch defaultChecked data-testid="toggle-particles" />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-4 mt-0 flex-1">
          <div className="space-y-3">
            <label className="text-white font-semibold text-sm">Layout Options</label>
            <div className="space-y-2">
              <button className="w-full p-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="layout-option-center">
                <div className="text-white font-medium">Centered</div>
                <div className="text-white/40 text-sm">Current layout (Recommended)</div>
              </button>
              <button className="w-full p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="layout-option-left">
                <div className="text-white font-medium">Left Aligned</div>
                <div className="text-white/40 text-sm">Content on left side</div>
              </button>
              <button className="w-full p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="layout-option-card">
                <div className="text-white font-medium">Card Grid</div>
                <div className="text-white/40 text-sm">Multiple cards layout</div>
              </button>
            </div>
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
          onClick={handleProfileUpdate}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg"
          data-testid="button-publish"
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
