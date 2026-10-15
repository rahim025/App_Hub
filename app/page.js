function Welcome({ onDone }) {
  const title = "Bienvenue sur AppHub";

  useEffect(() => {
    const t = setTimeout(onDone, 3400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6 text-center pointer-events-none bg-zinc-950/70 backdrop-blur-sm"
      exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.7, ease: "easeInOut" } }}
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={{ opacity: 1, letterSpacing: "0.4em" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-xs md:text-sm uppercase text-zinc-500 mb-6"
      >
        Bienvenue
      </motion.p>

      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
        {title.split("").map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4 + i * 0.035, duration: 0.6, ease: "easeOut" }}
            className="inline-block"
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
        className="h-px w-40 mt-6 bg-gradient-to-r from-cyan-400 to-pink-500 origin-center"
      />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.7 }}
        className="mt-5 text-zinc-400 max-w-md"
      >
        Publiez vos créations et découvrez celles de la communauté.
      </motion.p>
    </motion.div>
  );
}
