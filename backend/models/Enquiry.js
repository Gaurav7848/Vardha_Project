const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  businessType: {
    type: String,
    required: true,
    trim: true,
  },
  gstNumber: {
    type: String,
    trim: true,
  },
  additionalRequirements: {
    type: String,
    trim: true,
  },
  area: {
    type: Number,
    required: true,
    min: 500,
    max: 42000,
  },
  length: {
    type: Number,
    min: 0,
  },
  width: {
    type: Number,
    min: 0,
  },
  height: {
    type: Number,
    required: true,
    min: 0,
  },
  startDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  pricingRate: {
    type: Number,
    required: true,
  },
  estimatedMonthlyAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'converted', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Enquiry', enquirySchema);
