import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Header from '../Components/header';
import Footer from '../Components/footer';
import axios from 'axios';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('/api/admin/faqs');
        if (response.data.success) {
          setFaqs(response.data.data || []);
        }
      } catch (err) {
        setError('Failed to load FAQs');
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header />
        <main className="pt-24 pb-24">
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-3xl text-center">
              <p className="text-stone-500">Loading FAQs...</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header />
        <main className="pt-24 pb-24">
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-3xl text-center">
              <p className="text-red-600">{error}</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

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
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6">Everything You Need to Know</h1>
              <p className="text-stone-300 font-sans font-light text-lg md:text-xl leading-relaxed">Have questions about our warehousing solutions? Explore answers to the most common questions about facilities, services, bookings, and business requirements.</p>
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
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-red-600"></span>
                <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">FAQ</span>
                <span className="w-8 h-[2px] bg-red-600"></span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-stone-900 mb-6">Frequently Asked Questions</h1>
              <p className="text-stone-600 font-sans font-light text-lg">Everything you need to know about Vardha Warehousing.</p>
            </div>
            {faqs.length === 0 ? (
              <div className="text-center py-12 text-stone-500">No FAQs available at the moment.</div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.08 }}
                className="space-y-4"
              >
                {faqs.map((faq, i) => (
                  <motion.div
                    key={faq._id || i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                      <span className="text-stone-900 font-sans font-semibold text-sm md:text-base">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-red-700 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openIndex === i && (
                      <div className="px-6 pb-6 text-stone-600 font-sans font-light text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
