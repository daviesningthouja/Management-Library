const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Student or admin who borrowed the book
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    returned: {
        type: Boolean,
        default: false
    },
    returnDate: {
        type: Date
    },
    overdue: {
        type: Boolean,
        default: false
    },
    logs: [{ // logs array to track loan logs
        dateOfLoan: { type: Date, default: Date.now },
        dueDate: { type: Date },
        status: { type: String, enum: ['Pending', 'Completed', 'Due'], default: 'Pending' }
      }]
}, { timestamps: true });

// Virtual field to return loan status
loanSchema.virtual('status').get(function() {
    if (this.returned) return 'Returned';
    if (this.overdue) return 'Due';
    return 'Due';
  });


const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;
