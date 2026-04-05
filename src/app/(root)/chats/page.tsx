import NewChatInput from "@/features/chat/components/new-chat-input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Chat",
};

export default function ChatsPage() {
  return <NewChatInput />;
}
