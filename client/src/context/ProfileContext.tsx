import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface ProfileConfig {
  displayName: string;
  bio: string;
  views: number;
  avatarUrl: string;
  backgroundUrl: string;
  audioUrl: string;
  accentColor: string;
  geometry: { radius: number; blur: number; opacity: number };
  theme: { background: string; gradient: string; blurAmount: number; showBackground: boolean };
  entranceAnimation: string;
  effectIntensity: number;
  effectSpeed: number;
  layout: { showViews: boolean; showAbout: boolean; spacing: number };
  socialLinks: SocialLink[];
}

const defaultConfig: ProfileConfig = {
  displayName: "Alex Rivera",
  bio: "creative director & product designer",
  views: 1240,
  avatarUrl: "",
  backgroundUrl: "",
  audioUrl: "",
  accentColor: "#7c3aed",
  geometry: { radius: 40, blur: 20, opacity: 3 },
  theme: { background: "dark", gradient: "from-purple-500 to-pink-500", blurAmount: 20, showBackground: true },
  entranceAnimation: "none",
  effectIntensity: 1,
  effectSpeed: 1,
  layout: { showViews: true, showAbout: true, spacing: 16 },
  socialLinks: [
    { id: "1", platform: "Spotify", url: "" },
    { id: "2", platform: "Instagram", url: "" },
    { id: "3", platform: "Snapchat", url: "" },
    { id: "4", platform: "Threads", url: "" },
    { id: "5", platform: "Roblox", url: "" },
  ],
};

interface ProfileContextType {
  config: ProfileConfig;
  updateConfig: (partial: Partial<ProfileConfig>) => void;
  updateGeometry: (key: string, value: number) => void;
  updateTheme: (key: string, value: any) => void;
  updateLayout: (key: string, value: any) => void;
  updateSocialLink: (id: string, url: string) => void;
  removeSocialLink: (id: string) => void;
  addSocialLink: (platform: string) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (json: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ProfileConfig>(() => {
    const saved = localStorage.getItem("profile-lab-config");
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem("profile-lab-config", JSON.stringify(config));
  }, [config]);

  const updateConfig = (partial: Partial<ProfileConfig>) =>
    setConfig((prev) => ({ ...prev, ...partial }));

  const updateGeometry = (key: string, value: number) =>
    setConfig((prev) => ({
      ...prev,
      geometry: { ...prev.geometry, [key]: value },
    }));

  const updateTheme = (key: string, value: any) =>
    setConfig((prev) => ({
      ...prev,
      theme: { ...prev.theme, [key]: value },
    }));

  const updateLayout = (key: string, value: any) =>
    setConfig((prev) => ({
      ...prev,
      layout: { ...prev.layout, [key]: value },
    }));

  const updateSocialLink = (id: string, url: string) =>
    setConfig((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) =>
        link.id === id ? { ...link, url } : link
      ),
    }));

  const removeSocialLink = (id: string) =>
    setConfig((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((link) => link.id !== id),
    }));

  const addSocialLink = (platform: string) =>
    setConfig((prev) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        { id: Math.random().toString(36).substr(2, 9), platform, url: "" },
      ],
    }));

  const resetConfig = () => setConfig(defaultConfig);

  const exportConfig = () => JSON.stringify(config, null, 2);

  const importConfig = (json: string) => {
    try {
      const imported = JSON.parse(json);
      setConfig({ ...defaultConfig, ...imported });
    } catch {
      alert("Invalid JSON");
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        config,
        updateConfig,
        updateGeometry,
        updateTheme,
        updateLayout,
        updateSocialLink,
        removeSocialLink,
        addSocialLink,
        resetConfig,
        exportConfig,
        importConfig,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within ProfileProvider");
  return context;
}
