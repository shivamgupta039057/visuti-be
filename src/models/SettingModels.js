const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
  phoneNo: {
    type: String,
    trim: true,
    required: true,
  },
  whatsappNo: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  universitiesTieUps: {
    type: Number,
    required: true,
  },
  studentsImpacted: {
    type: Number,
    required: true,
  },
  expertCounselors: {
    type: Number,
    required: true,
  }
});

const Setting = mongoose.model("Setting", SettingSchema);
module.exports = Setting;
