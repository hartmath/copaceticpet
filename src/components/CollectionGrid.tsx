import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, PawPrint } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import type { ShopifyCollection, ShopifyProduct } from "@/lib/shopify";

export function CollectionGrid({
  title,
  products,
  collections,
  activeHandle,
}: {
  title: string;
  products: ShopifyProduct[];
  collections: ShopifyCollection[];
  activeHandle?: string;
}) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(16);
  const visible = products.slice(0, visibleCount);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <div className="flex items-center gap-4">
          <span className="h-0.5 flex-1 bg-primary" />
          <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-primary sm:text-4xl">
            <PawPrint className="h-8 w-8 shrink-0" /> {title}
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
            value={activeHandle ?? ""}
            onChange={(e) => {
              const handle = e.target.value;
              if (handle) navigate({ to: "/shop/$handle", params: { handle } });
              else navigate({ to: "/shop" });
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
            Nothing here yet. Check back soon or browse all products.
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
