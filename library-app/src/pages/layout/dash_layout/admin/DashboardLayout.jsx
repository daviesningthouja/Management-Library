import './ADashboardLayout.css';
import { Admin_Topbar, Admin_Sidebar } from '../../../Dashboard/index';
import { useState ,useEffect} from 'react';
const Admin_DashboardLayout = ({children}) => {
   // Initialize the sidebar state from local storage, defaulting to 'true' if not set
   const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => JSON.parse(localStorage.getItem('isSidebarOpen')) ?? true
  );

  // Update local storage whenever isSidebarOpen changes
  useEffect(() => {
    localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  

  return (
    <div className={`wrapper_dashboardlayout ${isSidebarOpen ? '' : 'close'}`} >
      <Admin_Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <div className='content'>
        <Admin_Topbar  toggleSidebar={toggleSidebar}  />
        
        {children }
        
        
      </div>
    </div>
  )
}
// style={{ display: 'flex' }
// style={{ marginLeft: '200px', padding: '20px', width: '100%' }

export default Admin_DashboardLayout;
