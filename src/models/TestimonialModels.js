const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: "Student", 
  },
  imageUrl: {
    type: String,
    required: false, 
  },
  testimonialText: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
