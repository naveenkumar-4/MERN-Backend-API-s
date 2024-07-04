import OTP from '../models/otpModel.js';
import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

export const sendOTP = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const token = crypto.randomBytes(6).toString('hex').toUpperCase();
    const otp = new OTP({ owner: user._id, token });
    await otp.save();

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ error: 'Error sending OTP' });
      }
      res.send({ message: 'OTP sent' });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const otp = await OTP.findOne({ token: req.body.token });
    if (!otp) {
      return res.status(404).send({ error: 'Invalid OTP' });
    }
    res.send({ message: 'OTP verified', userId: otp.owner });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const otp = await OTP.findOne({ token: req.body.token });
    if (!otp) {
      return res.status(404).send({ error: 'Invalid OTP' });
    }

    const user = await User.findById(otp.owner);
    user.password = req.body.password;
    await user.save();
    await otp.remove();

    res.send({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};
