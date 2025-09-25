import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import './App.css';
import Patient from './Patient/Patient';
import 'bootstrap/dist/css/bootstrap.min.css';
import Doctor from './Doctor/Doctor';
import Staff from './Staff/Staff'
import Home from './Home/Home';
import LoginPage from './Login/LoginPage';
import { useEffect, useState } from 'react';
//import Staff from './Staff/Staff';


function App() {

  

  // useEffect(() => {
  //   fetch("http://localhost:5001/users")
  //     .then((res) => res.json())
  //     .then((data) => setLoginUser(data))
  //     .catch((err) => console.log(err));
  // }, []);

  
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
                    <li><Link to="/LoginPage" style={{textDecoration: 'none', color: 'black'}} >Login</Link></li>
                </ul>
        </div>
      
    </div>
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Patient" element={<Patient/>}/>
        <Route path="/Doctor" element={< Doctor/>} />
        <Route path="/Staff" element={<Staff />} />
        <Route path="/LoginPage" element={<LoginPage/>}/>
      </Routes>
         
    </BrowserRouter>
  );
}

export default App;
