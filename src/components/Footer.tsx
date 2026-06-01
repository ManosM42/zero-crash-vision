import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="font-mono font-bold text-xl">
            <span className="text-cyan">[</span>ZEROCRASH<span className="text-cyan">]</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground font-mono">
            We build websites that don't break.
          </p>
        </div>

        <nav className="flex flex-wrap gap-6 text-sm font-mono text-muted-foreground md:justify-center">
          {["Services", "Process", "Work", "About", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="hover:text-cyan transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex gap-3 md:justify-end">
          {[
            { icon: Github, href: "https://github.com" },
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Twitter, href: "https://twitter.com" },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="size-10 border border-border flex items-center justify-center hover:border-cyan hover:text-cyan transition-all"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border flex flex-col md:flex-row gap-2 justify-between font-mono text-xs text-muted-foreground">
        <div>© 2026 ZEROCRASH. Built with precision.</div>
        <div className="text-cyan/70">// status: all systems operational</div>
      </div>
    </footer>
  );
}
