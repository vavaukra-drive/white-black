import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    { title: 'LuxeFashion Rebrand', category: 'Brand Identity', year: '2024' },
    { title: 'TechStore Platform', category: 'E-commerce', year: '2024' },
    { title: 'Analytics Pro SaaS', category: 'Software', year: '2023' },
    { title: 'HomeDecor Marketplace', category: 'Marketplace', year: '2023' },
  ];

  return (
    <section className="min-h-screen py-32 px-8 md:px-16 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-sm text-gray-400 mb-4">SELECTED WORK</div>
          <h2 className="text-6xl md:text-8xl font-black">
            PORT<br />FOLIO
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-white">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group bg-black p-12 md:p-16 hover:bg-white hover:text-black transition-colors cursor-hover min-h-[400px] flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <div className="text-sm text-gray-400 group-hover:text-gray-600 mb-4 font-mono">
                  0{index + 1}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  {project.title}
                </h3>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-600">
                    {project.category}
                  </div>
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-600">
                  {project.year}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

