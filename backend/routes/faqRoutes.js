const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const { protect, authorize } = require('../middleware/auth');

// Public route for fetching active FAQs
router.get('/', faqController.getPublicFAQs);

// Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.get('/admin', faqController.getFAQs);
router.post('/', faqController.createFAQ);
router.put('/:id', faqController.updateFAQ);
router.delete('/:id', faqController.deleteFAQ);

module.exports = router;
