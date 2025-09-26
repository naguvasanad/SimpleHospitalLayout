import React, { useState,useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import "./Doctor.css"

const Doctor=()=>{
    const [doctor,setDoctor]=useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/doctor")
          .then((res) => res.json())
          .then((data) => setDoctor(data))
          .catch((err) => console.log(err));
      }, []);

      

      const HandleOnDelete=(e,doctor)=>{
        e.preventDefault();
    fetch(`http://localhost:5001/deleteDoctor/${doctor.Doc_id}`,{method:'delete'})
       .then((res)=> res.json())
       .then((data)=>{ alert('deleted '+doctor.DoctorName)})
       .catch((err)=>console.log(err));
      }

    return(
        <div>
            <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor_Name</th>
            <th>Speciality</th>
             <th>Email</th>
            <th>Phone</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
      <tbody>
      {//users.filter(fname=>fname.name.includes(name)).map((user, index) => {
        doctor.map((doctor, index) => {
       return(
      <tr key={index}>
        <td>{doctor.Doc_id}</td>
        <td>{doctor.DoctorName}</td>
        <td>{doctor.Doc_specality}</td>
        <td>{doctor.Email}</td>
        <td>{doctor.Phone}</td>
        <td style={{color:'red'}}><buttton onClick={(e)=>HandleOnDelete(e,doctor)}><MdOutlineDeleteSweep /></buttton></td>
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
}

export default Doctor;