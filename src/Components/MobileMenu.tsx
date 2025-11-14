import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Servizi', href: '#services' },
    { label: 'Chi Siamo', href: '#about' },
    { label: 'Progetti', href: '#projects' },
    { label: 'Contatti', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        className="fixed top-8 right-8 z-[100] w-12 h-12 flex flex-col items-center justify-center gap-1.5 md:hidden cursor-hover"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          className="w-6 h-0.5 bg-black"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 4 : 0,
          }}
        />
        <motion.span
          className="w-6 h-0.5 bg-black"
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
        />
        <motion.span
          className="w-6 h-0.5 bg-black"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -4 : 0,
          }}
        />
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-[90] flex items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="space-y-8 text-center">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  className="block text-5xl font-black hover:opacity-50 transition-opacity w-full cursor-hover"
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

