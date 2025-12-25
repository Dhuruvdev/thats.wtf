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
  profileData?: {
    displayName?: string;
    bio?: string;
    views?: number;
    accentColor?: string;
  };
  onProfileChange?: (data: any) => void;
  onColorChange?: (type: string, value: string) => void;
  isUpdating?: boolean;
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

export function LabCustomizationPanel({ 
  profileData, 
  onProfileChange, 
  onColorChange,
  isUpdating 
}: LabCustomizationPanelProps) {
  const [displayName, setDisplayName] = useState(profileData?.displayName || "");
  const [bio, setBio] = useState(profileData?.bio || "");
  const [views, setViews] = useState(profileData?.views?.toString() || "0");
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
    const data = { 
      displayName, 
      bio, 
      views: parseInt(views) || 0,
      showViews, 
      showFollowButton 
    };
    onProfileChange?.(data);
  };

  const handleColorUpdate = () => {
    onColorChange?.("primary", primaryColor);
    onColorChange?.("accent", accentColor);
    onColorChange?.("background", backgroundColor);
  };

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Customization Center</h2>

      <Tabs defaultValue="profile" className="w-full flex-1 flex flex-col">
        {/* Tabs - Responsive */}
        <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0 px-4 sm:px-0">
          <TabsList className="bg-white/5 border border-white/10 rounded-lg p-1 inline-flex min-w-full sm:w-auto">
            <TabsTrigger value="profile" className="text-xs sm:text-sm text-white whitespace-nowrap px-2 sm:px-3 py-2" data-testid="tab-profile">Profile</TabsTrigger>
            <TabsTrigger value="design" className="text-xs sm:text-sm text-white whitespace-nowrap px-2 sm:px-3 py-2" data-testid="tab-design">Design</TabsTrigger>
            <TabsTrigger value="theme" className="text-xs sm:text-sm text-white whitespace-nowrap px-2 sm:px-3 py-2" data-testid="tab-theme">Theme</TabsTrigger>
            <TabsTrigger value="effects" className="text-xs sm:text-sm text-white whitespace-nowrap px-2 sm:px-3 py-2" data-testid="tab-effects">Effects</TabsTrigger>
            <TabsTrigger value="layout" className="text-xs sm:text-sm text-white whitespace-nowrap px-2 sm:px-3 py-2" data-testid="tab-layout">Layout</TabsTrigger>
          </TabsList>
        </div>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4 sm:space-y-6 mt-0 flex-1">
          {/* Display Name */}
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="displayName" className="text-white text-xs sm:text-sm font-semibold">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 rounded-lg text-sm h-10 sm:h-auto"
              data-testid="input-displayname"
              placeholder="Your Name"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="bio" className="text-white text-xs sm:text-sm font-semibold">Bio / Tagline</Label>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 rounded-lg text-sm h-10 sm:h-auto"
              data-testid="input-bio"
              placeholder="Your bio"
            />
          </div>

          {/* View Count */}
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="views" className="text-white text-xs sm:text-sm font-semibold">View Count</Label>
            <Input
              id="views"
              type="number"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 rounded-lg text-sm h-10 sm:h-auto"
              data-testid="input-views"
            />
          </div>

          {/* Social Links */}
          <div className="space-y-2 sm:space-y-3">
            <label className="text-white font-semibold text-xs sm:text-sm">Social Links</label>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 rounded-lg p-2 sm:p-3"
                  data-testid={`social-link-${link.platform.toLowerCase()}`}
                >
                  <GripVertical className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <div className={`w-5 h-5 ${link.color} flex-shrink-0`}>{link.icon}</div>
                  <span className="text-white text-xs sm:text-sm flex-1 truncate">{link.platform}</span>
                  <button
                    onClick={() => handleRemoveSocialLink(link.id)}
                    className="text-white/40 hover:text-red-400 transition-colors flex-shrink-0"
                    data-testid={`button-remove-${link.platform.toLowerCase()}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 gap-2 text-sm h-10"
              data-testid="button-add-link"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </Button>
          </div>

          {/* Toggles */}
          <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-white text-xs sm:text-sm">Show: Views counter</span>
              <Switch
                checked={showViews}
                onCheckedChange={setShowViews}
                data-testid="toggle-views"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white text-xs sm:text-sm">Follow button</span>
              <Switch
                checked={showFollowButton}
                onCheckedChange={setShowFollowButton}
                data-testid="toggle-follow"
              />
            </div>
          </div>
        </TabsContent>

        {/* Design Tab */}
        <TabsContent value="design" className="space-y-4 sm:space-y-6 mt-0 flex-1">
          <div className="space-y-3 sm:space-y-4">
            <label className="text-white font-semibold text-xs sm:text-sm block">Primary Color</label>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setPrimaryColor(preset.primary);
                    handleColorUpdate();
                  }}
                  className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                    primaryColor === preset.primary ? "border-white" : "border-white/20"
                  }`}
                  data-testid={`color-preset-${preset.name.toLowerCase()}`}
                >
                  <div className={`h-6 sm:h-8 rounded bg-gradient-to-r ${preset.primary}`} />
                  <p className="text-white text-xs mt-1 sm:mt-2 text-center">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <label className="text-white font-semibold text-xs sm:text-sm block">Background</label>
            <div className="grid grid-cols-2 gap-2">
              {BACKGROUND_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setBackgroundColor(preset.value);
                    handleColorUpdate();
                  }}
                  className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                    backgroundColor === preset.value ? "border-white" : "border-white/20"
                  }`}
                  data-testid={`bg-preset-${preset.name.toLowerCase()}`}
                >
                  <div className={`h-6 sm:h-8 rounded bg-gradient-to-r ${preset.value}`} />
                  <p className="text-white text-xs mt-1 sm:mt-2 text-center">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Theme Tab */}
        <TabsContent value="theme" className="space-y-3 sm:space-y-4 mt-0 flex-1">
          <label className="text-white font-semibold text-xs sm:text-sm block">Theme Options</label>
          <div className="space-y-2">
            <button className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="theme-option-light">
              <div className="text-white font-medium text-sm">Light Mode</div>
              <div className="text-white/40 text-xs">Bright, clean aesthetic</div>
            </button>
            <button className="w-full p-2 sm:p-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="theme-option-dark">
              <div className="text-white font-medium text-sm">Dark Mode</div>
              <div className="text-white/40 text-xs">Current theme (Recommended)</div>
            </button>
            <button className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="theme-option-neon">
              <div className="text-white font-medium text-sm">Neon Mode</div>
              <div className="text-white/40 text-xs">Bright neon colors</div>
            </button>
          </div>
        </TabsContent>

        {/* Effects Tab */}
        <TabsContent value="effects" className="space-y-3 sm:space-y-4 mt-0 flex-1">
          <label className="text-white font-semibold text-xs sm:text-sm block">Visual Effects</label>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-white text-xs sm:text-sm">Glow Effect</span>
              <Switch defaultChecked data-testid="toggle-glow" />
            </div>
            <div className="flex items-center justify-between p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-white text-xs sm:text-sm">Animation</span>
              <Switch defaultChecked data-testid="toggle-animation" />
            </div>
            <div className="flex items-center justify-between p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-white text-xs sm:text-sm">Blur Background</span>
              <Switch defaultChecked data-testid="toggle-blur" />
            </div>
            <div className="flex items-center justify-between p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-white text-xs sm:text-sm">Particles</span>
              <Switch defaultChecked data-testid="toggle-particles" />
            </div>
          </div>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-3 sm:space-y-4 mt-0 flex-1">
          <label className="text-white font-semibold text-xs sm:text-sm block">Layout Options</label>
          <div className="space-y-2">
            <button className="w-full p-2 sm:p-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="layout-option-center">
              <div className="text-white font-medium text-sm">Centered</div>
              <div className="text-white/40 text-xs">Current layout (Recommended)</div>
            </button>
            <button className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="layout-option-left">
              <div className="text-white font-medium text-sm">Left Aligned</div>
              <div className="text-white/40 text-xs">Content on left side</div>
            </button>
            <button className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left" data-testid="layout-option-card">
              <div className="text-white font-medium text-sm">Card Grid</div>
              <div className="text-white/40 text-xs">Multiple cards layout</div>
            </button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Actions */}
      <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-white/10 mt-4 sm:mt-6">
        <Button
          variant="outline"
          className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 rounded-lg text-sm h-10 sm:h-auto"
          data-testid="button-reset"
          disabled={isUpdating}
        >
          Reset
        </Button>
        <Button
          onClick={handleProfileUpdate}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg text-sm h-10 sm:h-auto"
          data-testid="button-publish"
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Publish"}
        </Button>
      </div>
    </div>
  );
}
