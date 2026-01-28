import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type Body = {
  email: string;
  role: "admin" | "editor";
};

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return json(401, { error: "Unauthorized" });

    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authedClient = createClient(url, anon, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: claimsData, error: claimsError } = await authedClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) return json(401, { error: "Unauthorized" });
    const requesterId = claimsData.claims.sub;

    const body = (await req.json()) as Body;
    const email = (body.email ?? "").trim().toLowerCase();
    const role = body.role;

    if (!email || !email.includes("@")) return json(400, { error: "Valid email is required" });
    if (role !== "admin" && role !== "editor") return json(400, { error: "Invalid role" });

    // Bootstrap: if there are no admins yet, allow the first authenticated user to set an admin/editor.
    const { count: adminCount, error: adminCountError } = await authedClient
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (adminCountError) return json(500, { error: adminCountError.message });

    if ((adminCount ?? 0) > 0) {
      const { data: myAdminRole, error: myRoleError } = await authedClient
        .from("user_roles")
        .select("id")
        .eq("user_id", requesterId)
        .eq("role", "admin")
        .maybeSingle();
      if (myRoleError) return json(500, { error: myRoleError.message });
      if (!myAdminRole) return json(403, { error: "Forbidden" });
    }

    const adminClient = createClient(url, service, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: usersData, error: listErr } = await adminClient.auth.admin.listUsers({ perPage: 1000 });
    if (listErr) return json(500, { error: listErr.message });

    const user = usersData.users.find((u) => (u.email ?? "").toLowerCase() === email);
    if (!user) return json(404, { error: "No user found for that email (ask them to sign up first)." });

    const { error: upsertErr } = await adminClient
      .from("user_roles")
      .upsert({ user_id: user.id, role }, { onConflict: "user_id,role" });
    if (upsertErr) return json(500, { error: upsertErr.message });

    return json(200, { success: true, user_id: user.id, role });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return json(500, { error: msg });
  }
});
