import { useState, useRef } from "react";
import { Download, RotateCcw, Save, Beaker, Copy, Check, Monitor, Layers2, Settings, Plus, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LabProfilePreview } from "@/components/LabProfilePreview";
import { ProfileTabFull } from "@/components/ProfileTabFull";
import { DesignTab } from "@/components/DesignTab";
import { ThemeTab } from "@/components/ThemeTab";
import { EffectsTab } from "@/components/EffectsTab";
import { LayoutTab } from "@/components/LayoutTab";
import { useProfile } from "@/context/ProfileContext";
import { useToast } from "@/hooks/use-toast";
import { User, Sparkles } from "lucide-react";

export default function LabRedesign() {
  const { config, resetConfig, exportConfig, importConfig } = useProfile();
  const [activeTab, setActiveTab] = useState("profile");
  const [viewMode, setViewMode] = useState<"editor" | "preview">("editor");
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

  const tabs = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "design", icon: Monitor, label: "Design" },
    { id: "explore", icon: Layers2, label: "Explore" },
    { id: "effects", icon: Sparkles, label: "Effects" },
    { id: "add", icon: Plus, label: "Add" },
    { id: "layout", icon: LayoutGrid, label: "Layout" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTabFull />;
      case "design":
        return <DesignTab />;
      case "explore":
        return <ThemeTab />;
      case "effects":
        return <EffectsTab />;
      case "add":
        return <div className="text-white/40 text-center py-12">Coming soon...</div>;
      case "layout":
        return <LayoutTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] text-white overflow-hidden flex flex-col relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Header */}
      <header className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Beaker className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Lab</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePublish}
            className="ml-auto md:ml-0 text-white/40 hover:text-white"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExport}
            className="text-white/40 hover:text-white"
            title="Export config"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowImport(true)}
            className="text-white/40 hover:text-white"
            title="Import config"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="text-white/40 hover:text-white"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            onClick={handlePublish}
            className="bg-white text-black hover:bg-white/90 font-bold px-4 rounded-lg transition-all active:scale-95 text-sm"
          >
            <Save className="w-3 h-3 mr-2" />
            Publish
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* View Mode Switcher */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 flex bg-black/80 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl">
          <button
            onClick={() => setViewMode("preview")}
            className={`h-11 px-10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${
              viewMode === "preview" 
                ? "bg-cyan-400 text-black shadow-[0_0_30px_rgba(34,211,238,0.5)] scale-105" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${viewMode === "preview" ? "bg-black animate-pulse" : "bg-white/20"}`} />
            Preview
          </button>
          <button
            onClick={() => setViewMode("editor")}
            className={`h-11 px-10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${
              viewMode === "editor" 
                ? "bg-white/10 text-white border border-white/10 scale-105" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${viewMode === "editor" ? "bg-white animate-pulse" : "bg-white/20"}`} />
            Editor
          </button>
        </div>

        {/* Preview Section */}
        <section className={`flex-1 flex flex-col p-4 md:p-8 overflow-y-auto bg-gradient-to-b from-transparent via-purple-600/5 to-transparent transition-all duration-500 ${viewMode === "editor" ? "opacity-40 scale-[0.98] blur-sm pointer-events-none" : "opacity-100 scale-100 blur-0"}`}>
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Live Preview</h2>
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobilePreview(false)}
                className={`h-7 px-3 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${!isMobilePreview ? "bg-white/10 text-white" : "text-white/30"}`}
              >
                Desktop
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobilePreview(true)}
                className={`h-7 px-3 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${isMobilePreview ? "bg-white/10 text-white" : "text-white/30"}`}
              >
                Mobile
              </Button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className={`transition-all duration-700 ease-in-out flex items-center justify-center ${isMobilePreview ? "w-[320px] h-[580px] md:w-[360px] md:h-[640px]" : "w-full max-w-2xl h-auto"}`}>
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
                decorations={config.decorations}
              />
            </div>
          </div>
        </section>

        {/* Tab Content Section (Editor) */}
        <section className={`absolute inset-0 z-10 overflow-y-auto bg-[#0f0f12]/80 backdrop-blur-3xl transition-all duration-500 ${viewMode === "preview" ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}>
          <div className="p-4 md:p-6 pt-20">
            <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">Lab Editor</h2>
            <p className="text-xs md:text-sm text-white/40 mt-1">Customize your profile in real-time</p>
          </div>

          <div className="px-4 md:px-6 pb-40">
            {renderTabContent()}
          </div>
        </section>
      </main>

      {/* Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-white/5 bg-[#0a0a0c]/95 backdrop-blur-xl flex items-center justify-around z-40">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center w-12 h-12 md:w-16 md:h-16 transition-all rounded-lg ${
                isActive
                  ? "text-white bg-white/10 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  : "text-white/40 hover:text-white/60"
              }`}
              title={tab.label}
              data-testid={`button-tab-${tab.id}`}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-wider mt-0.5 hidden md:block">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Import Dialog */}
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
