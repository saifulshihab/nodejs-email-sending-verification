import express from 'express';
const router = express.Router();
import {
  addNewTodo,
  getAllTodo,
  completeTodo,
  incompleteTodo,
  deleteTodo,
  editTodo,
} from '../controller/todoController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getAllTodo).post(protect, addNewTodo);
router.route('/:id').delete(protect, deleteTodo).put(protect, editTodo);
router.route('/:id/complete').put(protect, completeTodo);
router.route('/:id/incomplete').put(protect, incompleteTodo);

export default router;
