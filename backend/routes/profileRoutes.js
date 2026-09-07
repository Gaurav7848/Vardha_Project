const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.get('/me', profileController.getProfile);
router.put('/update', profileController.updateProfile);
router.post('/change-password', profileController.changePassword);

module.exports = router;
