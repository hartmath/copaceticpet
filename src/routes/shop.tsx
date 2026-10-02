import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { ProductCard } from "@/components/ProductCard";
import {
  collectionProductsQueryOptions,
  collectionsQueryOptions,
  productsQueryOptions,
} from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { ChevronDown, PawPrint } from "lucide-react";

const searchSchema = z.object({ collection: z.string().optional() });

const productsFor = (collection?: string) =>
  collection ? collectionProductsQueryOptions(collection) : productsQueryOptions(50);

export const Route = createFileRoute("/shop")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Shop All Products — Copacetic Pets" },
      {
        name: "description",
        content:
          "Browse the full Copacetic Pets collection: harnesses, beds, feeders, travel gear and more for dogs, cats and small pets.",
      },
      { property: "og:title", content: "Shop All Products — Copacetic Pets" },
      {
        property: "og:description",
        content: "Browse the full Copacetic Pets collection of practical pet gear.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loaderDeps: ({ search }) => ({ collection: search.collection }),
  loader: async ({ context, deps }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(collectionsQueryOptions()),
      context.queryClient.ensureQueryData(productsFor(deps.collection)),
    ]);
  },
  component: ShopPage,
});

function ShopPage() {
  const { collection } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const { data: collections } = useSuspenseQuery(collectionsQueryOptions());
  const { data: products } = useSuspenseQuery(productsFor(collection));
  const [visibleCount, setVisibleCount] = useState(16);
  const visible = products.slice(0, visibleCount);
  const current = collections.find((c) => c.handle === collection);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <div className="flex items-center gap-4">
          <span className="h-0.5 flex-1 bg-primary" />
          <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-primary sm:text-4xl">
            <PawPrint className="h-8 w-8" /> {current ? current.title : "Our Collection"}
          </h1>
          <span className="h-0.5 flex-1 bg-primary" />
        </div>
        <p className="mt-2 font-semibold text-primary">
          {products.length} finds for dogs, cats & small pets
        </p>
      </div>

      <div className="mt-8 flex justify-center sm:justify-end">
        <label className="relative w-full sm:w-72">
          <span className="sr-only">Choose a collection</span>
          <select
            value={collection ?? ""}
            onChange={(e) => {
              setVisibleCount(16);
              navigate({ search: e.target.value ? { collection: e.target.value } : {} });
            }}
            className="h-11 w-full appearance-none border-2 border-primary bg-background px-4 pr-10 text-sm font-bold uppercase tracking-wide text-primary focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All products</option>
            {collections.map((c) => (
              <option key={c.handle} value={c.handle}>
                {c.title}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
        </label>
      </div>

      {products.length === 0 ? (
        <div className="mt-10 border border-dashed border-border bg-card p-12 text-center">
          <h2 className="font-display text-xl font-semibold">No products found</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Nothing in this collection yet. Check back soon or browse all products.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
