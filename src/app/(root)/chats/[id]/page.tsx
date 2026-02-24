"use client";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import CopyButton from "@/components/copy-button";
import { Spinner } from "@/components/ui/spinner";
import useAiAgent from "@/features/ai-agent/hooks/ai-agent";
import ModelSelector from "@/features/chat/components/model-selector";
import { useChatById } from "@/features/chat/hooks/useChatById";
import { useChatStore } from "@/features/chat/store/useChatStore";
import ResponseLoader from "@/features/messages/components/response-loader";
import { converDbMessagesToUIMessages } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import { DefaultChatTransport } from "ai";
import { MessageSquare, RotateCcwIcon, SquareIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { KeyboardEvent, useEffect, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;
  const { chat } = useChatById(chatId);
  const queryClient = useQueryClient();
  const { selectedModel } = useChatStore();
  const { models, fetchingModels } = useAiAgent();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialMessages = useMemo(() => {
    return chat?.messages ? converDbMessagesToUIMessages(chat.messages) : [];
  }, [chat]);

  const { messages, sendMessage, regenerate, status, setMessages, stop } =
    useChat({
      experimental_throttle: 500,
      id: chatId,
      messages: initialMessages,
      transport: new DefaultChatTransport({ api: "/api/chat" }),
      onFinish: () => {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
        queryClient.invalidateQueries({ queryKey: [chatId] });
      },
    });

  const handleSubmit = () => {
    const text = textareaRef.current?.value.trim();
    if (!text || status === "streaming") return;
    textareaRef.current!.value = "";

    sendMessage({
      text,
      metadata: {
        model: selectedModel,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        return;
      }
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (chat?.messages) {
      setMessages(initialMessages);
    }
  }, [chat, setMessages, initialMessages]);

  useEffect(() => {
    const savedMessage = sessionStorage.getItem(`pending_msg_${chatId}`);
    if (!savedMessage) return;

    sendMessage({
      text: savedMessage,
      metadata: {
        model: selectedModel,
      },
    });
    sessionStorage.removeItem(`pending_msg_${chatId}`);
  }, [chatId, sendMessage, selectedModel]);

  return (
    <div className="h-full flex flex-col p-4 md:px-8 md:w-3/4 mx-auto gap-20">
      <Conversation className="flex-1 min-h-0 overflow-y-auto">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              className="mt-20"
              icon={<MessageSquare className="size-12" />}
              title="Start a conversation"
              description="Type a message below to begin chatting"
            />
          ) : (
            <>
              {messages.map((m, i) => (
                <Message key={m.id} from={m.role} className="max-w-xl">
                  {m.parts.map((p, index) => (
                    <MessageContent
                      key={m.id + index + "response"}
                      className="group"
                    >
                      {p.type === "reasoning" && (
                        <Reasoning key={m.id + i + "reasoning"}>
                          <ReasoningTrigger />
                          <ReasoningContent>{p.text}</ReasoningContent>
                        </Reasoning>
                      )}
                      {p.type === "text" && (
                        <>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {p.text}
                          </ReactMarkdown>
                          <div
                            className={`opactiy-0 bottom-0 transition-y-full transition-all duration-100 ease-in group-hover:opacity-100 flex  ${m.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <CopyButton text={p.text} />
                          </div>
                        </>
                      )}
                    </MessageContent>
                  ))}
                </Message>
              ))}

              {(status === "submitted" || status === "streaming") && (
                <Message from="assistant">
                  <MessageContent>
                    <ResponseLoader />
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </ConversationContent>
      </Conversation>

      <div className="mb-24">
        <PromptInputProvider>
          <PromptInput globalDrop multiple onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
                className="text-xl"
                ref={textareaRef}
                placeholder="Type your message..."
                onKeyDown={handleKeyDown}
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                {fetchingModels ? (
                  <div className="flex items-center gap-4 justify-start">
                    <Spinner />
                    Fetching models...
                  </div>
                ) : (
                  <ModelSelector
                    selectedModel={selectedModel}
                    models={models}
                  />
                )}

                <PromptInputButton
                  aria-label="regenerate"
                  onClick={() => regenerate()}
                >
                  <RotateCcwIcon />
                  Retry
                </PromptInputButton>
              </PromptInputTools>
              {status === "streaming" ? (
                <PromptInputButton
                  aria-label="stop"
                  onClick={() => stop()}
                  className="rounded-md p-2 bg-primary hover:bg-primary/90"
                >
                  <SquareIcon className="size-4 text-primary-" />
                </PromptInputButton>
              ) : (
                <PromptInputSubmit disabled={status !== "ready"} />
              )}
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    </div>
  );
}
