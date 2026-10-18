import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import { getApp } from "../../../lib/apps";
import { site } from "../../../lib/site";

export const dynamic = "force-dynamic";

async function load(params) {
  try {
    return await getApp(decodeURIComponent(params.name));
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const app = await load(params);
  return { title: app ? app.name : "Projet introuvable" };
}

export default async function AppPage({ params }) {
  const app = await load(params);
  if (!app) notFound();

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-12">
        <Link href="/catalog" className="text-sm text-muted hover:text-ink">← Retour au catalogue</Link>
        <span className="mt-8 block text-xs font-medium uppercase tracking-wide text-muted">{app.category}</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{app.name}</h1>
        {app.creator && <p className="mt-2 text-muted">Publié par @{app.creator}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={app.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Ouvrir le projet</a>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("Signalement : " + app.name)}`}
            className="btn btn-secondary"
          >
            Signaler ce projet
          </a>
        </div>
        <p className="mt-8 text-sm text-muted">
          Ce projet est publié par son créateur et hébergé en dehors d’AppHub. Vérifiez toujours l’adresse du site avant d’y saisir des informations personnelles.
        </p>
      </main>
    </>
  );
}
