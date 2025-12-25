import { LabProfilePreview } from "@/components/LabProfilePreview";
import { useProfile } from "@/hooks/use-profile";
import { useUser } from "@/hooks/use-auth";
import LoadingPage from "@/components/LoadingPage";

export default function ProfilePage() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: profile, isLoading: isProfileLoading } = useProfile(user?.username || "demo");

  if (isUserLoading || isProfileLoading) {
    return <LoadingPage />;
  }

  // Use profile data from query, with hardcoded fallbacks if no data exists
  const displayName = profile?.displayName || user?.username || "Alex Rivera";
  const bio = profile?.bio || "creative director & product designer";
  const views = profile?.views || 1240;

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <LabProfilePreview 
          username={displayName}
          tagline={bio}
          views={views}
          avatarUrl={profile?.avatarUrl || undefined}
          backgroundUrl={profile?.backgroundUrl || undefined}
          audioUrl={profile?.audioUrl || undefined}
          isMobilePreview={false}
        />
      </div>
    </div>
  );
}
