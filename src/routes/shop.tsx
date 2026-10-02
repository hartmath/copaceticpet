import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { productsQueryOptions } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      {
        title: "Shop All Products — Copacetic Pets",
        description:
          "Browse the full Copacetic Pets collection: harnesses, beds, feeders, travel gear and more for dogs, cats and small pets.",
        "og:title": "Shop All Products — Copacetic Pets",
        "og:description":
          "Browse the full Copacetic Pets collection of practical pet gear.",
        "og:type": "website",
        "twitter:card": "summary_large_image",
      },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(productsQueryOptions(50));
  },
  component: ShopPage,
});

function ShopPage() {
  const { data: products } = useSuspenseQuery(productsQueryOptions(50));
  const [visibleCount, setVisibleCount] = useState(16);
  const visible = products.slice(0, visibleCount);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <div className="flex items-center gap-4">
          <span className="h-0.5 flex-1 bg-primary" />
          <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-primary sm:text-4xl">
            <PawPrint className="h-8 w-8" /> Our Collection
          </h1>
          <span className="h-0.5 flex-1 bg-primary" />
        </div>
        <p className="mt-2 font-semibold text-primary">
          {products.length} finds for dogs, cats & small pets
        </p>
      </div>

      {products.length === 0 ? (
        <div className="mt-10 border border-dashed border-border bg-card p-12 text-center">
          <h2 className="font-display text-xl font-semibold">No products found</h2>
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
                className="rounded-none font-bold uppercase tracking-widest"
                onClick={() => setVisibleCount((c) => c + 16)}
              >
                Load more products
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
