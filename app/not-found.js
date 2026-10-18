import Link from "next/link";
import Header from "../components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-xl mx-auto px-6 pt-24 text-center">
        <p className="text-sm font-medium text-accent">Erreur 404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Page introuvable</h1>
        <p className="mt-3 text-muted">La page que vous cherchez n’existe pas ou a été déplacée.</p>
        <Link href="/" className="btn btn-primary mt-8">Retour à l’accueil</Link>
      </main>
    </>
  );
}
