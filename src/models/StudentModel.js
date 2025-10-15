const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
  {
    visutiId: {
      type: String,
      trim: true,
      // index: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: false,
    },
    email: {
      type: String,
      required: false,
      // unique: true,
      // trim: true,
      index: true,
    },
    mobileNumber: {
      type: Number,
      // unique: true,
      // required: true,
      index: true,
    },
    password: {
      type: String,
    },
    rank: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student"],
      required: true,
      default: "student",
      // index: true,
    },
    otp: {
      type: Number,
    },
    otpExpiryDate: {
      type: Date,
    },
    isActive: {
      type: String,
      default: true,
      required: true,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
      index: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

studentSchema.index({ email: 1, mobileNumber: 1 }, { unique: false });
// studentSchema.index({ visutiId: 1 });
studentSchema.index({ isActive: 1, isDeleted: 1 });
// studentSchema.index({ role: 1 });

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
