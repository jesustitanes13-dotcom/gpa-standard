import { createClient } from "@supabase/supabase-js";

export const getSupabaseBrowser = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !anonKey) {
    if (typeof window !== "undefined") {
      console.log("Supabase missing env vars", { supabaseUrl, anonKey });
    }
    return null;
  }

  try {
    const parsed = new URL(supabaseUrl);
    if (!parsed.protocol.startsWith("http")) {
      throw new Error("Invalid protocol");
    }
  } catch {
    if (typeof window !== "undefined") {
      console.log("Supabase invalid URL", { supabaseUrl });
    }
    return null;
  }

  if (typeof window !== "undefined") {
    console.log("Supabase client init ok", { supabaseUrlPresent: true, anonKeyPresent: true });
  }

  return createClient(supabaseUrl, anonKey);
};
