import Axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function UserEditForm(props) {

    const [newUser, setNewUser] = useState(props.user)
    const [image,setImage]=useState("");

    const navigate = useNavigate();

    const handleImage=(e)=>{
        console.log(e.target.files);
        setImage(e.target.files[0])
        console.log("image");
      }

    const handleChange = (e) => {
        const user = {...newUser};
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }
    // const editProfile = (id) => {
    //     Axios.get(`user/edit?id=${id}`)
    //     .then((res) => {
    //         console.log(res.data.user);
    //         console.log("User Info Loaded");
    //         let user = res.data.user;
    //         setNewUser(user)
    //     })
    //     .catch((err) => {
    //         console.log("Error loading user info");
    //         console.log(err);
    //     })
    // }

    
    const updateProfile = (user) =>{
        Axios.get('user/update', user)
        .then((res) => {
            console.log("User info updated successfulyy!");
            console.log(res);
            navigate('/profile')
        })
        .catch((err) => {
            console.log("Error updating user info");
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={updateProfile} encType='multipart/form-data'>
                <div>
                    <label>First Name</label>
                    <input value={newUser.firstName} type='text' name='firstName' onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <label>Last Name</label>
                    <input type='text' name='lastName' onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <label>Username</label>
                    <input type='text' name='userName' onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <label>Email Address</label>
                    <input type='email' name='emailAddress' onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <label>Phone Number</label>
                    <input type='text' name='phoneNumber' onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <p>Why are you using Stadium Spotter?</p>
                    <div>
                        <label for="stadiumOwner">Stadium Owner</label>
                        <input
                         className='form-check-input'
                         type="radio" 
                         name="role" 
                         id="stadiumOwner" 
                         value="stadium owner" 
                         onChange={handleChange}
                         ></input>
                    </div>
                    <div>
                        <label for='renter'>Booking a Stadium</label>
                        <input 
                        className='form-check-input' 
                        type='radio' 
                        name='role' 
                        id='renter'
                        value="renter"
                        onChange={handleChange}
                        ></input>
                    </div>
                </div>

                <div>
                    <label>Password</label>
                    <input type='password' name='password' onChange={handleChange} className='form-control'></input>
                </div>

                <div>
                    <label>Image Upload</label>
                    <input type='file' name='image' onChange={handleImage} className='form-control'></input>
                </div>

                <div>
                    <input type='submit' value='Update profile' className='btn btn-primary'></input>
                </div>
            </form>
            {/* <button onClick={() => editProfile}></button> */}
        </div>
    )
}