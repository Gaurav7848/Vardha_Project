import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Shield, ArrowLeft, CheckCircle } from 'lucide-react';

const PaymentDemo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const enquiryData = location.state || {};
  const [processing, setProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '4111 1111 1111 1111',
    name: 'DEMO USER',
    expiry: '12/28',
    cvv: '123',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigate('/payment-success', {
        state: {
          enquiryData,
          amount: enquiryData.monthly || 240000,
          requestId: enquiryData.requestId || 'VARDHA-2026-DEMO',
        },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-transparent to-orange-900/5"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl mx-auto px-6 py-12"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-400 rounded-full mb-4">
            <Shield className="w-4 h-4 text-yellow-700" />
            <span className="text-yellow-700 text-xs font-bold uppercase tracking-widest">Demo Payment — No Real Charge</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Demo Payment</h1>
          <p className="text-stone-600 font-sans font-light text-lg">This is a demonstration payment flow. No real transaction will occur.</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-stone-900 p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-400 text-sm">Amount</span>
              <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">Demo</span>
            </div>
            <div className="text-4xl font-serif font-semibold mb-2">₹{enquiryData.monthly?.toLocaleString() || '2,40,000'}</div>
            <div className="text-stone-400 text-sm">/month</div>
            {enquiryData.requestId && (
              <div className="mt-4 text-xs text-stone-400">Request ID: {enquiryData.requestId}</div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  value={cardData.number}
                  onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                  required
                  className="w-full bg-transparent border border-stone-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-600 transition-all text-stone-900 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Cardholder Name</label>
              <input
                type="text"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                required
                className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Expiry Date</label>
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                  required
                  placeholder="MM/YY"
                  className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">CVV</label>
                <input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  required
                  placeholder="123"
                  className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
                />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-yellow-800 mb-1">Demo Mode</div>
                <div className="text-xs text-yellow-700 font-sans font-light">This is a demonstration payment. No real money will be charged. Use any card details to proceed.</div>
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-red-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-red-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Pay Demo
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-red-700 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentDemo;
