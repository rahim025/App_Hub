"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "../../components/Header";

export default function Publish() {
  const router = useRouter();
  const { data: session, status: auth } = useSession();

  useEffect(() => {
    if (auth === "unauthenticated" || (auth === "authenticated" && !session.user.pseudo)) {
      router.replace("/enter");
    }
  }, [auth, session, router]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours…");

    const res = await fetch("/api/apps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, url }),
    });

    if (res.ok) {
      setStatus("Projet publié.");
      setName("");
      setCategory("");
      setUrl("");
    } else {
      setStatus("Échec de la publication. Vérifiez les champs.");
    }
  };

  return (
    <>
      <Header />
      <main className="px-6 pt-12 max-w-xl mx-auto">
        <h1 className="text-3xl font-semibold tracking-tight">Publier un projet</h1>
        <p className="mt-2 mb-8 text-muted">Il apparaîtra dans le catalogue dès sa publication.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom du projet" className="field" required />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Catégorie (Web, Jeu, SaaS…)" className="field" required />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Lien du projet (https://…)" className="field" required />
          <button type="submit" className="btn btn-primary">Publier</button>
          {status && <p className="text-sm text-muted">{status}</p>}
        </form>
      </main>
    </>
  );
}
