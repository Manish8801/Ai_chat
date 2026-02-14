"use client";

import { User } from "@/generated/prisma/client";
import { useState } from "react";
import ChatMessageForm from "./chat-message-form";
import ChatWelcomeTabs from "./chat-welcome-tabs";

type Props = {
  user: User | null | undefined;
};
export default function ChatMessageView({ user }: Props) {
  const [selectedMessage, setSelectedMessage] = useState("");
  const handleMessageSelect = (messsage: string) => {
    setSelectedMessage(messsage);
  };
  const handleMessageChange = () => {
    setSelectedMessage("");
  };
  if (!user) return null;
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-10">
      <ChatWelcomeTabs
        userName={user?.name}
        onMessageSelect={handleMessageSelect}
      />
      <ChatMessageForm
        initialMessage={selectedMessage}
        onMessageChange={handleMessageChange}
      />
    </div>
  );
}
