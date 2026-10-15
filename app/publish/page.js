"use client";
import { useState } from "react";
import Header from "../../components/Header";

export default function Publish() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application "${name}" soumise (démo).`);
  };

  return (
    <>
      <Header />
      <main className="px-6 py-12 max-w-xl mx-auto">
        <h2 className="text-4xl font-black mb-8">Publier une app</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom de l'app" className="p-3 rounded-lg bg-zinc-900 border border-zinc-800" required />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Catégorie" className="p-3 rounded-lg bg-zinc-900 border border-zinc-800" required />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Lien de l'app" className="p-3 rounded-lg bg-zinc-900 border border-zinc-800" required />
          <button type="submit" className="p-3 rounded-lg bg-gradient-to-r from-cyan-400 to-pink-500 font-bold text-black">Publier</button>
        </form>
      </main>
    </>
  );
    }
