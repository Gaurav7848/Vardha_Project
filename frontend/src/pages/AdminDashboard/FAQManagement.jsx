import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Edit, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';
import { getAdminFAQs, createFAQ, updateFAQ, deleteFAQ } from '../../services/adminService';

const FAQManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({ question: '', answer: '', category: 'General', order: 0, active: true });
  const [saving, setSaving] = useState(false);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const result = await getAdminFAQs();
      setFaqs(result.data || []);
    } catch (err) {
      setError('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingFaq) {
        await updateFAQ(editingFaq._id, formData);
      } else {
        await createFAQ(formData);
      }
      await fetchFAQs();
      closeModal();
    } catch (err) {
      alert('Failed to save FAQ');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer, category: faq.category || 'General', order: faq.order || 0, active: faq.active ?? true });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await deleteFAQ(id);
      await fetchFAQs();
    } catch (err) {
      alert('Failed to delete FAQ');
    }
  };

  const openModal = () => {
    setEditingFaq(null);
    setFormData({ question: '', answer: '', category: 'General', order: 0, active: true });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
    setFormData({ question: '', answer: '', category: 'General', order: 0, active: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-medium text-stone-900 mb-2">FAQ Management</h1>
          <p className="text-stone-600 font-sans font-light">Manage frequently asked questions</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-6 py-3 bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-red-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-stone-500">Loading FAQs...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-12 text-stone-500">No FAQs found. Create your first FAQ.</div>
        ) : (
          <div className="divide-y divide-stone-200">
            {faqs.map((faq) => (
              <div key={faq._id} className="p-6 hover:bg-stone-50 transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-serif font-medium text-stone-900">{faq.question}</h3>
                      <span className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-full">{faq.category}</span>
                      {!faq.active && <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Inactive</span>}
                    </div>
                    <p className="text-stone-600 font-sans font-light text-sm mb-3">{faq.answer}</p>
                    <div className="text-xs text-stone-400">Order: {faq.order}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-stone-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-stone-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-serif font-medium text-stone-900">{editingFaq ? 'Edit FAQ' : 'Add FAQ'}</h3>
              <button onClick={closeModal} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-stone-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Question *</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                  className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
                  placeholder="Enter question"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Answer *</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  required
                  rows="4"
                  className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans resize-none"
                  placeholder="Enter answer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-transparent border border-stone-200 rounded-xl py-3 px-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-red-700 rounded focus:ring-red-700"
                />
                <label htmlFor="active" className="text-sm text-stone-700">Active</label>
              </div>
              <div className="flex gap-3 pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-red-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-red-800 transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingFaq ? 'Update FAQ' : 'Create FAQ'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 border border-stone-300 text-stone-700 rounded-xl text-sm font-bold hover:bg-stone-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQManagement;
