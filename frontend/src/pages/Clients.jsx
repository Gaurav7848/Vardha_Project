import React from 'react';
import { motion } from 'framer-motion';
import Header from '../Components/header';
import Footer from '../Components/footer';
import clients from '../data/clients';

const Clients = () => {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJL8I6dFSh8c1w15NDcT3pR14c62ay1ZGihbwJU4jdeg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR82So97eg_E8L0DX3A_kvPindBKngHqF7o0GamSmJoBg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl4_pLByrlKjN3ZeuShAHEF35dWy16Of3h6dCHJvwQlA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR90ZWeOu20DPjOBuNeaSioDM7dpVMJgH9mtWDGF-D6xg&s=10"
    
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Header />
      <main className="pt-24 pb-24">
        <section className="relative bg-stone-900 py-20 md:py-28 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJL8I6dFSh8c1w15NDcT3pR14c62ay1ZGihbwJU4jdeg&s=10')] bg-cover bg-center opacity-30"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6">Our clients</h1>
              <p className="text-stone-300 font-sans font-light text-lg md:text-xl leading-relaxed">Businesses that trust Vardha Warehousing for their storage and logistics needs.</p>
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
                <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">Trusted By</span>
                <span className="w-8 h-[2px] bg-red-600"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Clients</h2>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.08 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto"
            >
              {clients.map((client, i) => {
                const rowIndex = Math.floor(i / 4);
                const fromLeft = rowIndex % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: fromLeft ? -30 : 30 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                    }}
                    className="border border-stone-200 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <img src={images[i]} alt="" className="w-full h-60 object-cover rounded-lg mb-4" />
                    <div className="text-2xl font-serif font-bold text-stone-900 mb-1">{client.name}</div>
                    <div className="text-sm text-stone-500 font-sans font-light">{client.fullName}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Clients;
