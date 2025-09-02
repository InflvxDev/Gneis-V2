import { createClient, type Session } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getAuthenticatedSession = async (): Promise<Session> => {
  const {
    data: { session },
    error: authError,
  } = await supabase.auth.getSession();

  if (authError || !session) {
    throw new Error("No autenticado");
  }

  return session;
};
