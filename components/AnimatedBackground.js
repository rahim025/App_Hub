"use client";
import { motion } from "framer-motion";

const blobs = [
  { color: "#22d3ee", size: 420, x: "10%", y: "15%", duration: 18 },
  { color: "#f472b6", size: 380, x: "70%", y: "25%", duration: 22 },
  { color: "#f97316", size: 340, x: "40%", y: "70%", duration: 20 },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-zinc-950">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{ width: b.size, height: b.size, left: b.x, top: b.y, background: b.color }}
          animate={{ x: [0, 80, -60, 0], y: [0, -60, 40, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
