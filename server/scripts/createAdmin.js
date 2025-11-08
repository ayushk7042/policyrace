require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

const run = async () => {
  await connectDB();
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const name = process.env.ADMIN_NAME || 'Super Admin';
  const password = process.env.ADMIN_PASS || 'admin123';

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Admin already exists:', email);
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const admin = await Admin.create({ name, email, password: hashed });
  console.log('Admin created:', admin.email);
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
