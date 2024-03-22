/**
 * Models/userModel.js
 *
 * Create MongoDB Schema for the Users.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankingSchema = new Schema({
  bankingAccount: {
    type: String,
    required: [true, 'Banking account is required'],
  },
  routingNumber: {
    type: String,
    required: [true, 'Routing number is required'],
  },
  einNumber: {
    type: String,
    required: [true, 'EIN number is required'],
  },
});

// Define a schema for the business details
const businessSchema = new Schema({
  businessName: {
    type: String,
    required: [true, "Business name is required"],
  },
  contactName: {
    type: String,
    required: [true, "Contact name is required"],
  },
  employerId: {
    type: String,
    required: [true, "Employer ID is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  websiteUrl: {
    type: String,
  },
  businessStreetAddress: {
    type: String,
    required: [true, "Business street address is required"],
  },
  aptSteBldg: {
    type: String,
  },
  zipCode: {
    type: String,
    required: [true, "Zip code is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  mobile: {
    type: String,
    required: [true, "Mobile is required"],
  },
});

// Define the user schema including both user details and merchant details
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  reset_token: {
    type: Number,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  is_login: {
    type: Boolean,
    default: false,
  },
  is_onBoard: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Bind the business details to the user schema
  merchantBusiness: {
    type: businessSchema,
  },

  marchantBanking: {
    type: bankingSchema,
  },
});

// Create a model for the user schema
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
