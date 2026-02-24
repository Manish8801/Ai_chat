import { Button } from "@/components/ui/button";
import { getSession } from "@/features/auth/actions/auth.action";
import Link from "next/link";

export default async function HomePage() {
  const session = await getSession();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-10">
      <h1 className=" ">Free AI Chatbot to chat with.</h1>
      <Button asChild>
        <Link href={session ? "/chats" : "/sign-up"}>Get Started</Link>
      </Button>
    </div>
  );
}
