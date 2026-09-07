import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Warehouse,
  ChevronDown,
  Calculator,
  Ruler,
  Truck,
  Clock,
  Boxes,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import WhatsAppButton from "../Components/WhatsAppButton";
import useCases from "../data/useCases";
import solutions from "../data/solutions";
import clients from "../data/clients";
import faqs from "../data/faqs";
import Calculators from "../Components/Calculator";

const useScrollReveal = (threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;
    let startTime;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
};

const Hero = () => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const bgMoveX = useTransform(mouseXSpring, [-0.5, 0.5], ["30px", "-30px"]);
  const bgMoveY = useTransform(mouseYSpring, [-0.5, 0.5], ["30px", "-30px"]);
  const glowMoveX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50px", "50px"]);
  const glowMoveY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50px", "50px"]);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set(mouseX / width - 0.5);
      y.set(mouseY / height - 0.5);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const particles = Array.from({ length: 20 });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center overflow-hidden bg-stone-950 pt-32 pb-32 md:min-h-[700px] perspective-[1200px]"
    >
      <div className="absolute inset-0 overflow-hidden z-0 bg-stone-950">
        <motion.div
          style={{ x: bgMoveX, y: bgMoveY }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
            alt="Warehouse interior"
            className="w-full h-full object-cover object-right opacity-100 mix-blend-luminosity"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/100 via-stone-950/80 via-20% to-transparent to-60%"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
            initial={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ x: glowMoveX, y: glowMoveY }}
        className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center"
      >
        <div className="absolute w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[140px]" />
      </motion.div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="container mx-auto px-6 relative z-10 w-full flex flex-col items-start text-left"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/40 bg-orange-900/30 backdrop-blur-md mb-8 shadow-lg shadow-orange-900/20"
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_#fb923c]"></span>
            <span className="text-orange-100 text-xs font-bold tracking-[0.2em] uppercase font-sans">
              Warehouse Expertise Since 1987
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold leading-[1.1] text-white tracking-tight mb-6 drop-shadow-2xl"
          >
            Premium Warehouse <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-orange-400 bg-[length:200%_auto] animate-gradient">
              Space in Gorakhpur
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-stone-300 max-w-2xl leading-relaxed mb-10 font-sans font-light drop-shadow-lg"
          >
            Comprehensive warehousing solutions spanning storage, logistics, and warehouse development — tailored for FMCG, e-commerce, steel, commercial inventory, and distribution businesses.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-start gap-5"
          >
            <Link
              to="/book-warehouse"
              className="group relative px-6 py-3 bg-red-700 text-white font-bold font-sans tracking-wider text-xs uppercase rounded-xl overflow-hidden shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(234,88,12,0.5)]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-800 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity tracking-wide duration-300"></span>
              <span className="relative flex items-center gap-2 drop-shadow-md">
                <Calculator className="w-4 h-4" />
                Calculate Your Warehouse Requirement
              </span>
            </Link>

            <WhatsAppButton message="Hello Vardha Warehousing, I'm interested in your warehouse space." className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold font-sans tracking-wider text-xs uppercase rounded-xl shadow-lg hover:shadow-xl active:scale-95">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Vardha
            </WhatsAppButton>

            <Link
              to="/facility"
              className="px-6 py-3 hover:bg-white/5 border border-white/20 hover:text-white font-semibold font-sans tracking-wide text-xs uppercase rounded-xl bg-white text-stone-950 transition-all duration-300 backdrop-blur-sm flex items-center shadow-lg hover:-translate-y-1"
            >
              Explore Facility
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-15 hidden md:flex flex-row gap-4 z-20">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
          <div className="text-white text-xs font-bold uppercase tracking-widest mb-1">118 ft</div>
          <div className="text-white text-xs font-sans">Road Frontage</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
          <div className="text-white text-xs font-bold uppercase tracking-widest mb-1">24×7</div>
          <div className="text-white text-xs font-sans">Truck Access</div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient { animation: gradient 6s ease infinite; }
      `}</style>
    </section>
  );
};

const Overview = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`py-12 md:py-16 bg-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-red-600"></span>
            <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">Warehouse Facility</span>
            <span className="w-8 h-[2px] bg-red-600"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Premium Warehouse Space in Gorakhpur</h2>
          <p className="text-stone-600 font-sans font-light text-lg max-w-3xl mx-auto">Flexible warehousing solutions for FMCG, e-commerce, steel, commercial inventory and distribution businesses.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">118 ft Road Frontage</h3>
            <p className="text-stone-600 font-sans font-light">Approximately 36 metres wide road frontage for easy transport and loading/unloading movement.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">24×7 Truck Access</h3>
            <p className="text-stone-600 font-sans font-light">Round-the-clock commercial truck access with CCTV surveillance and security arrangements.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">Office Facility</h3>
            <p className="text-stone-600 font-sans font-light">Dedicated office space for operational requirements and administrative support.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsStrip = () => {
  const { count: since, ref: sinceRef } = useCounter(1987, 2500);
  const { count: access, ref: accessRef } = useCounter(24, 2000);
  const { count: frontage, ref: frontageRef } = useCounter(118, 2000);
  const { count: capacity, ref: capacityRef } = useCounter(42, 2500);

  return (
    <div className="relative z-30 w-full px-4 sm:px-6 lg:px-8 mt-8 md:-mt-14 mb-10">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-xl border border-stone-200 shadow-2xl rounded-2xl py-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6">
        <div ref={sinceRef} className="group flex flex-col items-center text-center w-full md:w-1/4 cursor-default">
          <ShieldCheck className="w-8 h-8 text-red-700 mb-3 opacity-90 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          <div className="text-3xl md:text-4xl font-semibold text-stone-900 mb-2">{since}</div>
          <div className="text-xs sm:text-sm font-serif font-bold uppercase tracking-widest text-stone-600">Warehouse Expertise</div>
        </div>
        <div className="hidden md:block w-px h-16 bg-stone-200"></div>
        <div className="md:hidden h-px w-full bg-stone-200"></div>
        <div ref={accessRef} className="group flex flex-col items-center text-center w-full md:w-1/4 cursor-default">
          <Clock className="w-8 h-8 text-red-700 mb-3 opacity-90 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          <div className="text-3xl md:text-4xl font-semibold text-stone-900 mb-2">{access}×7</div>
          <div className="text-xs sm:text-sm font-serif font-bold uppercase tracking-widest text-stone-600">Truck Access</div>
        </div>
        <div className="hidden md:block w-px h-16 bg-stone-200"></div>
        <div className="md:hidden h-px w-full bg-stone-200"></div>
        <div ref={frontageRef} className="group flex flex-col items-center text-center w-full md:w-1/4 cursor-default">
          <MapPin className="w-8 h-8 text-red-700 mb-3 opacity-90 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          <div className="text-3xl md:text-4xl font-semibold text-stone-900 mb-2">{frontage} ft</div>
          <div className="text-xs sm:text-sm font-serif font-bold uppercase tracking-widest text-stone-600">Road Frontage</div>
        </div>
        <div className="hidden md:block w-px h-16 bg-stone-200"></div>
        <div className="md:hidden h-px w-full bg-stone-200"></div>
        <div ref={capacityRef} className="group flex flex-col items-center text-center w-full md:w-1/4 cursor-default">
          <Boxes className="w-8 h-8 text-red-700 mb-3 opacity-90 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          <div className="text-3xl md:text-4xl font-semibold text-stone-900 mb-2">{capacity.toLocaleString()}+ sq.ft</div>
          <div className="text-xs sm:text-sm font-serif font-bold uppercase tracking-widest text-stone-600">Flexible Capacity</div>
        </div>
      </div>
    </div>
  );
};

const WhyVardha = () => {
  const { ref, isVisible } = useScrollReveal();
  const features = [
    { icon: ShieldCheck, title: "Proven Experience", desc: "Warehouse expertise since 1987." },
    { icon: MapPin, title: "Strategic Accessibility", desc: "Located on Gorakhnath Mandir Road, Bargadwa, Gorakhpur." },
    { icon: Truck, title: "Truck-Friendly Access", desc: "Wide 118-ft road frontage supports commercial movement." },
    { icon: Warehouse, title: "Operational Convenience", desc: "Designed for efficient loading, unloading and warehouse operations." },
    { icon: ShieldCheck, title: "Security", desc: "CCTV surveillance and security arrangements." },
    { icon: Boxes, title: "Flexible Solutions", desc: "Warehouse solutions for different business requirements." },
  ];
  const images = [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkJYFwUOSQ07qReKosq0t_PkdW5HDEf6cxxIcm0JA8_Q&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRliu9iQcFVMuLO1Rsa3gXvgSmg5qQFlpg58CHhe_AjDw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr8eJ8C_rzCDI5qB91B9KoyrOgbWQpbq7aRnua2eBaBQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDVrgiDtJ5OrgSIaizwTDdoe9afDmiN11PUWpP36DAVA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3XLZ3NXwzoFnz0YGPRaRY-2V0V4a1ZZeMk9yG3caeA&s=10",
  ];

  return (
    <section ref={ref} className={`py-12 md:py-16 bg-transparent transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-red-600"></span>
            <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">Why Vardha</span>
            <span className="w-8 h-[2px] bg-red-600"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Why Businesses Choose Vardha</h2>
          <p className="text-stone-600 font-sans font-light text-lg max-w-2xl mx-auto">Built on trust, reliability, and decades of warehouse expertise.</p>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, i) => {
            const rowIndex = Math.floor(i / 3);
            const fromLeft = rowIndex % 2 === 0;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: fromLeft ? -40 : 40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                }}
                className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img src={images[i]} alt="" className="w-full h-60 object-cover rounded-xl mb-4" />
                <feature.icon className="w-10 h-10 text-red-700 mb-4" />
                <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">{feature.title}</h3>
                <p className="text-stone-600 font-sans font-light">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const UseCasesSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const images = [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop",
    "data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYAxpd6b3hkIGcsUfsTj_rb107wkGsxDoFL-4ieeL3ng&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSygXdIqBR0cVGc74iRQjeAwc6caTunxxXB2VTiM-y1lA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9HRGQWWWaeN6VexisEyWAUoLV830Vlu0SwqsEfb3dQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy9GjUa5QntZn33oEkZQHDjOaak-HAFriECz-OqMSf3Q&s=10"
  ];

  return (
    <section ref={ref} className={`py-12 md:py-16 bg-transparent transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-red-600"></span>
            <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">Use Cases</span>
            <span className="w-8 h-[2px] bg-red-600"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Built for Every Business</h2>
          <p className="text-stone-600 font-sans font-light text-lg max-w-2xl mx-auto">Warehouse solutions tailored for diverse commercial needs.</p>
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
                className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img src={images[i]} alt="" className="w-full h-60 object-cover rounded-xl mb-4" />
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <Boxes className="w-6 h-6 text-red-700" />
                </div>
                <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">{useCase.title}</h3>
                <p className="text-stone-600 font-sans font-light mb-4">{useCase.description}</p>
                <p className="text-stone-500 font-sans font-light text-sm mb-4"><strong className="text-stone-700">Challenge:</strong> {useCase.challenge}</p>
                <p className="text-stone-500 font-sans font-light text-sm"><strong className="text-stone-700">Solution:</strong> {useCase.solution}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const SolutionsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const images = [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9HRGQWWWaeN6VexisEyWAUoLV830Vlu0SwqsEfb3dQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZa69C8tIpMet8VhyO4-NmrcXDnZb8qA1EbykcWAVLKA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwiw48T0Wm2g9SikSgtBGeed0g8atm8ZIBiAMvgN_8-A&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7dbWsGmQ8-sAgCJCp-0gkZrvnkNqemgRBsQB2tao2xw&s=10",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=250&fit=crop",
  ];

  return (
    <section ref={ref} className={`py-12 md:py-16 bg-stone-100 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-red-600"></span>
            <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">Solutions</span>
            <span className="w-8 h-[2px] bg-red-600"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Warehouse Expertise</h2>
          <p className="text-stone-600 font-sans font-light text-lg max-w-2xl mx-auto">Flexible storage and distribution solutions for every commercial need.</p>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {solutions.map((solution, i) => {
            const rowIndex = Math.floor(i / 3);
            const fromLeft = rowIndex % 2 === 0;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: fromLeft ? -40 : 40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                }}
                className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img src={images[i]} alt="" className="w-full h-60 object-cover rounded-xl mb-4" />
                <h3 className="text-xl font-serif font-medium text-stone-900 mb-3">{solution.title}</h3>
                <p className="text-stone-600 font-sans font-light mb-4">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-stone-600 text-sm font-sans font-light">
                      <span className="h-1.5 w-1.5 bg-red-600 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const ClientsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`py-12 md:py-16 bg-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-red-600"></span>
            <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">Trusted By</span>
            <span className="w-8 h-[2px] bg-red-600"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Our Clients</h2>
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
                className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-2xl font-serif font-bold text-stone-900 mb-1">{client.name}</div>
                <div className="text-sm text-stone-500 font-sans font-light">{client.fullName}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const LocationSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`py-12 md:py-16 bg-stone-100 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-red-600"></span>
            <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">Location</span>
            <span className="w-8 h-[2px] bg-red-600"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Visit Our Facility</h2>
          <p className="text-stone-600 font-sans font-light text-lg max-w-3xl mx-auto">Strategically located on Gorakhnath Mandir Road, Bargadwa, Gorakhpur, Uttar Pradesh with easy accessibility.</p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=Gorakhnath+Mandir+Road,+Bargadwa,+Gorakhpur,+Uttar+Pradesh&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vardha Warehousing Location"
            ></iframe>
          </div>
          <div className="text-center mt-8">
            <p className="text-stone-600 font-sans font-light text-lg mb-2"><strong className="text-stone-900">Address:</strong> Gorakhnath Mandir Road, Bargadwa, Gorakhpur, Uttar Pradesh, India</p>
            <p className="text-stone-600 font-sans font-light text-lg"><strong className="text-stone-900">Contact:</strong>+91-9670111167</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section ref={ref} className={`py-12 md:py-16 bg-stone-50 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-red-600"></span>
            <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">FAQ</span>
            <span className="w-8 h-[2px] bg-red-600"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="text-stone-900 font-sans font-semibold text-sm md:text-base">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-red-700 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-stone-600 font-sans font-light text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`py-16 md:py-20 bg-stone-900 relative z-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6">Ready to Find the Right Warehouse Space?</h2>
        <p className="text-base md:text-lg text-stone-400 font-sans font-light mb-8 leading-relaxed mx-auto">Tell us your requirement and let Vardha help you find a practical warehousing solution.</p>
        <div className="flex flex-wrap justify-center gap-5">
          <Link to="/book-warehouse" className="px-6 py-3 bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-red-800 hover:-translate-y-1 transition-all duration-300">
            Calculate Requirement
          </Link>
          <WhatsAppButton message="Hello Vardha Warehousing, I'm interested in your warehouse space." className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:-translate-y-1 transition-all duration-300">
            WhatsApp Vardha
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="antialiased bg-stone-50 selection:bg-orange-200 selection:text-orange-900 relative">
      <Header />
      <Hero />
      <Overview />
      <StatsStrip />
      <Calculators />
      <WhyVardha />
      <UseCasesSection />
      <SolutionsSection />
      <ClientsSection />
      <FinalCTA />
      <LocationSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
