import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney, type ShopifyProduct } from "@/lib/shopify";

type ProductNode = ShopifyProduct["node"];

function pickDefaultVariant(product: ProductNode) {
  const variants = product.variants.edges.map((e) => e.node);
  return variants.find((v) => v.availableForSale) ?? variants[0] ?? null;
}

function pickSelectableOption(product: ProductNode) {
  return product.options.find((o) => o.values.length > 1) ?? null;
}

export function ProductCard({ product }: { product: ProductNode }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const defaultVariant = pickDefaultVariant(product);
  const selectable = pickSelectableOption(product);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    selectable?.values[0]
  );

  const selectedVariant = selectable
    ? product.variants.edges.map((e) => e.node).find(
        (v) =>
          v.selectedOptions.some(
            (so) => so.name === selectable.name && so.value === selectedValue
          )
      ) ?? defaultVariant
    : defaultVariant;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
  };

  const image = product.images.edges[0]?.node;
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const soldOut = selectedVariant ? !selectedVariant.availableForSale : false;

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-shadow hover:shadow-lg">
      <Link
        to="/product/$handle"
        params={{ handle: product.handle }}
        className="relative block aspect-square overflow-hidden bg-secondary/40"
      >
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ShoppingBag className="h-10 w-10" />
          </div>
        )}
        {soldOut && (
          <span className="absolute top-3 left-3 rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium text-background">
            Sold out
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link
          to="/product/$handle"
          params={{ handle: product.handle }}
          className="line-clamp-2 text-sm font-medium leading-snug text-foreground hover:underline"
        >
          {product.title}
        </Link>

        {selectable && (
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="w-full rounded-full border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={`Choose ${selectable.name}`}
          >
            {selectable.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-display text-base font-bold text-primary">
            {formatMoney(price.amount, price.currencyCode)}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || !selectedVariant || soldOut}
            className="h-10 w-full rounded-none px-4 text-xs font-semibold uppercase tracking-widest sm:h-9 sm:w-auto"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : soldOut ? (
              "Sold out"
            ) : (
              "Add to cart"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
