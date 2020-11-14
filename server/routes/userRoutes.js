import express from 'express';
import {
  userLogin,
  userRegister,
  userEmailVerify,
} from '../controller/userController.js';
const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/verification/:token').get(userEmailVerify);

export default router;
