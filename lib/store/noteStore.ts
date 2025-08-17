import { create } from "zustand";
import { Note } from "@/types/note";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: Note;
  setDraft: (note: Note) => void;
  clearDraft: () => void;
};

const initialDraft: Note = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
    }
  )
);
