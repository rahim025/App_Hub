"use client";
import { useCallback, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Header from "../components/Header";
import AnimatedBackground from "../components/AnimatedBackground";

const tiles = [
  { label: "Web", color: "#22d3ee", from: { x: -220, y: -170 } },
  { label: "Jeu", color: "#f472b6", from: { x: 210, y: -150 } },
  { label: "SaaS", color: "#a3e635", from: { x: -230, y: 130 } },
  { label: "IA", color: "#f97316", from: { x: 220, y: 140 } },
  { label: "Outil", color: "#818cf8", from: { x: 0, y: -260 } },
];

const features = [
  { title: "Publiez", text: "Partagez votre site, jeu ou SaaS en quelques clics." },
  { title: "Découvrez", text: "Parcourez une vitrine pensée pour les créations du monde." },
  { title: "Utilisez", text: "Ouvrez chaque projet directement depuis son lien." },
];

function Intro({ onDone }) {
  const [phase, setPhase] = useState("gather");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("logo"), 1500),
      setTimeout(() => setPhase("out"), 4000),
      setTimeout(onDone, 4600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-zinc-950"
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
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
          transition={{ duration: 0.9, delay: phase === "gather" ? i * 0.12 : 0, ease: "easeOut" }}
          className="absolute w-20 h-20 rounded-2xl flex items-end p-2 text-xs font-bold text-black"
          style={{ background: t.color }}
        >
          {t.label}
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {phase === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              AppHub
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-px mt-4 bg-gradient-to-r from-cyan-400 to-pink-500"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MagneticLink({ href, children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  return (
    <motion.a
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
      className="inline-block mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-400 font-bold text-black shadow-[0_0_40px_rgba(244,114,182,0.35)]"
    >
      {children}
    </motion.a>
  );
}

function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const spot = useTransform(
    [sx, sy],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(34,211,238,0.18), transparent 60%)`
  );

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative min-h-[88vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      <motion.div style={{ background: spot }} className="absolute inset-0 pointer-events-none" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6"
      >
        Plateforme communautaire
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <motion.span
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{ backgroundSize: "200% auto" }}
          className="block text-7xl md:text-9xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-400 bg-clip-text text-transparent"
        >
          AppHub
        </motion.span>
      </motion.div>

      <p className="relative mt-6 text-lg md:text-xl text-zinc-400 flex flex-wrap justify-center gap-x-2">
        {"Découvrez les créations du monde".split(" ").map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.12, duration: 0.6 }}
          >
            {w}
          </motion.span>
        ))}
      </p>

      <div className="relative">
        <MagneticLink href="/catalog">Explorer</MagneticLink>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="px-6 pb-24 max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: i * 0.15 }}
          whileHover={{ y: -6 }}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
        >
          <div className="text-sm font-mono text-cyan-400 mb-3">0{i + 1}</div>
          <h3 className="text-xl font-bold mb-2">{f.title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{f.text}</p>
        </motion.div>
      ))}
    </section>
  );
}

export default function Home() {
  const [intro, setIntro] = useState(true);
  const [ready, setReady] = useState(false);

  const finishIntro = useCallback(() => {
    setIntro(false);
    setReady(true);
  }, []);

  return (
    <>
      <AnimatedBackground />
      {intro && <Intro onDone={finishIntro} />}
      {ready && (
        <>
          <Header />
          <Hero />
          <Features />
        </>
      )}
    </>
  );
}
