import { DottedSurface } from "@/components/ui/dotted-surface";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-background" />
      <DottedSurface />

      {/* radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,200,87,0.10), transparent 60%)",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, #080808 95%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto fade-up">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyan/80 mb-6">
          // Premium Web Development Agency
        </div>
        <h1 className="font-mono font-bold text-6xl md:text-8xl lg:text-9xl tracking-tighter mb-8">
          <span className="glitch inline-block">ZEROCRASH</span>
        </h1>
        <p className="font-mono text-lg md:text-2xl text-foreground/90 mb-12">
          We build websites that don't break.
          <span className="cursor-blink h-5 md:h-7 align-middle" />
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center font-mono text-sm">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 bg-cyan text-background px-8 py-4 uppercase tracking-wider font-semibold hover:glow-cyan transition-all"
          >
            [ Start a Project ]
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 border border-foreground/30 px-8 py-4 uppercase tracking-wider hover:border-cyan hover:text-cyan transition-all"
          >
            [ View Our Work ]
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted-foreground tracking-widest animate-pulse">
        SCROLL ↓
      </div>
    </section>
  );
}
