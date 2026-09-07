const express = require('express');
const {
  submitEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/enquiryController');

const router = express.Router();

router.post('/', submitEnquiry);
router.get('/', getAllEnquiries);
router.get('/:id', getEnquiryById);
router.patch('/:id', updateEnquiry);
router.delete('/:id', deleteEnquiry);

module.exports = router;
