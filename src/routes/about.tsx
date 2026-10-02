import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PawPrint, HeartHandshake, Sparkles, PackageCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Us — Copacetic Pets",
        description:
          "Why Copacetic Pets exists: a small, carefully chosen catalog of practical pet gear that simply works.",
        "og:title": "About Us — Copacetic Pets",
        "og:description":
          "Why Copacetic Pets exists: a small, carefully chosen catalog of practical pet gear that simply works.",
        "og:type": "website",
        "twitter:card": "summary_large_image",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: Sparkles,
    title: "Chosen, not scraped",
    text: "We don't list thousands of lookalike products. Each item earns its spot by solving a real, everyday problem.",
  },
  {
    icon: PackageCheck,
    title: "Tested by real life",
    text: "Muddy walks, spilled water bowls, back-seat zoomies — if it can't handle ordinary chaos, it doesn't make the cut.",
  },
  {
    icon: HeartHandshake,
    title: "Fair prices, no games",
    text: "No fake countdown timers or inflated 'was' prices. Just honest gear at prices that make sense.",
  },
];

function AboutPage() {
  return (
    <main>
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <PawPrint className="mx-auto h-10 w-10" />
          <h1 className="mt-4 text-4xl font-extrabold uppercase sm:text-5xl">
            Everything should be copacetic
          </h1>
          <p className="mt-6 leading-relaxed opacity-90">
            "Copacetic" is an old-fashioned word that means everything is
            exactly as it should be. We started Copacetic Pets because shopping
            for pet gear online felt like the opposite — endless pages of
            near-identical products, mystery quality, and prices that change
            depending on when you look.
          </p>
          <p className="mt-4 leading-relaxed opacity-90">
            So we keep it simple: a small catalog of harnesses, beds, feeders,
            travel kit and toys that we would happily use with our own pets.
            Every order is checked out securely through Shopify and shipped
            straight to your door, tracked from warehouse to porch.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-extrabold uppercase text-primary">
          What we stand for
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="flex flex-col items-center text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <value.icon className="h-9 w-9" />
              </span>
              <h3 className="mt-4 text-base font-extrabold uppercase text-primary">
                {value.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {value.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/shop">
            <Button
              size="lg"
              className="h-12 rounded-none px-8 text-sm font-bold uppercase tracking-[0.25em]"
            >
              Browse the shop
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
