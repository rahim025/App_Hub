import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
      <Link href="/" className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
        AppHub
      </Link>
      <nav className="flex gap-6 text-sm text-zinc-400">
        <Link href="/catalog" className="hover:text-cyan-400">Catalogue</Link>
        <Link href="/publish" className="hover:text-pink-500">Publier</Link>
      </nav>
    </header>
  );
}
