import { createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";

export type AuthState = {
  /** Oturum açık kullanıcı; yoksa null. */
  user: User | null;
  /** İlk oturum durumu (INITIAL_SESSION) henüz gelmediyse true — girişsiz içerik flash etmesin. */
  loading: boolean;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
  user: null,
  loading: false,
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}
