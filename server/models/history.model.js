const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Reference to the Book model
    required: true,
  },
  action: {
    type: String,
    enum: ['loaned', 'returned'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.model('History', historySchema);
module.exports = History;
