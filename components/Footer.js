import Link from "next/link";
import { site } from "../lib/site";

const links = [
  { href: "/catalog", label: "Catalogue" },
  { href: "/contact", label: "Contact" },
  { href: "/legal", label: "Mentions légales" },
  { href: "/privacy", label: "Confidentialité" },
  { href: "/terms", label: "Conditions d’utilisation" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-muted">
        <p>© {new Date().getFullYear()} {site.name} · par {site.owner}</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink">{l.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
