import { Message } from "@/generated/prisma/client";
import { generateText, UIMessage } from "ai";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { openrouter } from "./openrouter";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function converDbMessagesToUIMessages(messages: Message[]): UIMessage[] {
  return messages.map((m) => ({
    id: m.id,
    role: m.role.toLowerCase() as UIMessage["role"],
    parts: [{ type: "text", text: m.content }],
    metadata: {
      createdAt: m.createdAt,
      model: m.model,
    },
  }));
}

export async function generateTitle(content: string, model: string) {
  try {
    const { text } = await generateText({
      model: openrouter(model),
      prompt: `Generate a concise 3-6 word title without special characters for: "${content}"`,
    });

    return text.trim();
  } catch {
    return content.length > 50 ? `${content.slice(0, 50)}...` : content;
  }
}
