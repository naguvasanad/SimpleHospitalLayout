import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import './App.css';
import Patient from './Patient/Patient';
import 'bootstrap/dist/css/bootstrap.min.css';
import Doctor from './Doctor/Doctor';
import Staff from './Staff/Staff'
import Home from './Home/Home';
import LoginPage from './Login/LoginPage';
import { useEffect, useState } from 'react';
import UploadImage from './UploadImage/UploadImage';
//import ProtectedRoute from './ProtectedRoute';


function App() {
  const [name, setName] = useState('');
  const [logModal,setLogModal] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem('user');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const HandleLogout = (e)=>{
    e.preventDefault();
    localStorage.clear();
    localStorage.removeItem("isLoggedIn")
    window.location.href = "/LoginPage"
    setLogModal(!logModal)
  }
 
  return (
    <BrowserRouter> 
    <div className='nav-container'>
        <div className='logo'>
           <h2>HealthCare</h2>
        </div>
      <div className="menu-link">
                <ul>
                    <li ><Link to="/" style={{textDecoration: 'none',color: 'black'}}>Home</Link></li>
                    <li ><Link to="/Patient" style={{textDecoration: 'none', color: 'black'}}>Patient</Link></li>
                    <li ><Link to="/Doctor" style={{textDecoration: 'none', color: 'black'}}>Doctor</Link></li>
                    <li ><Link to="/Staff" style={{textDecoration: 'none', color: 'black'}}>Staff</Link></li>
                     <li ><Link to="/UpLoadImage" style={{textDecoration: 'none', color: 'black'}}>UpLoadImage</Link></li>
                    {logModal &&(
                      <div>
                    <li>
                      <Link to="/LoginPage" style={{textDecoration: 'none', color: 'black'}} >Login</Link>
                    </li>
                    <li><Link style={{textDecoration: 'none', color: 'black'}}>{name}</Link></li>
                    </div>
                  )}
                    <li><Link style={{textDecoration: 'none', color: 'black'}} onClick={(e)=>HandleLogout(e)}>Logout</Link></li>
                </ul>
        </div>
      
    </div>
    
      <Routes>
        
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Patient" element={<Patient/>}/>
        <Route path="/Doctor" element={< Doctor/>} />
        <Route path="/Staff" element={<Staff />} />
       <Route path="/UpLoadImage" element={<UploadImage />} />
        <Route path="/LoginPage" element={<LoginPage/>}/>
      </Routes>
         
    </BrowserRouter>
  );
}

export default App;
