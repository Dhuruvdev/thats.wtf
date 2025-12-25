import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
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
  Maximize,
  Smartphone,
  Monitor
} from "lucide-react";
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
  { name: "Cyberpunk", primary: "from-purple-600 to-pink-500", accent: "from-cyan-400 to-blue-500" },
  { name: "Inferno", primary: "from-orange-500 to-red-600", accent: "from-yellow-400 to-orange-500" },
  { name: "Oceanic", primary: "from-blue-600 to-cyan-400", accent: "from-emerald-400 to-teal-500" },
  { name: "Matrix", primary: "from-green-600 to-emerald-500", accent: "from-lime-400 to-green-500" },
];

export function LabCustomizationPanel({ 
  profileData, 
  onProfileChange, 
  onColorChange,
  isUpdating 
}: LabCustomizationPanelProps) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: "1", platform: "Spotify", icon: <SiSpotify />, color: "text-[#1DB954]", url: "" },
    { id: "2", platform: "Instagram", icon: <SiInstagram />, color: "text-[#E4405F]", url: "" },
    { id: "3", platform: "Snapchat", icon: <SiSnapchat />, color: "text-[#FFFC00]", url: "" },
    { id: "4", platform: "Threads", icon: <SiThreads />, color: "text-white", url: "" },
    { id: "5", platform: "Roblox", icon: <SiRoblox />, color: "text-[#FF0000]", url: "" },
  ]);

  const updateField = (field: string, value: any) => {
    onProfileChange?.({ [field]: value });
  };

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
              <span className="hidden sm:inline">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="effects" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Effects</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
              <LayoutIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Layout</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6 mt-0">
            <div className="space-y-4">
              <div className="group relative">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 block">Identity</Label>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-colors cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                    <Upload className="w-6 h-6 text-white/40 group-hover:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Change Avatar</h4>
                    <p className="text-xs text-white/40">JPG, PNG or GIF. Max 5MB.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Username</Label>
                <Input 
                  value={profileData?.displayName} 
                  onChange={(e) => updateField('displayName', e.target.value)}
                  className="h-12 bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl px-4"
                  placeholder="e.g. NeonExplorer"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Tagline</Label>
                <Input 
                  value={profileData?.bio} 
                  onChange={(e) => updateField('bio', e.target.value)}
                  className="h-12 bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl px-4"
                  placeholder="Briefly describe yourself..."
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Social Presence</Label>
                  <Button variant="ghost" size="sm" className="h-8 text-purple-400 hover:text-purple-300">
                    <Plus className="w-4 h-4 mr-1" /> Add New
                  </Button>
                </div>
                <div className="space-y-2">
                  {socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl group hover:border-white/10 transition-all">
                      <GripVertical className="w-4 h-4 text-white/20 cursor-grab" />
                      <div className={`w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center ${link.color}`}>
                        {link.icon}
                      </div>
                      <span className="flex-1 text-sm font-medium">{link.platform}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium text-white">Live View Counter</Label>
                    <p className="text-xs text-white/40">Show total profile visits</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium text-white">Follow Connection</Label>
                    <p className="text-xs text-white/40">Allow users to follow you</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-8 mt-0">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Card Geometry</Label>
                <div className="space-y-6 px-2">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-white/60">Corner Radius</span>
                      <span className="text-xs text-purple-400 font-mono">24px</span>
                    </div>
                    <Slider defaultValue={[24]} max={48} step={1} className="[&_[role=slider]]:bg-purple-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-white/60">Transparency</span>
                      <span className="text-xs text-purple-400 font-mono">15%</span>
                    </div>
                    <Slider defaultValue={[15]} max={100} step={1} className="[&_[role=slider]]:bg-purple-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Typography System</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 bg-white/5 border-white/5 justify-start px-4 rounded-xl gap-2">
                    <Type className="w-4 h-4 text-purple-400" />
                    <span className="text-xs">Inter</span>
                  </Button>
                  <Button variant="outline" className="h-12 bg-white/5 border-white/5 justify-start px-4 rounded-xl gap-2">
                    <Type className="w-4 h-4 text-pink-400" />
                    <span className="text-xs">Space G.</span>
                  </Button>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                  <Button variant="ghost" className="flex-1 h-9 rounded-lg text-xs font-bold">B</Button>
                  <Button variant="ghost" className="flex-1 h-9 rounded-lg text-xs italic">I</Button>
                  <Button variant="ghost" className="flex-1 h-9 rounded-lg text-xs underline">U</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme" className="space-y-8 mt-0">
            <div className="grid grid-cols-2 gap-4">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => onColorChange?.("primary", preset.primary)}
                  className="group relative h-24 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${preset.primary} opacity-40 group-hover:opacity-60 transition-opacity`} />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-black/40 backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white">{preset.name}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-bold text-white/40 uppercase tracking-widest">Background Engine</Label>
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dynamic Particles</span>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-white/60">Density</span>
                    <span className="text-xs text-purple-400 font-mono">Low</span>
                  </div>
                  <Slider defaultValue={[20]} max={100} step={1} className="[&_[role=slider]]:bg-purple-500" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-6 mt-0">
             <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl text-center space-y-4">
                <Sparkles className="w-12 h-12 text-purple-400 mx-auto opacity-50" />
                <h4 className="text-sm font-bold">Neon Motion Engine</h4>
                <p className="text-xs text-white/40">Select specialized entrance animations and hover states.</p>
             </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6 mt-0">
             <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 bg-white/5 border-purple-500/50 flex-col gap-2 rounded-2xl">
                   <Monitor className="w-6 h-6 text-purple-400" />
                   <span className="text-xs font-bold uppercase">Grid View</span>
                </Button>
                <Button variant="outline" className="h-24 bg-white/5 border-white/5 flex-col gap-2 rounded-2xl">
                   <Smartphone className="w-6 h-6 text-white/40" />
                   <span className="text-xs font-bold uppercase">Flow List</span>
                </Button>
             </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
