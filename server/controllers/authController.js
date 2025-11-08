const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utils/mailer');

const OTP_EXPIRES_MIN = Number(process.env.OTP_EXPIRES_MIN) || 10;

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });
    const token = generateToken(user);

    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Email & password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// send OTP to email for forgot password
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if(!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No user with that email' });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRES_MIN * 60 * 1000);

    user.otp = { code: otpCode, expiresAt };
    await user.save();

    // send email
    const subject = 'Your OTP for PolicyClone - Reset Password';
    const text = `Your OTP is ${otpCode}. It expires in ${OTP_EXPIRES_MIN} minutes.`;
    const html = `<p>Your OTP is <strong>${otpCode}</strong>. It expires in ${OTP_EXPIRES_MIN} minutes.</p>`;

    await sendMail({ to: user.email, subject, text, html });

    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyOtpAndReset = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if(!email || !otp || !newPassword) return res.status(400).json({ message: 'Email, OTP and new password required' });

    const user = await User.findOne({ email });
    if (!user || !user.otp || !user.otp.code) return res.status(400).json({ message: 'OTP not requested' });

    if (user.otp.code !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    if (new Date() > new Date(user.otp.expiresAt)) return res.status(400).json({ message: 'OTP expired' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.otp = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// protected route example to get current user
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -otp');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
