import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Save, RotateCcw } from 'lucide-react';
import { getPricingSettings, updatePricingSettings } from '../../services/adminService';

const PricingManagement = () => {
  const [settings, setSettings] = useState({
    minArea: 500,
    maxArea: 42000,
    slabLimit: 5000,
    smallRate: 60,
    largeRate: 24,
    active: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchPricing = async () => {
    setLoading(true);
    try {
      const result = await getPricingSettings();
      if (result.success && result.data) {
        setSettings(result.data);
      }
    } catch (err) {
      setMessage('Failed to load pricing settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const result = await updatePricingSettings(settings);
      if (result.success) {
        setMessage('Pricing updated successfully');
        await fetchPricing();
      } else {
        setMessage(result.message || 'Failed to update pricing');
      }
    } catch (err) {
      setMessage('Failed to update pricing');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings({
      minArea: 500,
      maxArea: 42000,
      slabLimit: 5000,
      smallRate: 60,
      largeRate: 24,
      active: true,
    });
    setMessage('');
  };

  if (loading) {
    return <div className="text-center py-12 text-stone-500">Loading pricing settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-medium text-stone-900 mb-2">Pricing Management</h1>
        <p className="text-stone-600 font-sans font-light">Manage warehouse pricing rates and slabs</p>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm max-w-3xl">
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${message.includes('success') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Minimum Area (sq.ft.)</label>
              <input
                type="number"
                name="minArea"
                value={settings.minArea}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Maximum Area (sq.ft.)</label>
              <input
                type="number"
                name="maxArea"
                value={settings.maxArea}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Slab Limit (sq.ft.)</label>
              <input
                type="number"
                name="slabLimit"
                value={settings.slabLimit}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
              />
              <p className="text-xs text-stone-500 mt-1">Area up to this limit uses the small rate</p>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Small Rate (₹/sq.ft./month)</label>
              <input
                type="number"
                name="smallRate"
                value={settings.smallRate}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Large Rate (₹/sq.ft./month)</label>
              <input
                type="number"
                name="largeRate"
                value={settings.largeRate}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={settings.active}
                onChange={handleChange}
                className="w-4 h-4 text-red-700 rounded focus:ring-red-700"
              />
              <label htmlFor="active" className="text-sm text-stone-700">Active</label>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
            <h3 className="text-lg font-serif font-medium text-stone-900 mb-4">Pricing Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-stone-200 rounded-xl p-4">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">500 sq.ft.</div>
                <div className="text-xl font-serif font-semibold text-stone-900">₹{settings.smallRate * 500}/month</div>
                <div className="text-xs text-stone-500">₹{settings.smallRate}/sq.ft.</div>
              </div>
              <div className="bg-white border border-stone-200 rounded-xl p-4">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">{settings.slabLimit.toLocaleString()} sq.ft.</div>
                <div className="text-xl font-serif font-semibold text-stone-900">₹{(settings.smallRate * settings.slabLimit).toLocaleString()}/month</div>
                <div className="text-xs text-stone-500">₹{settings.smallRate}/sq.ft.</div>
              </div>
              <div className="bg-white border border-stone-200 rounded-xl p-4">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">10,000 sq.ft.</div>
                <div className="text-xl font-serif font-semibold text-stone-900">₹{(settings.largeRate * 10000).toLocaleString()}/month</div>
                <div className="text-xs text-stone-500">₹{settings.largeRate}/sq.ft.</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-red-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-red-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Pricing'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-4 border border-stone-300 text-stone-700 rounded-xl text-sm font-bold hover:bg-stone-50 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PricingManagement;
