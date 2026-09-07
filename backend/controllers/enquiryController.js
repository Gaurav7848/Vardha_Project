const Enquiry = require('../models/Enquiry');
const {
  calculateAreaFromDimensions,
  getPricingRate,
  calculateMonthlyAmount,
  validateArea,
  generateRequestId,
} = require('../services/pricingService');

const submitEnquiry = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      phone,
      email,
      businessType,
      gstNumber,
      additionalRequirements,
      area,
      length,
      width,
      height,
      startDate,
      duration,
    } = req.body;

    if (!fullName || !companyName || !phone || !email || !businessType || !startDate || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields.',
        errors: ['Missing required fields.'],
      });
    }

    if (!height || height <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid height.',
        errors: ['Height is required and must be greater than 0.'],
      });
    }

    const parsedStartDate = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(parsedStartDate.getTime()) || parsedStartDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Start date cannot be in the past.',
        errors: ['Please select a valid future start date.'],
      });
    }

    let calculatedArea = area;
    if (!calculatedArea && length && width) {
      calculatedArea = calculateAreaFromDimensions(length, width);
    }

    if (!calculatedArea || calculatedArea <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either area or valid dimensions.',
        errors: ['Area must be greater than 0.'],
      });
    }

    const areaValidation = validateArea(calculatedArea);
    if (!areaValidation.valid) {
      return res.status(400).json({
        success: false,
        message: areaValidation.message,
        errors: [areaValidation.message],
      });
    }

    const rate = await getPricingRate(calculatedArea);
    const monthlyAmount = calculateMonthlyAmount(calculatedArea, rate);

    const requestId = generateRequestId();

    const enquiry = new Enquiry({
      requestId,
      fullName,
      companyName,
      phone,
      email,
      businessType,
      gstNumber: gstNumber || '',
      additionalRequirements: additionalRequirements || '',
      area: calculatedArea,
      length: length || 0,
      width: width || 0,
      height,
      startDate: parsedStartDate,
      duration,
      pricingRate: rate,
      estimatedMonthlyAmount: monthlyAmount,
      status: 'pending',
    });

    await enquiry.save();

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: {
        requestId: enquiry.requestId,
        area: enquiry.area,
        rate: enquiry.pricingRate,
        estimatedMonthlyAmount: enquiry.estimatedMonthlyAmount,
      },
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    if (error.code === 11000) {
      return res.status(500).json({
        success: false,
        message: 'Duplicate request. Please try again.',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries.',
    });
  }
};

const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }
    return res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry.',
    });
  }
};

const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry,
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update enquiry.',
    });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry.',
    });
  }
};

module.exports = {
  submitEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
