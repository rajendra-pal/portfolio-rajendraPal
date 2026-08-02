"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Github, Linkedin, Loader2, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const CONTACT_ROWS = [
  { Icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { Icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
  { Icon: Github, label: "GitHub", value: "@" + SITE.github.split("/").pop(), href: SITE.github },
  { Icon: Linkedin, label: "LinkedIn", value: "in/" + SITE.linkedin.split("/").pop(), href: SITE.linkedin },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json?.error ?? "Something went wrong");
      }
      setStatus("success");
      form.reset();
      window.setTimeout(() => setStatus("idle"), 4500);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
      window.setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <section id="contact" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          subtitle="Have a role, a project, or just a question? I'd love to hear from you."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:grid-cols-[5fr_7fr] md:p-10"
        >
          {/* Left: contact details */}
          <motion.div variants={fadeUp}>
            <h3 className="font-display text-xl font-semibold text-white">
              Reach me directly
            </h3>
            <p className="mt-2 text-sm text-white/55">
              I typically respond within a day.
            </p>

            <ul className="mt-6 space-y-3">
              {CONTACT_ROWS.map((row) => (
                <li key={row.label}>
                  <a
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:translate-x-1 hover:border-accent/40 hover:bg-white/[0.06]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent-secondary transition-colors group-hover:bg-accent/20 group-hover:text-white">
                      <row.Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                        {row.label}
                      </div>
                      <div className="truncate text-sm text-white/85">
                        {row.value}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: form */}
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field id="name" label="Name" required>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="contact-input"
                />
              </Field>
              <Field id="email" label="Email" required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="contact-input"
                />
              </Field>
            </div>

            <Field id="message" label="Message" required>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project or opportunity…"
                className="contact-input resize-none"
              />
            </Field>

            <div className="flex flex-col items-stretch gap-3 pt-2 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-white/45">
                By sending, you agree to be contacted about your message.
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(
                  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300",
                  "bg-accent text-white border border-accent",
                  "hover:bg-[#2563EB] hover:shadow-blue-glow-sm",
                  "disabled:cursor-wait disabled:opacity-80",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === "sending" ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </motion.span>
                  ) : status === "success" ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Sent
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      Send Message
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <AnimatePresence>
              {status === "error" && error && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-white/55">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}