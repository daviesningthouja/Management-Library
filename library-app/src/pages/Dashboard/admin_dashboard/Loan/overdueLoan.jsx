import { useState, useEffect } from 'react';
import React from 'react';
import Admin_DashboardLayout from '../../../layout/dash_layout/admin/DashboardLayout';
import { Link ,useNavigate} from 'react-router-dom';
import './overdueLoan.css';
import { bouncy } from "ldrs";
const OverdueLoan = () => {
  const [toggle, setBtnToggle] = useState(null); // track the active row
  const [overdueLoans, setOverdueLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [loading,setLoading] = useState('');
  const [error, setError] = useState("");

  // Handle toggle for the dropdown menu
  const handleToggle = (rowId) => {
    if (toggle === rowId) {
      setBtnToggle(null); // close if already open
    } else {
      setBtnToggle(rowId); // open the clicked row's action menu
    }
  };

  // Fetch overdue loan data
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
    const fetchOverdueLoans = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/loans/overdue',config); // Update with actual API endpoint
        const data = await response.json();
        setOverdueLoans(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching overdue loans:', error);
        alert("Error fetching overdue loan");
        setError("Failed to load overdue loan");
      }finally{
        setTimeout(() => setLoading(false), 100);

      }
    };

    fetchOverdueLoans();
  }, [navigate]);

  // Search filter function
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  
  const handleRemind = async (enrollmentId, userName,) => {
    const token = 
      localStorage.getItem("Admintoken") || sessionStorage.getItem("Adminsessiontoken");
  
    if (!token) {
      alert("No token found, please log in again");
      navigate('/user/login/admin', {replace: true});
      return;
    }
    //console.log(enrollmentId)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  
    const payload = {
      enrollmentId,
      title: `Reminder for Overdue Loan`,
      body: `Hi ${userName}, this is a reminder to return your overdue book. Please contact the library for details.`,
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/admin/notify-student', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(`Reminder sent successfully: ${result.message}`);
      } else {
        const errorData = await response.json();
        alert(`Failed to send reminder: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send reminder. Please try again later.');
    }
  };
  
 
  // Filter overdue loans based on search term and due date
  const filteredLoans = overdueLoans.filter((loan) => {
    const dueDate = new Date(loan.dueDate);
    const currentDate = new Date();

    // Compare the due date with the current date and match with search term
    const isOverdue = dueDate < currentDate;
    const matchesSearch = loan.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          loan.user.enrollmentId.includes(searchTerm); // Matching both name and enrollment id
    //loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    return isOverdue && matchesSearch; // Filter by overdue and search term
  });
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
      <main className='wrapper-overdue'>
        <div className="bottom-data">
          <div className="orders">
            <div className="header">
              <h3>Overdue Student Loan</h3>
              <div className="form-input">
                <input
                  type="search"
                  placeholder="Search by Name or Enrollment ID..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button className="search-btn" type="submit"></button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Enrollment Id</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan, index) => (
                  <tr key={loan._id}>
                    <td><p>{loan.user.enrollmentId}</p></td>
                    <td>{loan.user.name}</td>
                    <td>{loan.user.department}</td> {/* Assuming the department is in the book object */}
                    <td><p>{loan.user.contact}</p></td> {/* Assuming contact is in the user object */}
                    <td>{loan.dueDate}</td>
                    <td>
                      <i
                        className='bx bx-dots-horizontal-rounded ig'
                        onClick={() => handleToggle(index)}
                      ></i>
                      <div className={toggle === index ? 'action-btn' : 'hidden'}>
                        <button onClick={() => handleRemind(loan.user.enrollmentId, loan.user.name)}>Remind</button>
                        <Link to={`/admin/loan-history/detail/${loan._id}`}>
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
      </main>
    </Admin_DashboardLayout>
  );
};

export default OverdueLoan;
