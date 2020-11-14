import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import emailValidator from 'email-validator';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const userRegister = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const valid_email = emailValidator.validate(email);

  if (valid_email) {
    const user = await User.create({
      email,
      password,
    });
    if (user) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });
      // async email
      const token = jwt.sign({ id: user._id }, process.env.EMAIL_SECRET, {
        expiresIn: '1d',
      });
      const url = `http://localhost:5000/api/users/verification/${token}`;

      const emailSent = await transporter.sendMail({
        from: 'littlebitprogrammer@gmail.com',
        to: email,
        subject: 'Email verification to complete your registration!',
        text: 'Email Verification',
        html: `<p>Please click this link to verify yourself. <a href="${url}">${url}</a></p>`,
      });
      if (emailSent) {
        const date = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        }).format(new Date());

        res.status(201).json({
          status: 'Registration successful!',
          message: `An email was sent to ${email} at ${date}. Please check your email for verification.`,
        });
      } else {
        res.status(403);
        throw new Error('Registration failed, Email sending failed!');
      }
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
  if (user && (await user.matchPassword(password))) {
    if (user.confirmed) {
      res.status(200);
      res.json({
        email: user.email,
      });
    } else {
      res.status(403);
      throw new Error('Please check you email and verify yourself!');
    }
  } else {
    res.status(404);
    throw new Error('Invalid Email or Password!');
  }
});

export const userEmailVerify = asyncHandler(async (req, res) => {
  const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
  if (id) {
    const updatedUser = await User.findByIdAndUpdate(id, { confirmed: true });
    if (updatedUser) {
      return res.redirect(`http://localhost:3000/login`);
    } else {
      res.status(404);
      throw new Error('User not found!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
