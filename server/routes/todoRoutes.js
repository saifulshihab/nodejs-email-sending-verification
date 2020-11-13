import express from 'express';
const router = express.Router();
import {
  addNewTodo,
  getAllTodo,
  completeTodo,
  incompleteTodo,
  deleteTodo,
} from '../controller/todoController.js';

router.route('/').get(getAllTodo).post(addNewTodo);
router.route('/:id').delete(deleteTodo);
router.route('/:id/complete').put(completeTodo);
router.route('/:id/incomplete').put(incompleteTodo);

export default router;
