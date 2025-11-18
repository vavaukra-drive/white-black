// Hero.tsx (Aggiornato con testo paragrafo più piccolo)
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import VariableProximity from "./VariableProximity";

type CursorVariant = "default" | "hover" | "text";

export default function Hero() {
  const currentYear = new Date().getFullYear();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  
  // Riferimento al contenitore per l'effetto Proximity
  const titleContainerRef = useRef<HTMLDivElement>(null); 

  // cursor smoothing
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cursorX = useSpring(x, { stiffness: 120, damping: 16 });
  const cursorY = useSpring(y, { stiffness: 120, damping: 16 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: "white",
      border: "2px solid black",
      mixBlendMode: "difference" as const,
    },
    hover: {
      scale: 1.5,
      backgroundColor: "white",
      border: "2px solid black",
      mixBlendMode: "difference" as const,
    },
    text: {
      scale: 1.2,
      backgroundColor: "white",
      border: "2px solid black",
      mixBlendMode: "difference" as const,
    },
  };

  const onEnter = (v: CursorVariant) => setCursorVariant(v);
  const onLeave = () => setCursorVariant("default");

  const titleWords = ["CREATING", "DIGITAL", "EXCELLENCE"];
  
  // 🔄 INVERSIONE DELL'EFFETTO:
  // fromSettings (Lontano) è BOLD
  const fromSettings = "'wght' 1000, 'opsz' 40"; 
  // toSettings (Vicino) è LIGHT
  const toSettings = "'wght' 400, 'opsz' 9"; 

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

      {/* Angoli decorativi (FIX MOBILE) */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-4 left-4 w-12 h-12 border-l-[1.5px] border-t-[1.5px] border-black/25 rounded-tr-xl sm:top-6 sm:left-6 sm:w-20 sm:h-20 sm:rounded-tr-3xl"
          initial={{ opacity: 0, x: -20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 border-r-[1.5px] border-t-[1.5px] border-black/25 rounded-tl-xl sm:top-6 sm:right-6 sm:w-20 sm:h-20 sm:rounded-tl-3xl"
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.div
          className="absolute bottom-4 left-4 w-12 h-12 border-l-[1.5px] border-b-[1.5px] border-black/25 rounded-br-xl sm:bottom-6 sm:left-6 sm:w-20 sm:h-20 sm:rounded-br-3xl"
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.div
          className="absolute bottom-4 right-4 w-12 h-12 border-r-[1.5px] border-b-[1.5px] border-black/25 rounded-bl-xl sm:bottom-6 sm:right-6 sm:w-20 sm:h-20 sm:rounded-bl-3xl"
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>

      {/* Contenuto centrato */}
      <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-screen-2xl h-full flex flex-col justify-between min-h-[90vh] py-6 md:py-10">
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

          {/* Titolo centrale e Paragrafo */}
          <div className="relative flex-1 flex flex-col items-center justify-center gap-6 md:gap-10 text-center select-none py-16 md:py-20">
            {/* Titolo: ora usa VariableProximity */}
            <div
              ref={titleContainerRef} // Riferimento per l'effetto Proximity
              className="relative flex flex-col items-center justify-center gap-2 md:gap-3 text-center select-none"
              onMouseEnter={() => onEnter("hover")}
              onMouseLeave={onLeave}
              style={{ position: 'relative' }} // FONDAMENTALE per il calcolo delle coordinate
            >
              {titleWords.map((word, i) => (
                <VariableProximity 
                  key={word}
                  label={word}
                  wordIndex={i}
                  fromFontVariationSettings={fromSettings}
                  toFontVariationSettings={toSettings}
                  containerRef={titleContainerRef}
                  radius={200}
                  falloff='gaussian' 
                  className="block text-center whitespace-nowrap leading-[0.85]" 
                  style={{
                      fontSize: "clamp(3.5rem, 13vw, 12rem)",
                  }}
                />
              ))}
            </div>

            {/* Paragrafo descrittivo sotto al titolo - TESTO PIÙ PICCOLO */}
            <motion.p
              // 👈 CLASSI AGGIORNATE: Ridotto a text-sm e text-lg e cambiato colore in un grigio leggermente più scuro
              className="max-w-2xl text-sm md:text-lg font-medium text-gray-600 mt-4 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              onMouseEnter={() => onEnter("text")}
              onMouseLeave={onLeave}
            >
              Siamo un Digital Studio focalizzato sulla creazione di esperienze web e soluzioni software innovative. Trasformiamo le idee in prodotti digitali concreti, combinando design d'avanguardia e tecnologia solida.
            </motion.p>
          </div>

          {/* Bottom info */}
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