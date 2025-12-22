import { useParams } from "wouter";
import { ProfileRenderer } from "@/components/ProfileRenderer";

export default function Profile() {
  const { username } = useParams();

  if (!username) return <div>Invalid user</div>;

  return <ProfileRenderer username={username} />;
}
