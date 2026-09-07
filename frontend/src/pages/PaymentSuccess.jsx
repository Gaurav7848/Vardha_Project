import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Warehouse } from 'lucide-react';
import WhatsAppButton from '../Components/WhatsAppButton';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, requestId } = location.state || {};

  return (
    <div className="min-h-screen bg-stone-50 font-sans flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 via-transparent to-red-900/5"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl mx-auto px-6 py-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-green-700 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-green-700" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-2">Demo Payment Successful</h1>
            <p className="text-green-100 font-sans font-light">No real charge was made</p>
          </div>

          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-400 rounded-full mb-4">
                <span className="text-yellow-700 text-xs font-bold uppercase tracking-widest">Demo Payment — No Real Charge</span>
              </div>
              <p className="text-stone-600 font-sans font-light text-lg">This was a demonstration payment flow. No actual transaction occurred.</p>
            </div>

            {requestId && (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 mb-8">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Request ID</div>
                <div className="text-2xl font-serif font-semibold text-stone-900 mb-4">{requestId}</div>
                {amount && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Demo Amount</div>
                      <div className="text-stone-900 font-sans font-medium">₹{amount?.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Status</div>
                      <div className="text-green-700 font-sans font-medium">Demo Paid</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <WhatsAppButton
                message={`Hello Vardha Warehousing, I have completed the demo payment for enquiry ${requestId || ''}.`}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all"
              >
                WhatsApp Vardha
              </WhatsAppButton>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-red-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-red-800 transition-all flex items-center justify-center gap-2"
              >
                Back to Website <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
