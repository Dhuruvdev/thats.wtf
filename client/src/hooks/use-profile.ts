import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type UpdateUserRequest, type InsertLink } from "@shared/routes";

// GET /api/u/:username
export function useProfile(username: string) {
  return useQuery({
    queryKey: [api.users.get.path, username],
    queryFn: async () => {
      const url = buildUrl(api.users.get.path, { username });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch profile");
      return api.users.get.responses[200].parse(await res.json());
    },
    enabled: !!username,
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
      // Invalidate public profile too if we knew the username
      queryClient.invalidateQueries({ queryKey: [api.users.get.path] });
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

// POST /api/links (Create Link)
export function useCreateLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (link: Omit<InsertLink, "userId">) => {
      const res = await fetch(api.links.create.path, {
        method: api.links.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(link),
      });
      if (!res.ok) throw new Error("Failed to create link");
      return api.links.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      // Invalidate current user profile to refresh links
      queryClient.invalidateQueries({ queryKey: [api.users.get.path] });
      queryClient.invalidateQueries({ queryKey: [api.auth.me.path] }); 
    }
  });
}

// DELETE /api/links/:id
export function useDeleteLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.links.delete.path, { id });
      const res = await fetch(url, { method: api.links.delete.method });
      if (!res.ok) throw new Error("Failed to delete link");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.users.get.path] });
    }
  });
}
