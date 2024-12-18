const express = require('express');
const router = express.Router();

const {userDB, createUser, updateBorrowedBooks, bookCollection, userData, getBorrowedBookDetail, getUser, getUserBooks, save_fcmToken, noti, notiMarkRead, deleteNoti, showNoti, deleteSelectedNoti} = require('../controllers/user.controller');


router.get('/data', userDB);
router.post('/user/create', createUser);
router.put('/user/:id/borrowedBooks', updateBorrowedBooks);
router.get('/user/collection', bookCollection) //user collection
router.get('/user/profile', userData);
router.get('/user/collection/book/:id',getBorrowedBookDetail);
router.get('/user/:id',getUser)
router.get('/:id/books',getUserBooks)
router.post('/user/student/fcm-token', save_fcmToken)
router.get('/student/notifications', noti)
router.patch('/student/mark-read/:notificationId',notiMarkRead);
router.delete('/student/delete/notification/:id',deleteSelectedNoti);
router.get('/student/all/noti',showNoti)
//delete admin only
router.delete('/student/notification/delete',deleteNoti)
//app.post('/api/user/student/fcm-token', authMiddleware, async (req, res) => {
    //   const { enrollmentId, fcmToken } = req.body;
    
    //   if (!enrollmentId || !fcmToken) {
    //     return res.status(400).json({ message: "Enrollment ID and FCM token are required" });
    //   }
    
    //   try {
    //     const student = await Student.findOne({ enrollmentId });
    //     if (!student) {
    //       return res.status(404).json({ message: "Student not found" });
    //     }
    
    //     // Update the student's FCM token
    //     student.fcmToken = fcmToken;
    //     await student.save();
    
    //     res.status(200).json({ message: "FCM token updated successfully" });
    //   } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ message: "Internal server error" });
    //   }
    // });
    
module.exports = router;