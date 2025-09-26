
import React, { useState,useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import"./Staff.css"

const Staff=()=>{
    const [staff,setStaff]=useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/staff")
          .then((res) => res.json())
          .then((data) => setStaff(data))
          .catch((err) => console.log(err));
      }, []);

      const HandleOnDelete=(e,staff)=>{
        e.preventDefault();
    fetch(`http://localhost:5001/deleteStaff/${staff.Staff_id}`,{method:'delete'})
       .then((res)=> res.json())
       .then((data)=>{ alert('deleted '+staff.StaffName)})
       .catch((err)=>console.log(err));
      }

    return(
        <div>
            <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Staff_Name</th>
            <th>StaffWork</th>
             <th>Email</th>
            <th>Phone</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
      <tbody>
      {//users.filter(fname=>fname.name.includes(name)).map((user, index) => {
        staff.map((staff, index) => {
       return(
      <tr key={index}>
        <td>{staff.Staff_id}</td>
        <td>{staff.StaffName}</td>
        <td>{staff.Staff_Work}</td>
        <td>{staff.Email}</td>
        <td>{staff.Phone}</td>
        <td style={{color:'red'}}><buttton onClick={(e)=>HandleOnDelete(e,staff)}><MdOutlineDeleteSweep /></buttton></td>
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

export default Staff;