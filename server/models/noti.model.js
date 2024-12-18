// models/notification.model.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  enrollmentId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: { type: Boolean, default: false }, // Mark if notification is read
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
