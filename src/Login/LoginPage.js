import React from 'react'
import { useState } from 'react';
import { BiSolidLogIn } from 'react-icons/bi';
import "./LoginPage.css"


function LoginPage(storeUser) {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    

   

    const handleSubmit = (e,user) =>{
        
         e.preventDefault();
        fetch('http://localhost:5001/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password })
          })
            .then(res => res.json())
            .then(data =>{ console.log(data)
                localStorage.setItem("isLoggedIn","true");
             localStorage.setItem('user',name);
             window.location.href = '/Home'
           })
            .catch(err => console.error('Fetch error:', err));
    }
    

  return (
    <div className='login'>
        <form className='login__form' onSubmit={(e) => handleSubmit(e)}>
          <h1>Login Here <BiSolidLogIn/></h1>
          <input type='name'
           placeholder='Name' 
           value={name}
           onChange={(e) =>setName(e.target.value)} required
           />
           <input type='email'
           placeholder='Email' 
           value={email}
           onChange={(e) => setEmail(e.target.value)} required
           />
           <input type='password'
           placeholder='Password' 
           value={password}
           onChange={(e) => setPassword(e.target.value)} required
           />
           <button type='submit' className='submit__btn' onSubmit={(e)=>handleSubmit(e)}>Submit</button>
        </form>
      
    </div>
  )
}

export default LoginPage;
