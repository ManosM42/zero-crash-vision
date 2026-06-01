import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const projects = [
  {
    name: "NEON.FINANCE",
    desc: "Real-time crypto dashboard with sub-100ms updates and animated trading charts.",
    stack: ["Next.js", "WebSocket", "D3", "Postgres"],
    gradient: "from-cyan-500/40 via-cyan-500/10 to-transparent",
  },
  {
    name: "ATLAS COMMERCE",
    desc: "Headless e-commerce platform processing 10k+ orders daily with zero downtime.",
    stack: ["React", "Stripe", "Edge", "Supabase"],
    gradient: "from-fuchsia-500/40 via-fuchsia-500/10 to-transparent",
  },
  {
    name: "ORBIT STUDIO",
    desc: "Immersive 3D portfolio for an architecture firm using Three.js and GLSL shaders.",
    stack: ["Three.js", "GLSL", "GSAP", "Vite"],
    gradient: "from-emerald-500/40 via-emerald-500/10 to-transparent",
  },
  {
    name: "VECTOR LABS",
    desc: "AI-powered SaaS dashboard with custom analytics and team workspace features.",
    stack: ["TypeScript", "tRPC", "Prisma", "AI SDK"],
    gradient: "from-amber-500/40 via-amber-500/10 to-transparent",
  },
];

export function Portfolio() {
  return (
    <section id="work" className="relative py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <Reveal variant="up" className="mb-20 max-w-2xl block">
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyan mb-4">
            // Selected Work
          </div>
          <h2 className="font-mono text-4xl md:text-6xl font-bold tracking-tighter">
            Things we've <span className="text-cyan">shipped</span>.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} variant={i % 2 === 0 ? "left" : "right"} delay={(i % 2) * 100}>
            <div
              className="group relative overflow-hidden border border-border bg-card/40 hover:border-cyan transition-all"
            >
              <div className={`relative h-56 bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute top-4 right-4 font-mono text-xs text-foreground/60">
                  /{(projects.indexOf(p) + 1).toString().padStart(2, "0")}
                </div>
                <div className="absolute bottom-4 left-6 font-mono text-2xl font-bold tracking-tight">
                  {p.name}
                </div>
              </div>
              <div className="p-6">
                <p className="text-foreground/80 mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-xs px-2 py-1 border border-border text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <button className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan hover:gap-3 transition-all">
                  [ View Project ] <ArrowUpRight className="size-4" />
                </button>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
