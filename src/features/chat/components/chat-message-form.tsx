"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import useAiAgent from "@/features/ai-agent/hooks/ai-agent";
import { Send } from "lucide-react";
import { SubmitEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCreateChat } from "../hooks/useCreateChat";
import { ModelSelector } from "./model-selector";

type Props = { initialMessage: string; onMessageChange: () => void };
const ChatMessageForm = ({ initialMessage, onMessageChange }: Props) => {
  const { data: models, isPending } = useAiAgent();
  const [selectedModel, setSelectedModel] = useState(models?.models[0]?.id);
  const [message, setMessage] = useState("");
  const { mutateAsync, isPending: isChatPending } = useCreateChat();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
      onMessageChange();
    }
  }, [initialMessage, onMessageChange]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await mutateAsync({ content: message, model: selectedModel });
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setMessage("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div
          className="relative rounded-2xl border-border shadow-sm transition-all
            "
        >
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your mesage here..."
            className="min-h-15 max-h-50 resize-none border-0 bg-transparent px-4 py-3 text-base focus-visible:ring-0 focus-visible:ring-offset-0 "
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (formRef.current) {
                  formRef.current.requestSubmit();
                }
              }
            }}
          />

          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t">
            {/* Model Selector */}
            <div className="flex items-center gap-1">
              {isPending ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>
                  <ModelSelector
                    models={models?.models}
                    selectedModelId={selectedModel}
                    onModelSelect={setSelectedModel}
                    className="ml-1"
                  />
                </>
              )}
            </div>
            <Button
              type="submit"
              disabled={!message.trim() || isChatPending}
              size="sm"
              variant={message.trim() ? "default" : "ghost"}
              className="h-8 w-8 p-0 rounded-full "
            >
              {isChatPending ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatMessageForm;
