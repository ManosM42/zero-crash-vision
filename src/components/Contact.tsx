import { useState } from "react";
import { Phone, Mail, Send, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/Reveal";

const PHONE = "+30 6942870280";
const PHONE_HREF = "tel:+306942870280";
const EMAIL = "zerocrash44@gmail.com";

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "Starter",
    message: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim().slice(0, 100),
      email: form.email.trim().slice(0, 255),
      project_type: form.type,
      message: form.message.trim().slice(0, 2000),
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send message. Please try again.");
      return;
    }
    toast.success("Message sent. We respond within 24h.");
    setForm({ name: "", email: "", type: "Starter", message: "" });
  };

  return (
    <section id="contact" className="relative py-32 px-6 border-t border-border">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <Reveal variant="up" className="mb-16 max-w-2xl block">
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyan mb-4">
            // Initiate Contact
          </div>
          <h2 className="font-mono text-4xl md:text-6xl font-bold tracking-tighter">
            Let's build <span className="text-cyan">something</span>.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <Reveal variant="left" className="lg:col-span-2 block">
          <form
            onSubmit={onSubmit}
            className="bg-card/60 border border-border p-8 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  maxLength={100}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 font-mono text-sm focus:outline-none focus:border-cyan transition-colors"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 font-mono text-sm focus:outline-none focus:border-cyan transition-colors"
                  placeholder="you@domain.com"
                />
              </Field>
            </div>
            <Field label="Project Type">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 font-mono text-sm focus:outline-none focus:border-cyan transition-colors"
              >
                <option>Starter</option>
                <option>Business</option>
                <option>E-Commerce</option>
                <option>Custom</option>
              </select>
            </Field>
            <Field label="Message">
              <textarea
                required
                rows={6}
                maxLength={2000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 font-mono text-sm focus:outline-none focus:border-cyan transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </Field>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-cyan text-background px-8 py-4 font-mono text-sm uppercase tracking-wider font-semibold hover:glow-cyan transition-all disabled:opacity-60"
            >
              <Send className="size-4" />
              {submitting ? "Sending..." : "[ Send Message ]"}
            </button>
            <p className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Clock className="size-3" /> We typically respond within 24 hours.
            </p>
          </form>
          </Reveal>

          {/* Side info */}
          <Reveal variant="right" delay={150} className="block">
          <div className="space-y-6">
            <ContactCard
              icon={<Phone className="size-5" />}
              label="Call Us"
              value={PHONE}
              cta="[ Call Now ]"
              href={PHONE_HREF}
            />
            <ContactCard
              icon={<Mail className="size-5" />}
              label="Email"
              value={EMAIL}
              cta="[ Send Email ]"
              href={`mailto:${EMAIL}`}
            />
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function ContactCard({
  icon,
  label,
  value,
  cta,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="bg-card/60 border border-border p-6 hover:border-cyan transition-all">
      <div className="flex items-center gap-2 text-cyan mb-3">
        {icon}
        <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
      </div>
      <div className="font-mono text-xl font-bold mb-4 break-all">{value}</div>
      <a
        href={href}
        className="inline-block font-mono text-xs uppercase tracking-wider border border-cyan text-cyan px-4 py-2 hover:bg-cyan hover:text-background transition-all"
      >
        {cta}
      </a>
    </div>
  );
}
