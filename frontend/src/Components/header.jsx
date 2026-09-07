import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Warehouse, ArrowRight, MessageCircle } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldBeSolid = !isHomePage || isScrolled || isOpen;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Facility', path: '/facility' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Use Cases', path: '/use-cases' },
    { name: 'Clients', path: '/clients' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`!fixed !top-0 !left-0 !right-0 z-[9999] transition-all duration-500 font-sans mx-auto w-full px-0 border-b ${
    shouldBeSolid 
      ? 'bg-white/90 backdrop-blur-md shadow-md border-stone-200 py-3' 
      : 'bg-transparent border-white/10 py-5' 
  }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group z-50">
            <div className="p-2 transition-all duration-300 bg-red-700 rounded-md shadow-md shadow-orange-600/20">
              <Warehouse className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl md:text-2xl font-black leading-none tracking-tighter transition-colors font-serif ${
                shouldBeSolid ? 'text-stone-900' : 'text-white'
              }`}>
                VARDHA
              </span>
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase mt-1 transition-colors ${
                shouldBeSolid ? 'text-stone-500' : 'text-white/70'
              }`}>
                Warehousing
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-semibold tracking-[0.15em] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:transition-transform after:duration-300 ${
                  location.pathname === link.path
                    ? 'text-red-700 after:scale-x-100 after:bg-red-700'
                    : shouldBeSolid
                      ? 'text-stone-700 hover:text-red-700 after:bg-red-700 after:scale-x-0 hover:after:scale-x-100'
                      : 'text-white/80 hover:text-white after:bg-white after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <WhatsAppButton message="Hello Vardha Warehousing, I'm interested in your warehouse space." className="bg-green-600 hover:bg-green-700 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-xl active:scale-95 whitespace-nowrap">
              WhatsApp Us
            </WhatsAppButton>

            <Link
              to="/book-warehouse"
              className="bg-red-700 hover:bg-red-800 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-xl active:scale-95 whitespace-nowrap"
            >
              Book Warehouse Space
            </Link>
          </nav>

          <button
            className={`lg:hidden p-2 transition-colors ${
              shouldBeSolid ? 'text-stone-900 hover:text-red-800' : 'text-white hover:text-red-800'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute left-0 right-0 top-full mt-0 mx-auto w-full bg-white border-b border-stone-200 overflow-hidden transition-all duration-400 ease-in-out origin-top shadow-xl ${
          isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col p-8 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-lg font-bold uppercase tracking-widest ${
                location.pathname === link.path ? 'text-red-700' : 'text-stone-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <WhatsAppButton message="Hello Vardha Warehousing, I'm interested in your warehouse space." className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold w-full">
            WhatsApp Vardha
          </WhatsAppButton>
          <Link
            to="/book-warehouse"
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-xl text-lg font-semibold w-full flex items-center justify-between"
          >
            Book Warehouse Space <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
