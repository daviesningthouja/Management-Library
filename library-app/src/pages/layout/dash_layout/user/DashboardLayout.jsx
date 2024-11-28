import './DashboardLayout.css';
import { User_Topbar, User_Sidebar } from '../../../Dashboard/index'
import { useState ,useEffect} from 'react';
const User_DashboardLayout = ({children}) => {
   // Initialize the sidebar state from local storage, defaulting to 'true' if not set
   const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => JSON.parse(localStorage.getItem('isSidebarOpen')) ?? true
  );
   // Theme state from local storage, defaulting to 'light' if not set
   const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') ?? 'light'
  );

    // Update local storage and apply theme whenever theme changes
    useEffect(() => {
      localStorage.setItem('theme', theme);
      document.body.className = theme; // Apply theme class to body or root element
    }, [theme]);

     // Toggle theme between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Update local storage whenever isSidebarOpen changes
  useEffect(() => {
    localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className={`wrapper_dashboardlayout ${isSidebarOpen ? '' : 'close'}` }  >
      <User_Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <div className='content'>
        <User_Topbar  toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} theme={theme}  />
        
        {children }
        
        
      </div>
    </div>
  )
}
// style={{ display: 'flex' }
// style={{ marginLeft: '200px', padding: '20px', width: '100%' }

export default User_DashboardLayout;
