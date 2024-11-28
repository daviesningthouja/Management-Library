import {Navbar, Footer} from '../../components';
import './MainLayout.css'
const MainLayout = ({children}) =>{
  return (
    <main className='App'>
    
     <Navbar/>
      <div className='wrapper-landing'>
          {children}
          
        <Footer/>
      </div>
    
    </main>
  )
}

export default MainLayout
