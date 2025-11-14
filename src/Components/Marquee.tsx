import { motion } from 'framer-motion';

export default function Marquee() {
  const items = [
    'REACT',
    'TYPESCRIPT',
    'FIGMA',
    'SHOPIFY',
    'AWS',
    'NEXT.JS',
    'NODE.JS',
    'TAILWIND',
    'FRAMER',
    'WEBFLOW',
  ];

  return (
    <div className="border-y border-black py-6 overflow-hidden bg-white">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span key={index} className="text-4xl md:text-6xl font-black">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

