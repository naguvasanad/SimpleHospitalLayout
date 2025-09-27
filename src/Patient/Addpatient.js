import React from 'react'
import { useState } from 'react';

function Addpatient() {
    const [modal,setmodal] = useState(false);
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

    const HandleSave = (e) =>{
        e.preventDefault();
        alert("save");
        fetch('http://localhost:5001/insertNewPatient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Name: name, Email: email, Phone: phone })
          })
            .then(res => res.json())
            .then(data => console.log('Inserted:', data))
            .catch(err => console.error('Error:', err));
    }
      const toggleModal = () =>{
        setmodal(!modal)
      }

    
  return (
    <>
    
       <div className='modal_content'>
      <div onClick={toggleModal} className='overlay'></div>
     <div className='col-4'>
     <h1>Add new Patient</h1>

     <div className='form-group'>
     <input type='text' placeholder='tName' 
     className='form-control'style={{width:"400px"}}
     value={name} onChange={(e) => setName(e.target.value)}
     />
     <input type='text' placeholder='Email' 
     className='form-control'style={{width:"400px"}} 
     value={email} onChange={(e)=>setEmail(e.target.value)}
     />
     <input type='text' placeholder='phone' 
     className='form-control'style={{width:"400px"}} 
     value={phone} onChange={(e)=>setPhone(e.target.value)}
     />
     <button type='submit' className='btn btn-success' onClick={(e)=>HandleSave(e)} >Save</button>
     <button type='submit' className='btn btn-warning' >Clear</button>
     <button className='btn btn-danger' onClick={toggleModal}>Cancel</button>
     </div>
     </div>
     </div>
     </>
    
  )
}

export default Addpatient
