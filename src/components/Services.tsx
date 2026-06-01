import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const packages = [
  {
    name: "Starter Site",
    price: "$250",
    tag: "01",
    features: [
      "Landing page, mobile responsive",
      "SEO basics",
      "Contact form",
      "3 pages max",
    ],
  },
  {
    name: "Business Site",
    price: "$500",
    tag: "02",
    featured: true,
    features: [
      "Up to 8 pages",
      "CMS integration",
      "Backend + admin dashboard",
      "Contact system",
    ],
  },
  {
    name: "E-Commerce",
    price: "$900",
    tag: "03",
    features: [
      "Full online store",
      "Payment integration",
      "Inventory management",
      "Order management",
    ],
  },
  {
    name: "Custom Build",
    price: "Custom",
    tag: "04",
    features: [
      "Full custom application",
      "API integrations",
      "Complex backend",
      "Ongoing support",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal variant="up" className="mb-20 max-w-2xl block">
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyan mb-4">
            // What We Build
          </div>
          <h2 className="font-mono text-4xl md:text-6xl font-bold tracking-tighter">
            Pick your <span className="text-cyan">stack</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Transparent pricing. No surprises. Built to last.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((p, i) => (
            <Reveal key={p.name} variant="up" delay={i * 100}>
            <div
              key={p.name}
              className={`group relative bg-card/60 backdrop-blur border p-8 flex flex-col transition-all hover:-translate-y-1 ${
                p.featured
                  ? "border-cyan glow-cyan"
                  : "border-border hover:border-cyan"
              }`}
            >
              <div className="font-mono text-xs text-muted-foreground mb-4">
                [ {p.tag} ]
              </div>
              <h3 className="font-mono text-xl font-bold mb-2">{p.name}</h3>
              <div className="font-mono text-5xl font-bold text-cyan text-glow mb-6">
                {p.price}
              </div>
              <ul className="space-y-3 mb-8 flex-1 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="size-4 text-cyan mt-0.5 shrink-0" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block text-center font-mono text-xs uppercase tracking-wider border border-foreground/20 py-3 group-hover:border-cyan group-hover:text-cyan transition-all"
              >
                [ Get Started ]
              </a>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
