"use client";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import AnimatedBackground from "../components/AnimatedBackground";

const tiles = [
  { label: "Web", color: "#22d3ee", from: { x: -220, y: -170 } },
  { label: "Jeu", color: "#f472b6", from: { x: 210, y: -150 } },
  { label: "SaaS", color: "#a3e635", from: { x: -230, y: 130 } },
  { label: "IA", color: "#f97316", from: { x: 220, y: 140 } },
  { label: "Outil", color: "#818cf8", from: { x: 0, y: -260 } },
];

function Intro({ onDone }) {
  const [phase, setPhase] = useState("gather");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 1900);
    const t2 = setTimeout(onDone, 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {tiles.map((t, i) => (
        <motion.div
          key={t.label}
          initial={{ x: t.from.x, y: t.from.y, opacity: 0, scale: 0.5, rotate: -8 }}
          animate={
            phase === "gather"
              ? { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }
              : { x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 8 }
          }
          transition={{ duration: 0.8, delay: phase === "gather" ? i * 0.12 : 0, ease: "easeOut" }}
          className="absolute w-20 h-20 rounded-2xl flex items-end p-2 text-xs font-bold text-black"
          style={{ background: t.color }}
        >
          {t.label}
        </motion.div>
      ))}

      <div className="flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={phase === "logo" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-400 bg-clip-text text-transparent"
        >
          AppHub
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={phase === "logo" ? { width: 200 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-[2px] mt-4 bg-gradient-to-r from-cyan-400 to-pink-500"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={phase === "logo" ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 text-sm text-zinc-400 tracking-wide"
        >
          Publie. Découvre. Télécharge.
        </motion.p>
      </div>
    </motion.div>
  );
}

function Welcome({ onDone }) {
  const text = "Bienvenue sur AppHub";

  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
      exit={{ opacity: 0, y: -20, transition: { duration: 0.6 } }}
    >
      <h2 className="text-3xl md:text-5xl font-black flex flex-wrap justify-center px-6 text-center">
        {text.split("").map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
            className="inline-block"
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mt-4 text-zinc-400"
      >
        Prêt à explorer ?
      </motion.p>
    </motion.div>
  );
}

export default function Home() {
  const [intro, setIntro] = useState(true);
  const [welcome, setWelcome] = useState(false);

  const finishIntro = useCallback(() => {
    setIntro(false);
    setWelcome(true);
  }, []);

  const finishWelcome = useCallback(() => setWelcome(false), []);

  return (
    <>
      <AnimatedBackground />
      <AnimatePresence>{intro && <Intro onDone={finishIntro} />}</AnimatePresence>
      <AnimatePresence>{welcome && <Welcome onDone={finishWelcome} />}</AnimatePresence>
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.4 }}
        className="min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        <motion.h1
          animate={{ textShadow: ["0 0 20px #22d3ee", "0 0 60px #f472b6", "0 0 20px #22d3ee"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-7xl md:text-9xl font-black tracking-tight"
        >
          AppHub
        </motion.h1>
        <p className="mt-6 text-lg text-zinc-400">Découvrez les créations du monde</p>
        <motion.a
          href="/catalog"
          whileHover={{ scale: 1.08, boxShadow: "0 0 40px #f97316" }}
          className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-400 font-bold text-black"
        >
          Explorer
        </motion.a>
      </motion.main>
    </>
  );
}
