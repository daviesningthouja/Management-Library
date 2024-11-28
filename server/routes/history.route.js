const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');

// History-specific routes
router.get('/loan-history', historyController.getLoanHistory);
router.get('/book-history/:bookId', historyController.getBookHistory);
router.get('/user-history/:userId', historyController.getUserHistory);
router.get('/book-history/overdue/:bookId',historyController.getOverdueLoanBook );
module.exports = router;
