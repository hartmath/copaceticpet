import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      {
        title: "FAQ — Copacetic Pets",
        description:
          "Answers to common questions about shipping, returns, sizing and ordering from Copacetic Pets.",
        "og:title": "FAQ — Copacetic Pets",
        "og:description":
          "Answers to common questions about shipping, returns, sizing and ordering from Copacetic Pets.",
        "og:type": "website",
        "twitter:card": "summary_large_image",
      },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "How long does shipping take?",
    a: "Most orders are processed within 1–2 business days and arrive within 5–10 business days, depending on your location. You'll get a tracking link as soon as your order ships.",
  },
  {
    q: "How do I track my order?",
    a: "As soon as your order leaves the warehouse, we email you a tracking link. If it hasn't arrived within a couple of days of ordering, check your spam folder or contact us with your order number.",
  },
  {
    q: "What is your return policy?",
    a: "If something isn't right, contact us within 30 days of delivery and we'll make it copacetic — a replacement or a refund. Items should be unused and in their original packaging.",
  },
  {
    q: "How do I pick the right size?",
    a: "Each product page lists sizing details in the description. When in doubt, measure your pet and size up — and if it doesn't fit, our return policy has you covered.",
  },
  {
    q: "Is checkout secure?",
    a: "Yes. All payments are processed through Shopify's secure checkout, which supports major cards and express options like Shop Pay. We never see or store your card details.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently focus on US orders. If you're elsewhere, reach out before ordering and we'll confirm whether we can ship to you.",
  },
];

function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <div className="flex items-center gap-4">
          <span className="h-0.5 flex-1 bg-primary" />
          <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-primary sm:text-4xl">
            <CircleHelp className="h-8 w-8" /> FAQ
          </h1>
          <span className="h-0.5 flex-1 bg-primary" />
        </div>
        <p className="mt-2 font-semibold text-primary">
          Quick answers to the questions we hear most
        </p>
      </div>

      <div className="mt-10 divide-y divide-border border border-border bg-card">
        {FAQS.map((faq, i) => (
          <div key={faq.q}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-sm font-bold uppercase tracking-wide text-primary">
                {faq.q}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">Still stuck?</p>
        <Link to="/contact">
          <Button
            size="lg"
            className="mt-3 h-12 rounded-none px-8 text-sm font-bold uppercase tracking-[0.25em]"
          >
            Contact us
          </Button>
        </Link>
      </div>
    </main>
  );
}
