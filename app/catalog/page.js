import Header from "../../components/Header";
import CatalogView from "../../components/CatalogView";
import { getApps } from "../../lib/apps";

export const dynamic = "force-dynamic";
export const metadata = { title: "Catalogue" };

export default async function Catalog() {
  let apps = [];
  let failed = false;
  try {
    apps = await getApps();
  } catch (e) {
    failed = true;
  }

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-semibold tracking-tight">Catalogue</h1>
        {failed ? (
          <p className="mt-6 text-muted">Le catalogue est momentanément indisponible. Merci de réessayer dans quelques instants.</p>
        ) : apps.length === 0 ? (
          <p className="mt-6 text-muted">Aucun projet n’a encore été publié.</p>
        ) : (
          <CatalogView apps={apps} />
        )}
      </main>
    </>
  );
}
