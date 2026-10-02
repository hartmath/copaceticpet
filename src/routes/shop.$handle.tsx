import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CollectionGrid } from "@/components/CollectionGrid";
import { collectionProductsQueryOptions, collectionsQueryOptions } from "@/lib/shopify";

const titleCase = (s: string) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const Route = createFileRoute("/shop/$handle")({
  head: ({ params }) => {
    const name = titleCase(params.handle);
    return {
      meta: [
        { title: `${name} — Shop Copacetic Pets` },
        { name: "description", content: `Shop the ${name} collection at Copacetic Pets.` },
        { property: "og:title", content: `${name} — Copacetic Pets` },
        { property: "og:description", content: `Browse ${name} picks for your pet.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  loader: async ({ context, params }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(collectionsQueryOptions()),
      context.queryClient.ensureQueryData(collectionProductsQueryOptions(params.handle)),
    ]);
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { handle } = Route.useParams();
  const { data: collections } = useSuspenseQuery(collectionsQueryOptions());
  const { data: products } = useSuspenseQuery(collectionProductsQueryOptions(handle));
  const current = collections.find((c) => c.handle === handle);
  return (
    <CollectionGrid
      title={current?.title ?? titleCase(handle)}
      products={products}
      collections={collections}
      activeHandle={handle}
    />
  );
}
