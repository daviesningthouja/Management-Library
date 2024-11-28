const Books = require('../models/book.model');


const addNewBook = async (req, res) => {
    try {
        // req.body should be an array of book objects
        const newBooks = req.body;

        // Array to store saved books
        const savedBooks = [];

        for (const newBookData of newBooks) {
            const newBook = new Books(newBookData);
            const savedBook = await newBook.save();
            savedBooks.push(savedBook);
        }
        
        res.status(201).json(savedBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const showAllBooks = async (req, res) => {
    
    try {
        const { page = 1, letter = '', tag = '' , searchQuery = '' } = req.query; // Extract query params
        const limit = 10; // Number of books per page
        const skip = (page - 1) * limit; // Calculate how many documents to skip
        
        // Build the query object for filtering
        let query = {};
        
        // If letter filter exists, filter books whose title starts with the letter
        if (letter) {
            query.title = { $regex: `^${letter}`, $options: 'i' }; //use i for case sensitive
        }
        
        // If tag filter exists, filter books by tag (case-insensitive)
        if (tag) {
            query.tag = { $regex: tag, $options: 'i' }; // Use regex for case-insensitive tag match
        }
        // If search term is provided, filter books whose title contains the search term
        if (searchQuery) {
            query.title = { $regex: searchQuery, $options: 'i' }; // Case-insensitive search
        }
        
        // Get total number of books matching the query
        const totalBooks = await Books.countDocuments(query);
        
        // Fetch paginated books
        const books = await Books.find(query)
        .skip(skip)
        .limit(limit);
        
        const totalPages = Math.ceil(totalBooks / limit); // Calculate total pages
        
        return res.status(200).json({
            books,
            totalPages,
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        return res.status(500).json({ message: 'Error fetching books' });
    }
};

const searchBook = async (req, res) => {
    const { suggestion = '' } = req.query; // Get the search input for suggestions
  try {
    const suggestions = await Books.find({
      title: { $regex: suggestion, $options: 'i' } // Search for partial matches
    })
    .limit(5) // Limit the number of suggestions returned
    .select('title'); // Only return the title field

    return res.status(200).json({
      suggestions: suggestions.map(book => book.title),
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return res.status(500).json({ message: 'Error fetching suggestions' });
  }
  };

const showTag = async (req,res) => {
    try {
        // Aggregate books by tag and count the number of books in each tag
        const departments = await Books.aggregate([
          {
            $group: {
              _id: "$tag", // Group by the `tag` field
              books: { $sum: 1 }, // Count the number of books for each tag
            },
          },
          {
            $project: {
              _id: 0, // Do not return the MongoDB ObjectId
              title: "$_id", // Rename `_id` to `title` for easier frontend handling
              books: 1, // Keep the books count
            },
          },
        ]);
        
        res.status(200).json(departments);
      } catch (error) {
        console.error("Error fetching departments with book counts:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

const getBookById = async (req, res) => {
    try {
        const bookId = req.query.BookId;
        const book = await Books.findById(bookId);    
        // console.log(bookId)     
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookByIsbn = async (req, res) => {
    try {
        const { isbn } = req.body; // Extract ISBN from request body
        if (!isbn) {
            return res.status(400).json({ message: 'ISBN is required' });
        }

        const book = await Books.findOne({ isbn: isbn }); // Use findOne to search by ISBN
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.status(200).json(book);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBookById = async (req, res) => {
    try {
        const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBookById = async (req, res) => {
    try {
        const deletedBook = await Books.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchBookadmin = async (req, res) => {
    try {
        const { author, title } = req.query;
        let query = {};

        if (author) {
            query.author = new RegExp(author, 'i'); // Case-insensitive regex search
        }

        if (title) {
            query.title = new RegExp(title, 'i'); // Case-insensitive regex search
        }

        const books = await Books.find(query).sort({ author: 1, title: 1 }); // Sort by author and title alphabetically
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  

const borrowedBook = async (req, res) => {
    const bookId = req.params.id;
    
    try {
        
        console.log(bookId)
        const book = await Books.findById(bookId).populate('borrowedBy.user', 'name email enrollmentId');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addNewBook,
    showAllBooks,
    updateBookById,
    getBookById,
    deleteBookById,
    searchBook,
    borrowedBook,
    searchBookadmin,
    showTag,
    getBookByIsbn
}