import { getCurrentUser } from "@/features/auth/actions/auth.action";
import { getAllChats } from "@/features/chat/actions/chat.actions";
import ChatSidebar from "@/features/chat/components/chat-sidebar";
import Header from "@/features/root/components/header";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = await getCurrentUser();
  const result = await getAllChats();

  if (!result.success || !result.data) {
    console.error(result.error);
    return;
  }
  return (
    <main className="flex h-screen overflow-hidden">
      <ChatSidebar user={user} chats={result.data} />
      <main className="flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </main>
  );
}
