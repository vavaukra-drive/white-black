// WordRotator.tsx (Revisionato per Zero Shift Orizzontale)
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';

const textVariants = {
  enter: { 
    y: "100%", 
    opacity: 0, 
    transition: { duration: 0.3 } 
  },
  center: { 
    y: "0%", 
    opacity: 1, 
    transition: { duration: 0.3 } 
  },
  exit: { 
    y: "-100%", 
    opacity: 0, 
    transition: { duration: 0.3 } 
  },
};

type Props = {
  words: string[];
  minDuration?: number; 
  maxDuration?: number; 
  minWidthClass: string; // 👈 NUOVA PROP per Tailwind min-width
};

export default function WordRotator({ 
  words, 
  minDuration = 2000, 
  maxDuration = 4000,
  minWidthClass
}: Props) {
  const [index, setIndex] = useState(0);
  const rotationTimerRef = useRef<number | null>(null);

  const nextWord = useCallback(() => {
    setIndex(prevIndex => (prevIndex + 1) % words.length);
    const randomDuration = Math.random() * (maxDuration - minDuration) + minDuration;
    
    if (rotationTimerRef.current !== null) {
        clearTimeout(rotationTimerRef.current);
    }
    rotationTimerRef.current = window.setTimeout(nextWord, randomDuration);
  }, [words.length, maxDuration, minDuration]);

  useEffect(() => {
    const initialDelay = Math.random() * 1500; 

    const startTimer = window.setTimeout(() => {
        nextWord(); 
    }, initialDelay);
    
    return () => {
      clearTimeout(startTimer);
      if (rotationTimerRef.current !== null) {
          clearTimeout(rotationTimerRef.current);
      }
    };
  }, [nextWord]);

  return (
    <span 
      // 👈 AGGIUNTA LA CLASSE PER LA LARGHEZZA MINIMA
      className={`inline-flex items-center justify-center overflow-hidden h-[1.2em] align-text-bottom ${minWidthClass}`} 
      style={{ lineHeight: 1.2 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial="enter"
          animate="center"
          exit="exit"
          variants={textVariants}
          className="inline-block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}