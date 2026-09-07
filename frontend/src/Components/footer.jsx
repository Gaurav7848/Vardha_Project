import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Warehouse, MessageCircle } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400 font-sans border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 lg:px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="space-y-6 col-span-2">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-red-700 rounded-md text-white transition-all duration-300 shadow-lg shadow-red-900/30">
                <Warehouse className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-black text-white leading-none tracking-tight transition-colors">
                  VARDHA
                </span>
                <span className="text-[10px] font-bold text-stone-500 tracking-[0.2em] uppercase mt-1">
                  Warehousing
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-stone-300 font-light">
              Premium warehouse space in Gorakhpur for FMCG, e-commerce, steel, commercial inventory and distribution businesses. Warehouse expertise since 1987.
            </p>

            <WhatsAppButton message="Hello Vardha Warehousing, I'm interested in your warehouse space." className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-xl active:scale-95">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Vardha
            </WhatsAppButton>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] border-l-2 border-red-600 pl-3">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {['About', 'Facility', 'Solutions', 'Clients', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'About' ? '/about' : `/${item.toLowerCase()}`}
                    className="text-stone-300 hover:text-red-600 transition-colors flex items-center gap-2 group font-light"
                  >
                    <span className="h-[1px] w-0 bg-red-600 transition-all duration-300 group-hover:w-3"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] border-l-2 border-red-600 pl-3">
              Warehouse
            </h4>
            <ul className="space-y-3 text-sm">
              {['Book Space', 'Calculator', 'Use Cases', 'FAQ', 'Location'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Book Space' ? '/book-warehouse' : item === 'Calculator' ? '/book-warehouse' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-stone-300 hover:text-red-600 transition-colors flex items-center gap-2 group font-light"
                  >
                    <span className="h-[1px] w-0 bg-red-600 transition-all duration-300 group-hover:w-3"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] border-l-2 border-red-600 pl-3">
              Contact
            </h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-stone-300 font-light">
                  Gorakhnath Mandir Road,<br />
                  Bargadwa, Gorakhpur,<br />
                  Uttar Pradesh, India
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 font-medium text-stone-300">
                  <a href="tel:9670111167" className="hover:text-red-600 transition-colors">9670111167</a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                <a href="mailto:info@vardhawarehouse.com" className="text-stone-300 hover:text-red-600 transition-colors font-light">
                  info@vardhawarehouse.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col items-center justify-center">
          <p className="w-full text-center text-[10px] sm:text-xs text-stone-500 font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] whitespace-pre-line break-words">
            &copy; {currentYear} Vardha Warehousing. All rights reserved. Warehouse Expertise Since 1987
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
