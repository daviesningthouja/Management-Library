const Loan = require('../models/loan.model.js');
const mongoose = require('mongoose'); // Add this line

const express = require('express');  // Import express
const router = express.Router();     // Create a router instance

// Get loan history
exports.getLoanHistory = async (req, res) => {
    try {
        const loans = await Loan.find().populate('user book');
        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get history for a specific book
// Get history for a specific book
exports.getBookHistory = async (req, res) => {
    const { bookId } = req.params;

    // Validate bookId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid book ID format.' });
    }

    try {
        const loans = await Loan.find({ book: bookId }).populate('user');

        // Check if loans exist
        if (loans.length === 0) {
            return res.status(404).json({ message: 'No loans found for this book.' });
        }

        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get history for a specific user
exports.getUserHistory = async (req, res) => {
    try {
        const loans = await Loan.find({ user: req.params.userId }).populate('book');
        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOverdueLoanBook = async(req,res) => {
    const { bookId } = req.params;
    const currentDate = new Date();

    try {
        // Find overdue loans where dueDate is in the past and the book has not been returned
        const overdueLoans = await Loan.find({
            book: bookId,
            dueDate: { $lt: currentDate },
            returned: false // Only include loans that haven't been returned
        }).populate('user', 'enrollmentId') // Adjust field as per User schema
        .select('borrowDate dueDate user book'); 
        res.status(200).json(overdueLoans);
    } catch (error) {
        console.error("Error fetching overdue loans:", error); // Log error for debugging
        res.status(500).json({ error: "Error fetching overdue loans." });
    }
}
