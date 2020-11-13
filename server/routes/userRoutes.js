import express from 'express';
import { userLogin, userRegister } from '../controller/userController.js';
const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);

export default router;