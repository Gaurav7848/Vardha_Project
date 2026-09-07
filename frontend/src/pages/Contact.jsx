import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import Header from '../Components/header';
import Footer from '../Components/footer';
import WhatsAppButton from '../Components/WhatsAppButton';
import { submitContact } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await submitContact(formData);
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', company: '', phone: '', email: '', message: '' });
      } else {
        setError(result.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('Unable to connect. Please try again or contact us through WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6">Let's discuss your warehouse requirement</h1>
              <p className="text-stone-300 font-sans font-light text-lg md:text-xl leading-relaxed">Reach out to Vardha Warehousing for enquiries, visits, or customized warehouse solutions.</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="border border-stone-200 rounded-2xl p-8 md:p-12 shadow-sm"
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
                    <h2 className="text-2xl font-serif font-medium text-stone-900 mb-4">Message Sent Successfully</h2>
                    <p className="text-stone-600 font-sans font-light mb-8">Thank you for reaching out. Our team will get back to you shortly.</p>
                    <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-red-800 transition-all duration-300">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Company *</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Phone *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Message *</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans resize-none" />
                    </div>
                    {error && <div className="text-red-600 text-sm">{error}</div>}
                    <button type="submit" disabled={loading} className="w-full bg-red-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 hover:bg-red-800 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? 'Sending...' : 'Send Enquiry'}
                    </button>
                  </form>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="border border-stone-200 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-sm font-bold text-stone-900 mb-1">Address</div>
                        <div className="text-stone-600 font-sans font-light text-sm">Gorakhnath Mandir Road, Bargadwa, Gorakhpur, Uttar Pradesh, India</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-sm font-bold text-stone-900 mb-1">Phone</div>
                        <div className="text-stone-600 font-sans font-light text-sm">[PHONE_NUMBER]</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-sm font-bold text-stone-900 mb-1">Email</div>
                        <div className="text-stone-600 font-sans font-light text-sm">[EMAIL_ADDRESS]</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-stone-200 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Quick Actions</h3>
                  <div className="space-y-4">
                    <Link to="/book-warehouse" className="flex items-center justify-between p-4 bg-red-700 text-white rounded-xl hover:bg-red-800 transition-all duration-300 hover:-translate-y-1">
                      <span className="font-bold text-sm uppercase tracking-widest">Book Warehouse Space</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <WhatsAppButton message="Hello Vardha Warehousing, I'm interested in your warehouse space." className="flex items-center justify-between p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 w-full">
                      <span className="font-bold text-sm uppercase tracking-widest">WhatsApp Vardha</span>
                      <ArrowRight className="w-5 h-5" />
                    </WhatsAppButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
