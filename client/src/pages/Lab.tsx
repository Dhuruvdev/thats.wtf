import { useState, useEffect, useCallback, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { FolderOpen, X } from "lucide-react";
import type { User } from "@shared/schema";

export default function Lab() {
  const { toast } = useToast();
  
  // Use a constant for queryKey to prevent re-creation
  const userQueryKey = useMemo(() => ["/api/user"], []);

  const { data: user } = useQuery<User>({
    queryKey: userQueryKey,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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
    onSuccess: (updatedUser) => {
      toast({ title: "Identity Updated" });
      // Use setQueryData for immediate update instead of invalidate
      queryClient.setQueryData(userQueryKey, updatedUser);
    }
  });

  const updateAsset = useCallback((path: string[], value: any) => {
    if (!themeConfig) return;
    
    setThemeConfig(prev => {
      if (!prev) return null;
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      
      // Trigger mutation but don't wait for state sync
      mutation.mutate(newConfig);
      return newConfig;
    });
  }, [themeConfig, mutation]);

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
              <div 
                className="static-preview" 
                style={{ 
                  backgroundColor: themeConfig.background.value,
                  width: '100%',
                  height: '100%'
                }} 
              />
            )}
            <span className="asset-tag">{themeConfig.background.type.toUpperCase()}</span>
            <button className="remove-btn" onClick={(e) => {
              e.stopPropagation();
              updateAsset(['background', 'value'], '#000000');
            }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Audio Section */}
        <div className="asset-group">
          <label className="asset-label">Audio</label>
          <div className="preview-box" onClick={() => updateAsset(['audio', 'enabled'], !themeConfig.audio.enabled)}>
            <div className="audio-manager-btn">
              <FolderOpen size={48} strokeWidth={1} />
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                {themeConfig.audio.enabled ? "Audio Enabled" : "Audio Disabled"}
              </p>
            </div>
          </div>
        </div>

        {/* Custom Cursor Section */}
        <div className="asset-group">
          <label className="asset-label">Custom Cursor</label>
          <div className="preview-box">
             <div className="audio-manager-btn">
               <div style={{ 
                 width: '40px', 
                 height: '40px', 
                 background: themeConfig.cursor.color, 
                 borderRadius: '50%', 
                 boxShadow: `0 0 20px ${themeConfig.cursor.color}` 
               }} />
               <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Type: {themeConfig.cursor.type}</p>
             </div>
             <button className="remove-btn" onClick={(e) => {
               e.stopPropagation();
               updateAsset(['cursor', 'type'], 'default');
             }}>
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
