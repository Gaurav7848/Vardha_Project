const mongoose = require('mongoose');
const PricingSettings = require('../models/PricingSettings');

const MIN_AREA = 500;
const MAX_AREA = 42000;

const calculateAreaFromDimensions = (length, width) => {
  if (!length || !width) return 0;
  return Math.floor(length * width);
};

const getPricingRate = async (area) => {
  if (area <= 0) return 0;
  try {
    const settings = await PricingSettings.findOne({ active: true }).lean();
    if (!settings) {
      return area <= 5000 ? 60 : 24;
    }
    return area <= settings.slabLimit ? settings.smallRate : settings.largeRate;
  } catch (error) {
    console.error('Error fetching pricing settings:', error);
    return area <= 5000 ? 60 : 24;
  }
};

const calculateMonthlyAmount = (area, rate) => {
  if (!area || !rate) return 0;
  return area * rate;
};

const validateArea = (area, minArea = MIN_AREA, maxArea = MAX_AREA) => {
  if (!area || area <= 0) {
    return { valid: false, message: 'Please enter a valid area.' };
  }
  if (area < minArea) {
    return { valid: false, message: `Minimum warehouse requirement is ${minArea} sq.ft. Please increase your requirement.` };
  }
  if (area > maxArea) {
    return { valid: false, message: `Requirements above ${maxArea.toLocaleString()} sq.ft. require a customized solution. Please contact our team.` };
  }
  return { valid: true };
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN').format(amount);
};

const generateRequestId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `VARDHA-${year}-${random}`;
};

module.exports = {
  MIN_AREA,
  MAX_AREA,
  calculateAreaFromDimensions,
  getPricingRate,
  calculateMonthlyAmount,
  validateArea,
  formatCurrency,
  generateRequestId,
};
