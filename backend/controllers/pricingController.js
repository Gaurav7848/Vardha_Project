const PricingSettings = require('../models/PricingSettings');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get active pricing settings (public)
// @route   GET /api/pricing
// @access  Public
exports.getPublicPricing = async (req, res) => {
  try {
    let settings = await PricingSettings.findOne({ active: true });
    if (!settings) {
      settings = await PricingSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching public pricing:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch pricing' });
  }
};

// @desc    Get pricing settings
// @route   GET /api/admin/pricing
// @access  Private/Admin
exports.getPricing = async (req, res) => {
  try {
    let settings = await PricingSettings.findOne({ active: true });
    if (!settings) {
      settings = await PricingSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching pricing:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch pricing' });
  }
};

// @desc    Update pricing settings
// @route   PUT /api/admin/pricing
// @access  Private/Admin
exports.updatePricing = async (req, res) => {
  try {
    const { minArea, maxArea, slabLimit, smallRate, largeRate, active } = req.body;
    let settings = await PricingSettings.findOne({ active: true });

    if (!settings) {
      settings = await PricingSettings.create({});
    }

    settings.minArea = minArea ?? settings.minArea;
    settings.maxArea = maxArea ?? settings.maxArea;
    settings.slabLimit = slabLimit ?? settings.slabLimit;
    settings.smallRate = smallRate ?? settings.smallRate;
    settings.largeRate = largeRate ?? settings.largeRate;
    settings.active = active ?? settings.active;

    await settings.save();

    res.status(200).json({ success: true, message: 'Pricing updated', data: settings });
  } catch (error) {
    console.error('Error updating pricing:', error);
    res.status(500).json({ success: false, message: 'Failed to update pricing' });
  }
};
