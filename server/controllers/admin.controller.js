const User = require('../models/user.model');
const Book = require('../models/book.model');
const Loan = require('../models/loan.model');
const History = require('../models/history.model');
const Admin = require('../models/admin.model')
const UsageLogs = require('../models/usageLogs.model');
const admin = require("../firebaseAdmin"); // Import Firebase config
const Notification = require("../models/noti.model");

//Admin List
exports.adminList = async (req,res) => {
    try {
        const admins = await Admin.find().select('-password'); // Exclude password field from the response
        if (!admins || admins.length === 0) {
          return res.status(404).json({ message: 'No admins found' });
        }
        res.status(200).json(admins);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}
// Add user
exports.addUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.notify_student = async (req,res) => {
//     const { enrollmentId, title, body } = req.body;

//   try {
//     const student = await FCMToken.findOne({ enrollmentId });
//     if (!student) {
//       return res.status(404).send("Student not found");
//     }

//     await sendNotification(student.fcmToken, { title, body });
//     res.status(200).send("Notification sent successfully");
//   } catch (error) {
//     res.status(500).send("Error sending notification");
//   }
try {
    const { enrollmentId, title, body } = req.body;

    // Check if the student exists
    const student = await User.findOne({ enrollmentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Create the notification
    const newNotification = new Notification({
      title,
      body,
      enrollmentId,
    });

    await newNotification.save();
    //console.log("Admin Object: ", admin);
    //console.log("Admin Messaging:", admin.messaging);
    // Send push notification via Firebase Cloud Messaging
    const fcmToken = student.fcmToken; // Assuming you have stored the FCM token in the student model
    if (fcmToken) {
      const message = {
        notification: {
          title: title,
          body: body,
        },
        token: fcmToken,
      };

      // Send the notification to the student's device
      admin.messaging().send(message)
        .then((response) => {
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
    }

    res.status(201).json({ message: "Notification sent successfully", notification: newNotification });
  } catch (err) {
    console.error("Error sending notification: ", err);
    res.status(500).json({ message: "Server Error" });
  }
};
// app.post("/api/notify-student", async (req, res) => {
//     const { token, title, body } = req.body;
  
//     const message = {
//       notification: {
//         title: title,
//         body: body,
//       },
//       token: token, // Target FCM token of the student
//     };
  
//     try {
//       const response = await messaging.send(message);
//       console.log("Notification sent successfully:", response);
//       res.status(200).send({ success: true, response });
//     } catch (error) {
//       console.error("Error sending notification:", error);
//       res.status(500).send({ success: false, error });
//     }
//   });
  

exports.adminData = async (req, res) => {
    try {
        const adminId = req.user.id; 
        console.log("admn:",adminId)
        console.log("Decoded token data:", req.user); 
      // Find admin by ID from token
      const admin = await Admin.findById(adminId).select('-password'); // Exclude password
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.status(200).json(admin);
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.addAdmin = async (req,res) => {
    try {
        const { name, email, password, contact } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !contact) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Create a new admin
        const newAdmin = new Admin({
            name,
            email,
            password,
            contact
        });

        // Save the admin to the database
        await newAdmin.save();
        return res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: 'User deleted', user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Add book
exports.addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Loan book to user by enrollmentId and isbn
exports.loanBook = async (req, res) => {
    try {
        const { enrollmentId, isbn ,dueDate} = req.body;

        // Find user and book by enrollmentId and isbn
        const user = await User.findOne({ enrollmentId });
        const book = await Book.findOne({ isbn });

        if (!user || !book) {
            return res.status(404).json({ message: 'User or Book not found' });
        }

        if (book.status !== 'available') {
            return res.status(400).json({ message: 'Book is not available for loan' });
        }

        // Create a loan record
        const loan = new Loan({
            user: user._id,
            book: book._id,
            loanDate: Date.now(),
            dueDate: new Date(dueDate),
        });
        await loan.save();

        // Update book status and borrowed details
        book.status = 'borrowed';
        book.borrowedBy.push({
            user: user._id,
            enrollmentId: user.enrollmentId,
            name: user.name,
            email: user.email,
            department: user.department,
            borrowedDate: Date.now()
        });
        await book.save();

        // Add book to user's borrowed books
        user.borrowedBooks.push({
            bookId: book._id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            borrowedDate: Date.now()
        });
        await user.save();

        res.status(200).json({ message: 'Book loaned successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Check in a book from a user
exports.checkinBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ message: 'User or Book not found' });
        }

        // Find the loan record and mark it returned
        const loan = await Loan.findOne({ user: userId, book: bookId, returnDate: null });
        if (!loan) {
            return res.status(400).json({ message: 'No active loan found for this book' });
        }
        loan.returnDate = Date.now();
        await loan.save();

        // Update book status
        book.status = 'available';
        await book.save();

        // Remove book from user's borrowed list
        user.borrowedBooks = user.borrowedBooks.filter(b => b.bookId.toString() !== bookId);
        await user.save();

        res.status(200).json({ message: 'Book returned successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// View loan history
exports.loanHistory = async (req, res) => {
    try {
        const history = await History.find().populate('user, book');
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// View system usage logs
exports.getUsageLogs = async (req, res) => {
    try {
        const logs = await UsageLogs.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Generate borrowing reports
exports.getBorrowingReports = async (req, res) => {
    try {
        const reports = await Loan.find().populate('user book');
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Set book availability
exports.setBookAvailability = async (req, res) => {
    const { bookId, availability } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.availability = availability;
        await book.save();

        res.status(200).json({ message: 'Book availability updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.loginLogs =  async (req, res) => {
    try {
      const logs = await UsageLogs.find({ action: 'Student logged in' }).sort({ timestamp: -1 }).limit(10);
      res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
