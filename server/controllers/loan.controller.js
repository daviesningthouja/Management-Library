const Loan = require('../models/loan.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');
// const io = require('../server'); // Import io from server.js
// const UsageLogs = require('../models/usageLogs.model');
// // You can now use `io` in your loan controller for emitting events
// io.on('connection', (socket) => {
//   console.log('A user connected in loan controller');
// });

// Borrow a book
const borrowBook = async (req, res) => {
    const { userId, bookId, dueDate } = req.body;

    try {
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ message: 'User or Book not found' });
        }

        if (book.availability === false) {
            return res.status(400).json({ message: 'Book is not available' });
        }

        const loan = new Loan({
            user: userId,
            book: bookId,
            dueDate: new Date(dueDate)
        });

        await loan.save();
        book.availability = false; // Mark book as unavailable
        await book.save();

        // Log usage event
        await logUsageEvent(req.user._id, 'borrow', `Borrowed book: ${book.title}`);

        res.status(200).json({ message: 'Book borrowed successfully', loan });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Return a book
const returnBook = async (req, res) => {
    const { loanId } = req.body;

    try {
        const loan = await Loan.findById(loanId).populate('book');

        if (!loan) {
            return res.status(404).json({ message: 'Loan record not found' });
        }

        loan.returned = true;
        loan.returnDate = Date.now();
        loan.book.availability = true; // Mark the book as available

        await loan.book.save();
        await loan.save();

        

        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//loan-detail
const loanDetail = async(req, res) => {
    const { loanId } = req.params;

  try {
    // Fetch loan details by ID from the database
    const loan = await Loan.findById(loanId).populate("user").populate("book");

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    
    // Determine the loan status based on returned and overdue fields
    const status = loan.returned ? "Returned" : loan.overdue ? "Due" : "Due";

    // Return relevant data structure with the status virtual field
    res.json({
      booktitle: loan.book.title,
      isbn: loan.book.isbn,
      author: loan.book.author,
      tag: loan.book.tag,
      //bookImage: loan.book.image, // Adjust if 'image' is under a different name
      username: loan.user.name,
      enrollmentId: loan.user.enrollmentId,
      department: loan.user.department,
      contact: loan.user.contact,
      //userImage: loan.user.image, // Adjust if 'image' is under a different name
      dateOfLoan: loan.borrowDate,
      dueDate: loan.dueDate,
      status: status
    });
  } catch (error) {
    console.error("Error fetching loan details:", error);
    res.status(500).json({ message: "Server error" });
  }
}


// Get overdue books
const getOverdueBooks = async (req, res) => {
    try {
        // Query overdue loans: books not returned and past due date
        const overdueLoans = await Loan.find({
            dueDate: { $lt: new Date() }, // Books past the due date
            returned: false // Books not yet returned
        }).populate('user book'); // Populate user and book details

        if (!overdueLoans.length) {
            return res.status(404).json({ message: 'No overdue loans found' }); // Handle case where no overdue loans exist
        }

        res.status(200).json(overdueLoans); // Return the overdue loans
    } catch (error) {
        // Catch any error and respond with 500 status code
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Set up the transporter (mail service) - using Gmail as an example
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.PASSWORD // Your email password (use App-specific passwords if using Gmail)
    }
});

// Send a reminder email to the user
const sendReminderEmail = (userEmail, bookTitle, dueDate) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: `Reminder: Book "${bookTitle}" due soon`,
        text: `Dear User, \n\nThis is a reminder that your borrowed book "${bookTitle}" is due on ${dueDate}. Please return it by the due date to avoid any penalties. \n\nThank you!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Reminder email sent: ', info.response);
        }
    });
};

// const markLoanAsOverdue = async (loanId) => {
//     try {
//         // Set the due date to a past date and mark it as overdue
//         const updatedLoan = await Loan.findByIdAndUpdate(
//             loanId,
//             {
//                 dueDate: new Date('2024-10-10'), // Set a past due date
//                 overdue: true,
//                 returned: false // Make sure it’s not marked as returned
//             },
//             { new: true } // Option to return the updated document
//         );

//         if (updatedLoan) {
//             console.log("Loan marked as overdue:", updatedLoan);
//         } else {
//             console.log("Loan not found with ID:", loanId);
//         }
//     } catch (error) {
//         console.error("Error marking loan as overdue:", error);
//     }
// };

// Example usage:
//markLoanAsOverdue("67267697b2674ce28c1e730f");

module.exports = { borrowBook, returnBook, getOverdueBooks ,loanDetail};
