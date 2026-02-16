const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const protect = require('../middlewares/authMiddleware');


router.post('/profile', protect, volunteerController.createOrUpdateProfile);


router.get('/me', protect, volunteerController.getVolunteerStats);

module.exports = router;