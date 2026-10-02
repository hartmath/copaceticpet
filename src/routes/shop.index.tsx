import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CollectionGrid } from "@/components/CollectionGrid";
import { collectionsQueryOptions, productsQueryOptions } from "@/lib/shopify";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop All Products — Copacetic Pets" },
      {
        name: "description",
        content:
          "Browse the full Copacetic Pets collection: smart pet tech, comfort, outdoor and travel gear for dogs, cats and small pets.",
      },
      { property: "og:title", content: "Shop All Products — Copacetic Pets" },
      { property: "og:description", content: "Browse every Copacetic Pets find in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(collectionsQueryOptions()),
      context.queryClient.ensureQueryData(productsQueryOptions(50)),
    ]);
  },
  component: ShopPage,
});

function ShopPage() {
  const { data: collections } = useSuspenseQuery(collectionsQueryOptions());
  const { data: products } = useSuspenseQuery(productsQueryOptions(50));
  return <CollectionGrid title="Our Collection" products={products} collections={collections} />;
}
