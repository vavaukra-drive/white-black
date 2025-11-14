import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: 'easeOut' });
    return controls.stop;
  }, [count, value]);

  useEffect(() => {
    return rounded.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = latest + suffix;
      }
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  const stats = [
    { value: 50, suffix: '+', label: 'Progetti Completati' },
    { value: 30, suffix: '+', label: 'Clienti Soddisfatti' },
    { value: 5, suffix: '', label: 'Anni di Esperienza' },
    { value: 100, suffix: '%', label: 'Dedicazione' },
  ];

  return (
    <section className="py-32 px-8 md:px-16 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-5xl md:text-7xl font-black mb-4">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

