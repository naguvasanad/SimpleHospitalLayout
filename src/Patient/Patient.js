import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import "./Patient.css";
import Edit from "./Edit";
import PatientCard from "../PatientCard/PatientCard";



const Patient = () => {
  const [users, setUsers] = useState([]);
  const [addpatient, setAddPatient] = useState(false);
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [file, setFile] = useState(null);
  const [lastPatientSavedId, setLastPatientSavedId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  const [editFormData, setEditFormData] = useState({
    FirstName: "",
    Email: "",
    Phone: "",
  });

  useEffect(() => {
    fetch("http://localhost:5001/patients")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []); // Added dependency array to run only once

  const HandleSearchName = (e) => {
    setName(e.target.value);
  };
  const HandleOnClick = (e, user) => {
    e.preventDefault();

    fetch(`http://localhost:5001/deletepatients/${user.id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("deleted " + user.FirstName);
      })
      .catch((err) => console.log(err));
  };

  const HandleEdit = (e, user) => {
    e.preventDefault();
    setEditId(user.id);
    setEditFormData({
      FirstName: user.FirstName,
      Email: user.Email,
      Phone: user.Phone,
    });
    setModal(!modal);
    fetch(`http://localhost:5001/updatepatients/${user.id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ FirstName: "", Email: "", Phone: "" }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  // Add New Patient
  const handleSave = () => {
    var name = document.getElementById("inp_name");
    var email = document.getElementById("inp_email");
    var phone = document.getElementById("inp_phone");
    var image = document.getElementById("img_id");
    var newPatient = {
      Name: name.value,
      Email: email.value,
      Phone: phone.value,
      id: 0,
    };
    fetch("http://localhost:5001/insertNewPatient", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPatient }),
    })
      .then((response) => response.json())
      .then((json) => {
        alert(json.message);
        setLastPatientSavedId(json.patientId);   
             })
      .catch((err) => console.log(err));
  };


  const toggleModal = () => {
    setAddPatient(!addpatient);
  };

  const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      }; 

  
  
  const indexOfLastPatient = currentPage * pageSize;
const indexOfFirstPatient = indexOfLastPatient - pageSize;
const currentPatients = users.slice(indexOfFirstPatient, indexOfLastPatient);

const totalPages = Math.ceil(users.length / pageSize);

const handlePageSize = (e) => {
  const value = parseInt(e.target.value, 10); // Convert to number

  if (!isNaN(value) && value > 0) {
    setPageSize(value);
  } else {
    setPageSize(10); // Default fallback
  }
};


  return (
    <div>
      {modal && <Edit user={editFormData} />}

      {addpatient && (
        <div className="modal_content">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="col-4">
            <h1>Add new Patient</h1>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                style={{ width: "400px" }}
                id="inp_name"
              />
              <input
                type="text"
                placeholder="Email"
                className="form-control"
                style={{ width: "400px" }}
                id="inp_email"
              />
              <input
                type="text"
                placeholder="phone"
                className="form-control"
                style={{ width: "400px" }}
                id="inp_phone"
              />
              <div>
                <input type="file" onChange={handleFileChange} id="img_id" />
              </div>
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => handleSave()}>
                Save
              </button>
              <button type="submit" className="btn btn-warning">
                Clear
              </button>
              <button className="btn btn-danger" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="btn btn-primary"
        style={{ margin: "10px" }}
        onClick={toggleModal}
      >
        Add Patient{" "}
      </button>
      <input
        type="search"
        onChange={HandleSearchName}
        placeholder="Search by name">
      </input>

      <div>
        <label>Enter Page Size</label>
        <input type="number" value={pageSize} onChange={(e)=>handlePageSize(e)}/>
        <div className="pagination">
           <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      Previous
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={currentPage === i + 1 ? 'active' : ''}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
        </div>
      </div>


       
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            //users.filter(fname=>fname.name.includes(name)).map((user, index) => {
            currentPatients.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.FirstName}</td>
                  <td>
                    <img src="../Image/actor1.jpg" alt="Student" style={{width:'100px',height:'100px'}}/>
                  </td>
                  <td>{user.Email}</td>
                  <td>{user.Phone}</td>
                  <td style={{ color: "red" }}>
                    <buttton onClick={(e) => HandleOnClick(e, user)}>
                      <MdOutlineDeleteSweep />
                    </buttton>
                  </td>
                  <td style={{ color: "blue" }}>
                    <button>
                      <CiEdit />
                    </button>
                 </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
      {/* <PatientCard users={users}/> */}
    </div>
  );
};

export default Patient;
