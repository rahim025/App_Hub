"use client";
import { motion } from "framer-motion";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
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
      </main>
    </>
  );
}
