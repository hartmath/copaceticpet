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
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-xs font-bold uppercase tracking-wide text-primary transition-opacity hover:opacity-70"
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
