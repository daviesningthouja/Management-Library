import React,  {useEffect ,useState } from "react";
import { Admin_DashboardLayout } from "../../../index";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";
import "./loanDetail.css";
import { useParams } from "react-router-dom";
import { bouncy } from "ldrs";
const LoanDetail = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState('');
  const [loan, setLoan] = useState(null); // State to store loan details
  const [error, setError] = useState(null); // State to store errors if any
  const { loanId } = useParams() ; // Get loanId from route params
  console.log(loanId)
  // Fetch loan details when the component mounts
  useEffect(() => {
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
    const fetchLoanDetails = async () => {
      try {
        // Make an API request to get loan details by loanId
        const response = await axios.get(`http://localhost:8080/api/loans/detail/${loanId}`,config);
        setLoan(response.data); // Store the fetched loan data
      } catch (err) {
        setError("Failed to fetch loan details"); // Handle any errors
        console.error(err);
      }finally{
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchLoanDetails();
  },[loanId], [navigate]); // Trigger the effect when the loanId changes

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
  if (!loan) {
    return <div>Loading...</div>;
  }
  return (
    <Admin_DashboardLayout>
      
      <main className="loanDetail">


        <div className="ln-book">
          <div className="book-i">
            <img></img>
          </div>
          <div className="book-ds">
            <h3>Book Title:</h3>
            <p>{loan.booktitle}</p>
            <h3>ISBN:</h3>
            <p>{loan.isbn}</p>
            <h3>Author:</h3>
            <p>{loan.author}</p>
            <h3>Tag:</h3>
            <p>{loan.tag || "N/A"}</p>
          </div>
        </div>
        <div className="rn-user">
          <div className="user-ds">
            <div className="user-i">
              <img src="" alt="" />
            </div>
            <div className="user-d">
              <h3>UserName:</h3>
              <p>{loan.username}</p>
              <h3>EnrollmentId:</h3>
              <p>{loan.enrollmentId}</p>
              <h3>Department:</h3>
              <p>{loan.department}</p>
              <h3>Contact:</h3>
              <p>{loan.contact}</p>
            </div>
          </div>
          <div className="loan-lg">
            <div className="bottom-data">
              <div className="orders">
                <div className="header">
                  <i className="bx bx-receipt"></i>
                  <h3>loan log</h3>
                  <i className="bx bx-filter"></i>
                  <div className="form-input">
                    <input type="search" placeholder="Search..." />
                    <button className="search-btn" type="submit"></button>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Date of Loan</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{new Date(loan.dateOfLoan).toLocaleDateString()}</td>
                      <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                      <td>{loan.status}</td>
                      <td>
                        {/* <span className="status completed">Completed</span> */}
                        <button>Remind</button>
                      </td>
                    </tr>
                    
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

export default LoanDetail;
