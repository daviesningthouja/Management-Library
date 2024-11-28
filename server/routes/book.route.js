const express = require('express');
const router = express.Router();

const {   showAllBooks, getBookById,updateBookById,deleteBookById, searchBook ,borrowedBook, searchBookadmin,showTag, getBookByIsbn}= require ('../controllers/book.controller');

// router.post("/book/add", addNewBook);
router.get("/books", showAllBooks);
router.get("/books/search", searchBook);
router.get('/departments',showTag)
router.get("/detail", getBookById);
router.put("/book/:id", updateBookById);
router.delete("/book/:id", deleteBookById);
router.get("/books/:id/rent", borrowedBook);
router.post("/detail/isbn", getBookByIsbn);
router.get('/admin/books/search',searchBookadmin);




module.exports = router;