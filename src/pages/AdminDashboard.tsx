import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BTN_PRIMARY =
  "bg-[#BB8966] text-white hover:bg-[#A87856] uppercase tracking-[0.2em] text-xs font-bold";

type EarlyAccessSignup = {
  id: number;
  email: string;
  first_name: string;
  created_at: string;
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [signups, setSignups] = useState<EarlyAccessSignup[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSignups = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/admin/early-access");
      if (res.status === 401) {
        await logout();
        navigate("/admin/login", { replace: true });
        return;
      }
      if (!res.ok) {
        throw new Error("Could not load early access list");
      }
      const data = (await res.json()) as { signups: EarlyAccessSignup[] };
      setSignups(data.signups ?? []);
    } catch {
      toast.error("Could not load early access signups");
      setSignups([]);
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => {
    loadSignups();
  }, [loadSignups]);

  async function handleLogout() {
    await logout();
    toast.success("Signed out");
    navigate("/admin/login", { replace: true });
  }

  function formatJoined(isoOrMysql: string) {
    const d = new Date(isoOrMysql.replace(" ", "T"));
    if (Number.isNaN(d.getTime())) return isoOrMysql;
    return format(d, "MMM d, yyyy · h:mm a");
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-black">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-black/45">Admin</p>
            <h1 className="font-serif text-xl mt-1">Dashboard</h1>
          </div>
          <Button type="button" className={BTN_PRIMARY} onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10 space-y-8">
        <p className="text-sm text-black/70">
          Signed in as <span className="font-medium text-black">{user?.email}</span>
        </p>

        <section className="rounded-lg border border-black/10 bg-white shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-black/10 bg-[#FAFAF8]/80">
            <div>
              <h2 className="font-serif text-lg text-black">Early access</h2>
              <p className="text-xs text-black/50 mt-0.5">
                Emails collected from the waitlist modal ({signups.length} total)
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs uppercase tracking-wider"
              onClick={() => loadSignups()}
              disabled={loading}
            >
              {loading ? "Loading…" : "Refresh"}
            </Button>
          </div>

          {loading ? (
            <p className="px-5 py-12 text-center text-sm text-black/45 uppercase tracking-[0.2em]">
              Loading…
            </p>
          ) : signups.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-black/50">
              No signups yet. Submissions will appear here.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-black/10">
                  <TableHead className="text-black/60 font-medium">First name</TableHead>
                  <TableHead className="text-black/60 font-medium">Email</TableHead>
                  <TableHead className="text-black/60 font-medium w-[200px] text-right">
                    Signed up
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {signups.map((row) => (
                  <TableRow key={row.id} className="border-black/10">
                    <TableCell className="text-black font-medium">{row.first_name || "—"}</TableCell>
                    <TableCell className="font-medium text-black">{row.email}</TableCell>
                    <TableCell className="text-black/55 text-right tabular-nums">
                      {formatJoined(row.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>
      </main>
    </div>
  );
}
