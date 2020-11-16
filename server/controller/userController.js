import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import emailValidator from 'email-validator';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

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
          user: process.env.EMAIL,    // your email
          pass: process.env.PASS,     // email pass, put them in .env file & turn the 'Less secure apps' option 'on' in gmail settings
        },
      });

      const token = jwt.sign({ id: user._id }, process.env.EMAIL_SECRET, {
        expiresIn: '1d',
      });
      // const url = `http://localhost:5000/api/users/verification/${token}`;       //localhost
      const url = `${process.env.PROD_SERVER}/api/users/verification/${token}`;

      const emailSent = await transporter.sendMail({
        from: process.env.EMAIL,
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
        token: generateToken(user._id),
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
      // return res.redirect(`http://localhost:3000/login`);        // localhost
      return res.redirect(`${process.env.PROD_CLIENT}/login`);         
    } else {
      res.status(404);
      throw new Error('User not found!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

export const getResetPasswordLink = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
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

    const token = await jwt.sign({ id: user._id }, process.env.EMAIL_SECRET, {
      expiresIn: '30min',
    });

    // const url = `http://localhost:3000/createNewPassword/${token}`;    //localhost
    const url = `${process.env.PROD_CLIENT}/createNewPassword/${token}`;

    const emailSent = await transporter.sendMail({
      from: 'littlebitprogrammer@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: 'Reset your password for React ToDo app.',
      html: `<p>Please click this link to reset password. <a href="${url}">${url}</a></p>`,
    });
    if (emailSent) {
      res.status(201).json({
        status: 'Password reset email sent.',
        message: `Password reset link was sent to ${email}.`,
      });
    } else {
      res.status(403);
      throw new Error('Password reset failed, Email sending failed!');
    }
  } else {
    res.status(403);
    throw new Error('There is no account associated with this email!');
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
  if (id) {
    let { newPass, conPass } = req.body;
    if (newPass === conPass) {
      const salt = await bcrypt.genSalt(10);
      newPass = await bcrypt.hash(newPass, salt);
      const updatedUser = await User.findByIdAndUpdate(id, {
        password: newPass,
      });
      updatedUser.save();
      if (updatedUser) {
        res.status(200);
        res.json({ status: 'Password reset successfully!' });
      } else {
        res.status(404);
        throw new Error('Password reset failed!');
      }
    } else {
      res.status(404);
      throw new Error('Password does not match!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
