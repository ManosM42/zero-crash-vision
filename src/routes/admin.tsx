import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Lock, Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { fetchAdminMessages } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — ZEROCRASH" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Message = {
  id: string;
  name: string;
  email: string;
  project_type: string;
  message: string;
  created_at: string;
};

function AdminPage() {
  const fetchMessages = useServerFn(fetchAdminMessages);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const load = async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchMessages({ data: { password: pwd } });
      setMessages(res.messages as Message[]);
      setAuthed(true);
    } catch (e: any) {
      setError(e?.message || "Failed to load messages");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    load(password);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 grid-bg">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md bg-card/80 border border-border p-8 backdrop-blur"
        >
          <div className="flex items-center gap-2 text-cyan mb-6">
            <Lock className="size-5" />
            <span className="font-mono text-xs uppercase tracking-[0.4em]">
              // Admin Access
            </span>
          </div>
          <h1 className="font-mono text-3xl font-bold tracking-tighter mb-6">
            ZEROCRASH<span className="text-cyan">.</span>admin
          </h1>
          <label className="block mb-4">
            <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Password
            </span>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 font-mono text-sm focus:outline-none focus:border-cyan transition-colors"
              placeholder="••••••••"
            />
          </label>
          {error && (
            <p className="font-mono text-xs text-red-400 mb-4">[ {error} ]</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan text-background px-6 py-3 font-mono text-sm uppercase tracking-wider font-semibold hover:glow-cyan transition-all disabled:opacity-60"
          >
            {loading ? "Authenticating..." : "[ Enter ]"}
          </button>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-cyan transition-colors"
          >
            <ArrowLeft className="size-3" /> Back to site
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyan mb-2">
              // Inbox
            </div>
            <h1 className="font-mono text-3xl md:text-4xl font-bold tracking-tighter">
              Contact messages{" "}
              <span className="text-cyan">[{messages.length}]</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => load(password)}
              disabled={loading}
              className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider hover:border-cyan hover:text-cyan transition-all disabled:opacity-60"
            >
              <RefreshCw className={`size-3 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-cyan transition-colors"
            >
              <ArrowLeft className="size-3" /> Site
            </Link>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="border border-dashed border-border p-12 text-center font-mono text-sm text-muted-foreground">
            No messages yet.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className="bg-card/60 border border-border p-6 hover:border-cyan transition-all"
              >
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <div className="font-mono text-lg font-bold">{m.name}</div>
                    <a
                      href={`mailto:${m.email}`}
                      className="inline-flex items-center gap-2 font-mono text-xs text-cyan hover:underline"
                    >
                      <Mail className="size-3" /> {m.email}
                    </a>
                  </div>
                  <div className="text-right">
                    <div className="inline-block border border-cyan/40 text-cyan px-2 py-1 font-mono text-[10px] uppercase tracking-wider mb-1">
                      {m.project_type}
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {new Date(m.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
                <p className="font-mono text-sm whitespace-pre-wrap text-foreground/90 border-t border-border pt-4">
                  {m.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
