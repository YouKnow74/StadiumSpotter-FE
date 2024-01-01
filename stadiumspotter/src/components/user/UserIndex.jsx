import Axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function UserIndex({user}) {

   console.log(user);

  return (

    <div>
        <h1>Profile</h1>
        {/* 
        user && is to make sure we fetched the user first 
        then show the page content because when refreshing the page without (user &&) condition it gives an error 
        */}
        {user && <div><img src={"/images/"+user.image} style={{width:"35px",height:"35px"}}/></div>}
        {user &&<div>{user.userName}</div>}
        {user &&<div>{user.firstName} {user.lastName}</div>}
        {user &&<div>{user.emailAddress}</div>}
        {user &&<div>{user.phoneNumber}</div>}
        {user &&<div>{user.role}</div>}
    </div>
  )
}


