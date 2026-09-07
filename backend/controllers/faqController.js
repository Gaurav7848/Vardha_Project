const FAQ = require('../models/FAQ');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all active FAQs (public)
// @route   GET /api/faqs
// @access  Public
exports.getPublicFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    console.error('Error fetching public FAQs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch FAQs' });
  }
};

// @desc    Get all FAQs
// @route   GET /api/admin/faqs/admin
// @access  Private/Admin
exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch FAQs' });
  }
};

// @desc    Create FAQ
// @route   POST /api/admin/faqs
// @access  Private/Admin
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer, category, order, active } = req.body;
    const faq = await FAQ.create({ question, answer, category, order, active });
    res.status(201).json({ success: true, message: 'FAQ created', data: faq });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ success: false, message: 'Failed to create FAQ' });
  }
};

// @desc    Update FAQ
// @route   PUT /api/admin/faqs/:id
// @access  Private/Admin
exports.updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.status(200).json({ success: true, message: 'FAQ updated', data: faq });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ success: false, message: 'Failed to update FAQ' });
  }
};

// @desc    Delete FAQ
// @route   DELETE /api/admin/faqs/:id
// @access  Private/Admin
exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.status(200).json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ success: false, message: 'Failed to delete FAQ' });
  }
};
