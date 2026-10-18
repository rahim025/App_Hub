"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const isCreator = Boolean(user?.pseudo);

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={28} />
          <span className="font-semibold tracking-tight">AppHub</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-600">
          <Link href="/catalog" className="hover:text-zinc-900">Catalogue</Link>
          {isCreator ? (
            <>
              <Link href="/publish" className="hover:text-zinc-900">Publier</Link>
              <span className="hidden sm:inline text-zinc-900">@{user.pseudo}</span>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="hover:text-zinc-900">
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/enter" className="btn btn-primary !py-1.5">Espace créateur</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
