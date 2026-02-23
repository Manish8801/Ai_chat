"use server";

import { requireCurrentUser } from "@/features/auth/actions/auth.action";
import { Chat } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getAllChats = cache(async () => {
  const user = await requireCurrentUser();

  return await prisma.chat.findMany({
    where: { userId: user.id },
    include: { messages: true },
    orderBy: [{ createdAt: "desc" }],
  });
});

export async function deleteChat(chatId: Chat["id"]) {
  const user = await requireCurrentUser();
  await prisma.chat.delete({
    where: { id: chatId, userId: user.id },
  });
  revalidatePath("/");
}

export async function getChatWithMessagesById(id: Chat["id"]) {
  const { id: userId } = await requireCurrentUser();

  const chat = await prisma.chat.findUnique({
    where: { id, userId },
    include: { messages: true },
  });

  if (!chat) {
    return {
      success: false,
      message: "NOT_FOUND",
      status: 400,
      data: null,
    };
  }
  return {
    success: true,
    message: "OK",
    status: 200,
    data: chat,
  };
}
