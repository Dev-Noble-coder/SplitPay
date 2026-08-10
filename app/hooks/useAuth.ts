import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, createUser } from "../services/authService";
import { AuthResponse } from "../types/auth";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: Record<string, any>) => login(userData),
    onSuccess: (data: AuthResponse) => {
        // Optionally invalidate queries if login affects global state
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useSignupMutation() {
  return useMutation({
    mutationFn: (userData: Record<string, any>) => createUser(userData),
  });
}
