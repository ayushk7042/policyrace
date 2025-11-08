require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const categoryRoutes = require('./routes/categoryRoutes');
const policyRoutes = require('./routes/policyRoutes');
const partnerRoutes = require("./routes/partnerRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const heroRoutes = require("./routes/heroRoutes");
const calculatorRoutes = require('./routes/calculatorRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/policies', policyRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/hero", heroRoutes);
app.use('/api/calculators', calculatorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
