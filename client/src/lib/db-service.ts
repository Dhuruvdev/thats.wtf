import { supabase } from './supabase';

export const dbService = {
  async getProfile(username: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();
    return { data, error };
  },
  async updateProfile(id: string, updates: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id);
    return { data, error };
  }
};
