"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import Logo from "../../components/Logo";

const CATS = ["Web", "Jeu", "SaaS", "IA", "Outil"];
const COLORS = ["#22d3ee", "#f472b6", "#a3e635", "#f97316", "#818cf8"];

const screen = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
  transition: { duration: 0.4 },
};

function ChoiceCard({ i, onClick, title, text, children }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="card-border w-full text-left rounded-2xl p-4"
    >
      <div className="relative h-16 mb-3 overflow-hidden rounded-xl bg-zinc-950">{children}</div>
      <div className="text-lg font-bold">{title}</div>
      <div className="text-sm text-zinc-400">{text}</div>
    </motion.button>
  );
}

function Confetti() {
  const [bits] = useState(() =>
    Array.from({ length: 26 }, (_, k) => {
      const a = Math.random() * Math.PI * 2;
      const d = 80 + Math.random() * 120;
      return { x: Math.cos(a) * d, y: Math.sin(a) * d, c: COLORS[k % COLORS.length] };
    })
  );
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/3">
      {bits.map((b, k) => (
        <motion.span
          key={k}
          className="absolute w-2 h-2 rounded-sm"
          style={{ background: b.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: b.x, y: b.y, opacity: 0, rotate: 360 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
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
    if (!res.ok) return setError("Une erreur est survenue, réessaie.");
    setStep("done");
    await update();
    setTimeout(() => router.push("/publish"), 2200);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="w-full max-w-sm">
        <AnimatePresence mode="wait">
          {step === "choice" && (
            <motion.div key="choice" {...screen}>
              <h1 className="text-3xl font-black text-center">Bienvenue sur AppHub</h1>
              <p className="text-zinc-400 text-center mt-2 mb-6">Qui es-tu ?</p>
              <div className="flex flex-col gap-4">
                <ChoiceCard i={0} onClick={chooseCreator} title="Je suis créateur" text="Je publie mes sites, jeux, outils et apps">
                  {COLORS.slice(0, 4).map((c, k) => (
                    <motion.i
                      key={c}
                      className="absolute w-6 h-6 rounded-md"
                      style={{ background: c, left: `${14 + k * 20}%`, top: 20 }}
                      animate={{ y: [0, -12, 0], rotate: [0, 12, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: k * 0.4 }}
                    />
                  ))}
                </ChoiceCard>
                <ChoiceCard i={1} onClick={chooseUser} title="Je suis utilisateur" text="Je découvre et télécharge, sans compte">
                  <motion.div
                    className="flex gap-2 pt-5 pl-2 w-max"
                    animate={{ x: [0, -260] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  >
                    {[...COLORS, ...COLORS].map((c, k) => (
                      <i key={k} className="w-11 h-6 rounded-md shrink-0" style={{ background: c }} />
                    ))}
                  </motion.div>
                </ChoiceCard>
              </div>
            </motion.div>
          )}

          {step === "google" && (
            <motion.div key="google" {...screen} className="text-center">
              <div className="flex justify-center"><Logo size={120} /></div>
              <h1 className="text-3xl font-black mt-2">Connexion créateur</h1>
              <p className="text-zinc-400 mt-2 mb-6">Un clic avec ton compte Gmail, et ton espace s&apos;ouvre.</p>
              <motion.button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/enter" })}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full bg-white py-3 font-semibold text-zinc-900"
              >
                Continuer avec Google
              </motion.button>
              <button onClick={() => setStep("choice")} className="mt-4 text-sm text-zinc-500">Retour</button>
            </motion.div>
          )}

          {step === "profile" && (
            <motion.form key="profile" {...screen} onSubmit={submit}>
              <h1 className="text-3xl font-black text-center">Crée ton profil</h1>
              <p className="text-zinc-400 text-center mt-2 mb-6">Ça prend 20 secondes.</p>
              <span className="text-sm text-zinc-400">Ce que je crée (plusieurs choix possibles)</span>
              <div className="flex flex-wrap gap-2 mt-2 mb-5">
                {CATS.map((c) => (
                  <motion.button
                    key={c}
                    type="button"
                    onClick={() => toggle(c)}
                    animate={{ scale: cats.includes(c) ? [1, 1.15, 1] : 1 }}
                    whileHover={{ y: -2 }}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      cats.includes(c) ? "bg-cyan-400 border-cyan-400 text-teal-950" : "border-zinc-700 text-zinc-300"
                    }`}
                  >
                    {c}
                  </motion.button>
                ))}
              </div>
              <label className="text-sm text-zinc-400" htmlFor="pseudo">Pseudo</label>
              <input
                id="pseudo"
                value={pseudo}
                onChange={(e) => { setPseudo(e.target.value.trim()); setError(""); }}
                placeholder="Ex : rahim_dev"
                maxLength={20}
                className="mt-1 w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-pink-500"
              />
              <div className="flex items-center gap-3 mt-4 p-3 rounded-xl bg-zinc-900">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt="" referrerPolicy="no-referrer" className="w-11 h-11 rounded-full" />
                ) : (
                  <span className="w-11 h-11 rounded-full bg-pink-400 text-black font-bold flex items-center justify-center">
                    {pseudo ? pseudo[0].toUpperCase() : "?"}
                  </span>
                )}
                <div>
                  <div className="font-semibold">@{pseudo || "pseudo"}</div>
                  <div className="text-xs text-zinc-500">Photo de ton compte Gmail</div>
                </div>
              </div>
              <p className="text-sm text-red-400 min-h-[20px] mt-2">{error}</p>
              <motion.button
                type="submit"
                disabled={busy}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full py-3 font-bold text-black bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-400 disabled:opacity-60"
              >
                {busy ? "Création..." : "Créer mon profil"}
              </motion.button>
            </motion.form>
          )}

          {step === "done" && (
            <motion.div key="done" {...screen} className="text-center">
              <Confetti />
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="flex justify-center">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt="" referrerPolicy="no-referrer" className="w-20 h-20 rounded-full" />
                ) : (
                  <span className="w-20 h-20 rounded-full bg-pink-400 text-black text-3xl font-bold flex items-center justify-center">
                    {pseudo[0]?.toUpperCase()}
                  </span>
                )}
              </motion.div>
              <h1 className="text-3xl font-black mt-4">Bienvenue, @{pseudo} !</h1>
              <p className="text-zinc-400 mt-2">Ton espace est prêt. On t&apos;emmène publier ton premier projet.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
