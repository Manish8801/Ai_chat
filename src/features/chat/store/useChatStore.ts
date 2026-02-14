import { create } from "zustand";

type States = {
  activeChatId: string | null;
};
type Actions = {
  setActiveChatId: (id: States["activeChatId"]) => void;
};
type Store = States & Actions;
export const useChatStore = create<Store>()((set, get) => ({
  activeChatId: null,
  setActiveChatId: (activeChatId) => set({ activeChatId }),
}));
