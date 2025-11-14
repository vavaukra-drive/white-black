import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
    { number: '01', title: 'Discovery', description: 'Analizziamo il tuo business, il mercato e gli obiettivi' },
    { number: '02', title: 'Strategy', description: 'Definiamo la roadmap e le soluzioni più efficaci' },
    { number: '03', title: 'Design', description: 'Creiamo esperienze visive memorabili e funzionali' },
    { number: '04', title: 'Development', description: 'Sviluppiamo con tecnologie moderne e performanti' },
    { number: '05', title: 'Launch & Growth', description: 'Lanciamo e ottimizziamo per il successo continuo' },
  ];

  return (
    <section className="py-32 px-8 md:px-16 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-sm text-gray-400 mb-4">IL NOSTRO METODO</div>
          <h2 className="text-6xl md:text-8xl font-black">
            COME<br />LAVORIAMO
          </h2>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="group border-t border-white/20 py-12 md:py-16 grid md:grid-cols-12 gap-8 hover:bg-white hover:text-black transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="md:col-span-2">
                <span className="text-6xl md:text-8xl font-black opacity-20 group-hover:opacity-100 transition-opacity">
                  {step.number}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-3xl md:text-5xl font-bold mb-4">
                  {step.title}
                </h3>
              </div>
              <div className="md:col-span-6 flex items-center">
                <p className="text-lg text-gray-400 group-hover:text-gray-700">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/20" />
        </div>
      </div>
    </section>
  );
}
