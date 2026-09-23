import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SessionState = {
  userId: string | null;
  signIn: (userId: string) => void;
  signOut: () => void;
};

export const SESSION_STORAGE_KEY = "acolher-aparecida:sessao";

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      userId: null,
      signIn: (userId) => set({ userId }),
      signOut: () => set({ userId: null }),
    }),
    {
      name: SESSION_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
