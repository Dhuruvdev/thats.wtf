import { useParams, useLocation } from "wouter";
import { useProfile, useAddView } from "@/hooks/use-profile";
import { Navigation } from "@/components/Navigation";
import { ProfileRenderer } from "@/components/ProfileRenderer";
import { ProfileCustomizer } from "@/components/ProfileCustomizer";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading, error } = useProfile(username!);
  const { mutate: addView } = useAddView();

  useEffect(() => {
    if (username) {
      addView(username);
    }
  }, [username, addView]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="text-4xl">404</div>
        <div className="text-muted-foreground">User not found in this dimension.</div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      
      {/* Background that matches user theme roughly */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div 
          className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full blur-[150px] opacity-20" 
          style={{ background: profile.accentColor || "#7c3aed" }}
        />
      </div>

      <main className="pt-24 pb-12 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <ProfileRenderer user={profile} blocks={profile.blocks || []} />
        
        <div className="mt-12 text-center text-xs text-white/20 font-display tracking-widest uppercase">
          Powered by Lab.dev
        </div>
      </main>
    </div>
  );
}
