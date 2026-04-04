import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IContact } from "@/types/types";

interface IContactStore {
  contacts: IContact | null;
  setContacts: (contact: IContact) => void;
  clearContacts: () => void;
}

export const contactStore = create<IContactStore>()(
  persist(
    (set) => ({
      contacts: null,
      setContacts: (contacts) => set({ contacts }),
      clearContacts: () => set({ contacts: null }),
    }),
    {
      name: "contacts-store",
    },
  ),
);
