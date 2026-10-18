"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Logo from "../../components/Logo";

const CATS = ["Web", "Jeu", "SaaS", "IA", "Outil"];

function Choice({ title, text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-lg border border-zinc-200 bg-white p-5 hover:border-zinc-900 transition-colors"
    >
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-sm text-zinc-600">{text}</div>
    </button>
  );
}

export default function Enter() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [step, setStep] = useState("choice");
  const [cats, setCats] = useState([]);
  const [pseudo, setPseudo] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (step === "done" || status !== "authenticated") return;
    if (session.user.pseudo) router.replace("/publish");
    else setStep("profile");
  }, [status, session, step, router]);

  const photo = session?.user?.image;
  const toggle = (c) => setCats((l) => (l.includes(c) ? l.filter((x) => x !== c) : [...l, c]));

  const chooseUser = () => {
    localStorage.setItem("apphub_role", "user");
    router.push("/catalog");
  };
  const chooseCreator = () => {
    localStorage.setItem("apphub_role", "creator");
    setStep("google");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(pseudo)) {
      setError("3 à 20 caractères : lettres, chiffres ou _.");
      return;
    }
    setBusy(true);
    const res = await fetch("/api/creators", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, categories: cats }),
    });
    setBusy(false);
    if (res.status === 409) return setError("Ce pseudo est déjà pris.");
    if (!res.ok) return setError("Une erreur est survenue, veuillez réessayer.");
    setStep("done");
    await update();
    setTimeout(() => router.push("/publish"), 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8"><Logo size={36} /></div>

        {step === "choice" && (
          <div>
            <h1 className="text-2xl font-semibold text-center tracking-tight">Bienvenue sur AppHub</h1>
            <p className="mt-2 mb-6 text-center text-zinc-600">Comment souhaitez-vous l&apos;utiliser ?</p>
            <div className="flex flex-col gap-3">
              <Choice title="Je publie mes projets" text="Connexion avec un compte Google." onClick={chooseCreator} />
              <Choice title="Je parcours le catalogue" text="Aucun compte nécessaire." onClick={chooseUser} />
            </div>
          </div>
        )}

        {step === "google" && (
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Connexion créateur</h1>
            <p className="mt-2 mb-6 text-zinc-600">Connectez-vous avec votre compte Google pour accéder à votre espace.</p>
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/enter" })}
              className="btn btn-primary w-full"
            >
              Continuer avec Google
            </button>
            <button onClick={() => setStep("choice")} className="mt-4 text-sm text-zinc-500 hover:text-zinc-900">
              Retour
            </button>
          </div>
        )}

        {step === "profile" && (
          <form onSubmit={submit}>
            <h1 className="text-2xl font-semibold text-center tracking-tight">Créer votre profil</h1>
            <p className="mt-2 mb-6 text-center text-zinc-600">Dernière étape avant d&apos;accéder à votre espace.</p>
            <span className="text-sm font-medium">Ce que vous créez</span>
            <div className="flex flex-wrap gap-2 mt-2 mb-5">
              {CATS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggle(c)}
                  className={`px-3.5 py-1.5 rounded-md border text-sm ${
                    cats.includes(c) ? "bg-zinc-900 border-zinc-900 text-white" : "border-zinc-300 bg-white text-zinc-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="text-sm font-medium" htmlFor="pseudo">Pseudo</label>
            <input
              id="pseudo"
              value={pseudo}
              onChange={(e) => { setPseudo(e.target.value.trim()); setError(""); }}
              placeholder="ex. rahim_dev"
              maxLength={20}
              className="field mt-1"
            />
            <div className="flex items-center gap-3 mt-4 p-3 rounded-md border border-zinc-200 bg-white">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt="" referrerPolicy="no-referrer" className="w-10 h-10 rounded-full" />
              ) : (
                <span className="w-10 h-10 rounded-full bg-zinc-900 text-white font-medium flex items-center justify-center">
                  {pseudo ? pseudo[0].toUpperCase() : "?"}
                </span>
              )}
              <div>
                <div className="text-sm font-medium">@{pseudo || "pseudo"}</div>
                <div className="text-xs text-zinc-500">Photo de votre compte Google</div>
              </div>
            </div>
            <p className="text-sm text-red-600 min-h-[20px] mt-2">{error}</p>
            <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:opacity-60">
              {busy ? "Création…" : "Créer mon profil"}
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Bienvenue, @{pseudo}</h1>
            <p className="mt-2 text-zinc-600">Votre espace est prêt. Redirection en cours…</p>
          </div>
        )}
      </div>
    </main>
  );
}
