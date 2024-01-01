import Axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function UserIndex({user}) {

   console.log(user);

  return (

    <div>
        <h1>Profile</h1>
        <div><img src='' alt='...'/></div>
        {user &&<div>{user.userName}</div>}
        {user &&<div>{user.firstName} {user.lastName}</div>}
        {user &&<div>{user.emailAddress}</div>}
        {user &&<div>{user.phoneNumber}</div>}
        {user &&<div>{user.role}</div>}
    </div>
  )
}


