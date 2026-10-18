export default function AppCard({ name, category, url }) {
  return (
    <article className="flex flex-col rounded-lg border border-line bg-surface p-5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{category}</span>
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 text-sm font-medium text-ink underline underline-offset-4 hover:text-muted"
      >
        Ouvrir le projet
      </a>
    </article>
  );
}
