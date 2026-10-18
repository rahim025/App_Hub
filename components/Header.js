"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const isCreator = Boolean(user?.pseudo);

  return (
    <header className="border-b border-line bg-surface">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 h-16">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Logo size={28} />
          <span className="font-semibold tracking-tight">AppHub</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 text-sm text-muted">
          {isCreator ? (
            <>
              <Link href="/publish" className="hover:text-ink">Publier</Link>
              <span className="hidden sm:inline text-ink">@{user.pseudo}</span>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="hover:text-ink">
                Quitter
              </button>
            </>
          ) : (
            <Link href="/enter" className="btn btn-primary !py-1.5 !px-3">
              <span className="sm:hidden">Créateur</span>
              <span className="hidden sm:inline">Espace créateur</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
