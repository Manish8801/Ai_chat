import {
  getCurrentUser,
  requireSession,
} from "@/features/auth/actions/auth.action";
import ChatMessageView from "@/features/chat/components/chat-message-view";

export default async function HomePage() {
  await requireSession();
  const user = await getCurrentUser();
  return (
    <div>
      <ChatMessageView user={user} />
    </div>
  );
}
