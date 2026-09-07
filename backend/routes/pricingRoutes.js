const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');
const { protect, authorize } = require('../middleware/auth');

// Public route for fetching active pricing
router.get('/', pricingController.getPublicPricing);

// Admin routes
router.use('/admin', protect, authorize('admin', 'superadmin'));

router.get('/admin', pricingController.getPricing);
router.put('/admin', pricingController.updatePricing);

module.exports = router;
