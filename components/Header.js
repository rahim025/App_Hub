"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const isCreator = Boolean(user?.pseudo);

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
      <nav className="flex items-center gap-5 text-sm text-zinc-400">
        <Link href="/catalog" className="hover:text-cyan-400">Catalogue</Link>
        {isCreator ? (
          <>
            <Link href="/publish" className="hover:text-pink-500">Publier</Link>
            <div className="flex items-center gap-2">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full" />
              ) : (
                <span className="w-8 h-8 rounded-full bg-pink-400 text-black font-bold flex items-center justify-center">
                  {user.pseudo[0].toUpperCase()}
                </span>
              )}
              <span className="hidden sm:inline text-zinc-300">@{user.pseudo}</span>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="text-xs text-zinc-500 hover:text-zinc-300">
                Quitter
              </button>
            </div>
          </>
        ) : (
          <Link href="/enter" className="hover:text-pink-500">Devenir créateur</Link>
        )}
      </nav>
    </header>
  );
}
