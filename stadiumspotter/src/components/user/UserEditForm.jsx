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
            <form onSubmit={saveUpdatedUser} encType="multipart/form-data">
            <div>
                    <label>Profile Image</label>
                    <input type='file' name='image' onChange={handleImage} className='form-control'></input>
                </div>
                <div>
                    <label>First Name</label>
                    <input type='text' name='firstName' value={currentUser.firstName} onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <label>Last Name</label>
                    <input type='text' name='lastName' value={currentUser.lastName} onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <label>Username</label>
                    <input type='text' name='userName' value={currentUser.userName} onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <label>Email Address</label>
                    <input type='email' name='emailAddress' value={currentUser.emailAddress} onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <label>Phone Number</label>
                    <input type='text' name='phoneNumber' value={currentUser.phoneNumber} onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <p>Why are you using Stadium Spotter?</p>
                    <div>
                        <label htmlFor="stadiumOwner">Stadium Owner</label>
                        <input
                         className='form-check-input'
                         type="radio" 
                         name="role" 
                         id="stadiumOwner" 
                         value="stadium owner"
                         checked={currentUser.role === 'stadium owner'}
                         onChange={handleChange}
                         ></input>
                    </div>
                    <div>
                        <label hrmlfor='renter'>Booking a Stadium</label>
                        <input 
                        className='form-check-input' 
                        type='radio' 
                        name='role' 
                        id='renter'
                        value="renter"
                        checked={currentUser.role === 'renter'}
                        onChange={handleChange}
                        ></input>
                    </div>
                    {props.superUser &&(props.superUser.role === 'Admin') && 
                    <div>
                        <label htmlFor='Admin'>Admin</label>
                        <input 
                        className='form-check-input' 
                        type='radio' 
                        name='role' 
                        id='Admin'
                        value="Admin"
                        checked={currentUser.role === 'Admin'}
                        onChange={handleChange}
                        ></input>
                    </div>
                     }
                </div>

                <div>
                    <label>Password</label>
                    <input type='password' name='password' onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <input type='submit' value='Save' className='btn btn-primary'></input>
                </div>
            </form>
        </div>
    )
}