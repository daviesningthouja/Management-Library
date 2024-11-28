
import {useState, useEffect} from 'react';
import { Link , useLocation} from 'react-router-dom'; // Assuming you use react-router for navigation
//import  from "../../assets/ppf.png";
import logo from '../../../../assets/Manipur_University_Logo.png';
function Admin_Sidebar({isSidebarOpen , setSidebarOpen}) {
  const location = useLocation(); // Hook to access the current route
  const [activeIndex, setActiveIndex] = useState(0); // Default active index set to "Dashboard"

  // Update activeIndex based on the current path
  // useEffect(() => {
  //   switch (location.pathname) {
  //     case '/admin/Dashboard/Administrator':
  //       setActiveIndex(1);
  //       break;
  //     case '/admin/user': // Example path for User
  //       setActiveIndex(2);
  //       break;
  //     case '/admin/books': // Example path for Collection
  //       setActiveIndex(3);
  //       break;
  //     case '/admin/user/detail': // Example path for User
  //         setActiveIndex(2);
  //         break;
  //     case '/admin/book/detail': // Example path for Collection
  //         setActiveIndex(3);
  //         break;
  //     case '/admin/book/detail/user/history': // Example path for Collection
  //         setActiveIndex(3);
  //         break;
  //     case '/admin/user/add':
  //         setActiveIndex(1);
  //         break;
  //     case '/admin/book/add':
  //         setActiveIndex(1);
  //         break;
  //     case '/admin/loan-data':
  //         setActiveIndex(1);
  //         break;
  //     case '/admin/books/detail':
  //         setActiveIndex(3);
  //         break;
  //     case "/admin/user/detail/:id":
  //         setActiveIndex(2);
  //         break;
  //     default:
  //       setActiveIndex(0); // Default to Dashboard
  //   }
    
  // }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/admin/Dashboard/Administrator') {
      setActiveIndex(1);
    } else if (location.pathname === '/admin/user') {
      setActiveIndex(2);
    } else if (location.pathname.startsWith('/admin/user')) {
      setActiveIndex(2);
    }
     else if (location.pathname.startsWith('/admin/user/detail/:id')) {
      setActiveIndex(2); // Match any user detail route
    } else if (location.pathname === '/admin/books') {
      setActiveIndex(3);
    } else if (location.pathname.startsWith('/admin/book')) {
      setActiveIndex(3); // Match any book detail route
    } else if (location.pathname.startsWith('/admin/books/detail')) {
      setActiveIndex(3);
    } 
    else {
      setActiveIndex(0); // Default to Dashboard
    }
  }, [location.pathname]);
  

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  
 

  return (
    
      <div className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
          <a href="#" className="logo">
          <img src={logo}/>
          </a>
          <ul className="side-menu">
        <li
          className={activeIndex === 0 ? 'active' : ''}
          onClick={() => handleClick(0)}
        >
          <Link to="/admin/Dashboard"><i className='bx bx-command'></i> Dashboard</Link>
        </li>
        <li
          className={activeIndex === 1 ? 'active' : ''}
          onClick={() => handleClick(1)}
        >
          <Link to="/admin/Dashboard/Administrator"><i className='bx bxs-user'></i> Admin</Link>
        </li>
        <li
          className={activeIndex === 2 ? 'active' : ''}
          onClick={() => handleClick(2)}
        >
          <Link to="/admin/user"><i className='bx bxs-user-detail'></i> User</Link>
        </li>
        <li
          className={activeIndex === 3 ? 'active' : ''}
          onClick={() => handleClick(3)}
        >
          <Link to="/admin/books"><i className='bx bx-collection'></i> Books</Link>
        </li>
      </ul>
          <ul className="side-menu">
              <li>
                  <Link to="/home" className="logout">
                      <i className='bx bx-log-out-circle'></i>
                      Logout
                  </Link>
              </li>
          </ul>
      </div>
   
  );
}



export default Admin_Sidebar;
