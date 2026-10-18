"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

const steps = [
  { title: "Publiez", text: "Ajoutez le lien de votre site, jeu ou outil avec sa catégorie." },
  { title: "Faites-vous trouver", text: "Chaque projet apparaît dans un catalogue ouvert à tous." },
  { title: "Partagez", text: "Les visiteurs accèdent directement à votre projet, sans compte." },
];

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("apphub_role")) router.replace("/enter");
    else setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6">
        <section className="pt-20 pb-16 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Les projets des créateurs, réunis au même endroit.
          </h1>
          <p className="mt-5 text-lg text-muted">
            AppHub référence des sites, des jeux et des outils en ligne. Parcourez le catalogue ou publiez le vôtre.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn btn-primary">Parcourir le catalogue</Link>
            <Link href="/enter" className="btn btn-secondary">Publier un projet</Link>
          </div>
        </section>
        <section className="border-t border-line pt-12 grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title}>
              <h2 className="font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
