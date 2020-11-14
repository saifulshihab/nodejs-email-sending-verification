import express from 'express';
import {
  userLogin,
  userRegister,
  userEmailVerify,
  resetPassword,
  getResetPasswordLink,
} from '../controller/userController.js';
const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/verification/:token').get(userEmailVerify);
router.route('/getResetPasswordLink').post(getResetPasswordLink);
router.route('/resetPassword/:token').post(resetPassword);

export default router;
