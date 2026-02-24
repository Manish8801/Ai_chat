import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserProfileButton from "@/features/auth/components/user-profile-button";
import ChatList from "@/features/chat/components/chat-list";
import { User } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { Menu, PlusIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

type Props = {
  user: User;
};
export default function Header({ user }: Props) {
  return (
    <header className="flex w-full items-center justify-between border-b">
      <div className="md:hidden">
        <Sheet key="left">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetDescription></SheetDescription>
          <SheetContent side="left" className="flex flex-col gap-4 p-4 w-3/5">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <SheetClose className="p-4" />
            <Link
              href={"/chats"}
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              <PlusIcon />
              New Chat
            </Link>
            <ChatList />
          </SheetContent>
        </Sheet>
      </div>
      <nav className="hidden h-full w-64 md:flex border-r justify-center items-center">
        <Link href="/" className="font-extrabold font-lg">
          <i>{process.env.APP_NAME}</i>
        </Link>
      </nav>
      <div className="flex gap-4 py-2 pr-4">
        <ModeToggle />
        <UserProfileButton user={user} />
      </div>
    </header>
  );
}
