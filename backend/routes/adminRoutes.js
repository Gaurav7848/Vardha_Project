const express = require('express');
const router = express.Router();
const {
  getEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.get('/', getEnquiries);
router.get('/:id', getEnquiry);
router.patch('/:id/status', updateEnquiryStatus);
router.delete('/:id', deleteEnquiry);

module.exports = router;
