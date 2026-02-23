import { getSession } from "@/features/auth/actions/auth.action";
import { prisma } from "@/lib/prisma";
import { generateTitle } from "@/lib/utils";
import { openrouter } from "@openrouter/ai-sdk-provider";
import {
  convertToModelMessages,
  streamText,
  UIDataTypes,
  UIMessage,
  UITools,
} from "ai";
import { NextRequest, NextResponse } from "next/server";

type MessageMetadata = { model: string };

type RequestData = {
  id: string;
  messages: UIMessage<MessageMetadata, UIDataTypes, UITools>[];
};

export async function POST(req: NextRequest) {
  // Check authorization
  const session = await getSession();
  if (!session) {
    return NextResponse.json({
      success: false,
      message: "Unauthorized",
      status: 401,
    });
  }

  const { id, messages }: RequestData = await req.json();
  // check chat id
  if (!id) {
    return NextResponse.json({
      status: 500,
      message: "Missing chat id",
      success: false,
    });
  }

  // check messages
  if (!messages?.length) {
    return NextResponse.json({
      success: false,
      message: "Missing messages",
      status: 400,
    });
  }

  const latest = messages.at(-1);
  const { model } = latest?.metadata as MessageMetadata;
  // check message metadata
  if (!latest || !model) {
    return NextResponse.json({
      success: false,
      message: "Invalid message metadata",
      status: 400,
    });
  }

  const content =
    latest.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("") ?? "";

  if (!content) return new Response("Empty message", { status: 400 });

  const modelMessages = await convertToModelMessages(messages);
  const result = streamText({
    model: openrouter(model),
    messages: modelMessages,
    onFinish: async ({ text, reasoningText }) => {
      try {
        await prisma.$transaction([
          prisma.chat.upsert({
            where: { id },
            update: {},
            create: {
              id,
              title: await generateTitle(content, model),
              model,
              userId: session.user.id,
            },
          }),
          prisma.message.createMany({
            data: [
              { chatId: id, content, role: "user", model },
              {
                chatId: id,
                role: "assistant",
                content: text,
                model,
                reasoning: reasoningText,
              },
            ],
          }),
        ]);
      } catch (error) {
        console.error("Database persistence failed:", error);
      }
    },
  });

  return result.toUIMessageStreamResponse();
}
