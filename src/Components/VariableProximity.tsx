// VariableProximity.tsx
// VariableProximity.tsx (Aggiornato)
import { forwardRef, useMemo, useRef, useEffect, useCallback, useState } from 'react';

// Importa i tipi specifici da React e altri moduli usando 'type'
import type { 
  MutableRefObject, 
  CSSProperties, 
  HTMLAttributes 
} from 'react';

import { motion, useMotionValueEvent, type MotionValue } from 'framer-motion';

// Hook per l'animazione al frame
function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

// Hook per la posizione del mouse
function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calcola la posizione relativa al container
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        // Fallback
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      if (ev.touches.length > 0) {
        const touch = ev.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  className?: string;
  style?: CSSProperties;
  wordIndex: number;
  scrollProgress?: number | MotionValue<number>; // 0 = visibile, 1 = scompaginato (lettere vanno verso il basso)
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 200, // Valore aumentato
    falloff = 'gaussian', // Falloff suggerito
    className = '',
    style,
    wordIndex,
    scrollProgress,
    ...restProps
  } = props;

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  // Gestisce scrollProgress sia come numero che come MotionValue
  const [scrollProgressValue, setScrollProgressValue] = useState<number | undefined>(
    typeof scrollProgress === 'number' ? scrollProgress : undefined
  );

  // Sincronizza MotionValue con lo stato locale
  useEffect(() => {
    if (scrollProgress && typeof scrollProgress !== 'number') {
      const unsubscribe = (scrollProgress as MotionValue<number>).on('change', (latest) => {
        setScrollProgressValue(latest);
      });
      return unsubscribe;
    }
  }, [scrollProgress]);

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = useCallback((distance: number) => {
    // Normalizza la distanza tra 0 (lontano) e 1 (vicino)
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    
    // Controlli per la funzione di falloff
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        // Usa una formula più stabile per il decadimento gaussiano
        return Math.exp(-((distance / (radius * 0.5)) ** 2));
      case 'linear':
      default:
        return norm;
    }
  }, [radius, falloff]);

  // Logica di aggiornamento al frame
  useAnimationFrame(() => {
    if (!containerRef?.current) return;
    const { x, y } = mousePositionRef.current;
    
    // Aggiorna solo se la posizione del mouse è cambiata (ottimizzazione)
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };
    
    const containerRect = containerRef.current.getBoundingClientRect();

    letterRefs.current.forEach((letterRef) => {
      if (!letterRef) return;

      const rect = letterRef.getBoundingClientRect();
      // Calcolo coordinate del centro della lettera relative al contenitore
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

      const distance = calculateDistance(
        mousePositionRef.current.x,
        mousePositionRef.current.y,
        letterCenterX,
        letterCenterY
      );

      // Se fuori raggio, imposta il valore 'from' e salta
      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          // Interpolazione lineare tra fromValue e toValue
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(', ');

      letterRef.style.fontVariationSettings = newSettings;
    });
  });

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-block', // Usiamo inline-block per coerenza
        fontFamily: '"Roboto Flex", sans-serif', // VERIFICA CHE QUESTO FONT SIA CARICATO
        lineHeight: '0.9',
        ...style
      }}
      className={`font-black tracking-tighter text-black ${className}`}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden">
          {/* Animazione di entrata "Split Text" con Framer Motion */}
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ 
              y: scrollProgressValue !== undefined 
                ? `${scrollProgressValue * 100}%` // Se scrollProgress è definito, anima verso il basso
                : "0%", 
              opacity: scrollProgressValue !== undefined 
                ? 1 - scrollProgressValue 
                : 1 
            }}
            transition={{
              duration: scrollProgressValue !== undefined ? 0 : 0.8, // Disabilita transizione se controllato da scroll
              delay: scrollProgressValue !== undefined ? 0 : 0.6 + wordIndex * 0.15 + props.wordIndex * 0.1, 
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word.split('').map(letter => {
              const currentLetterIndex = letterIndex++;
              return (
                <span
                  key={currentLetterIndex}
                  ref={el => {
                    letterRefs.current[currentLetterIndex] = el;
                  }}
                  style={{
                    display: 'inline-block',
                    fontVariationSettings: fromFontVariationSettings,
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </span>
              );
            })}
          </motion.span>
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;