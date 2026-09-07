import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Calculator as CalculatorIcon, Ruler, Truck, ShieldCheck } from 'lucide-react';
import {
  calculateAreaFromDimensions,
  getPricingRate,
  calculateMonthlyAmount,
  validateArea,
  formatCurrency,
  loadPricingSettings,
} from '../utils/pricing';
import WhatsAppButton from '../Components/WhatsAppButton';

const Calculator = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("area");
  const [area, setArea] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);

  const rawArea = mode === "area" ? Number(area) : (Number(length) * Number(width));
  const calculatedArea = Number.isNaN(rawArea) ? 0 : rawArea;
  const rate = getPricingRate(calculatedArea);
  const monthly = calculateMonthlyAmount(calculatedArea, rate);

  useEffect(() => {
    const validation = validateArea(calculatedArea);
    if (!validation.valid) {
      setError(validation.message);
      setShowResult(false);
    } else {
      setError("");
      setShowResult(true);
    }
  }, [calculatedArea, mode, area, length, width]);

  useEffect(() => {
    loadPricingSettings();
  }, []);

  const handleContinue = () => {
    navigate('/book-warehouse', {
      state: {
        area: calculatedArea,
        length: mode === "dimensions" ? length : 0,
        width: mode === "dimensions" ? width : 0,
        height,
        rate,
        monthly,
      }
    });
  };

  const whatsappMessage = `Hello Vardha Warehousing, I need ${formatCurrency(calculatedArea)} sq.ft. of warehouse space. Height: ${height}ft. Estimated cost: ₹${formatCurrency(monthly)}/month.`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-24 bg-stone-900"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-red-500"></span>
            <span className="text-red-400 font-bold uppercase tracking-widest text-xs font-sans">Warehouse Calculator</span>
            <span className="w-8 h-[2px] bg-red-500"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-4">Calculate Your Warehouse Requirement</h2>
          <p className="text-stone-400 font-sans font-light text-lg max-w-2xl mx-auto">Estimate your required space and monthly warehouse cost in seconds.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl">
          <div className="flex mb-6">
            <button onClick={() => setMode("area")} className={`flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${mode === "area" ? "bg-red-700 text-white" : "bg-white/10 text-stone-300 hover:bg-white/20"}`}>
              Enter Area
            </button>
            <button onClick={() => setMode("dimensions")} className={`flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${mode === "dimensions" ? "bg-red-700 text-white" : "bg-white/10 text-stone-300 hover:bg-white/20"}`}>
              Enter Dimensions
            </button>
          </div>
          <AnimatePresence mode="wait">
            {mode === "area" ? (
              <motion.div key="area" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">Required Area (sq.ft.)</label>
                <input type="number" value={area} onChange={(e) => setArea(e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-red-500 transition-all text-white font-sans" />
              </motion.div>
            ) : (
              <motion.div key="dimensions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">Length (ft.)</label>
                  <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-red-500 transition-all text-white font-sans" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">Width (ft.)</label>
                  <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-red-500 transition-all text-white font-sans" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">Height (ft.)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-red-500 transition-all text-white font-sans" />
          </div>
          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-500/50 rounded-xl p-4 text-red-300 text-sm font-sans font-light">
              {error}
            </div>
          )}
          {showResult && !error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Required Space</div>
                  <div className="text-2xl font-serif font-semibold text-white">{formatCurrency(calculatedArea)} sq.ft.</div>
                  <div className="text-stone-400 text-sm mt-1 font-sans font-light">{mode === "area" ? "Direct area input" : `${length} × ${width} ft`}</div>
                </div>
                <div>
                  <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Height</div>
                  <div className="text-2xl font-serif font-semibold text-white">{height} ft</div>
                </div>
                <div>
                  <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Applicable Rate</div>
                  <div className="text-2xl font-serif font-semibold text-white">₹{rate}/sq.ft.</div>
                </div>
                <div>
                  <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Estimated Monthly</div>
                  <div className="text-2xl font-serif font-semibold text-white">₹{formatCurrency(monthly)}/month</div>
                </div>
              </div>
            </motion.div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleContinue} disabled={!!error} className="flex-1 bg-red-700 hover:bg-red-800 disabled:bg-stone-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2">
              Continue to Enquiry <ArrowRight className="w-4 h-4" />
            </button>
            <WhatsAppButton message={whatsappMessage} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              WhatsApp This Requirement
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Calculator;
