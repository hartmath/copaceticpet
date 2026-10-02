import { Link } from "@tanstack/react-router";
import { PawPrint, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/15">
                <PawPrint className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-semibold">
                Copacetic<span className="text-accent"> Pets</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/80">
              Thoughtfully picked gear for happy dogs, cats, and every little
              sidekick in between.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
              Shop
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/shop"
                  className="text-primary-foreground/85 hover:text-primary-foreground"
                >
                  All products
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-primary-foreground/85 hover:text-primary-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/85 hover:text-primary-foreground"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-primary-foreground/85 hover:text-primary-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-primary-foreground/85 hover:text-primary-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
              Questions?
            </h3>
            <p className="mt-4 flex items-center gap-2 text-sm text-primary-foreground/85">
              <Mail className="h-4 w-4" />
              hello@copaceticpets.com
            </p>
            <p className="mt-3 text-xs text-primary-foreground/60">
              Secure checkout powered by Shopify.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/15 pt-6 text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Copacetic Pets. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
