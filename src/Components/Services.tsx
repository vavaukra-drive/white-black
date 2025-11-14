import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    { title: 'Brand Identity', number: '01' },
    { title: 'Web Design', number: '02' },
    { title: 'Software Development', number: '03' },
    { title: 'Marketplace Management', number: '04' },
  ];

  return (
    <section className="min-h-screen py-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-sm text-gray-600 mb-4">SERVICES</div>
          <h2 className="text-6xl md:text-8xl font-black">
            WHAT<br />WE DO
          </h2>
        </motion.div>

        <div className="space-y-px">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group border-t border-black py-8 flex items-center justify-between cursor-hover hover:bg-black hover:text-white transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-baseline gap-8">
                <span className="text-sm text-gray-400 group-hover:text-gray-300 font-mono w-12">
                  {service.number}
                </span>
                <h3 className="text-4xl md:text-6xl font-bold">
                  {service.title}
                </h3>
              </div>
              <div className="text-2xl group-hover:translate-x-2 transition-transform">
                →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
