import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import {
  collectionProductsQueryOptions,
  collectionsQueryOptions,
} from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Truck,
  ShieldCheck,
  HeartHandshake,
  PawPrint,
} from "lucide-react";
import heroImage from "@/assets/hero-dog.jpg";

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
    await context.queryClient.ensureQueryData(collectionsQueryOptions());
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
  const { data: products } = useSuspenseQuery(productsQueryOptions(8));
  const featured = products.slice(0, 8);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="A happy golden retriever relaxing on the grass"
          width={1920}
          height={832}
          className="absolute inset-0 h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/50 to-transparent" />
        <div className="relative mx-auto flex min-h-[460px] max-w-6xl items-center px-4 py-16 md:min-h-[600px]">
          <div className="max-w-xl">
            <h1 className="font-script text-5xl leading-tight text-primary sm:text-7xl">
              Good Gear.
              <br />
              Happy Pets.
            </h1>
            <p className="mt-6 text-xl font-medium text-foreground sm:text-2xl">
              Everyday essentials for the pets you love.
            </p>
            <Link to="/shop">
              <Button
                size="lg"
                className="mt-8 h-12 rounded-none px-8 text-sm font-bold uppercase tracking-[0.25em]"
              >
                Shop now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="flex flex-col items-center text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <benefit.icon className="h-9 w-9" />
              </span>
              <h3 className="mt-4 text-base font-extrabold uppercase text-primary">
                {benefit.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="text-center">
          <div className="flex items-center gap-4">
            <span className="h-0.5 flex-1 bg-primary" />
            <h2 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-primary sm:text-4xl">
              <PawPrint className="h-8 w-8" /> Featured Finds
            </h2>
            <span className="h-0.5 flex-1 bg-primary" />
          </div>
        </div>

        {featured.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.node.id} product={product.node} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link to="/shop">
            <Button
              variant="outline"
              size="lg"
              className="rounded-none font-bold uppercase tracking-widest"
            >
              View all products
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Copacetic */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-extrabold uppercase">
            Why pet parents shop Copacetic
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            "Copacetic" means everything is exactly as it should be. That's
            the standard we hold for every harness, feeder, bed, and toy in
            the shop — gear that simply works, at prices that make sense.
          </p>
          <p className="mt-4 leading-relaxed opacity-90">
            We keep the catalog small on purpose. Each product earns its
            place by solving a real problem — wet paws, bored kittens, long
            car rides — so you can shop in minutes, not hours.
          </p>
          <Link to="/about">
            <Button
              variant="secondary"
              size="lg"
              className="mt-8 rounded-none font-bold uppercase tracking-widest"
            >
              Our story
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
