"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";

export default function Home() {
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {intro && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 z-50 bg-zinc-950 flex items-center justify-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, scale: 1, letterSpacing: "0em" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-400 bg-clip-text text-transparent"
            >
              AppHub
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
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
