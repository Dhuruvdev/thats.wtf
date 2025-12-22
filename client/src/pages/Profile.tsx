import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { User, Block } from "@shared/schema";
import { ProfileRenderer } from "@/components/ProfileRenderer";
import LoadingPage from "@/components/LoadingPage";

export default function Profile() {
  const [, params] = useRoute("/u/:username");
  const username = params?.username;

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/users", username],
    enabled: !!username,
  });

  const { data: blocks, isLoading: blocksLoading } = useQuery<Block[]>({
    queryKey: ["/api/blocks", user?.id],
    enabled: !!user?.id,
  });

  if (userLoading || blocksLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return <ProfileRenderer user={user} blocks={blocks || []} />;
}
