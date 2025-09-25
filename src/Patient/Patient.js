import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import "./Patient.css"
import Edit from "./Edit";
import Addpatient from "./Addpatient";
//import { Link } from "react-router-dom";


const Patient = () => {
  const [users, setUsers] = useState([]);
  const[addpatient,setAddPatient] = useState(false);
  const [needRefresh,setNeedRefresh] = useState(false);
  const [name,setName] = useState('');
  const [modal,setModal] = useState(false);
  const [editId, setEditId] = useState(null);
const [editFormData, setEditFormData] = useState({
  "FirstName": '',
  "Email": '',
  "Phone": ''
});

  useEffect(() => {
    fetch("http://localhost:5001/patients")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []); // Added dependency array to run only once

  const HandleSearchName = (e) =>{
    setName(e.target.value);
     
    
   }
   const HandleOnClick=(e,user)=>{
     e.preventDefault();
     
    fetch(`http://localhost:5001/deletepatients/${user.id}`,{method:'delete'})
    .then((res)=> res.json())
    .then((data)=>{ alert('deleted '+user.FirstName)})
    .catch((err)=>console.log(err));
   }

   const HandleEdit=(e,user)=>{
    e.preventDefault();
    setEditId(user.id);
    setEditFormData({
      FirstName:user.FirstName,
      Email:user.Email,
      Phone:user.Phone
    })
       setModal(!modal);
       fetch(`http://localhost:5001/updatepatients/${user.id}`,{method:'post',
      headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ FirstName: "", Email: "", Phone: "" })
    })
    .then((res)=> res.json())
    .then((data)=> console.log(data))
    .catch((err)=>console.log(err));
   }

   // Add New Patient
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
    setAddPatient(!addpatient)
  }

  return (
  
      <div>

      {modal &&(   
        <Edit user={editFormData}/>    
          )}

          {addpatient &&(
             <div className='modal_content'>
             <div onClick={toggleModal} className='overlay'></div>
            <div className='col-4'>
            <h1>Add new Patient</h1>
       
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
            
          )}
       <button className='btn btn-primary'  style={{margin:"10px"}} onClick={toggleModal} >Add Patient </button>
      <input type="search" onChange={HandleSearchName} placeholder="Search by name"></input>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
             <th>Email</th>
            <th>Phone</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
      <tbody>
      {//users.filter(fname=>fname.name.includes(name)).map((user, index) => {
        users.map((user, index) => {
       return(
      <tr key={index}>
        <td>{user.id}</td>
        <td>{user.FirstName}</td>
        <td>{user.Email}</td>
        <td>{user.Phone}</td>
        <td style={{color:'red'}}><buttton onClick={(e)=>HandleOnClick(e,user)}><MdOutlineDeleteSweep /></buttton></td>
        <td  style={{color:'blue'}}>
          <button ><CiEdit/></button>
          {/* <Link to={<Edit/>}></Link> */}
          </td>
      </tr>
       );   
        
})}
</tbody>
</Table>
    </div>
  
  );
};

export default Patient;
