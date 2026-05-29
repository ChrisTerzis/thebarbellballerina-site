import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const BTN_PRIMARY =
  "w-full bg-[#BB8966] text-white hover:bg-[#A87856] uppercase tracking-[0.2em] text-xs font-bold";

export default function AdminLogin() {
  const { user, isLoading, login } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isLoading && user) {
    return <Navigate to={from === "/admin/login" ? "/admin" : from} replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      toast.success("Signed in");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md border-black/10 shadow-sm bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="font-serif text-2xl tracking-tight text-black">Admin</CardTitle>
          <CardDescription className="text-black/60">Sign in to manage the site.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-black/15"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-black/15"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className={BTN_PRIMARY} disabled={submitting || isLoading}>
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
            <Link to="/" className="text-xs uppercase tracking-[0.2em] text-[#BB8966] hover:underline">
              ← Back to site
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
