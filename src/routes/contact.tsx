import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact Us — Copacetic Pets",
        description:
          "Questions about an order or a product? Get in touch with the Copacetic Pets team.",
        "og:title": "Contact Us — Copacetic Pets",
        "og:description":
          "Questions about an order or a product? Get in touch with the Copacetic Pets team.",
        "og:type": "website",
        "twitter:card": "summary_large_image",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Copacetic Pets inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:hello@copaceticpets.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email app — your message is ready to send.");
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <div className="flex items-center gap-4">
          <span className="h-0.5 flex-1 bg-primary" />
          <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-primary sm:text-4xl">
            <MessageCircle className="h-8 w-8" /> Get in Touch
          </h1>
          <span className="h-0.5 flex-1 bg-primary" />
        </div>
        <p className="mt-2 font-semibold text-primary">
          We usually reply within one business day
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-extrabold uppercase text-primary">
            Talk to a human
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Whether it's a question about sizing, a shipping update, or a
            product you'd love us to carry — send us a note and a real person
            will get back to you.
          </p>
          <div className="mt-6 flex items-center gap-3 border border-border bg-card p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Email us
              </p>
              <p className="text-sm font-semibold text-foreground">
                hello@copaceticpets.com
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 border border-border bg-card p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <PawPrint className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Order help
              </p>
              <p className="text-sm font-semibold text-foreground">
                Include your order number for the fastest reply
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="border border-border bg-card p-6">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary">
            Your name
          </label>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 rounded-none"
            placeholder="Alex Rivera"
          />
          <label className="mt-5 block text-xs font-bold uppercase tracking-widest text-primary">
            Email
          </label>
          <Input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 rounded-none"
            placeholder="you@example.com"
          />
          <label className="mt-5 block text-xs font-bold uppercase tracking-widest text-primary">
            Message
          </label>
          <Textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1.5 min-h-32 rounded-none"
            placeholder="How can we help?"
          />
          <Button
            type="submit"
            size="lg"
            className="mt-6 h-12 w-full rounded-none text-sm font-bold uppercase tracking-[0.25em]"
          >
            Send message
          </Button>
        </form>
      </div>
    </main>
  );
}
