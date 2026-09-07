const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get current admin profile
// @route   GET /api/profile/me
// @access  Private/Admin
exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
        company: req.admin.company,
        phone: req.admin.phone || '',
        district: req.admin.district || '',
        state: req.admin.state || '',
        pinCode: req.admin.pinCode || '',
        country: req.admin.country || '',
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};

// @desc    Update admin profile
// @route   PUT /api/profile/update
// @access  Private/Admin
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (name) admin.name = name;
    if (phone !== undefined) admin.phone = phone;

    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        company: admin.company,
        phone: admin.phone || '',
        district: admin.district || '',
        state: admin.state || '',
        pinCode: admin.pinCode || '',
        country: admin.country || '',
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};

// @desc    Change admin password
// @route   POST /api/profile/change-password
// @access  Private/Admin
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id).select('+password');

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, message: 'Failed to change password' });
  }
};
