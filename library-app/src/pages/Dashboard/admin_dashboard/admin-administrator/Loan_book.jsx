import React from 'react';
import { Admin_DashboardLayout } from "../../../index.js";
import './loan.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bouncy } from "ldrs";
const Loan_book = () => {
    const [enrollmentId, setEnrollmentId] = useState('');
    const [isbn, setIsbn] = useState('');
    const [errors, setErrors] = useState({});
    const [bookDetails, setBookDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] =useState('')
    const [error, setError] = useState('')
    const validateForm = () => {
        let errors = {};
        if (!enrollmentId) errors.enrollmentId = "Enrollment ID is Required";
        if (!isbn) errors.isbn = "Book ISBN Number is Required";
        if (!dueDate) errors.dueDate = 'Due Date is required'
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const token = localStorage.getItem("Admintoken") || sessionStorage.getItem("Adminsessiontoken");
    if (!token) {
        //throw new Error
        alert("No Token found, please log in again");
        navigate('/user/login/admin', {replace: true});
        setError(error,'No token found');
    }

    //
    const fetchBookDetails = async (isbn) => {
        if (!token) {
            //throw new Error
            alert("No Token found, please log in again");
            navigate('/user/login/admin', {replace: true});
            setError(error,'No token found');
        }
        // loading hppo book space khk setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/books/detail/isbn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isbn })
            });
            const data = await response.json();
            if (response.ok) {
                setBookDetails(data);
            } else {
                console.error("Error fetching book details:", data);
            }
        } catch (error) {
            console.error("Error fetching book details:", error);
            //alert(error);
            setError(error,`Can't load the book`);
        }finally{
            setTimeout(() => setLoading(false), 1000)
        }
    };
    

    //
    const handleLoanSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!validateForm()) return;


        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await axios.post("http://localhost:8080/api/admin/loan-book", { enrollmentId, isbn, dueDate}, config);
            if (response.status === 200) {
                console.log("Book Loaned successfully:", response.data);
                alert("Book Loaned successfully!");
            } else {
                console.error("Error Loaning book:", response.data);
                alert("Failed to loan the book.");
            }
        } catch (error) {
            console.error("Error loaning book:", error);
            alert("Failed to loan the book. Please try again.");
            setError(error, "error can't loan the book")
        } finally{
            setTimeout(() => setLoading(false), 1000);
        }
    };
    
    

    bouncy.register();
  if (loading) {
    return (
    <Admin_DashboardLayout>
        <main>
        <div className="loding">
        <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
        </div>
        </main>
    </Admin_DashboardLayout>
    );
  }
  if (error) {
    //error page semda yroi route onna chngkpa mtm da utpa ynba

    return <div className="loding">404 PAGE NOT FOUND{error}</div>;
  }

    return (
        <Admin_DashboardLayout>
            <main className='wrapper_loan-dash'>
                <div className='lhs-loan'>
                    <div className='loan-header'>
                        <h2>Enter Loan Detail</h2>
                    </div>
                    <form onSubmit={handleLoanSubmit}>
                        <div className='loan-form'>
                            <label>Enter Student EnrollmentId</label>
                            {errors.enrollmentId && (
                                <p className="error">{errors.enrollmentId}</p>
                            )}
                            <input 
                                type="text"
                                placeholder='Enter Student EnrollmentID'
                                value={enrollmentId}
                                onChange={(e) => setEnrollmentId(e.target.value)}
                            />

                            <label>Enter Book ISBN Number</label>
                            {errors.isbn && <p className="error">{errors.isbn}</p>}
                            <input 
                                type="search" 
                                placeholder='Enter Book ISBN number' 
                                onChange={(e) => {
                                    setIsbn(e.target.value);
                                    if (e.target.value) {
                                          fetchBookDetails(e.target.value);
                                      } else {
                                      setBookDetails(''); // Clear book details if ISBN is empty
                                 }
                                    
                                  
                                }}
                                value={isbn}
                            />

                            <label>Set Due Date</label>
                            
                <input
                    type='date'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                        </div>
                        <div className='loan-btn'>
                            <button type='submit'>Loan Book</button>
                            <button type='reset'>Cancel</button>
                        </div>
                    </form>
                </div>  
                <div className='rhs-book-d'>
                    <div className='book-detail-bx'>
                        <h2>Book detail</h2>
                        {bookDetails ? (
                            <div>
                                <div className='book-d-i'><img src="" alt="" /></div>
                                <div className='book-d-d'>
                                    <h3>Title: {bookDetails.title}</h3>
                                    <h3>ISBN: {bookDetails.isbn}</h3>
                                    <h3>Author: {bookDetails.author}</h3>
                                </div>
                            </div>
                        ) : (
                            <div>
                            <div className='book-d-i'><img src="" alt="" /></div>
                            <div className='book-d-d'>
                                <h3>Title: N/A</h3>
                                <h3>ISBN:  N/A</h3>
                                <h3>Author: N/A</h3>
                            </div>
                        </div>
                        )}
                    </div>
                </div>    
            </main>
        </Admin_DashboardLayout>
    );
};

export default Loan_book;
