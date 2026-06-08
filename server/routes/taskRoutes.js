const express = require('express');
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(verifyToken);

// Task CRUD operations
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTask);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// Additional routes
router.delete('/completed/all', taskController.deleteCompletedTasks);

module.exports = router;
