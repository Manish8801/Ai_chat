"use client";
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
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserName from "@/components/user-name";
import useAiAgent from "@/features/ai-agent/hooks/ai-agent";
import ModelSelector from "@/features/chat/components/model-selector";
import { useChatStore } from "@/features/chat/store/useChatStore";
import {
  Code,
  GraduationCap,
  Newspaper,
  RotateCcwIcon,
  Sparkles,
} from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useRef } from "react";

const CHAT_TAB_MESSAGE = [
  {
    tabName: "Create",
    icon: <Sparkles className="h-4 w-4" />,
    messages: [
      "Write a short story about a robot discovering emotions",
      "Help me outline a sci-fi novel set in a post-apocalyptic world",
      "Create a character profile for a complex villain with sympathetic motives",
      "Give me 5 creative writing prompts for flash fiction",
    ],
  },
  {
    tabName: "Explore",
    icon: <Newspaper className="h-4 w-4" />,
    messages: [
      "Good books for fans of Rick Rubin",
      "Countries ranked by number of corgis",
      "Most successful companies in the world",
      "How much does Claude cost?",
    ],
  },
  {
    tabName: "Code",
    icon: <Code className="h-4 w-4" />,
    messages: [
      "Write code to invert a binary search tree in Python",
      "What is the difference between Promise.all and Promise.allSettled?",
      "Explain React's useEffect cleanup function",
      "Best practices for error handling in async/await",
    ],
  },
  {
    tabName: "Learn",
    icon: <GraduationCap className="h-4 w-4" />,
    messages: [
      "Beginner's guide to TypeScript",
      "Explain the CAP theorem in distributed systems",
      "Why is AI so expensive?",
      "Are black holes real?",
    ],
  },
];

export default function ChatsPage() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { models, fetchingModels } = useAiAgent();
  const { selectedModel } = useChatStore();

  const handleSubmit = async () => {
    const text = textareaRef.current?.value.trim();
    if (!text || fetchingModels) return;
    textareaRef.current!.value = "";

    const tempId = nanoid();
    sessionStorage.setItem(`pending_msg_${tempId}`, text);
    router.push(`/chats/${tempId}`);
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

  return (
    <div className="w-full p-4 sm:px-8 md:mx-auto md:w-3/4 flex flex-col h-full justify-end gap-20">
      <div className="flex-1 flex fle-col">
        <div className="self-end">
          <h1 className="text-4xl font-semibold mb-8">
            How can i help you{" "}
            <UserName className="text-primary font-extrabold" />?
          </h1>
          <Tabs className="bg-none" defaultValue={CHAT_TAB_MESSAGE[0].tabName}>
            <TabsList
              variant={"default"}
              className="bg-background space-x-4 pl-0 mb-2"
            >
              {CHAT_TAB_MESSAGE.map(({ tabName, icon }) => (
                <TabsTrigger
                  key={tabName}
                  value={tabName}
                  className="group p-0 "
                >
                  <div className="flex border border-accent-foreground items-center gap-2 px-2 py-1 rounded-md group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground transition-colors duration-100 ease-in">
                    {tabName}
                    {icon}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {CHAT_TAB_MESSAGE.map(({ tabName }, index) => (
              <TabsContent
                key={tabName}
                value={tabName}
                className="flex flex-col items-start justify-end"
              >
                {CHAT_TAB_MESSAGE[index].messages.map((message) => (
                  <button
                    key={message}
                    onClick={() => {
                      if (textareaRef.current) {
                        textareaRef.current.value = message;
                        textareaRef.current.focus();
                      }
                    }}
                    className="w-fit underline underline-offset-8 text-left text-sm text-muted-foreground hover:text-primary transition-colors duration-300 ease-in-out py-2"
                  >
                    {message}
                  </button>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      <div className="mb-20">
        <PromptInputProvider>
          <PromptInput globalDrop multiple onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
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
                <PromptInputButton disabled={true}>
                  <RotateCcwIcon />
                  Retry
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    </div>
  );
}
