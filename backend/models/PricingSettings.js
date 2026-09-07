const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  minArea: {
    type: Number,
    required: true,
    default: 500,
  },
  maxArea: {
    type: Number,
    required: true,
    default: 42000,
  },
  slabLimit: {
    type: Number,
    required: true,
    default: 5000,
  },
  smallRate: {
    type: Number,
    required: true,
    default: 60,
  },
  largeRate: {
    type: Number,
    required: true,
    default: 24,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PricingSettings', pricingSchema);
