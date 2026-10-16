import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Logo size={44} />
        <div className="flex flex-col">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            AppHub
          </Link>
          <span className="text-xs text-zinc-500">par Batchabi Rahim</span>
        </div>
      </div>
      <nav className="flex gap-6 text-sm text-zinc-400">
        <Link href="/catalog" className="hover:text-cyan-400">Catalogue</Link>
        <Link href="/publish" className="hover:text-pink-500">Publier</Link>
      </nav>
    </header>
  );
}
