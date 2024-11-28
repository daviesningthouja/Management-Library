import React, { useState, useEffect } from "react";
import { Admin_DashboardLayout } from "../../../index";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './loanHistory.css'
import { bouncy } from "ldrs";
const LoanHistory = () => {
  const [loans, setLoans] = useState([]); // State to store loan history
  const[overdueloans, setOverdueLoans] = useState([]) 
  const [toggle, setBtnToggle] = useState(null); // Track the active row
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [loading,setLoading] = useState('');
  const [error, setError] = useState("");
  //console.log(bookId)
  const handleToggle = (rowId) => {
      if (toggle === rowId) {
          setBtnToggle(null); // Close if already open
      } else {
          setBtnToggle(rowId); // Open the clicked row's action menu
      }
  };

  // Fetch loan history data
  useEffect(() => {
    setLoading(true);
    const token =
    localStorage.getItem("Admintoken") || sessionStorage.getItem("Adminsessiontoken");
    setLoading(true);
  
    if (!token) {
      alert("No token found, please log in again");
      navigate('/user/login/admin', {replace: true});
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
      const fetchLoanHistory = async () => {
          try {
            
              const response = await axios.get(`http://localhost:8080/api/history/book-history/${bookId}`,config); // Adjust the URL according to your backend
              console.log(bookId)
              setLoans(response.data);
          } catch (error) {
              console.error("Error fetching loan history:", error);
              alert("Error fetching loan history");
              setError("Failed to load loan history")
          } finally {
            setTimeout(() => setLoading(false), 100);
          }
      };
      
      
      const fetchOverDueLoanHistory = async () => {
        try{
          const response = await axios.get(`http://localhost:8080/api/history/book-history/overdue/${bookId}`,config)
          console.log(response.data)
          setOverdueLoans(response.data);
        }catch(error){
          console.error("Error fetching Overdueloan history:", error);
          alert("Error fetching Overdueloan history");
        setError("Failed to load overdueloan history")
        }finally{
          setTimeout(() => setLoading(false), 200);
        }
      };
      fetchLoanHistory();
      fetchOverDueLoanHistory();
  }, [bookId], [navigate]);
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
      <main className="wrapper_loanHistory">
        <div className="header">
          <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <Link to="/admin/Dashboard">
                <li>
                  <a href="#"> Catalog </a>
                </li>
              </Link>
              <h2>/</h2>

              <Link to="/admin/Dashboard/Administrator">
                <li>
                  <a href="#">Books</a>
                </li>
              </Link>
              <h2>/</h2>
              <Link to="/admin/Dashboard/Administrator">
                <li>
                  <a href="#" className="active">
                    Loan History
                  </a>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="loan-his-d">
          <div className="loan-his">

            <div className="bottom-data">
              <div className="orders">
                <div className="header">
                  <i className="bx bx-receipt"></i>
                  <h3>loan History</h3>
                  <i className="bx bx-filter"></i>
                  <div className="form-input">
                    <input type="search" placeholder="Search..." />
                    <button className="search-btn" type="submit"></button>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>UserID</th>
                      <th>Date of loan</th>
                      <th>due date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {loans.map((loan) => (
                    <tr key={loan._id}>
                        <td><p>{loan.user.enrollmentId}</p></td>
                        <td><p>{new Date(loan.borrowDate).toLocaleDateString()}</p></td>
                        <td><p>{new Date(loan.dueDate).toLocaleDateString()}</p></td>
                        <td><p>{loan.status || 'N/A'}</p></td>
                        <Link to={`/admin/loan-history/detail/${loan._id}`}>
                          <button>Detail</button>
                        </Link>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

            <div className="loan-overdue">
                <div className="bottom-data">
                    <div className="orders">
                        <div className="header">
                            <i className="bx bx-receipt"></i>
                            <h3>Overdue User</h3>
                            <i className="bx bx-filter"></i>
                            <div className="form-input">
                                <input type="search" placeholder="Search..." />
                                <button className="search-btn" type="submit"></button>
                            </div>
                        </div>
                        <table>
                        <thead>
                            <tr>
                            <th>UserID</th>
                            <th>Date of loan</th>
                            <th>Due</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          {overdueloans.map((overdueloan) => (
                            <tr key={overdueloan._id}>
                              <td><p>{overdueloan.user.enrollmentId}</p></td>
                              <td><p>{new Date(overdueloan.borrowDate).toLocaleDateString()}</p></td>
                              <td><p>{new Date(overdueloan.dueDate).toLocaleDateString()}</p></td>
                              <td>
                                <i className='bx bx-dots-horizontal-rounded ig' 
                                    onClick={() => handleToggle(1)}>
                                </i>
                                <div className={toggle === 1 ? 'action-btn' : 'hidden'}>
                                    <button>Remind</button>
                                    <Link to={`/admin/loan-history/detail/${overdueloan._id}`}>
                                      <button>Detail</button>
                                    </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
      </main>
    </Admin_DashboardLayout>
  );
};

export default LoanHistory;
