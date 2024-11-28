require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connection = require('./db');
const jwt = require('jsonwebtoken');
//const Student = require('../models/user.model');

const cors = require('cors');
const app = express();

// Middleware for protecting routes
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

//Connection to database
connection();

//middleware
app.use(cors());
app.use(express.json());




//routes
const userRoutes = require('./routes/user.route');
const bookRoutes = require('./routes/book.route');
const loginRoutes = require('./routes/login.route');
const adminRoutes = require('./routes/admin.route');   // Admin route
const loanRoutes = require('./routes/loan.route');     // Loan route
const historyRoutes = require('./routes/history.route'); 
//router
app.use('/api/dashboard', authMiddleware,userRoutes);  // Apply authentication middleware to user routes
app.use('/api/books',bookRoutes);  // Apply middleware to book routes
app.use('/api/user', loginRoutes);                // No authentication required for login
app.use('/api/admin',authMiddleware, adminRoutes); // Apply middleware to admin routes
app.use('/api/loans',  loanRoutes);  // Loan routes with authentication
app.use('/api/history', historyRoutes); // History routes with authentication

// app.post('/api/user/student/fcm-token', authMiddleware, async (req, res) => {
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


const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Sever is running on ${PORT}`);
  });


