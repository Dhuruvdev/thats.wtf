import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { FolderOpen, X, ChevronRight } from "lucide-react";
import type { User } from "@shared/schema";

export default function Lab() {
  const { toast } = useToast();
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
    staleTime: Infinity,
  });

  const [themeConfig, setThemeConfig] = useState<User["themeConfig"] | null>(null);

  useEffect(() => {
    if (user && !themeConfig) {
      setThemeConfig(user.themeConfig);
    }
  }, [user, themeConfig]);

  const mutation = useMutation({
    mutationFn: async (config: User["themeConfig"]) => {
      const res = await apiRequest("PATCH", "/api/user", { themeConfig: config });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Identity Updated" });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    }
  });

  const updateAsset = (path: string[], value: any) => {
    if (!themeConfig) return;
    const newConfig = JSON.parse(JSON.stringify(themeConfig));
    let current = newConfig;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setThemeConfig(newConfig);
    mutation.mutate(newConfig);
  };

  if (!themeConfig) return null;

  return (
    <div className="lab-container">
      <h1 className="section-title">Assets Uploader</h1>
      
      <div className="uploader-card">
        {/* Background Section */}
        <div className="asset-group">
          <label className="asset-label">Background</label>
          <div className="preview-box">
            {themeConfig.background.type === 'animated' ? (
              <video autoPlay loop muted src={themeConfig.background.value || ''} />
            ) : (
              <img src={themeConfig.background.value || ''} alt="" />
            )}
            <span className="asset-tag">.MP4</span>
            <button className="remove-btn" onClick={() => updateAsset(['background', 'value'], '')}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Audio Section */}
        <div className="asset-group">
          <label className="asset-label">Audio</label>
          <div className="preview-box">
            <div className="audio-manager-btn">
              <FolderOpen size={48} strokeWidth={1} />
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Click to open audio manager</p>
            </div>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="asset-group">
          <label className="asset-label">Profile Avatar</label>
          <div className="preview-box">
            <img src={user?.avatarUrl || ''} alt="" />
            <span className="asset-tag">.WEBP</span>
            <button className="remove-btn" onClick={() => {}}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Custom Cursor Section */}
        <div className="asset-group">
          <label className="asset-label">Custom Cursor</label>
          <div className="preview-box">
             <div className="audio-manager-btn">
               <div style={{ width: '40px', height: '40px', background: themeConfig.cursor.color, borderRadius: '50%', boxShadow: '0 0 20px var(--accent)' }} />
               <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Type: {themeConfig.cursor.type}</p>
             </div>
             <button className="remove-btn" onClick={() => updateAsset(['cursor', 'type'], 'default')}>
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
