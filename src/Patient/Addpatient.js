import React from 'react'
import { useState } from 'react';

function Addpatient() {
    const [modal,setmodal] = useState(false);
    const [needRefresh,setNeedRefresh] = useState(false);
    const [showEditForm,setShowEditForm] = useState(false);

    const handleSave = () =>{
        var name = document.getElementById('inp_fname');
        var email = document.getElementById('inp_lname');
        var phone = document.getElementById('inp_phone')
        var newPatient ={
          Name: name.value,
          Email: email.value,
          Phone:phone.value,
          id:0
        }
        fetch("http://localhost:8080/insertNewPatient?id=" +newPatient.id +"&Name="+newPatient.Name + "&Email="+ newPatient.Email+"&Phone"+newPatient.phone)
        .then(response => response.json())
        .then(json=>{
          if(json>0){
          alert("Save Success")
          setNeedRefresh(!needRefresh);
        }
        else
        alert("Save failed")})
        .catch(err => console.log(err));
      }

      const toggleModal = () =>{
        setmodal(!modal)
      }
  return (
    <>
    
       <div className='modal_content'>
      <div onClick={toggleModal} className='overlay'></div>
     <div className='col-4'>
     <h1>Add new student</h1>

     <div className='form-group'>
     <input type='text' placeholder='tName' className='form-control'style={{width:"400px"}} id='inp_name' />
     <input type='text' placeholder='Email' className='form-control'style={{width:"400px"}} id='inp_email' />
     <input type='text' placeholder='phone' className='form-control'style={{width:"400px"}} id='inp_phone' />
     <button type='submit' className='btn btn-success' onClick={()=>handleSave()} >Save</button>
     <button type='submit' className='btn btn-warning' >Clear</button>
     <button className='btn btn-danger' onClick={toggleModal}>Cancel</button>
     </div>
     </div>
     </div>
     </>
    
  )
}

export default Addpatient
