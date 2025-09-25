import React from 'react'
import { useState } from 'react';
import { BiSolidLogIn } from 'react-icons/bi';
import "./LoginPage.css"


function LoginPage() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState('');

   

    const handleSubmit = async(e) =>{
        e.preventDefault();
      const res= await  fetch("http://localhost:5001/users",{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password})    
      });

      const data = await res.json();

      if(res.ok){
        alert(data.message)
        setMessage(`${data.name}`);
      }else{
        setMessage(data.message)
      }

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
