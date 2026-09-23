"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User, UserPersonaId } from "@/@types/Modules/Conta/user";
import { useIsClient } from "@/hooks/use-is-client";
import {
  fetchUser,
  type LoginInput,
  loginAsPersona,
  loginWithEmail,
  type RegisterInput,
  registerUser,
  updateUser,
} from "@/services/Modules/Conta/auth";
import { useSessionStore } from "@/store/Modules/Conta/use-session-store";

export const CURRENT_USER_QUERY_KEY = "usuario-atual";

export function useCurrentUser() {
  const isClient = useIsClient();
  const userId = useSessionStore((state) => state.userId);

  const query = useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY, userId],
    queryFn: () => (userId ? fetchUser(userId) : Promise.resolve(null)),
    enabled: isClient && Boolean(userId),
  });

  const isResolving = !isClient || (Boolean(userId) && query.isPending);

  return {
    user: userId ? (query.data ?? null) : null,
    userId,
    isAuthenticated: Boolean(userId),
    isResolving,
    refetch: query.refetch,
  };
}

function useSignInEffect() {
  const queryClient = useQueryClient();
  const signIn = useSessionStore((state) => state.signIn);

  return (user: User) => {
    signIn(user.id);
    queryClient.setQueryData([CURRENT_USER_QUERY_KEY, user.id], user);
  };
}

export function useLogin() {
  const applySignIn = useSignInEffect();

  return useMutation({
    mutationFn: (input: LoginInput) => loginWithEmail(input),
    onSuccess: applySignIn,
  });
}

export function usePersonaLogin() {
  const applySignIn = useSignInEffect();

  return useMutation({
    mutationFn: (personaId: UserPersonaId) => loginAsPersona(personaId),
    onSuccess: applySignIn,
  });
}

export function useRegister() {
  const applySignIn = useSignInEffect();

  return useMutation({
    mutationFn: (input: RegisterInput) => registerUser(input),
    onSuccess: applySignIn,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const signOut = useSessionStore((state) => state.signOut);

  return () => {
    signOut();
    queryClient.removeQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
  };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const userId = useSessionStore((state) => state.userId);

  return useMutation({
    mutationFn: (changes: Parameters<typeof updateUser>[1]) => {
      if (!userId) throw new Error("Sessão expirada.");
      return updateUser(userId, changes);
    },
    onSuccess: (user) => {
      queryClient.setQueryData([CURRENT_USER_QUERY_KEY, user.id], user);
    },
  });
}
