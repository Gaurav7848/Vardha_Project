import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Calculator, Ruler, User, FileText } from 'lucide-react';
import Header from '../Components/header';
import Footer from '../Components/footer';
import WhatsAppButton from '../Components/WhatsAppButton';
import {
  calculateAreaFromDimensions,
  getPricingRate,
  calculateMonthlyAmount,
  validateArea,
  formatCurrency,
  loadPricingSettings,
} from '../utils/pricing';
import { createEnquiry } from '../services/api';

const STEPS = ['Requirement', 'Customer Information', 'Review', 'Confirmation'];

const BUSINESS_TYPES = ['FMCG', 'E-commerce', 'D2C', 'Steel', 'Industrial Goods', 'Commercial Goods', 'Distribution', 'Logistics', 'Other'];
const DURATIONS = ['1–3 Months', '3–6 Months', '6–12 Months', '1–2 Years', '2+ Years'];

const BookWarehouse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [mode, setMode] = useState(location.state?.length && location.state?.width ? "dimensions" : "area");
  const [formData, setFormData] = useState({
    area: location.state?.area || 10000,
    length: location.state?.length || 0,
    width: location.state?.width || 0,
    height: location.state?.height || 24,
    startDate: '',
    duration: '',
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    businessType: '',
    gstNumber: '',
    additionalRequirements: '',
  });
  const [errors, setErrors] = useState({});

  const calculatedArea = mode === "area" ? formData.area : calculateAreaFromDimensions(formData.length, formData.width);
  const rate = getPricingRate(calculatedArea);
  const monthly = calculateMonthlyAmount(calculatedArea, rate);

  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({ ...prev, ...location.state }));
    }
  }, [location.state]);

  useEffect(() => {
    loadPricingSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.height || formData.height <= 0) newErrors.height = 'Height is required.';
      if (!formData.startDate) newErrors.startDate = 'Start date is required.';
      if (!formData.duration) newErrors.duration = 'Duration is required.';
      const areaValidation = validateArea(calculatedArea);
      if (!areaValidation.valid) {
        newErrors.area = areaValidation.message;
      }
    }
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required.';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required.';
      if (!formData.email.trim()) newErrors.email = 'Email is required.';
      if (!formData.businessType) newErrors.businessType = 'Business type is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const startDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(startDate.getTime()) || startDate < today) {
        setErrors({ startDate: 'Start date cannot be in the past.' });
        setLoading(false);
        return;
      }

      const payload = {
        fullName: formData.fullName,
        companyName: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        businessType: formData.businessType,
        gstNumber: formData.gstNumber,
        additionalRequirements: formData.additionalRequirements,
        area: calculatedArea,
        length: formData.length || 0,
        width: formData.width || 0,
        height: formData.height,
        startDate: formData.startDate,
        duration: formData.duration,
      };

      const result = await createEnquiry(payload);
      if (result.success) {
        setRequestId(result.data.requestId);
        setSubmitted(true);
        setStep(3);
      } else {
        alert(result.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      alert('Unable to connect. Please try again or contact us through WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted && step === 3) {
    return (
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header />
        <main className="pt-24 pb-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Enquiry Submitted Successfully</h1>
            <p className="text-stone-600 font-sans font-light text-lg mb-4">Thank you for sharing your warehouse requirement. Our team will get back to you shortly.</p>
            <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm mb-8">
              <div className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-2">Request ID</div>
              <div className="text-2xl font-serif font-semibold text-stone-900">{requestId}</div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Required Space</div>
                  <div className="text-stone-900 font-sans font-medium">{formatCurrency(calculatedArea)} sq.ft.</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Rate</div>
                  <div className="text-stone-900 font-sans font-medium">₹{rate}/sq.ft.</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Estimated Monthly</div>
                  <div className="text-stone-900 font-sans font-medium">₹{formatCurrency(monthly)}/month</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Status</div>
                  <div className="text-stone-900 font-sans font-medium">Pending</div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <WhatsAppButton message={`Hello Vardha Warehousing, my enquiry ID is ${requestId}.`} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl">
                WhatsApp Vardha
              </WhatsAppButton>
              <Link to="/payment-demo" state={{ requestId, monthly, area: calculatedArea }} className="px-6 py-3 bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-red-800 transition-all duration-300">
                Proceed to Payment
              </Link>
              <Link to="/" className="px-6 py-3 border border-stone-300 text-stone-700 font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-stone-50 transition-all duration-300">
                Back to Website
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Header />
      <main className="pt-24 pb-24 px-6">
        <section className="relative bg-stone-900 py-20 md:py-28 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr8eJ8C_rzCDI5qB91B9KoyrOgbWQpbq7aRnua2eBaBQ&s=10')] bg-cover bg-center opacity-20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6">Secure the Right Space for Your Business</h1>
              <p className="text-stone-300 font-sans font-light text-lg md:text-xl leading-relaxed">Tell us your storage requirements and let our team help you find a secure, flexible, and efficient warehouse solution.</p>
            </div>
          </div>
        </section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Book Your Warehouse Space</h1>
            <p className="text-stone-600 font-sans font-light text-lg">Tell us what you need and our team will help you find the right solution.</p>
          </div>
          <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'bg-red-700 text-white' : 'bg-stone-200 text-stone-500'}`}>
                  {i + 1}
                </div>
                <span className={`ml-2 text-sm font-bold uppercase tracking-widest hidden sm:block ${i <= step ? 'text-red-700' : 'text-stone-400'}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`w-12 h-[2px] mx-2 ${i < step ? 'bg-red-700' : 'bg-stone-200'}`}></div>}
              </div>
            ))}
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <div>
                    <div className="flex mb-6">
                      <button type="button" onClick={() => setMode("area")} className={`flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${mode === "area" ? "bg-red-700 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>Enter Area</button>
                      <button type="button" onClick={() => setMode("dimensions")} className={`flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${mode === "dimensions" ? "bg-red-700 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>Enter Dimensions</button>
                    </div>
                    {mode === "area" ? (
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Required Area (sq.ft.) *</label>
                        <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                        {errors.area && <div className="text-red-600 text-xs mt-1">{errors.area}</div>}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Length (ft.) *</label>
                          <input type="number" name="length" value={formData.length} onChange={handleChange} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Width (ft.) *</label>
                          <input type="number" name="width" value={formData.width} onChange={handleChange} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Height (ft.) *</label>
                    <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                    {errors.height && <div className="text-red-600 text-xs mt-1">{errors.height}</div>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Start Date *</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                    {errors.startDate && <div className="text-red-600 text-xs mt-1">{errors.startDate}</div>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Duration *</label>
                    <select name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans">
                      <option value="">Select duration</option>
                      {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {errors.duration && <div className="text-red-600 text-xs mt-1">{errors.duration}</div>}
                  </div>
                </motion.div>
              )}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                    {errors.fullName && <div className="text-red-600 text-xs mt-1">{errors.fullName}</div>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Company Name *</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                    {errors.companyName && <div className="text-red-600 text-xs mt-1">{errors.companyName}</div>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                    {errors.phone && <div className="text-red-600 text-xs mt-1">{errors.phone}</div>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                    {errors.email && <div className="text-red-600 text-xs mt-1">{errors.email}</div>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Business Type *</label>
                    <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans">
                      <option value="">Select business type</option>
                      {BUSINESS_TYPES.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                    </select>
                    {errors.businessType && <div className="text-red-600 text-xs mt-1">{errors.businessType}</div>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">GST Number (Optional)</label>
                    <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Additional Requirements</label>
                    <textarea name="additionalRequirements" value={formData.additionalRequirements} onChange={handleChange} rows="3" className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans resize-none" />
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Review Your Enquiry</h3>
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Required Space</div>
                        <div className="text-stone-900 font-sans font-medium">{formatCurrency(calculatedArea)} sq.ft.</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Dimensions</div>
                        <div className="text-stone-900 font-sans font-medium">{mode === "dimensions" ? `${formData.length || 0} × ${formData.width || 0} ft` : "Direct area input"}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Height</div>
                        <div className="text-stone-900 font-sans font-medium">{formData.height} ft</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Applicable Rate</div>
                        <div className="text-stone-900 font-sans font-medium">₹{rate}/sq.ft.</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Estimated Monthly</div>
                        <div className="text-stone-900 font-sans font-medium">₹{formatCurrency(monthly)}/month</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Start Date</div>
                        <div className="text-stone-900 font-sans font-medium">{formData.startDate || 'Not set'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Duration</div>
                        <div className="text-stone-900 font-sans font-medium">{formData.duration || 'Not set'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Full Name</div>
                        <div className="text-stone-900 font-sans font-medium">{formData.fullName || 'Not set'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Company</div>
                        <div className="text-stone-900 font-sans font-medium">{formData.companyName || 'Not set'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Phone</div>
                        <div className="text-stone-900 font-sans font-medium">{formData.phone || 'Not set'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email</div>
                        <div className="text-stone-900 font-sans font-medium">{formData.email || 'Not set'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Business Type</div>
                        <div className="text-stone-900 font-sans font-medium">{formData.businessType || 'Not set'}</div>
                      </div>
                      {formData.additionalRequirements && (
                        <div className="col-span-2">
                          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Additional Requirements</div>
                          <div className="text-stone-900 font-sans font-medium">{formData.additionalRequirements}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
             </AnimatePresence>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              {step > 0 ? (
                <button onClick={prevStep} className="px-6 py-3 border border-stone-300 text-stone-700 font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-stone-50 transition-all duration-300 flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : <div></div>}
              <div className="flex flex-col sm:flex-row gap-3">
                <WhatsAppButton message={`Hello Vardha Warehousing, I need ${formatCurrency(calculatedArea)} sq.ft. of warehouse space. Height: ${formData.height || 24}ft.`} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:-translate-y-1 transition-all duration-300">
                  WhatsApp This Requirement
                </WhatsAppButton>
                {step < 2 && (
                  <button onClick={nextStep} className="px-6 py-3 bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-red-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center gap-2">
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {step === 2 && (
                  <button onClick={handleSubmit} disabled={loading} className="px-6 py-3 bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-red-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Submitting...' : 'Submit Enquiry'} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default BookWarehouse;
