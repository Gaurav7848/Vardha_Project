import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Truck, ShieldCheck, Warehouse } from 'lucide-react';
import Header from '../Components/header';
import Footer from '../Components/footer';

const Facility = () => {
  const galleryImages = [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80",
    "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&q=80",
    "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=600&q=80",
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
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6">Infrastructure That Moves Your Business Forward</h1>
              <p className="text-stone-300 font-sans font-light text-lg md:text-xl leading-relaxed">Explore purpose-built warehousing facilities equipped to support efficient storage, smooth operations, and evolving business needs.</p>
            </div>
          </div>
        </section>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="py-16 md:py-24"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-red-600"></span>
                <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">Our Facility</span>
                <span className="w-8 h-[2px] bg-red-600"></span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-stone-900 mb-6">World-Class Warehouse Infrastructure</h1>
              <p className="text-stone-600 font-sans font-light text-lg max-w-3xl mx-auto">Strategically located in Gorakhpur with premium commercial warehouse infrastructure designed for modern businesses.</p>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16"
            >
              {[
                { icon: Truck, title: "24×7 Truck Access", desc: "Round-the-clock commercial truck access for seamless operations." },
                { icon: ShieldCheck, title: "CCTV Surveillance", desc: "Full security coverage with CCTV surveillance arrangements." },
                { icon: Warehouse, title: "Large Road Frontage", desc: "Approximately 36 metres / 118 feet wide road frontage." },
                { icon: MapPin, title: "Strategic Location", desc: "Located on Gorakhnath Mandir Road, Bargadwa, Gorakhpur." },
              ].map((feature, i) => {
                const rowIndex = Math.floor(i / 4);
                const fromLeft = rowIndex % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: fromLeft ? -40 : 40 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                    }}
                    className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <feature.icon className="w-10 h-10 text-red-700 mb-4" />
                    <h3 className="text-lg font-serif font-medium text-stone-900 mb-2">{feature.title}</h3>
                    <p className="text-stone-600 font-sans font-light text-sm">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-8 text-center">Facility Gallery</h2>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.08 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 h-64"
                  >
                    <img src={img} alt={`Warehouse ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-2xl p-8 md:p-12 shadow-sm"
            >
              <h2 className="text-3xl md:text-7xl font-serif font-medium text-stone-900 mb-6 text-center">Operational Advantages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Loading & Unloading</h3>
                  <p className="text-stone-600 font-sans font-light mb-4">Our facility is designed for easy loading and unloading movement, ensuring efficient operations for all types of commercial goods.</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Security</h3>
                  <p className="text-stone-600 font-sans font-light mb-4">CCTV surveillance and security arrangements provide peace of mind for your stored inventory.</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Office Facility</h3>
                  <p className="text-stone-600 font-sans font-light mb-4">Dedicated office space for administrative and operational support within the warehouse complex.</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Location</h3>
                  <p className="text-stone-600 font-sans font-light mb-4">Gorakhnath Mandir Road, Bargadwa, Gorakhpur, Uttar Pradesh, India — with excellent connectivity.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-white border-t border-stone-200"
        >
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">Ready to Explore Our Facility?</h2>
            <p className="text-stone-600 font-sans font-light text-lg mb-8">Contact us to schedule a visit or discuss your warehouse requirements.</p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/book-warehouse" className="inline-flex items-center px-6 py-3 bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-red-800 hover:-translate-y-1 transition-all duration-300">
                Book Warehouse Space <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a href="https://wa.me/9670111167" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-green-700 hover:-translate-y-1 transition-all duration-300">
                WhatsApp Vardha
              </a>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Facility;
