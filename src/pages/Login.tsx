import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const nav = useNavigate();
  const { toast } = useToast();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const title = useMemo(() => (mode === "login" ? "Sign in" : "Create account"), [mode]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;

        // Create profile row (best-effort)
        const userId = data.user?.id;
        if (userId) {
          await supabase.from("profiles").insert({ user_id: userId, full_name: fullName }).throwOnError();
        }

        toast({ title: "Account created", description: "You can now sign in." });
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav("/admin", { replace: true });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container flex min-h-screen items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Use your email and password to access the admin panel.</p>

            <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
              {mode === "signup" && (
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
              </Button>

              <div className="text-center text-sm">
                {mode === "login" ? (
                  <button type="button" className="font-semibold text-primary hover:underline" onClick={() => setMode("signup")}>
                    Create an account
                  </button>
                ) : (
                  <button type="button" className="font-semibold text-primary hover:underline" onClick={() => setMode("login")}>
                    I already have an account
                  </button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
