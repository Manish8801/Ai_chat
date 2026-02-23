import { Message } from "@/generated/prisma/client";
import { create } from "zustand";
import { Model } from "../types/model.types";
import { Chats } from "../types/types";

type States = {
  messages: Message[];
  activeChatId: string | null;
  chats: Chats;
  selectedModel: Model["id"];
};
type Actions = {
  setActiveChatId: (id: States["activeChatId"]) => void;
  setSelectedModel: (model: States["selectedModel"]) => void;
};
export type UseChatStore = States & Actions;
export const useChatStore = create<UseChatStore>()((set, get) => ({
  chats: [],
  message: "",
  triggeredChats: new Set(),
  messages: [],
  selectedModel: "openrouter/free",
  activeChatId: null,
  setActiveChatId: (activeChatId) => set({ activeChatId }),
  setSelectedModel: (model) => set({ selectedModel: model }),
}));
