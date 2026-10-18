import Header from "../../components/Header";
import AppCard from "../../components/AppCard";
import { sql } from "../../lib/db";

export const dynamic = "force-dynamic";

export default async function Catalog() {
  const apps = await sql`SELECT name, category, url FROM apps ORDER BY created_at DESC`;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-semibold tracking-tight">Catalogue</h1>
        <p className="mt-2 text-zinc-600">
          {apps.length} {apps.length > 1 ? "projets publiés" : "projet publié"}
        </p>
        {apps.length === 0 ? (
          <p className="mt-10 text-zinc-500">Aucun projet pour le moment.</p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard key={app.name} name={app.name} category={app.category} url={app.url} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
