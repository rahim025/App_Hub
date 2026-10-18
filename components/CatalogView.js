"use client";
import { useMemo, useState } from "react";
import AppCard from "./AppCard";

export default function CatalogView({ apps }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Toutes");

  const cats = useMemo(() => ["Toutes", ...new Set(apps.map((a) => a.category).filter(Boolean))], [apps]);
  const list = apps.filter(
    (a) =>
      (cat === "Toutes" || a.category === cat) &&
      a.name.toLowerCase().includes(q.trim().toLowerCase())
  );

  return (
    <>
      <div className="mt-8 flex flex-col gap-4">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un projet"
          aria-label="Rechercher un projet"
          className="field max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`px-3.5 py-1.5 rounded-md border text-sm ${
                cat === c ? "bg-accent border-accent text-accent-ink" : "border-line bg-surface text-muted hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-muted">
        {list.length} {list.length > 1 ? "projets" : "projet"}
      </p>
      {list.length === 0 ? (
        <p className="mt-6 text-muted">Aucun projet ne correspond à votre recherche.</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <AppCard key={a.name} name={a.name} category={a.category} url={a.url} creator={a.creator} />
          ))}
        </div>
      )}
    </>
  );
}
