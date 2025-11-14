import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="min-h-screen py-32 px-8 md:px-16 flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-32">
          {/* Left - Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-sm text-gray-600 mb-8">CHI SIAMO</div>
            <h2 className="text-6xl md:text-8xl font-black leading-none">
              NON SIAMO UN'AGENZIA
            </h2>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl leading-relaxed">
              Siamo un <strong>team di visionari</strong> che trasforma idee in realtà digitali. 
              Non vendiamo servizi, costruiamo <strong>partnership</strong>.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Crediamo nella digitalizzazione come leva di crescita. Ogni progetto è unico, 
              ogni cliente è un partner. Lavoriamo con passione, precisione e una dose di creatività 
              che fa la differenza.
            </p>
            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold">
                  01
                </div>
                <div className="text-lg">Design-First Approach</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold">
                  02
                </div>
                <div className="text-lg">Tecnologia All'Avanguardia</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold">
                  03
                </div>
                <div className="text-lg">Risultati Misurabili</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

