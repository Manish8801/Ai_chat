"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Chat } from "@/generated/prisma/client";
import { Button } from "@base-ui/react";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDeleteChat } from "../hooks/useDeleteChat";

type Props = { chatId: Chat["id"] };
export default function ChatDeleteDialog({ chatId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const currentChatId = useParams().id as string;
  const { mutateAsync: deleteChat } = useDeleteChat(chatId, currentChatId);

  const handleDelete =  () => {
    deleteChat();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="flex p-2 items-center w-full justify-between"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <Trash className="size-4 text-red-500" />
          <span className="text-red-500">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete chat?</AlertDialogTitle>

          <AlertDialogDescription>
            This will delete the chat permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            autoFocus={true}
            onClick={handleDelete}
            className="bg-destructive text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
