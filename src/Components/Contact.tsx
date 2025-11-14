import { motion } from 'framer-motion';

export default function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="min-h-screen flex items-center justify-center px-8 md:px-16 relative">
      <div className="max-w-7xl w-full text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-sm text-gray-600 mb-8">GET IN TOUCH</div>
          <h2 className="text-[12vw] md:text-[10vw] font-black leading-none mb-16">
            LET'S<br />TALK
          </h2>

            <div className="space-y-4 text-xl md:text-2xl">
              <div>
                <a href="mailto:info@drive.digital" className="cursor-hover hover:opacity-50 transition-opacity">
                  info@drive.digital
                </a>
              </div>
              <div>
                <a href="tel:+390123456789" className="cursor-hover hover:opacity-50 transition-opacity">
                  +39 012 345 6789
                </a>
              </div>
            </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="absolute bottom-8 left-8 md:left-16 right-8 md:right-16 flex justify-between text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div>© {currentYear} Drive</div>
          <div className="flex gap-8">
            <a href="#" className="cursor-hover hover:opacity-50 transition-opacity">Privacy</a>
            <a href="#" className="cursor-hover hover:opacity-50 transition-opacity">Terms</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

