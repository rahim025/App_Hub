"use client";

export default function Error({ reset }) {
  return (
    <main className="max-w-xl mx-auto px-6 pt-24 text-center">
      <p className="text-sm font-medium text-accent">Erreur</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Un problème est survenu</h1>
      <p className="mt-3 text-muted">Nous n’avons pas pu afficher cette page. Réessayez dans un instant.</p>
      <button onClick={() => reset()} className="btn btn-primary mt-8">Réessayer</button>
    </main>
  );
}
