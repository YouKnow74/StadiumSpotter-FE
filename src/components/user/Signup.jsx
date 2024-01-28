import React, { useState } from 'react';

export default function Signup(props) {
  const [newUser, setNewUser] = useState({});
  const [image, setImage] = useState('');

  const handleImage = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
    console.log('image');
  };

  const handleChange = (e) => {
    const user = { ...newUser };
    user[e.target.name] = e.target.value;
    console.log(user);
    setNewUser(user);
  };

  const registerHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user', JSON.stringify(newUser));
    formData.append('image', image);
    props.register(formData);
    e.target.reset();
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={registerHandler} encType="multipart/form-data">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            className="form-control green-border focus-ring focus-ring-success"
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            className="form-control green-border focus-ring focus-ring-success"
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            className="form-control green-border focus-ring focus-ring-success"
          />
        </div>

        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="emailAddress"
            onChange={handleChange}
            className="form-control green-border focus-ring focus-ring-success"
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            className="form-control green-border focus-ring focus-ring-success"
          />
        </div>

        <div>
          <p>Why are you joining Music Box Library?</p>
          <div>
            <label htmlFor="libraryAdmin">Library Admin</label>
            <input
              className="form-check-input green-border focus-ring focus-ring-success"
              type="radio"
              name="role"
              id="libraryAdmin"
              value="admin"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="renter">Booking from Library</label>
            <input
              className="form-check-input green-border focus-ring focus-ring-success"
              type="radio"
              name="role"
              id="renter"
              value="renter"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control green-border focus-ring focus-ring-success"
          />
        </div>

        <div>
          <label>Image Upload</label>
          <input
            type="file"
            name="image"
            onChange={handleImage}
            className="form-control green-border focus-ring focus-ring-success"
          />
        </div>

        <div>
          <input
            type="submit"
            value="Register"
            className="btn btn-success my-button"
          />
        </div>


      </form>
    </div>
  );

  
}

