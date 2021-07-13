const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: "string",
      trim: true,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: "string",
      trim: true,
      required: true,
      min: 3,
      max: 20,
    },

    email: {
      type: "string",
      unique: true,
      trim: true,

      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    phone: {
      type: "string",
    },
    isverified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = new mongoose.model("User", userSchema);
module.exports = User;
