const express = require('express');
const router = express.Router();
const { getContacts, deleteContact } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.get('/', getContacts);
router.delete('/:id', deleteContact);

module.exports = router;
