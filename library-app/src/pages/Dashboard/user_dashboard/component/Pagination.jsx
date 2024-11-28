import react , {useState, useEffect} from 'react';
import "./Pagination.css"
import { Link ,useLocation} from 'react-router-dom'; 
import axios from "axios";
const Pagination = ( {  //totalPages // You can remove this, we will calculate it based on API response
  currentPage,
  onPageChange,
  currentLetter,
  onLetterChange,
  handleTagSwitch,
  activeTag, }) => {
    const [books, setBooks] = useState([]); // State to hold books
    const [loading, setLoading] = useState(true); // Loading state
    const [totalPageCount, setTotalPageCount] = useState(1); 
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [activePage, setActivePage] = useState(currentPage);
    const [activeLetter, setActiveLetter] = useState(currentLetter);
    const [activeTagState, setActiveTagState] = useState(activeTag);


     // Fetch books from the backend API based on page, letter, and tag filters
  const fetchBooks = async (pageNumber = 1, letter = '', tag = '') => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `http://localhost:8080/api/books/books?page=${pageNumber}&letter=${letter}&tag=${tag}`

      );
      const data = await response.json();
      console.log(data);
      setBooks(data.books);
      console.log(books);
      setTotalPageCount(data.totalPages);
       // Set total pages for pagination
       
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };








    // Fetch books from the backend based on the current page, letter, and tag
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get('http://localhost:8080/api/books/books', {
  //         params: {
  //           page: activePage,
  //           letter: activeLetter,
  //           tag: activeTag,
  //         },
  //       });
  //       setBooks(response.data.books); // Assuming backend sends an array of books
  //       totalPages = response.data.totalPages; // Assuming backend also sends total pages
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching books:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchBooks();
  // }, [activePage, activeLetter, activeTag]);

  
// Handle clicking a number page
const handlePageClick = (pageNumber) => {
  setActivePage(pageNumber);
  fetchBooks(pageNumber, activeLetter, activeTagState);
  onPageChange(pageNumber);
};

// Handle clicking an alphabet
const handleLetterClick = (letter) => {
  setActiveLetter(letter);
  fetchBooks(activePage, letter, activeTagState);
  onLetterChange(letter);
};

  // Alphabet Pagination: Navigate through letters
  const handlePreviousLetter = () => {
    const currentIndex = alphabet.indexOf(activeLetter);
    if (currentIndex > 0) {
      const prevLetter = alphabet[currentIndex - 1];
      handleLetterClick(prevLetter);
    }
  };

  const handleNextLetter = () => {
    const currentIndex = alphabet.indexOf(activeLetter);
    if (currentIndex < alphabet.length - 1) {
      const nextLetter = alphabet[currentIndex + 1];
      handleLetterClick(nextLetter);
    }
  };

  // Numerical Pagination: Navigate through pages
  const handlePreviousPage = () => {
    if (activePage > 1) {
      handlePageClick(activePage - 1);
    }
  };

 
  const handleNextPage = () => {
    if (activePage < totalPageCount) {
      handlePageClick(activePage + 1);
    }
  };

  // Fetch books on initial load or when filters change
  useEffect(() => {
    fetchBooks(activePage, activeLetter, activeTagState);
  }, [activePage, activeLetter, activeTagState]);


  // Render Alphabet Pagination
  const renderAlphabetPagination = () => {
    return (
      <ul className="pagination alphabet-pagination">
        <li className={`page-item ${activeLetter === alphabet[0] ? 'disabled' : ''}`} onClick={handlePreviousLetter}>
          &lt;
        </li>
        {alphabet.map((letter) => (
          <li
            key={letter}
            className={`page-item ${activeLetter === letter ? 'active' : ''}`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </li>
        ))}
        <li className={`page-item ${activeLetter === alphabet[alphabet.length - 1] ? 'disabled' : ''}`} onClick={handleNextLetter}>
          &gt;
        </li>
      </ul>
    );
  };

   // Render Numeric Pagination
   const renderNumericPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPageCount; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${activePage === i ? 'active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </li>
      );
    }
    return (
      <ul className="pagination numeric-pagination">
        <li
          className={`page-item ${activePage === 1 ? 'disabled' : ''}`}
          onClick={handlePreviousPage}
        >
          &lt;
        </li>
        {pages}
        <li
          className={`page-item ${
            activePage === totalPageCount ? 'disabled' : ''
          }`}
          onClick={handleNextPage}
        >
          &gt;
        </li>
      </ul>
    );
  };
  // If books are loading
  if (loading) {
    return <div>Loading books...</div>;
  }

  // If no books found
  if (books.length === 0) {
    return <div>No books available</div>;
  }

  return (
    <div className="book-container">
      {/* Tags Section */}

      <div className='tag-header'>

      <div className="tags-section">
          <span
            className={activeTagState === 0 ? 'active-tag' : 'tag'}
            onClick={() => {
              setActiveTagState(0);
              fetchBooks(activePage, activeLetter, '');
            }}
          >
            All
          </span>
          <span
            className={activeTagState === 1 ? 'active-tag' : 'tag'}
            onClick={() => {
              setActiveTagState(1);
              fetchBooks(activePage, activeLetter, 'Computer Science');
            }}
          >
            Computer Science
          </span>
          <span
            className={activeTagState === 2 ? 'active-tag' : 'tag'}
            onClick={() => {
              setActiveTagState(2);
              fetchBooks(activePage, activeLetter, 'Civil');
            }}
          >
            Civil
          </span>
          <span
            className={activeTagState === 3 ? 'active-tag' : 'tag'}
            onClick={() => {
              setActiveTagState(2);
              fetchBooks(activePage, activeLetter, 'Mechanical');
            }}
          >
            Mechanical
          </span>
          <span
            className={activeTagState === 4 ? 'active-tag' : 'tag'}
            onClick={() => {
              setActiveTagState(2);
              fetchBooks(activePage, activeLetter, 'Electronic & Comunication');
            }}
          >
            Electronic & Comunication
          </span>
          <span
            className={activeTagState === 2 ? 'active-tag' : 'tag'}
            onClick={() => {
              setActiveTagState(2);
              fetchBooks(activePage, activeLetter, 'Electrical');
            }}
          >
            Electrical
          </span>
          <span
            className={activeTagState === 2 ? 'active-tag' : 'tag'}
            onClick={() => {
              setActiveTagState(2);
              fetchBooks(activePage, activeLetter, 'Basic Science & Humanities');
            }}
          >
            Basic Science & Humanities
          </span>
          </div>

      {/* Search bar */}
      <div className="tag-search-container">
              <input type="text" placeholder="Search" className="tag-search-bar" />
              <i className="bx bx-search"></i>
            </div>
      </div>

      {/* Alphabetical Pagination */}
      {renderAlphabetPagination()}
      
      
      
      {/* Book Grid */}
      {/* <div className="book-grid">
        {sections.map((section, index) => (
          <div key={index} className="book-item">
            
            <div className="book-cover">Book</div>
            <h3>{section.title}</h3>
            <p>{section.author}</p>
          </div>
        ))}
      </div> */}


      {/* Book Grid */}
      <div className="book-grid">
        {books.map((book, index) => (
          <div key={index} className="book-item">
            {/* Placeholder image or book cover */}
            <div className="book-cover">Book</div>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))}
      </div>



      {/* Numerical Pagination */}
      {renderNumericPagination()}
    </div>
  );
};

export default Pagination;
