import Link from "next/link";

export default function AppCard({ name, category, url, creator }) {
  return (
    <article className="flex flex-col rounded-lg border border-line bg-surface p-5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{category}</span>
      <h3 className="mt-2 text-lg font-semibold">
        <Link href={`/catalog/${encodeURIComponent(name)}`} className="hover:underline underline-offset-4">
          {name}
        </Link>
      </h3>
      {creator && <p className="mt-1 text-sm text-muted">par @{creator}</p>}
      <div className="mt-6 flex items-center gap-5 text-sm font-medium">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">
          Ouvrir
        </a>
        <Link href={`/catalog/${encodeURIComponent(name)}`} className="text-muted hover:text-ink">
          Voir la fiche
        </Link>
      </div>
    </article>
  );
}
