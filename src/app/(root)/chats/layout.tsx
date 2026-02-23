import { getCurrentUser } from "@/features/auth/actions/auth.action";
import ChatSidebar from "@/features/chat/components/chat-sidebar";
import Header from "@/features/root/components/header";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-up");
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex h-full overflow-hidden ">
        <ChatSidebar />
        <div className="flex-1 overflow-hidden "> {children}</div>
      </div>
    </main>
  );
}
