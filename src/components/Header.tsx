import { Link } from "@tanstack/react-router";
import { PawPrint } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";

const NAV_LINKS = [
  { label: "Shop", href: "/#shop" },
  { label: "Why Copacetic", href: "/#why" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const scrollTo = (href: string) => {
    const id = href.split("#")[1] ?? "";
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <PawPrint className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Copacetic<span className="text-accent"> Pets</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <CartDrawer />
      </div>
    </header>
  );
}
