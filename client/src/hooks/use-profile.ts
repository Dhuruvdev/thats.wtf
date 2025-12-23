import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type UpdateUserRequest } from "@shared/routes";
import { type InsertBlock } from "@shared/schema";

// GET /api/u/:username
export function useProfile(username: string) {
  return useQuery({
    queryKey: [api.users.get.path, username],
    queryFn: async () => {
      const url = buildUrl(api.users.get.path, { username });
      const res = await fetch(url, { cache: 'no-store' });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch profile");
      return api.users.get.responses[200].parse(await res.json());
    },
    enabled: !!username,
    staleTime: 0,
    gcTime: 0,
  });
}

// PATCH /api/user (Update profile)
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: UpdateUserRequest) => {
      const res = await fetch(api.users.update.path, {
        method: api.users.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      
      if (!res.ok) throw new Error("Failed to update profile");
      return api.users.update.responses[200].parse(await res.json());
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData([api.auth.me.path], updatedUser);
      // Invalidate all public profile queries (matches any /api/u/:username query)
      queryClient.invalidateQueries({ queryKey: [api.users.get.path], exact: false });
    },
  });
}

// POST /api/u/:username/view (Add view)
export function useAddView() {
  return useMutation({
    mutationFn: async (username: string) => {
      const url = buildUrl(api.users.addView.path, { username });
      const res = await fetch(url, { method: api.users.addView.method });
      if (!res.ok) throw new Error("Failed to track view");
      return res.json();
    },
  });
}

// POST /api/blocks (Create Block)
export function useCreateLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (block: any) => {
      const res = await fetch(api.blocks.create.path, {
        method: api.blocks.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
      });
      if (!res.ok) throw new Error("Failed to create block");
      return api.blocks.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.users.get.path], exact: false });
      queryClient.invalidateQueries({ queryKey: [api.auth.me.path] }); 
    }
  });
}

// DELETE /api/blocks/:id
export function useDeleteLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.blocks.delete.path, { id });
      const res = await fetch(url, { method: api.blocks.delete.method });
      if (!res.ok) throw new Error("Failed to delete block");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.users.get.path], exact: false });
    }
  });
}
