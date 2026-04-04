import type { IContact } from "@/types/types";
import { create } from "zustand";
const ChatTypes = {
  channel: "channel",
  contact: "contact",
} as const;

type ChatTypes = (typeof ChatTypes)[keyof typeof ChatTypes];

interface IChatStore {
  selectedChatType: null | ChatTypes;
  selectedChatData: null | IContact;
  selectedChatMessage: [];
  setSelectedChatType: (selectedChatType: ChatTypes) => void;
  setSelectedChatData: (selectedChatData: IContact) => void;
  setSelectedChatMessage: (selectedChatMessage: []) => void;
  closeChat: () => void;
}

export const useChatStore = create<IChatStore>()((set) => ({
  selectedChatType: null,
  selectedChatData: null,
  selectedChatMessage: [],
  setSelectedChatType: (selectedChatType: null | ChatTypes) =>
    set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessage: (selectedChatMessage) => set({ selectedChatMessage }),
  closeChat: () =>
    set({
      selectedChatType: null,
      selectedChatData: null,
      selectedChatMessage: [],
    }),
}));
