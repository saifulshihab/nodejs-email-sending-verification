import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import emailValidator from 'email-validator';
import nodemailer from 'nodemailer';

export const userRegister = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const valid_email = emailValidator.validate(email);

  if (valid_email) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const emailSend = await transporter.sendMail({
      from: 'littlebitprogrammer@gmail.com',
      to: email,
      subject: 'Email verification to complete your registration!',
      text: 'Email Verification',
      html: `Please click this link to confirm`,
    });
    const user = await User.create({
      email,
      password,
    });
    if (user && emailSend) {
      res.status(201).json({
        status: 'Registration successfull!',
        message: `An email was sent to ${email} at ${new Date()}. Please check your email for verification.`,
      });
    } else {
      res.status(403);
      throw new Error('Registration failed!');
    }
  } else {
    res.status(403);
    throw new Error('Invalid Email!');
  }
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.password) === password) {
    res.status(200);
    res.json({
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('Invalid Email or Password!');
  }
});
