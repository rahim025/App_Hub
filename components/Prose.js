import Header from "./Header";

export default function Prose({ title, children }) {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <div className="mt-8 space-y-4 leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_a]:text-accent [&_a]:underline">
          {children}
        </div>
      </main>
    </>
  );
}
