import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="relative py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <Reveal variant="left">
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyan mb-4">
            // About Us
          </div>
          <h2 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Engineers who care about <span className="text-cyan">craft</span>.
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            ZEROCRASH is a small, performance-obsessed agency with 4+ years
            building futuristic web experiences for startups, studios, and
            ambitious brands. We treat every project like a product worth
            shipping.
          </p>
          <p className="text-foreground/70 leading-relaxed mb-8">
            We specialize in{" "}
            <span className="text-cyan font-mono">React</span>,{" "}
            <span className="text-cyan font-mono">Next.js</span>,{" "}
            <span className="text-cyan font-mono">Three.js</span>, and full
            stack solutions — combining sharp design with rock-solid
            engineering.
          </p>
          <div className="flex gap-3 flex-wrap font-mono text-xs">
            {["Performance-first", "Type-safe", "Accessible", "SEO-ready"].map(
              (t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 border border-cyan/40 text-cyan"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </Reveal>

        {/* Abstract geometric visual */}
        <Reveal variant="right" delay={150} className="block">
        <div className="relative aspect-square max-w-md mx-auto w-full">
          <div className="absolute inset-0 border border-cyan/30 rotate-12" />
          <div className="absolute inset-4 border border-cyan/50 -rotate-6" />
          <div className="absolute inset-8 border-2 border-cyan glow-cyan" />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center font-mono">
              <div className="text-7xl font-bold text-cyan text-glow">04+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                Years in orbit
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
