import React, { useState } from 'react';
import './bookslider.css';
import book1 from "../../../assets/book1.webp"


const BookSlider = () => {
  const [books, setBooks] = useState([
    { id: 1, title: 'Harry Potter', author: 'J.K Rowling', img: book1},
    { id: 2, title: 'Book 2', author: 'Author 2', img: 'book2.jpg' },
    { id: 3, title: 'Book 3', author: 'Author 3', img: 'book3.jpg' },
    { id: 4, title: 'Book 4', author: 'Author 4', img: 'book4.jpg' },
    { id: 5, title: 'Book 5', author: 'Author 5', img: 'book5.jpg' },
    { id: 6, title: 'Book 5', author: 'Author 5', img: 'book5.jpg' },
    { id: 7, title: 'Book 5', author: 'Author 5', img: 'book5.jpg' },
    { id: 8, title: 'Book 5', author: 'Author 5', img: 'book5.jpg' },
    { id: 9, title: 'Book 5', author: 'Author 5', img: 'book5.jpg' },

  ]);

  const [hoveredBook, setHoveredBook] = useState(null); // Track hovered book
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < books.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div className="slider">
    <button className="previous" onClick={handlePrevious}>
        &#10094;
      </button>
      <div className="slider-content">
        {books.map((book, index) => (
          <div
          className={`book ${hoveredBook === book.id ? ' active hovered' : ''}`}
          key={book.id}
            onMouseEnter={() => setHoveredBook(book.id)}  // Set hovered state
            onMouseLeave={() => setHoveredBook(null)}     // Reset hovered state
          >
            <div className="book-image">
              <img src={book.img} alt={book.title} />
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </div>
            {hoveredBook === book.id && (
              <div className="hover-info">
                <p>Some more info about the book...</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default BookSlider;
