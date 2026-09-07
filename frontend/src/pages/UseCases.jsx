import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '../Components/header';
import Footer from '../Components/footer';
import useCases from '../data/useCases';

const UseCases = () => {
  const images = [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJL8I6dFSh8c1w15NDcT3pR14c62ay1ZGihbwJU4jdeg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8xDHo6OXV6w-BUbyRrvbR-XAtes98Dg6L1L5yFnfZA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwiw48T0Wm2g9SikSgtBGeed0g8atm8ZIBiAMvgN_8-A&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfx9h7DYFMoBnBlFLmE3oQhJ92YkahE5UQKVS07G2IAg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQskRAaxrif5XK8Ya3mXru5PY7rh6n8QewUmQ0aDG3gQ&s=10",
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Header />
      <main className="pt-24 pb-24">
        <section className="relative bg-stone-900 py-20 md:py-28 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80')] bg-cover bg-center opacity-20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6">Built for every business</h1>
              <p className="text-stone-300 font-sans font-light text-lg md:text-xl leading-relaxed">Warehouse solutions tailored for diverse commercial needs across industries.</p>
            </div>
          </div>
        </section>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="py-16 md:py-24 bg-white border-b border-stone-200"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-red-600"></span>
                <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">Use Cases</span>
                <span className="w-8 h-[2px] bg-red-600"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Tailored for your industry</h2>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {useCases.map((useCase, i) => {
                const rowIndex = Math.floor(i / 3);
                const fromLeft = rowIndex % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: fromLeft ? -40 : 40 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                    }}
                    className="border border-stone-200 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <img src={images[i]} alt="" className="w-full h-60 object-cover rounded-xl mb-4" />
                    <div className="text-xs font-bold text-red-700 uppercase tracking-widest mb-3">{String(i + 1).padStart(2, '0')}</div>
                    <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">{useCase.title}</h3>
                    <p className="text-stone-600 font-sans font-light mb-4">{useCase.description}</p>
                    <p className="text-stone-500 font-sans font-light text-sm mb-2"><strong className="text-stone-700">Challenge:</strong> {useCase.challenge}</p>
                    <p className="text-stone-500 font-sans font-light text-sm"><strong className="text-stone-700">Solution:</strong> {useCase.solution}</p>
                  </motion.div>
                );
              })}
            </motion.div>
            <div className="text-center mt-12">
              <Link to="/book-warehouse" className="inline-flex items-center px-6 py-3 bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-red-800 hover:-translate-y-1 transition-all duration-300">
                Enquire Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default UseCases;
