"use server";

import { requireCurrentUser } from "@/features/auth/actions/auth.action";
import { MessageRole, MessageType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createChatWithMessage(values: {
  content: string;
  model: string;
}) {
  try {
    const user = await requireCurrentUser();
    const { content, model } = values;

    if (!content.trim() || !model) {
      return { success: false, message: "Please enter a message." };
    }

    const title = content.slice(0, 50) + (content.length > 50 ? "..." : "");
    const chat = await prisma.chat.create({
      data: {
        title,
        model,
        userId: user.id,
        message: {
          content,
          messageRole: MessageRole.USER,
          messageType: MessageType.NORMAL,
          model,
        },
      },
      include: {
        messages: true,
      },
    });
    revalidatePath("/");

    return { success: true, message: "Chat created successfully", data: chat };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: (error as Error).message || "Failed to fetch free models",
    };
  }
}

export async function getAllChats() {
  try {
    const user = await requireCurrentUser();
    const chats = await prisma.chat.findMany({
      where: { userId: user.id },
      include: { messages: true },
      orderBy: [{ createdAt: "desc" }],
    });

    return {
      success: true,
      message: "Chats fetched successfully",
      data: chats,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Failed to fetch chats",
    };
  }
}
