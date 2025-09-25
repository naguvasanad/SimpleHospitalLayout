import React, { useRef, useState } from "react";
import "./Edit.css"

const Edit=(props)=>{
     const [showmodal,setShowmodal] =useState(false);
     const [firstName,setFirstName] = useState(props.user.FirstName);
     const [email,setEmail] = useState(props.user.Email);
     const [phone,setPhone] = useState(props.user.Phone);
     
     //const [editFormData, setEditFormData] = useState({ FirstName: '', Email: '', Phone: '' });
    //  const toggleModal=(user)=>{
    //     setEditFormData(user)
    //     setShowmodal(true)
    //  }
     const HandleCancel=(e)=>{
        e.preventDefault();
       
        setShowmodal(!showmodal);
     }

     const HandleUpdate=()=>{
        const userobj = {
            id:props.user.id,
            FName: firstName,
            Email: email,
            Phone: phone
          }
          alert(JSON.stringify(userobj));

        fetch(`http://localhost:5001/updatepatients/${userobj.id}`,{method:'put',
            headers: { 'Content-Type': 'application/json' },
          body: userobj
          })
          .then((res)=> res.json())
          .then((data)=> console.log(data))
          .catch((err)=>console.log(err));
     }
    //  const onFirtsNameChange=(e)=>{
    //    // alert(e.target.value);
    //     setFirstName(e.target.value);
    //  }

    //  const HandleNameChange=(e)=>{
    //     var name = e.target.value;
    //    editFormData(...editFormData,{FirstName:name})}
    return(
        //<div className="modal">
           <div className="modal-overlay">
               <div className="modal-content">
             
                    <h2>Update Here</h2>
            <input type="text" placeholder="Name" value={firstName}  onChange={(e)=>setFirstName(e.target.value)} />
            <input type="email" placeholder="Email" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
            <input type="num" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            <div className="modal-actions">
            <button onClick={()=>HandleUpdate()}>Update</button>
            <button className="close-button" onClick={(e)=>HandleCancel(e)}>Cancel</button>
            </div>
            </div>
           </div>
          // </div>
       
    );
}

export default Edit;