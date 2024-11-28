// src/components/Dashboard/Dashboard.js

import { Admin_DashboardLayout } from "../../../index";
//import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { bouncy  } from "ldrs";
//import { useLocation } from "react-router-dom";
const Admin_Books = () =>{
  const navigate = useNavigate();
  const [books, setBooks] = useState([]); // Store fetched books
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTag, setActiveTag] = useState(0); // Set initial tag
  const [totalPageCount, setTotalPageCount] = useState(""); // Track current page
  const [currentLetter, setCurrentLetter] = useState("");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [activeT, setActiveT] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Store search input
  const [searchSuggestions, setSearchSuggestions] = useState([]); // Store suggestions
  //const location = useLocation(); // Capture location
  const [loading, setLoading] = useState(''); // Loading state
  const [error, setError] = useState("");
  // const queryParams = new URLSearchParams(location.search);
  // const ttag = queryParams.get("tag");

  // Fetch books from backend with pagination
  const fetchBooks = async (
    pageNumber = 1,
    letter = "",
    tag = "",
    searchQuery = "",
  ) => {


    setLoading(true);
    try {
      const token =
        localStorage.getItem("Admintoken") || sessionStorage.getItem("Adminsessiontoken");

      // Log the token to check if it exists
      console.log("Token: ", token);

      if (!token) {
        alert("No token found, please log in again");
        navigate('/user/login/admin', { replace: true });
        //throw new Error("No token found, please log in again");
        
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      // Log the API call for debugging purposes
      console.log(
        `Fetching books with URL: /api/books/books?page=${pageNumber}&letter=${letter}&tag=${tag}&searchQuery=${searchQuery}`
      );
      
     
      const response = await fetch(
        `http://localhost:8080/api/books/books?page=${pageNumber}&letter=${letter}&tag=${tag}&searchQuery=${searchQuery}`,
        config
      );
      const data = await response.json();
      
      // Set the books and total page count based on the response
      setBooks(data.books);
      setTotalPageCount(data.totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("error fetching book server respones 500")
    }finally{

      setTimeout(() => setLoading(false),500);
    }
  };

  // Handle search input change and show suggestions
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 1) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/books/search?suggestion=${value}`
        );
        const data = await response.json();
        setSearchSuggestions(data.suggestions || []);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSearch = (searchQuery) => {
    console.log("Search query:", searchQuery); // Debug: Log the search query
    setCurrentPage(1); // Reset to page 1 when searching
    setSearchTerm(searchQuery); // Ensure the searchQuery is passed correctly
  };

  // Handle selecting search suggestion
  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked:", suggestion);
    setSearchTerm(suggestion);
    setSearchSuggestions([]);
    handleSearch(suggestion);
  };

  // Handle page click for pagination
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchBooks(pageNumber, currentLetter, activeT);
  };

  // Handle alphabet letter click
  const handleLetterClick = (letter) => {
    setCurrentLetter(letter);
    setCurrentPage(1); // Reset to page 1 when changing letters
  };

  // Handle tag click
  const handleTagClick = (tagValue, tag) => {
    setActiveTag(tagValue);
    setActiveT(tag);
    setCurrentPage(1); // Reset to page 1 when changing tags
    setCurrentLetter("");
  };

  useEffect(() => {
    console.log("Fetching books for:", {
      currentPage,
      currentLetter,
      activeT,
      searchTerm,
    });
    fetchBooks(currentPage, currentLetter, activeT, searchTerm);
  }, [currentPage, currentLetter, activeT, searchTerm]);
  // Alphabet Pagination: Navigate through letters
  const handlePreviousLetter = () => {
    const currentIndex = alphabet.indexOf(currentLetter);
    if (currentIndex > 0) {
      const prevLetter = alphabet[currentIndex - 1];
      handleLetterClick(prevLetter);
    }
  };

  const handleNextLetter = () => {
    const currentIndex = alphabet.indexOf(currentLetter);
    if (currentIndex < alphabet.length - 1) {
      const nextLetter = alphabet[currentIndex + 1];
      handleLetterClick(nextLetter);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      handlePageClick(currentPage + 1);
    }
  };

  const renderAlphabetPagination = () => {
    return (
      <ul className="pagination alphabet-pagination">
        <li
          className={`page-item ${
            currentLetter === alphabet[0] ? "disabled" : ""
          }`}
          onClick={handlePreviousLetter}
        >
          &lt;
        </li>
        {alphabet.map((letter) => (
          <li
            key={letter}
            className={`page-item ${currentLetter === letter ? "active" : ""}`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </li>
        ))}
        <li
          className={`page-item ${
            currentLetter === alphabet[alphabet.length - 1] ? "disabled" : ""
          }`}
          onClick={handleNextLetter}
        >
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
          className={`page-item ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </li>
      );
    }
    return (
      <ul className="pagination numeric-pagination">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={handlePreviousPage}
        >
          &lt;
        </li>
        {pages}
        <li
          className={`page-item ${
            currentPage === totalPageCount ? "disabled" : ""
          }`}
          onClick={handleNextPage}
        >
          &gt;
        </li>
      </ul>
    );
  };
  bouncy.register();
  if (loading) {
    return (
      <Admin_DashboardLayout>
      <div className="loding">
    
    <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
    </div>
    </Admin_DashboardLayout>
    );
  }
  if (error) {
    //error page semda yroi route onna chngkpa mtm da utpa ynba

    return <div className="loding">404 PAGE NOT FOUND{error}</div>;
  }

  return (
    <Admin_DashboardLayout>
      <main className="wrapper_admin-user">
      <div className="header">
          <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <Link to="/admin/Dashboard">
              <li>
                <a href='#' > Catalog </a>
              </li>
              </Link>
              <h2>/</h2>
              
              <Link to="/admin/Dashboard/Administrator">
              <li>
                <a href='#' className='active'>Books</a>
              </li>
              </Link>
            </ul>
          </div>
          
        </div>
      {/* <div className="bottom-data">
          <div className="orders">
            <div className="header">
            <i className='bx bxs-user-detail'></i> 
              <h3>Books</h3>
              
              <div className="form-input">
                <input type="search" placeholder="Search..."/>
                    <button className="search-btn" type="submit" ></button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th> 
                  <th>ISBN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>The Mocking Bird</p>
                  </td>
                  <td>T.D James</td>

                  <td>8972111548</td>
                  <td>
                    <Link to="/admin/book/detail">
                    
                    <button>detail</button>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>The Mocking Bird</p>
                  </td>
                  <td>T.D James</td>

                  <td>8972111548</td>
                  <td>
                  <Link to="/admin/book/detail">
                    
                    <button>detail</button>
                    </Link>
                  </td>
                </tr><tr>
                  <td>
                    <p>The Mocking Bird</p>
                  </td>
                  <td>T.D James</td>

                  <td>8972111548</td>
                  <td>
                  <Link to="/admin/book/detail">
                    
                    <button>detail</button>
                    </Link>
                  </td>
                </tr><tr>
                  <td>
                    <p>The Mocking Bird</p>
                  </td>
                  <td>T.D James</td>

                  <td>8972111548</td>
                  <td>
                  <Link to="/admin/book/detail">
                    
                    <button>detail</button>
                    </Link>
                  </td>
                </tr><tr>
                  <td>
                    <p>The Mocking Bird</p>
                  </td>
                  <td>T.D James</td>

                  <td>8972111548</td>
                  <td>
                  <Link to="/admin/book/detail">
                    
                    <button>detail</button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
        <div className="book-container">
            {/* Tags Section */}
            <div className="tag-header">
              <div className="tags-section">
              <Link to={`/admin/books?tag=All`}>
                  <span
                    className={activeTag === 0 ? "active-tag" : "tag"}
                    onClick={() => handleTagClick(0,'')}
                  >
                    All
                  </span>
               </Link>   
                  
                  <Link to={`/admin/books?tag=Computer Science`}>
            
                  <span
                    className={activeTag === 1 ? "active-tag" : "tag"}
                    onClick={() => handleTagClick(1,'Computer Science')}
                  >
                    Computer Science
                  </span>
                  </Link>
                <Link to={`/admin/books?tag=Civil`}>
                  <span
                    className={activeTag === 2 ? "active-tag" : "tag"}
                    onClick={() => handleTagClick(2,'Civil')}
                  >
                    Civil
                  </span>
                </Link>
                <Link to={`/admin/books?tag=Mechanical`}>
                  <span
                    className={activeTag === 3 ? "active-tag" : "tag"}
                    onClick={() => handleTagClick(3,'Mechanical')}
                  >
                    Mechanical
                  </span>
                </Link>
                <Link to ={'/admin/books?tag=Electronic & Communication'}>
                  <span
                    className={activeTag === 4 ? "active-tag" : "tag"}
                    onClick={() =>
                      handleTagClick(4, 'Electronic & Communication')
                    }
                    >
                    Electronic & Communication
                  </span>
                
                    </Link>
                <Link to={`/admin/books?tag=Electrical`}>
                  <span
                    className={activeTag === 5 ? "active-tag" : "tag"}
                    onClick={() => handleTagClick(5, "Electrical")}
                  >
                    Electrical
                  </span>
                </Link>
                <Link to={`/admin/books?tag=Basic Science & Humanities`}>
                  <span
                    className={activeTag === 6 ? "active-tag" : "tag"}
                    onClick={() =>
                      handleTagClick(6, "Basic Science & Humanities")
                    }
                  >
                    Basic Science & Humanities
                  </span>
                </Link>
              </div>

              {/* Search bar */}
              <div className="tag-search-container">
                <input
                  type="text"
                  placeholder="Search"
                  className="tag-search-bar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <i className="bx bx-search" onClick={() => handleSearch()}></i>
                {/* Search suggestions */}
                {searchSuggestions.length > 0 && (
                  <ul className="search-suggestions">
                    {searchSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
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
                <Link
                 to={`/admin/books/detail?BookId=${book._id}`} // Assuming each book has a unique ID
                // to='/admin/book/detail'
                key={index}
                className="book-itemL"
              >
                <div key={index} className="book-item">
                  {/* Placeholder image or book cover */}
                  <div className="book-cover">Book</div>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
                </Link>
              ))}
            </div>

            {/* Numerical Pagination */}
            {renderNumericPagination()}
          </div>
        
        
       
      </main>
    </Admin_DashboardLayout>
  );
}

export default Admin_Books;
