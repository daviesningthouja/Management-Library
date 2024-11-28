const express = require('express');
const router = express.Router();

const { borrowBook, returnBook, getOverdueBooks, loanDetail } = require('../controllers/loan.controller');

// Borrow a book
router.post('/borrow', borrowBook);

// Return a book
router.post('/return', returnBook);

router.get('/detail/:loanId', loanDetail);
// Get overdue books
router.get('/overdue', getOverdueBooks);

module.exports = router;

// const loanController = require('../controllers/loan.controller');

// // Loan-specific routes
// router.post('/loan', loanController.createLoan);
// router.post('/return', loanController.returnBook);
// router.get('/user-loans/:userId', loanController.getUserLoans);