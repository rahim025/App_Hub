export default function AppCard({ name, category, url }) {
  return (
    <article className="flex flex-col rounded-lg border border-zinc-200 bg-white p-5">
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">{category}</span>
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 text-sm font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600"
      >
        Ouvrir le projet
      </a>
    </article>
  );
}
