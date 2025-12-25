import { useState, useRef } from "react";
import { Download, RotateCcw, Save, Beaker, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LabProfilePreview } from "@/components/LabProfilePreview";
import { ProfileTabFull } from "@/components/ProfileTabFull";
import { DesignTab } from "@/components/DesignTab";
import { ThemeTab } from "@/components/ThemeTab";
import { EffectsTab } from "@/components/EffectsTab";
import { LayoutTab } from "@/components/LayoutTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfile } from "@/context/ProfileContext";
import { useToast } from "@/hooks/use-toast";
import { User, Palette, Layers, Sparkles, Layout as LayoutIcon } from "lucide-react";

export default function LabRedesign() {
  const { config, resetConfig, exportConfig, importConfig } = useProfile();
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [copied, setCopied] = useState(false);
  const importInputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleExport = () => {
    const json = exportConfig();
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    if (!importInputRef.current?.value) return;
    try {
      importConfig(importInputRef.current.value);
      setShowImport(false);
      toast({ title: "Success", description: "Config imported!" });
    } catch {
      toast({ title: "Error", description: "Invalid JSON", variant: "destructive" });
    }
  };

  const handleReset = () => {
    if (confirm("Reset all settings to defaults?")) {
      resetConfig();
      toast({ title: "Reset", description: "All settings restored to defaults" });
    }
  };

  const handlePublish = () => {
    toast({ title: "Published!", description: "Profile config saved to browser" });
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] text-white overflow-hidden flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <header className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Lab</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExport}
            className="text-white/40 hover:text-white"
            title="Export config"
          >
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Download className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowImport(true)}
            className="text-white/40 hover:text-white"
            title="Import config"
          >
            <Copy className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="text-white/40 hover:text-white"
            title="Reset to defaults"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          <Button
            onClick={handlePublish}
            className="bg-white text-black hover:bg-white/90 font-bold px-6 rounded-xl transition-all active:scale-95"
          >
            <Save className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <section className="flex-1 flex flex-col p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Live Preview</h2>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobilePreview(false)}
                className={`h-8 px-4 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${!isMobilePreview ? "bg-white/10 text-white" : "text-white/30"}`}
              >
                Desktop
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobilePreview(true)}
                className={`h-8 px-4 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${isMobilePreview ? "bg-white/10 text-white" : "text-white/30"}`}
              >
                Mobile
              </Button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className={`transition-all duration-700 ease-in-out flex items-center justify-center ${isMobilePreview ? "w-[360px] h-[640px]" : "w-full max-w-4xl h-full"}`}>
              <LabProfilePreview
                isMobilePreview={isMobilePreview}
                username={config.displayName}
                tagline={config.bio}
                views={config.views}
                avatarUrl={config.avatarUrl}
                backgroundUrl={config.backgroundUrl}
                audioUrl={config.audioUrl}
                geometry={config.geometry}
                entranceAnimation={config.entranceAnimation}
                effectIntensity={config.effectIntensity}
                effectSpeed={config.effectSpeed}
              />
            </div>
          </div>
        </section>

        <section className="w-full lg:w-[500px] border-l border-white/5 bg-[#0f0f12]/80 backdrop-blur-3xl flex flex-col">
          <div className="p-6 pb-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Lab Editor</h2>
            <p className="text-sm text-white/40 mt-1">Customize your profile in real-time</p>
          </div>

          <Tabs defaultValue="profile" className="flex-1 flex flex-col">
            <div className="px-6 py-4">
              <TabsList className="w-full bg-white/5 p-1 border border-white/5 rounded-xl h-12">
                <TabsTrigger value="profile" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="design" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Design</span>
                </TabsTrigger>
                <TabsTrigger value="theme" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
                  <Layers className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Theme</span>
                </TabsTrigger>
                <TabsTrigger value="effects" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Effects</span>
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex-1 gap-2 data-[state=active]:bg-white/10 rounded-lg">
                  <LayoutIcon className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Layout</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24">
              <TabsContent value="profile" className="space-y-6 mt-0">
                <ProfileTabFull />
              </TabsContent>
              <TabsContent value="design" className="space-y-6 mt-0">
                <DesignTab />
              </TabsContent>
              <TabsContent value="theme" className="space-y-6 mt-0">
                <ThemeTab />
              </TabsContent>
              <TabsContent value="effects" className="space-y-6 mt-0">
                <EffectsTab />
              </TabsContent>
              <TabsContent value="layout" className="space-y-6 mt-0">
                <LayoutTab />
              </TabsContent>
            </div>
          </Tabs>
        </section>
      </main>

      <Dialog open={showImport} onOpenChange={setShowImport}>
        <DialogContent className="bg-[#0f0f12] border-white/5">
          <DialogHeader>
            <DialogTitle className="text-white">Import Configuration</DialogTitle>
          </DialogHeader>
          <textarea
            ref={importInputRef}
            placeholder="Paste your JSON config here..."
            className="w-full h-64 p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none resize-none"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowImport(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleImport} className="flex-1 bg-white text-black hover:bg-white/90">
              Import
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
