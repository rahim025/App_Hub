function Intro({ onDone }) {
  const [phase, setPhase] = useState("gather");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("logo"), 1500),
      setTimeout(() => setPhase("welcome"), 2500),
      setTimeout(() => setPhase("out"), 5000),
      setTimeout(onDone, 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-zinc-950"
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
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
          transition={{ duration: 0.8, delay: phase === "gather" ? i * 0.1 : 0, ease: "easeOut" }}
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-px mt-4 bg-gradient-to-r from-cyan-400 to-pink-500"
            />
          </motion.div>
        )}

        {phase === "welcome" && (
          <motion.div
            key="welcome"
            exit={{ opacity: 0, y: -16, transition: { duration: 0.5 } }}
            className="flex flex-col items-center text-center px-6"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-xs md:text-sm uppercase text-zinc-500 mb-6"
            >
              Bonjour
            </motion.p>

            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              {"Bienvenue sur AppHub".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.2 + i * 0.03, duration: 0.5, ease: "easeOut" }}
                  className="inline-block"
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
              className="h-px w-40 mt-6 bg-gradient-to-r from-cyan-400 to-pink-500"
            />

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-5 text-zinc-400 max-w-md"
            >
              Publiez vos créations et découvrez celles de la communauté.
            </motion.p>
          </motion.div>
        )}
      </Anim
