import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Warehouse, Clock } from 'lucide-react';
import Header from '../Components/header';
import Footer from '../Components/footer';

const About = () => {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Header />
      <main className="pt-24 pb-24">
        <section className="relative bg-stone-900 py-20 md:py-28 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr8eJ8C_rzCDI5qB91B9KoyrOgbWQpbq7aRnua2eBaBQ&s=10')] bg-cover bg-center opacity-20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6">Warehouse expertise<br />since 1987</h1>
              <p className="text-stone-300 font-sans font-light text-lg md:text-xl leading-relaxed">For decades, Vardha Warehousing has been a trusted name in commercial warehousing, providing reliable storage, logistics, and warehouse development solutions to businesses across Uttar Pradesh and beyond.</p>
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
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-4">Built on warehousing, not just real estate</h2>
              <p className="text-stone-600 font-sans font-light text-lg max-w-3xl">We understand the operational realities of running a warehouse because that's all we do. From load patterns to aisle planning, our facility is designed for real commercial movement.</p>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl"
            >
              {[
                { num: "01", title: "Commercial Storage", desc: "Reinforced flooring and wide bays suited for heavy and dense material storage across multiple industries." },
                { num: "02", title: "Distribution & Logistics", desc: "Strategically located with excellent road connectivity for efficient distribution operations and last-mile support." },
                { num: "03", title: "Steel Businesses", desc: "Robust warehouse infrastructure designed to handle heavy industrial goods, steel, and commercial inventory safely." },
                { num: "04", title: "Operational Support", desc: "24×7 truck access, CCTV surveillance, office facility, and dedicated support for seamless warehouse operations." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="border border-stone-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-xs font-bold text-red-700 uppercase tracking-widest mb-4">{item.num}</div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-stone-600 font-sans font-light text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <section className="py-16 md:py-24 bg-stone-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-red-600"></span>
                <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">Our Journey</span>
                <span className="w-8 h-[2px] bg-red-600"></span>
              </div>
              <h2 className="text-6xl md:text-5xl font-serif font-medium text-white mb-4">Nearly four decades in warehousing</h2>
            </div>
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-stone-800 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-2xl font-serif font-bold text-white">1987s</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-white mb-2">1987s</h3>
                  <p className="text-stone-400 font-sans font-light leading-relaxed">Vardha begins its journey in warehousing and storage services with a focus on reliability and customer trust.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-stone-800 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-2xl font-serif font-bold text-white">1990s</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-white mb-2">1990s – 2000s</h3>
                  <p className="text-stone-400 font-sans font-light leading-relaxed">Expanded into logistics support and warehouse development for commercial clients, building a reputation for operational excellence.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-stone-800 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-2xl font-serif font-bold text-white">2010s</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-white mb-2">2010s</h3>
                  <p className="text-stone-400 font-sans font-light leading-relaxed">Facility upgrades — surveillance, wider frontage, access, and dedicated office infrastructure for modern warehouse needs.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-red-700 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-2xl font-serif font-bold text-white">Today</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-white mb-2">Today</h3>
                  <p className="text-stone-400 font-sans font-light leading-relaxed">A dedicated commercial warehouse property in Gorakhpur serving FMCG, e-commerce, steel, and distribution businesses with trusted expertise.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white border-t border-stone-200">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-4">Warehousing, storage, logistics & development</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="border border-stone-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <Warehouse className="w-8 h-8 text-red-700 mb-4" />
                <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">Warehousing</h3>
                <p className="text-stone-600 font-sans font-light text-sm leading-relaxed">Commercial-grade warehouse space designed for daily inventory operations and long-term storage needs.</p>
              </div>
              <div className="border border-stone-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <Truck className="w-8 h-8 text-red-700 mb-4" />
                <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">Storage</h3>
                <p className="text-stone-600 font-sans font-light text-sm leading-relaxed">Short and long-term storage for bulk and palletized goods, with organized layouts for easy access.</p>
              </div>
              <div className="border border-stone-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <ShieldCheck className="w-8 h-8 text-red-700 mb-4" />
                <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">Logistics</h3>
                <p className="text-stone-600 font-sans font-light text-sm leading-relaxed">Loading-day infrastructure that supports smooth distribution flow and operational efficiency.</p>
              </div>
              <div className="border border-stone-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <Clock className="w-8 h-8 text-red-700 mb-4" />
                <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">Warehouse Development</h3>
                <p className="text-stone-600 font-sans font-light text-sm leading-relaxed">Custom warehouse solutions for businesses with specific operational requirements and growth plans.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-stone-200">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">Our Legacy</h2>
            <p className="text-stone-600 font-sans font-light text-lg mb-8 leading-relaxed">Established in 1987, Vardha Warehousing has grown from a local storage facility into a premier commercial warehousing destination in Gorakhpur. Our commitment to reliability, security, and customer satisfaction has made us the preferred choice for businesses across multiple industries.</p>
            <p className="text-stone-600 font-sans font-light text-lg mb-8 leading-relaxed">We provide nationwide warehouse solutions with custom warehouse development, offering end-to-end services from warehousing and storage to logistics and facility management.</p>
            <Link to="/book-warehouse" className="inline-flex items-center px-6 py-3 bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-red-800 hover:-translate-y-1 transition-all duration-300">
              Book Warehouse Space <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
