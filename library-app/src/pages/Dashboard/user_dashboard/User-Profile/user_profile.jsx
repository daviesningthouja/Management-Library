import { User_DashboardLayout } from "../../../index.js";
import { Link ,useNavigate} from "react-router-dom";
import bg from "../../../../assets/bg.jpg";
import pfp from "../../../../assets/pfp.png";
import { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import { bouncy } from "ldrs";
const User_Profile = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //const [userBooks, setUserBooks] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("sessiontoken");

    // Log the token to check if it exists
    //console.log("Token: ", token);

    if (!token) {
      alert("No token found, please log in again");
      navigate('/user/login/student', { replace: true });
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const fetchUserData = async () => {
      try {

        const response = await axios.get(
          "http://localhost:8080/api/Dashboard/user/profile",config
        );

        setUser(response.data);

        // console.log(user)
        // Fetch user borrowed books collection
        // const collectionResponse = await axios.get('http://localhost:8080/api/Dashboard/user/collection', config);
        // setUserBooks(collectionResponse.data);

      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
        
      }finally{

        setTimeout(() => setLoading(false), 500);
      }
    };
    //setTimeout(() => setLoading(false), 1000);
    fetchUserData();
  }, [navigate]);
  bouncy.register();
  if (loading) {
    return (
      <User_DashboardLayout>
        <main className="wrapper_profile">
          <div className="loding">
            <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
          </div>
        </main>
      </User_DashboardLayout>
    );
  }

  if (error) {
    //error page semda yroi route onna chngkpa mtm da utpa ynba

    return <div className="loding">404 PAGE NOT FOUND</div>;
  }

  return (
    <User_DashboardLayout>
      <main className="wrapper_profile">
        <div className="profile_wrapper">
          <div className="profile_picture">
            <div className="profile_bg">
              <img className="bg" src={bg} alt="" />
            </div>
            <div className="profile">
              <img src={pfp} alt="" />
            </div>
            <div className="user_detail">
              <h1>{user.name}</h1>
              <p>
                <span>EnrollmentId: </span>
                {user.enrollmentId}
              </p>
              <div className="profile_btns">
                <div className="button-container">
                  <Link to="/user/setting">
                    <span className="mask">Update</span>
                    <button id="work" type="Submit" name="Hover">
                      Update
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bottom-data">
          <div className="orders">
            <div className="header">
              <i className="bx bx-receipt"></i>
              <h3>Collection</h3>
              <i className="bx bx-filter"></i>
              <i className="bx bx-search"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Borrowed Date</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
              {userBooks.map((book, index) => (
              <tr key={index}>
                <td>
                  <p>{book.title}</p>
                </td>
                <td>{book.borrowedDate}</td>
                <td>{book.author}</td>
              </tr>
            ))}
              </tbody>
            </table>
          </div> */}
      </main>
    </User_DashboardLayout>
  );
};

export default User_Profile;
