import Axios from 'axios';
import React, { useState , useEffect } from 'react'

export default function UserEditForm(props) {

    const [currentUser, setCurrentUser] = useState(props.user)
    const [image,setImage]=useState("");

    
    // check for admin 
    console.log(props);

    const handleImage=(e)=>{
        console.log(e.target.files);
        // newStadium.image=e.target.files[0]
        setImage(e.target.files[0])
        console.log("image");
        // console.log(newStadium.image.name);
      }

    const handleChange = (e) => {
        const user = {...currentUser};
        user[e.target.name] = e.target.value;
        console.log(user);
        setCurrentUser(user);
    }

    const saveUpdatedUser = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("user",JSON.stringify(currentUser));
        formData.append("image",image)
        props.updateUser(formData);
    }

    return (
        
        <div>
            <h2> Edit User </h2>

            <form  className=" row g-2 " onSubmit={saveUpdatedUser} encType="multipart/form-data">

            <div className=" row g-2 p-2 ">
          <div className="col-12">
              <div className="row g-3  ">
                <div className='col-auto'> 
                    <label className="form-label">Profile Image:</label>
                    </div>
                    <div className='col-auto'>

                    <input type='file' name='image' className="form-control"onChange={handleImage}></input>
                    </div>
                    </div>

                    </div>
                </div>
                <div className="col-12">
              <div className="row g-2 p-2 ">
                <div className='col-auto'>
                    <label className="form-label" >First Name:</label>
                    </div>
                    <div className='col-auto'>

                    <input type='text' name='firstName' value={currentUser.firstName} onChange={handleChange} className='form-control'></input>
                </div>
                </div>
                </div>

                <div className="col-12">
              <div className="row g-2 p-2 ">
                <div className='col-auto'>
                    <label className="form-label">Last Name:</label>
                    </div>
                    <div className='col-auto'>
                    <input className="form-control" type='text' name='lastName' value={currentUser.lastName} onChange={handleChange} ></input>
                </div>
                </div>
                </div>
              

                

<div className="col-12">
<div className="row g-2 p-2 ">
<div className='col-auto'>
          

                    <label className="form-label" >Username:</label>
                    </div>
                    <div className='col-auto'>   
                    <input type='text' name='userName' value={currentUser.userName} onChange={handleChange} className='form-control'></input>
                </div>
                </div>
                </div>
                <div className="col-12">
<div className="row g-2 p-2 ">
<div className='col-auto'>
                    <label className="form-label ">Email Address:</label>
                    </div>
                    <div className='col-auto'>   
                    <input type='email' name='emailAddress' value={currentUser.emailAddress} onChange={handleChange} className='form-control1'></input>
                </div>
                </div>
                </div>

                <div className="col-12">
<div className="row g-2 p-2 ">
<div className='col-auto'>
                    <label  className="form-label" >Phone Number:</label>
                    </div>
                    <div className='col-auto'>             

                    <input type='text' name='phoneNumber' value={currentUser.phoneNumber} onChange={handleChange} className='form-control'></input>
                </div>
                </div>
                </div>

                 <div className="col-12">
              <div className="row g-2 p-2  ">
                <div className='col-auto'> 
                    <p>Why are you using Stadium Spotter?</p>
                 </div>
                 </div>
                 </div>
                 <div className="col-12">
              <div className="row g-2 p-2  ">
                <div className='col-auto'>
                        <input
                         className='form-check-input'
                         type="radio" 
                         name="role" 
                         id="stadiumOwner" 
                         value="stadium owner"
                         checked={currentUser.role === 'stadium owner'}
                         onChange={handleChange}
                         ></input>
                          <label className="form-label  p-1" htmlFor="stadiumOwner">Stadium Owner</label>
                    </div>
                    </div>
                    </div>
                    <div className="col-12">
              <div className="row g-2 p-2  ">
                <div className='col-auto'>           

                       
                        <input 
                        className=' form-check-input' 
                        type='radio' 
                        name='role' 
                        id='renter'
                        value="renter"
                        checked={currentUser.role === 'renter'}
                        onChange={handleChange}
                        ></input>
                         <label className="form-label  p-1" hrmlfor='renter'>Booking a Stadium</label>
                         </div>
                    </div>
                    </div>
                    <div className="col-12">
              <div className="row g-3 p-2  ">
                <div className='col-auto'>
                    {props.superUser &&(props.superUser.role === 'Admin') && 
                     <div className='col-auto'> 
                        <input 
                        className='form-check-input' 
                        type='radio' 
                        name='role' 
                        id='Admin'
                        value="Admin"
                        checked={currentUser.role === 'Admin'}
                        onChange={handleChange}
                        ></input>
                        <label className="form-label  p-1" htmlFor='Admin'>Admin</label>
                    </div>
                   
                     }
                         </div>
                       </div>
</div>
                <div className="col-12">
              <div className="row g-2 p-2  ">
                <div className='col-auto'> 
                    <label className="form-label" >Password</label>
                    </div>
                    <div className='col-auto'>          
                    <input type='password' name='password' onChange={handleChange} className='form-control'></input>
                </div>
                </div>
                </div>
                <div>
                    <input type='submit' value='Save' className="d-flex btn btn-success  p-2 m-3 g-2 "></input>
                </div>
                
            </form>
        </div>
      
    )
}