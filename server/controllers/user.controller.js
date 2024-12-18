const User = require('../models/user.model');
const Book = require('../models/book.model');
const Notification = require('../models/noti.model')
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const save_fcmToken = async (req,res) => {
    const { enrollmentId, fcmToken } = req.body;
    
       if (!enrollmentId || !fcmToken) {
         return res.status(400).json({ message: "Enrollment ID and FCM token are required" });
       }
    
       try {
         const student = await User.findOne({ enrollmentId });
         if (!student) {
           return res.status(404).json({ message: "Student not found" });
         }
    
         // Update the student's FCM token
         student.fcmToken = fcmToken;
         await student.save();
    
         res.status(200).json({ message: "FCM token updated successfully" });
       } catch (err) {
         console.error(err);
         res.status(500).json({ message: "Internal server error" });
       }
}  


const userDB = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId)
     
        console.log(user,userId);
        if(!user){
            return res.status(404).json({
                message: 'User not found'
            })
        }
        res.status(200).json(user);
    
    }catch(error){
        res.status(500).json({message: 'Server error'})
    }
}
const getUserBooks = async (req, res) =>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId)
        const book = await user.borrowedBooks;
        if(!book && !user){
            return res.status(404).json({message: 'Book & User not found'})
        }
        res.status(200).json(book);

    }catch(error){
        res.status(500).json({message: 'Server Error'})
    }
}
const userData =  async (req, res) => {
    try {
      // Find user by ID from token
      const user = await User.findById(req.user.userId).select('-password'); // Exclude password
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

const noti = async (req,res) => {
    try{
    const userId = req.user.userId;

    // Fetch user details to get enrollmentId
    const user = await User.findById(userId).select("enrollmentId");

    if (!user || !user.enrollmentId) {
      return res.status(404).json({ error: "User or enrollment ID not found" });
    }

    const enrollmentId = user.enrollmentId;

    // Fetch notifications using enrollmentId
    const notifications = await Notification.find({ enrollmentId }).sort({ createdAt: -1 });

        
        res.status(200).json(notifications);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
      }
};
const showNoti = async(req,res) => {
    try{
        const notification = await Notification.find();
        res.status(200).json(notification);
    }catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
      }
}
const deleteSelectedNoti = async(req,res) => {
    try {
        const notificationId = req.params.id;
        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ message: 'Notification deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete notification' });
      }
}

const notiMarkRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
    
        // Update the isRead field to true
        const updatedNotification = await Notification.findByIdAndUpdate(
          notificationId,
          { isRead: true },
          { new: true }
        );
    
        if (!updatedNotification) {
          return res.status(404).json({ message: 'Notification not found' });
        }
    
        res.status(200).json({ message: 'Notification marked as read', notification: updatedNotification });
      } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };

const deleteNoti = async (req,res) => {
    try {
        const { enrollmentId } = req.body; // Extract enrollmentId from request parameters

        if (!enrollmentId) {
            return res.status(400).json({ message: 'Enrollment ID is required' });
        }

        // Delete all notifications for the given enrollmentId
        const result = await Notification.deleteMany({ enrollmentId });

        res.status(200).json({
            message: `All notifications for enrollmentId ${enrollmentId} have been deleted.`,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error('Error deleting notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const bookCollection = async (req, res)  => {
    // const userID = req.params.id;
    try{
        const user = await User.findById(req.user.userId).select('-password');

        const userBookCollection = user.borrowedBooks;
        if(!userBookCollection){
            return res.status(404).json({ message: 'User not found' }); 
        }
        res.status(200).json(userBookCollection);

    }catch (error){
        res.status(500).json({message: error.message});
    }

}
// Controller function to fetch borrowed book details
const getBorrowedBookDetail = async (req, res) => {
    try {
       const userId = req.user.userId; // Extracted from token


      const { id: bookId } = req.params; // Extract the book ID from URL parameters

      // The hardcoded enrollment ID for testing
      //const enrollmentId = 2110059200583;
  
      //console.log(`Fetching book details for enrollmentId: ${enrollmentId}, bookId: ${bookId}`);
  
      // Find user by enrollment ID and populate borrowed books with book details
      //const user = await User.findOne({ enrollmentId }).populate('borrowedBooks.bookId');
  
  
      console.log(`Fetching book details for user: ${userId}, bookId: ${bookId}`);
  
      // Find user and populate book details
      const user = await User.findById(userId).populate('borrowedBooks.bookId');
  
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the specific borrowed book by its ID
      const borrowedBook = user.borrowedBooks.find(
        (book) => book.bookId && book.bookId._id.toString() === bookId
      );
  
      if (!borrowedBook) {
        console.log(`Book not found in user's collection. Book ID: ${bookId}`);
        return res.status(404).json({ message: 'Book not found in your borrowed collection' });
      }
  
      res.status(200).json(borrowedBook);
    } catch (error) {
      console.error('Error fetching book details:', error);
      res.status(500).json({ message: error.message });
    }
  };
  




const updateBorrowedBooks = async (req, res) => {
    const userId = req.params.id; // Assumes userId is actually enrollmentId in this case
    const criteria = req.body.criteria;

    // Validate that criteria is an array
    if (!Array.isArray(criteria)) {
        return res.status(400).json({ message: 'Criteria should be an array of objects' });
    }

    try {
        // Find the user by enrollmentId
        const user = await User.findOne({ enrollmentId: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Define borrowing limits based on user category
        const borrowingLimits = {
            SC: 5,
            ST: 5,
            OBC: 5,
            General: 3
        };
        const limit = borrowingLimits[user.category];

        // Check if the user has reached their borrowing limit
        if (user.borrowedBooks.length >= limit) {
            return res.status(400).json({ message: 'Borrowing limit reached' });
        }

        const validBookIds = [];
        for (const criterion of criteria) {
            const books = await Book.find({ isbn: criterion.isbn });

            if (!books.length) {
                return res.status(404).json({ message: `No books found with ISBN: ${criterion.isbn}` });
            }

            for (const book of books) {
                // Add user details to the book's borrowedBy array
                book.borrowedBy.push({
                    name: user.name,
                    enrollmentId: user.enrollmentId,
                    email: user.email
                });
                await book.save();
                validBookIds.push({
                    bookId: book._id,
                    title: book.title,
                    author: book.author,
                    isbn: book.isbn,
                    borrowedDate: new Date()
                });
            }
        }

        // Update the user's borrowedBooks field
        user.borrowedBooks = [...user.borrowedBooks, ...validBookIds];
        await user.save();

        // Populate the user's borrowedBooks with full book details
        const populatedUser = await User.findOne({ enrollmentId: userId }).populate('borrowedBooks').exec();

        res.status(200).json({ message: 'Borrowed books updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    userDB,
    updateBorrowedBooks,
    bookCollection,
    userData,
    getBorrowedBookDetail,
    getUser,
    getUserBooks,
    save_fcmToken,
    noti,
    notiMarkRead,
    deleteNoti,
    showNoti,
    deleteSelectedNoti,
}