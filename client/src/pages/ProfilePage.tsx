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

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <LabProfilePreview 
          username={profile?.displayName || user?.username || "Alex Rivera"}
          tagline={profile?.bio || "creative director & product designer"}
          views={profile?.views || 1240}
          avatarUrl={profile?.avatarUrl || undefined}
          isMobilePreview={false}
        />
      </div>
    </div>
  );
}
