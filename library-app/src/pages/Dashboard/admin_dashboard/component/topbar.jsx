
import { useState, useEffect } from 'react';
//import '../layout/DashboardLayout.css'; // Create this CSS file for styling

function Admin_Topbar({toggleSidebar}) {
    const [isDarkMode, setDarkMode] = useState(false);
    
    //const [isSearchFormVisible, setSearchFormVisible] = useState(false);
     
    
      /*
      const toggleSearchForm = (e) => {
        if (window.innerWidth < 576) {
          e.preventDefault();
          setSearchFormVisible(!isSearchFormVisible);
        }
      };
      */
      const handleResize = () => {
        if (window.innerWidth < 768) {
          //setSidebarClosed(true);
        } else {
          //setSidebarClosed(false);
        }
        if (window.innerWidth > 576) {
          setSearchFormVisible(false);
        }
      };
    
      const handleThemeToggle = () => {
        setDarkMode(!isDarkMode);
      };
      useEffect(() => {
        window.addEventListener('resize', handleResize);
        document.body.classList.toggle('dark', isDarkMode);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [isDarkMode]);
  return (
    <div >
      <nav>
        <i className='bx bx-menu'  onClick={toggleSidebar}></i>
        <form action="#">
            
        </form>
        <input type="checkbox" id="theme-toggle" hidden onChange={handleThemeToggle}/>
        <label htmlFor="theme-toggle" className="theme-toggle"></label>
        <a href="#" className="notif">
            <i className='bx bx-bell'></i>
            <span className="count">12</span>
        </a>
        <a href="#" className="profile">
            <img src="#"/>
        </a>
    </nav>
  </div>
  );
}



export default Admin_Topbar;