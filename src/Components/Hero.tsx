import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type CursorVariant = "default" | "hover" | "text";

// Componente per ogni parola del titolo con nuovo effetto hover
function TitleWord({ word, index }: { word: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const wordX = useMotionValue(0);
  const wordY = useMotionValue(0);
  const wordSpringX = useSpring(wordX, { stiffness: 400, damping: 28 });
  const wordSpringY = useSpring(wordY, { stiffness: 400, damping: 28 });

  return (
    <motion.h1
      className="leading-[0.9] tracking-tighter font-black text-black relative"
      style={{
        fontSize: "clamp(3.5rem, 13vw, 12rem)",
        WebkitTextFillColor: "transparent",
        WebkitTextStrokeWidth: isHovered ? "0px" : "2px",
        WebkitTextStrokeColor: "black",
      }}
      initial={{ y: 180, opacity: 0, rotateX: 90 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{
        duration: 1.2,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.08;
        const deltaY = (e.clientY - centerY) * 0.08;
        wordX.set(deltaX);
        wordY.set(deltaY);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        wordX.set(0);
        wordY.set(0);
      }}
    >
      <motion.span
        style={{
          display: "inline-block",
          x: wordSpringX,
          y: wordSpringY,
        }}
        className="relative"
      >
        {/* Testo principale */}
        <motion.span
          className="relative z-10"
          style={{
            backgroundImage: "linear-gradient(135deg, #000 0%, #333 50%, #000 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: isHovered ? "transparent" : "black",
          }}
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          {word}
        </motion.span>

        {/* Effetto glow su hover */}
        <motion.span
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            filter: "blur(12px)",
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          {word}
        </motion.span>
      </motion.span>
    </motion.h1>
  );
}

export default function Hero() {
  const currentYear = new Date().getFullYear();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");

  // cursor smoothing
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cursorX = useSpring(x, { stiffness: 120, damping: 16 });
  const cursorY = useSpring(y, { stiffness: 120, damping: 16 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      x.set(e.clientX - 14);
      y.set(e.clientY - 14);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const cursorVariants = {
    default: {
      scale: 1,
      background:
        "radial-gradient(circle at center, rgba(0,0,0,0.55), rgba(0,0,0,0))",
      mixBlendMode: "difference" as const,
    },
    hover: {
      scale: 2,
      background:
        "radial-gradient(circle at center, rgba(0,0,0,0.9), rgba(0,0,0,0))",
      mixBlendMode: "difference" as const,
    },
    text: {
      scale: 1.2,
      background: "rgba(0,0,0,0.65)",
      mixBlendMode: "difference" as const,
    },
  };

  const onEnter = (v: CursorVariant) => setCursorVariant(v);
  const onLeave = () => setCursorVariant("default");

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 cursor-none text-black">
      {/* Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
        style={{ x: cursorX, y: cursorY }}
        animate={cursorVariants[cursorVariant]}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      />

      {/* Spotlight morbido */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(650px 650px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,0.035), transparent 70%)`,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Angoli decorativi */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-6 left-6 w-20 h-20 border-l-[1.5px] border-t-[1.5px] border-black/25 rounded-tr-3xl"
          initial={{ opacity: 0, x: -20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.div
          className="absolute top-6 right-6 w-20 h-20 border-r-[1.5px] border-t-[1.5px] border-black/25 rounded-tl-3xl"
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.div
          className="absolute bottom-6 left-6 w-20 h-20 border-l-[1.5px] border-b-[1.5px] border-black/25 rounded-br-3xl"
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.div
          className="absolute bottom-6 right-6 w-20 h-20 border-r-[1.5px] border-b-[1.5px] border-black/25 rounded-bl-3xl"
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>

      {/* Contenuto centrato */}
      <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-screen-2xl h-full flex flex-col justify-between min-h-screen py-8 md:py-10">
          {/* Top bar */}
          <motion.div
            className="flex justify-between items-start text-xs md:text-sm uppercase tracking-widest w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div onMouseEnter={() => onEnter("text")} onMouseLeave={onLeave}>
              <div className="font-bold mb-1">DRIVE</div>
              <div className="text-gray-500 font-medium">Digital Studio</div>
            </div>
            <div
              className="text-right"
              onMouseEnter={() => onEnter("text")}
              onMouseLeave={onLeave}
            >
              <div className="font-bold mb-1">Perugia</div>
              <div className="text-gray-500 font-medium">{currentYear}</div>
            </div>
          </motion.div>

          {/* Titolo centrale: più spazio verticale */}
          <div
            className="relative flex-1 flex flex-col items-center justify-center gap-2 md:gap-3 text-center select-none py-16 md:py-20"
            onMouseEnter={() => onEnter("hover")}
            onMouseLeave={onLeave}
          >
            {["DIGI", "TALI", "ZATION"].map((word, i) => (
              <TitleWord key={word} word={word} index={i} />
            ))}
          </div>

          {/* Bottom info: più spazio e leggibilità */}
          <motion.div
            className="flex justify-between items-end text-xs md:text-sm w-full flex-wrap gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div
              className="max-w-xs space-y-2"
              onMouseEnter={() => onEnter("text")}
              onMouseLeave={onLeave}
            >
              <div className="text-gray-500 font-bold uppercase tracking-wider mb-3">
                Contact
              </div>
              <div className="font-semibold break-all">info@drive.digital</div>
              <div className="font-semibold">+39 012 345 6789</div>
            </div>
            <div
              className="text-right space-y-2"
              onMouseEnter={() => onEnter("text")}
              onMouseLeave={onLeave}
            >
              <div className="text-gray-500 font-bold uppercase tracking-wider mb-3">
                Consists of
              </div>
              <div className="font-semibold">4 services</div>
              <div className="text-gray-600 text-xs md:text-sm">
                brand · web · software · marketplace
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}