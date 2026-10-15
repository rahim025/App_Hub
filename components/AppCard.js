"use client";
import { motion } from "framer-motion";

export default function AppCard({ name, category, color, url }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900"
      style={{ boxShadow: `0 0 30px ${color}33` }}
    >
      <div className="h-24 rounded-xl mb-4" style={{ background: `linear-gradient(135deg, ${color}, #f97316)` }} />
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm text-zinc-500 mb-4">{category}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 font-bold text-black text-sm"
      >
        Ouvrir
      </a>
    </motion.div>
  );
}
