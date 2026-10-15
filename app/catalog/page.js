import Header from "../../components/Header";
import AppCard from "../../components/AppCard";
import { sql } from "../../lib/db";

export const dynamic = "force-dynamic";

const colors = ["#22d3ee", "#f472b6", "#a3e635", "#f97316"];

export default async function Catalog() {
  const apps = await sql`SELECT name, category, url FROM apps ORDER BY created_at DESC`;

  return (
    <>
      <Header />
      <main className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-4xl font-black mb-10">Catalogue</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, i) => (
            <AppCard
              key={app.name}
              name={app.name}
              category={app.category}
              url={app.url}
              color={colors[i % colors.length]}
            />
          ))}
        </div>
      </main>
    </>
  );
    }
