
//import { useState, useEffect } from 'react';
//import '../layout/DashboardLayout.css'; // Create this CSS file for styling
import img from "../../../../assets/pfp.png";
import { Link } from "react-router-dom";
import NotificationBell from './icons/Noti-bell';
function User_Topbar({toggleSidebar,toggleTheme}) {
    //const [isDarkMode, setDarkMode] = useState(false);

    
    //const [isSearchFormVisible, setSearchFormVisible] = useState(false);
     
    

      // const toggleSearchForm = (e) => {
      //   if (window.innerWidth < 576) {
      //     e.preventDefault();
      //     setSearchFormVisible(!isSearchFormVisible);
      //   }
      // };
      
      
      
  return (
    
      <nav>
        <i className='bx bx-menu'  onClick={toggleSidebar}></i>
        <form action="#">
            
        </form>
        <input type="checkbox" id="theme-toggle" hidden onChange={toggleTheme}/>
        <label htmlFor="theme-toggle" className="theme-toggle"></label>
        {/* <a href="#" className="notif">
            <i className='bx bx-bell'></i>
            <span className="count">12</span>
        </a>  */}
        <NotificationBell/>
        <div className="profile-pfp">

        <Link to="/user/profile">
            <img src={img} alt='pfp'/>
        </Link>
        </div>
    </nav>
  
  );
}



export default User_Topbar;