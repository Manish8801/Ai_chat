import { getCurrentUser } from "@/features/auth/actions/auth.action";
import UserProfileButton from "@/features/auth/components/user-profile-button";

export default async function HomePage() {
  const user = await getCurrentUser();
  return (
    <div>
      <UserProfileButton user={user} />
    </div>
  );
}
