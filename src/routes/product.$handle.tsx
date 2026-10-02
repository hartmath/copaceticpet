import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney, productQueryOptions, type ProductDetail } from "@/lib/shopify";

export const Route = createFileRoute("/product/$handle")({
  head: ({ match }) => {
    const loader = match.loaderData as { product?: ProductDetail } | undefined;
    const product = loader?.product;
    const title = product?.title
      ? `${product.title} — Copacetic Pets`
      : "Product — Copacetic Pets";
    const description = product?.description
      ? product.description.slice(0, 150)
      : "Shop pet gear at Copacetic Pets.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { "og:title": title },
        { "og:description": description },
        { "og:type": "website" },
        { "twitter:card": "summary_large_image" },
      ],
    };
  },
  loader: async ({ params, context }) => {
    const product = await context.queryClient.ensureQueryData(
      productQueryOptions(params.handle)
    );
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: ProductDetail };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
}

function ProductDetail({ product }: { product: ProductDetail }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const variants = product.variants.edges.map((e) => e.node);
  const images = product.images.edges.map((e) => e.node);
  const [activeImage, setActiveImage] = useState(0);

  const multiOptions = product.options.filter((o) => o.values.length > 1);
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const option of multiOptions) {
      const firstVariant = variants.find((v) =>
        v.selectedOptions.some((so) => so.name === option.name)
      );
      initial[option.name] =
        firstVariant?.selectedOptions.find((so) => so.name === option.name)?.value ??
        option.values[0] ??
        "";
    }
    return initial;
  });

  const selectedVariant =
    variants.find((v) =>
      multiOptions.every((o) =>
        v.selectedOptions.some(
          (so) => so.name === o.name && so.value === selections[o.name]
        )
      )
    ) ?? variants.find((v) => v.availableForSale) ?? variants[0] ?? null;

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const soldOut = selectedVariant ? !selectedVariant.availableForSale : true;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: {
        node: {
          id: product.id,
          title: product.title,
          handle: product.handle,
          images: product.images,
        },
      },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-secondary/40">
            {images.length > 0 ? (
              <img
                src={images[activeImage]?.url}
                alt={images[activeImage]?.altText ?? product.title}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center text-muted-foreground">
                <ShoppingBag className="h-12 w-12" />
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {images.slice(0, 5).map((image, index) => (
                <button
                  key={image.url + index}
                  onClick={() => setActiveImage(index)}
                  className={`overflow-hidden rounded-xl border-2 transition-colors ${
                    index === activeImage ? "border-accent" : "border-transparent"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image.url}
                    alt={image.altText ?? `${product.title} image ${index + 1}`}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            {product.title}
          </h1>
          <p className="mt-4 font-display text-2xl font-semibold text-foreground">
            {formatMoney(price.amount, price.currencyCode)}
          </p>

          {multiOptions.map((option) => (
            <div key={option.name} className="mt-5">
              <label
                htmlFor={`option-${option.name}`}
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                {option.name}
              </label>
              <select
                id={`option-${option.name}`}
                value={selections[option.name]}
                onChange={(e) =>
                  setSelections((prev) => ({ ...prev, [option.name]: e.target.value }))
                }
                className="mt-2 w-full max-w-xs rounded-full border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {option.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-12 min-w-44 rounded-full px-8 text-base"
              onClick={handleAddToCart}
              disabled={isLoading || soldOut}
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

          <div className="mt-8 border-t border-border/70 pt-6">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              About this product
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {product.description || "Details coming soon — ask us anything about this product."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
