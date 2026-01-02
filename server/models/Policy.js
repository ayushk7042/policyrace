const mongoose = require('mongoose');

const flowStepSchema = new mongoose.Schema({
  fromAge: Number,
  toAge: Number,
  description: String
}, { _id: false });

const addOnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: String,
  description: String,
  isFree: { type: Boolean, default: false }
}, { _id: false });

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  // store correct index for admin side; do NOT send this to public endpoints that return quizzes if you want to hide answers
  correctOptionIndex: { type: Number } 
}, { _id: true });

const priceOptionSchema = new mongoose.Schema({
  billingCycle: { type: String, enum: ['monthly', 'yearly'], required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  validTill: Date // optional — till when this price is valid
}, { _id: false });

const policySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  imageUrl: String, // poster image or flaticon link
  shortDescription: String,
  lifeCover: String, // e.g., "₹10 Lakh"
  coverTillAge: String, // e.g., "65 years"
  claimSettlement: String, // e.g., "Cashless + Reimbursement"
  refundOfPremium: { type: Boolean, default: false },
  freeAddOns: [addOnSchema], // quick free add-ons
  // Plan details - page 1
  planDetail: {
    title: String,
    whatsCovered: [String],
    notCovered: [String],
    working: String,
    flowchartSteps: [flowStepSchema],
    flowchartImageUrl: String
  },
  // Page 2: add-ons / benefits (can contain multiple)
  addOnBenefits: [addOnSchema],
  // Page 3: advantages & quizzes
  advantages: [String],
  quizzes: [quizSchema], // admin provides correctOptionIndex; hide when serving to public if needed
  // pricing options (monthly/yearly)
  priceOptions: [priceOptionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },

  //
policyType: { 
    type: String, 
    enum: ['Life', 'Health', 'Car', 'Travel', 'Home', 'Business', 'Other', 'Normal'], 
    default: 'Life' 
  },
  carDetails: {
    vehicleType: String,
    registrationYear: Number,
    engineCapacity: String,
    ownDamageCover: Boolean,
    thirdPartyLiability: Boolean,
    addOns: [addOnSchema]
  },
  healthDetails: {
    sumInsured: String,
    preExistingDiseasesCovered: Boolean,
    familyFloater: Boolean,
    roomRentLimit: String,
    maternityCover: Boolean
  },
  travelDetails: {
    tripType: { type: String, enum: ['Domestic', 'International'] },
    durationDays: Number,
    medicalCover: String,
    lossCover: String
  },
  homeDetails: {
    propertyType: { type: String, enum: ['Apartment', 'Villa', 'Independent House'] },
    sumInsured: String,
    naturalDisasterCover: Boolean,
    burglaryCover: Boolean
  },

  // inside policySchema

ctaLinks: {
  apply: { type: String, default: "" },
  afterQuiz: { type: String, default: "" },
  stickyBar: { type: String, default: "" }
},


}, { timestamps: true });

module.exports = mongoose.model('Policy', policySchema);
