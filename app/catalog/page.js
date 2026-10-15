import Header from "../../components/Header";
import AppCard from "../../components/AppCard";

const apps = [
  { name: "Kajo", category: "Éducation", color: "#22d3ee" },
  { name: "Piquant IA", category: "IA", color: "#f472b6" },
  { name: "Codo", category: "Outils dev", color: "#a3e635" },
];

export default function Catalog() {
  return (
    <>
      <Header />
      <main className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-4xl font-black mb-10">Catalogue</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.name} {...app} />
          ))}
        </div>
      </main>
    </>
  );
}
