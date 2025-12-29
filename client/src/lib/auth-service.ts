import { supabase } from './supabase';

export const authProvider = {
  async signUp(email: string, password: string) {
    return await supabase.auth.signUp({ email, password });
  },
  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  async signOut() {
    return await supabase.auth.signOut();
  },
  async getSession() {
    return await supabase.auth.getSession();
  }
};
