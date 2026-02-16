const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const protect = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware'); // From previous step


router.post('/', protect, authorize(['Admin', 'City Manager', 'HR Manager']), taskController.createTask);


router.get('/my-tasks', protect, taskController.getMyTasks);


router.patch('/:taskId/status', protect, taskController.updateTaskStatus);

module.exports = router;