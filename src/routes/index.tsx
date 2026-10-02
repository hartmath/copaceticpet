import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { productsQueryOptions } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Truck,
  ShieldCheck,
  HeartHandshake,
  ArrowDown,
} from "lucide-react";
import heroImage from "@/assets/hero-pets.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Copacetic Pets — Gear for Happy Dogs & Cats",
        description:
          "Curated pet gear from Copacetic Pets: harnesses, beds, feeders, travel kit and more. Secure checkout powered by Shopify.",
        "og:title": "Copacetic Pets — Gear for Happy Dogs & Cats",
        "og:description":
          "Curated pet gear from Copacetic Pets: harnesses, beds, feeders, travel kit and more.",
        "og:type": "website",
        "twitter:card": "summary_large_image",
      },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(productsQueryOptions(50));
  },
  component: Index,
});

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Hand-picked gear",
    text: "Every item is chosen for daily usefulness — no clutter, no gimmicks.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    text: "Check out through Shopify with the payment protection you expect.",
  },
  {
    icon: Truck,
    title: "Straight to your door",
    text: "Orders ship from our fulfillment partners, tracked from warehouse to porch.",
  },
  {
    icon: HeartHandshake,
    title: "Made for real life",
    text: "Practical products for messy meals, muddy paws, and long road trips.",
  },
];

function Index() {
  const { data: products } = useSuspenseQuery(productsQueryOptions(50));
  const [visibleCount, setVisibleCount] = useState(12);

  const visible = products.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-8 pt-10 md:grid-cols-2 md:pt-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary-foreground">
                New gear, every week
              </span>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
                Everything your pet needs.
                <br />
                <span className="text-accent">Nothing they don't.</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Copacetic Pets brings you a tight, curated lineup of practical
                pet supplies — from harnesses and cooling mats to feeders,
                travel kit, and toys that keep tails wagging.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="h-12 rounded-full px-7 text-base"
                  onClick={() =>
                    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Shop the collection
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="A golden retriever and an orange cat surrounded by pet gear"
                width={1600}
                height={900}
                className="w-full rounded-3xl"
              />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-border/60 bg-card p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-sage-foreground">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section id="shop" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Shop the collection
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {products.length} products for dogs, cats, birds & small pets
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <h3 className="font-display text-xl font-semibold">No products found</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                Our shelves are being restocked. Check back soon, or tell us what
                you're shopping for and we'll get it up first.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {visible.map((product) => (
                  <ProductCard key={product.node.id} product={product.node} />
                ))}
              </div>
              {visibleCount < products.length && (
                <div className="mt-10 text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                    onClick={() => setVisibleCount((c) => c + 12)}
                  >
                    Load more products
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Why Copacetic */}
        <section id="why" className="scroll-mt-24 bg-secondary/50 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Why pet parents shop Copacetic
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              "Copacetic" means everything is exactly as it should be. That's
              the standard we hold for every harness, feeder, bed, and toy in
              the shop — gear that simply works, at prices that make sense.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We keep the catalog small on purpose. Each product earns its
              place by solving a real problem — wet paws, bored kittens, long
              car rides — so you can shop in minutes, not hours.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
