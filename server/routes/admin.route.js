const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Admin-specific routes
router.post('/add-user', adminController.addUser);
router.delete('/delete-user/:userId', adminController.deleteUser);
router.post('/add-book', adminController.addBook);
router.post('/loan-book', adminController.loanBook);
router.post('/checkin-book', adminController.checkinBook);
router.post('/add-admin', adminController.addAdmin);
// View system usage logs
router.get('/logs', adminController.getUsageLogs);
router.get('/detail',adminController.adminData)
router.get('/recent-logins', adminController.loginLogs)
router.get('/list', adminController.adminList);
// Generate borrowing reports
router.get('/reports', adminController.getBorrowingReports);
router.post('/notify-student', adminController.notify_student);
// Set book availability
router.post('/books/availability', adminController.setBookAvailability);

module.exports = router;
