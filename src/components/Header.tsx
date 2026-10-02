import { Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PawPrint, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { collectionsQueryOptions } from "@/lib/shopify";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: collections = [] } = useQuery(collectionsQueryOptions());

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-background shadow-sm">
      <div className="bg-primary px-4 py-2 text-center text-xs text-primary-foreground">
        <span className="font-bold uppercase tracking-[0.2em]">
          <PawPrint className="mr-1 inline h-3.5 w-3.5" /> Fresh finds weekly
        </span>{" "}
        <span className="underline underline-offset-2">New pet gear added every week</span>
      </div>
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary">
            <PawPrint className="h-6 w-6" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-2xl font-extrabold tracking-tight">
              Copacetic
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em]">
              Pets & Supplies
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) =>
            link.to === "/shop" ? (
              <div key={link.label} className="group relative">
                <Link
                  to="/shop"
                  className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-primary transition-opacity hover:opacity-70"
                  activeProps={{ className: "border-b-2 border-primary" }}
                >
                  Shop <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="border border-border bg-background py-2 shadow-lg">
                    <Link
                      to="/shop"
                      activeOptions={{ exact: true }}
                      className="block px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary hover:bg-secondary"
                    >
                      All products
                    </Link>
                    {collections.map((c) => (
                      <Link
                        key={c.handle}
                        to="/shop/$handle"
                        params={{ handle: c.handle }}
                        className="block px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary hover:bg-secondary"
                      >
                        {c.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="text-xs font-bold uppercase tracking-wide text-primary transition-opacity hover:opacity-70"
                activeProps={{ className: "border-b-2 border-primary" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1">
          <CartDrawer />
          <button
            className="flex h-10 w-10 items-center justify-center text-primary md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="max-h-[70vh] overflow-y-auto border-t border-border bg-background md:hidden">
          {NAV_LINKS.map((link) =>
            link.to === "/shop" ? (
              <div key={link.label} className="border-b border-border">
                <button
                  onClick={() => setShopOpen((o) => !o)}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-primary"
                  aria-expanded={shopOpen}
                >
                  Shop
                  <ChevronDown className={`h-4 w-4 transition-transform ${shopOpen ? "rotate-180" : ""}`} />
                </button>
                {shopOpen && (
                  <div className="bg-secondary/40 pb-2">
                    <Link
                      to="/shop"
                      activeOptions={{ exact: true }}
                      className="block px-8 py-2.5 text-xs font-bold uppercase tracking-wide text-primary"
                    >
                      All products
                    </Link>
                    {collections.map((c) => (
                      <Link
                        key={c.handle}
                        to="/shop/$handle"
                        params={{ handle: c.handle }}
                        className="block px-8 py-2.5 text-xs font-bold uppercase tracking-wide text-primary"
                      >
                        {c.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="block border-b border-border px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-primary"
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
