import { Reveal } from "@/components/Reveal";

const steps = [
  { n: "01", title: "Discovery", desc: "We learn your goals, audience, and ambitions." },
  { n: "02", title: "Design", desc: "Futuristic wireframes & mockups crafted to convert." },
  { n: "03", title: "Build", desc: "Clean, fast, crash-proof code engineered to scale." },
  { n: "04", title: "Launch", desc: "Deploy, test, monitor, go live without surprises." },
  { n: "05", title: "Support", desc: "We don't disappear after launch. Real ongoing care." },
];

export function HowItWorks() {
  return (
    <section id="process" className="relative py-32 px-6 border-t border-border">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <Reveal variant="up" className="mb-20 max-w-2xl block">
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyan mb-4">
            // Our Process
          </div>
          <h2 className="font-mono text-4xl md:text-6xl font-bold tracking-tighter">
            From idea to <span className="text-cyan">production</span>.
          </h2>
        </Reveal>

        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 relative">
            {steps.map((s, i) => (
              <Reveal key={s.n} variant="up" delay={i * 120}>
                <div className="size-16 rounded-full border-2 border-cyan bg-background flex items-center justify-center font-mono font-bold text-cyan text-glow mb-6 mx-auto md:mx-0 relative z-10">
                  {s.n}
                </div>
                <h3 className="font-mono text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
