// Hero.tsx (Con Animazione Reveal e Fade-out al Scroll)
import { motion, useMotionValue, useSpring, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import VariableProximity from "./VariableProximity";

type CursorVariant = "default" | "hover" | "text";

// Varianti di animazione per il reveal del paragrafo
const paragraphReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      staggerChildren: 0.01, // Rivelazione lettera per lettera (più veloce)
      delayChildren: 0.6, // Inizia dopo 0.6s (più veloce)
    }
  },
};

// Varianti per le singole lettere (entrata)
const letterReveal = {
  hidden: { opacity: 0, x: -5, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] as const }
  },
};

export default function Hero() {
  const currentYear = new Date().getFullYear();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  
  // Riferimento al contenitore per l'effetto Proximity e per lo scroll tracking
  const titleContainerRef = useRef<HTMLDivElement>(null); 
  const paragraphRef = useRef<HTMLDivElement>(null); // Riferimento per il tracking dello scroll sul paragrafo

  // Logica per l'effetto di dissolvenza basato sullo scroll del paragrafo
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start end", "end start"] 
  });

  // Mappa la progressione dello scroll per l'animazione lettera per lettera
  const paragraphDisassemble = useTransform(scrollYProgress, [0.4, 0.9], [0, 1]);

  // Tracking dello scroll per il titolo (scompaginamento inverso)
  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: titleContainerRef,
    offset: ["start end", "end start"]
  });

  // Trasforma lo scroll progress in un valore che va da 0 (visibile) a 1 (scompaginato)
  const titleDisassemble = useTransform(titleScrollProgress, [0.6, 0.9], [0, 1]);

  // ⭐ NUOVE TRASFORMAZIONI PER LA DISPARIZIONE SFASATA

  // FUTURE scompare prima: inizia subito (0) e finisce a 0.5 del titleDisassemble
  const futureOpacity = useTransform(titleDisassemble, [0, 0.5], [1, 0]);

  // READY scompare dopo: inizia a 0.3 e finisce a 0.8 del titleDisassemble
  const readyOpacity = useTransform(titleDisassemble, [0.3, 0.8], [1, 0]);

  // ---

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

  const titleWords = ["FUTURE", "READY"];
  
  const fromSettings = "'wght' 1000, 'opsz' 40"; 
  const toSettings = "'wght' 400, 'opsz' 9"; 
  
  // Il paragrafo da animare
  const paragraphText = "Progettiamo e sviluppiamo il tuo intero ecosistema digitale: Siti Web e Soluzioni Software ad alta performance, fino alla gestione strategica del tuo Marketplace globale.";
  // Suddividiamo il testo in caratteri individuali per animare ciascuna lettera
  const characters = paragraphText.split('');
  
  // Stato per tracciare il valore dello scroll progress
  const [paragraphScrollValue, setParagraphScrollValue] = useState(0);
  // Stato per tracciare se l'animazione di entrata è completata
  const [isEntryAnimationComplete, setIsEntryAnimationComplete] = useState(false);
  
  // Usa useMotionValueEvent per sincronizzare il MotionValue con lo stato (più affidabile)
  useMotionValueEvent(paragraphDisassemble, "change", (latest) => {
    setParagraphScrollValue(latest);
  });
  
  // Inizializza con il valore corrente (forza a 0 all'inizio)
  useEffect(() => {
    // Forza il valore iniziale a 0 per garantire che non ci siano valori residui
    setParagraphScrollValue(0);
    // L'animazione di entrata completa dopo il delay + stagger per tutte le lettere + duration
    // Aggiungi un buffer per assicurarsi che tutte le lettere siano visibili
    const delayChildren = 0.6;
    const staggerPerLetter = 0.01;
    const duration = 0.4;
    const buffer = 0.3; // Buffer aggiuntivo per sicurezza
    const totalAnimationTime = delayChildren + (characters.length * staggerPerLetter) + duration + buffer;
    const timer = setTimeout(() => {
      setIsEntryAnimationComplete(true);
    }, totalAnimationTime * 1000);
    return () => clearTimeout(timer);
  }, [characters.length]);


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
        <div className="mx-auto max-w-screen-2xl h-full flex flex-col justify-between min-h-screen py-6 md:py-10">
          
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

          {/* Titolo e Paragrafo CENTRATI (Blocco Principale) */}
          <div className="flex flex-col items-center justify-center w-full grow pt-12 pb-12 text-center"> 
            
            {/* Contenitore per Titolo (VariableProximity) */}
            <div
                ref={titleContainerRef} 
                className="relative text-center select-none"
                onMouseEnter={() => onEnter("hover")}
                onMouseLeave={onLeave}
                style={{ position: 'relative' }} 
            >
                {/* PAROLA 1: FUTURE */}
                {/* ⭐ motion.div con opacity che scompare per prima */}
                <motion.div style={{ opacity: futureOpacity }}>
                    <VariableProximity 
                        key={titleWords[0]}
                        label={titleWords[0]}
                        wordIndex={0}
                        fromFontVariationSettings={fromSettings}
                        toFontVariationSettings={toSettings}
                        containerRef={titleContainerRef}
                        radius={200}
                        falloff='gaussian' 
                        scrollProgress={titleDisassemble}
                        className="inline-block text-center whitespace-nowrap leading-[0.85] tracking-tight" 
                        style={{
                            fontSize: "clamp(4rem, 15vw, 14rem)", 
                        }}
                    />
                </motion.div>
                
                {/* BREAK TAG per forzare la riga successiva */}
                <br />
                
                {/* PAROLA 2: READY */}
                {/* ⭐ motion.div con opacity che scompare per seconda */}
                <motion.div style={{ opacity: readyOpacity }}>
                    <VariableProximity 
                        key={titleWords[1]}
                        label={titleWords[1]}
                        wordIndex={1}
                        fromFontVariationSettings={fromSettings}
                        toFontVariationSettings={toSettings}
                        containerRef={titleContainerRef}
                        radius={200}
                        falloff='gaussian' 
                        scrollProgress={titleDisassemble}
                        className="inline-block text-center whitespace-nowrap leading-[0.85] tracking-tight" 
                        style={{
                            fontSize: "clamp(4rem, 15vw, 14rem)", 
                            // Margine superiore forzato per la spaziatura tra le due righe
                            marginTop: 'clamp(1rem, 2vw, 2rem)', 
                        }}
                    />
                </motion.div>
            </div>

            {/* Paragrafo con Animazione Reveal e Disassemble lettera per lettera allo Scroll */}
            <motion.p
              ref={paragraphRef}
              className="max-w-3xl text-lg md:text-2xl font-light text-gray-700 mt-8 md:mt-12 tracking-wide"
              onMouseEnter={() => onEnter("text")}
              onMouseLeave={onLeave}
              variants={paragraphReveal} 
              initial="hidden"
              animate="visible"
              style={{ opacity: 1 }} // Forza la visibilità del contenitore
            >
              {characters.map((char, index) => {
                // Identifica se il carattere fa parte di una parola chiave (deve essere calcolato prima)
                const keyWords = ["Siti", "Web", "Soluzioni", "Software", "Marketplace"];
                const contextStart = Math.max(0, index - 20);
                const contextEnd = Math.min(characters.length, index + 20);
                const context = paragraphText.substring(contextStart, contextEnd);
                const isKeyServiceChar = keyWords.some(word => {
                  const wordIndex = context.indexOf(word);
                  return wordIndex !== -1 && wordIndex <= (index - contextStart) && (index - contextStart) < wordIndex + word.length;
                });
                
                // Calcola il progresso per questa lettera (0 = visibile, 1 = scomparsa)
                // Le lettere scompaiono in sequenza dall'inizio alla fine
                const scrollPosition = paragraphScrollValue; // Progresso scroll (0-1)
                
                // IMPORTANTE: Se non c'è scroll significativo (scrollPosition <= 0.15), tutte le lettere devono essere visibili
                // Usa una soglia molto alta per evitare che le lettere inizino a scomparire con valori molto piccoli
                if (scrollPosition <= 0.15) {
                  // Nessun scroll significativo, tutte le lettere visibili
                  const shouldApplyScrollStyles = false;
                  const forceVisible = isEntryAnimationComplete && !shouldApplyScrollStyles;
                  
                  return (
                    <motion.span 
                      key={index}
                      className={`inline-block ${isKeyServiceChar ? 'font-bold' : ''}`}
                      variants={forceVisible ? undefined : letterReveal}
                      style={forceVisible ? {
                        opacity: 1,
                        filter: 'blur(0px)',
                        transform: 'translateX(0px)',
                      } : undefined}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  );
                }
                
                // Calcola la posizione relativa della lettera nel testo (0 = inizio, 1 = fine)
                const letterPosition = index / characters.length;
                
                // Calcola quando questa lettera inizia a scomparire
                // La lettera inizia a scomparire quando scrollPosition raggiunge letterPosition
                // Usa una finestra di transizione più ampia per un effetto più visibile
                const transitionWindow = 0.25; // 25% del testo per la transizione
                
                // IMPORTANTE: Normalizza scrollPosition per iniziare da 0 quando inizia lo scroll effettivo
                // Sottrai 0.15 (la soglia) per far partire l'animazione solo quando c'è scroll significativo
                const normalizedScrollPosition = Math.max(0, (scrollPosition - 0.15) / 0.85); // Normalizza da 0.15 a 1 -> 0 a 1
                
                // Formula: quando normalizedScrollPosition supera (letterPosition - transitionWindow/2),
                // la lettera inizia a scomparire
                const startFade = Math.max(0, letterPosition - transitionWindow / 2);
                const endFade = Math.min(1, letterPosition + transitionWindow / 2);
                
                let letterProgress = 0;
                if (normalizedScrollPosition > endFade) {
                  letterProgress = 1; // Completamente scomparsa
                } else if (normalizedScrollPosition > startFade) {
                  // In transizione
                  letterProgress = (normalizedScrollPosition - startFade) / transitionWindow;
                }
                // Altrimenti letterProgress rimane 0 (visibile)
                
                // Blur e opacity inversi: da 0 a 4px blur, da 1 a 0 opacity
                const blur = letterProgress * 4;
                const opacity = 1 - letterProgress;
                const xOffset = letterProgress * 5; // Leggero movimento verso sinistra

                // Applica gli stili solo quando c'è scroll significativo E l'animazione di entrata è completata
                // Usa la stessa soglia (0.15) per coerenza
                const shouldApplyScrollStyles = paragraphScrollValue > 0.15 && isEntryAnimationComplete;
                
                // Dopo che l'animazione è completata, forza la visibilità completa se non c'è scroll
                // Questo garantisce che tutte le lettere siano visibili anche se l'animazione non le ha mostrate tutte
                const forceVisible = isEntryAnimationComplete && !shouldApplyScrollStyles;
                
                return (
                  <motion.span 
                    key={index}
                    className={`inline-block ${isKeyServiceChar ? 'font-bold' : ''}`}
                    // Usa le varianti solo quando l'animazione di entrata non è completata
                    variants={shouldApplyScrollStyles || forceVisible ? undefined : letterReveal}
                    // Applica gli stili: quando non c'è scroll, forza visibilità completa
                    style={shouldApplyScrollStyles ? {
                      filter: `blur(${blur}px)`,
                      opacity: opacity,
                      transform: `translateX(${xOffset}px)`,
                    } : forceVisible ? {
                      // Dopo l'animazione, forza visibilità completa se non c'è scroll
                      opacity: 1,
                      filter: 'blur(0px)',
                      transform: 'translateX(0px)',
                    } : undefined}
                    transition={shouldApplyScrollStyles ? {
                      duration: 0,
                    } : undefined}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                );
              })}
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