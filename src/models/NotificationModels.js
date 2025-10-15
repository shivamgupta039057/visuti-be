const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  notificationType: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  issuedDateTime: {
    type: Date,
    required: true,
    index: true,
  },
  effectiveDateTime: {
    type: Date,
    required: true,
    index: true,
  },
  deadlineTime: {
    type: Date,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  video: {
    type: String,
    trim: true,
    index: true,
  },
  shortDescription: {
    type: String,
    trim: true,
    index: true,
  }
});

// Compound index for common queries (optional, can be adjusted as needed)
NotificationSchema.index({ title: 1, notificationType: 1, issuedDateTime: -1 });

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
