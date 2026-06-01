import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

export const fetchAdminMessages = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => {
    if (!data || typeof data.password !== "string") throw new Error("Invalid input");
    return { password: data.password.slice(0, 200) };
  })
  .handler(async ({ data }) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error("Admin password not configured");
    }
    if (data.password !== adminPassword) {
      throw new Error("Invalid password");
    }

    const supabaseUrl = process.env.SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: messages, error } = await admin
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return { messages: messages ?? [] };
  });
