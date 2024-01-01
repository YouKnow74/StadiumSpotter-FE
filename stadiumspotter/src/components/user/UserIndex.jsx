import Axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserEditForm from './UserEditForm';

export default function UserIndex({user,getUser,superUser}) {

const [isEdit, setIsEdit] = useState(false);
const [userInfo,setUserInfo]= useState({user});
let getUserInfo;

useEffect(() => {
  // fetch the user 
  getUserInfo= getUser();
  // save the id value directly not as an object
  getUserInfo = getUserInfo.id
  // Call API
  userInfoFetch();

 console.log("get user Info",getUserInfo);
}, [])

const userInfoFetch = () => {
  // getUserInfo is an ID that have a begining and changes when the user updates
  // fetch || refetch the user data to keep list updated
  Axios.get(`user/detail?id=${getUserInfo}`, {
      headers: {
          "Authorization":"Bearer "+localStorage.getItem("token")
          }
  })
  .then((res) => {
      console.log(res);
      setUserInfo(res.data.userDetail)
  })
  .catch((err) => {
      console.log(err)
  })
}

  
  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  const updateUser = (user) => {
    Axios.put('user/update', user, {
      headers: {
          'Content-Type' : 'multipart/form-data',
          "Authorization":"Bearer "+localStorage.getItem("token")
          }
  })
    .then(res => {
        console.log("User Updated Successfully!");
        console.log(res);
        setIsEdit(false);
        //after the user update the new data should come on display in the next 2 lines
        setUserInfo(res.data.userUpdate);
        getUserInfo = res.data.userUpdate._id
        userInfoFetch();
    })
    .catch(err => {
        console.log("Error Updating User Info");
        console.log(err);
    })
}


  return (

    <div>
        <h1>Profile</h1>
        {/* 
        user && is to make sure we fetched the user first 
        then show the page content because when refreshing the page without (user &&) condition it gives an error 
        */}
        {user && <div><img src={"/images/"+userInfo.image} style={{width:"35px",height:"35px"}}/></div>}
        {user &&<div>{userInfo.userName}</div>}
        {user &&<div>{userInfo.firstName} {userInfo.lastName}</div>}
        {user &&<div>{userInfo.emailAddress}</div>}
        {user &&<div>{userInfo.phoneNumber}</div>}
        {user &&<div>{userInfo.role}</div>}
        <button onClick={handleClick}>Edit</button>

        {isEdit && <UserEditForm user={userInfo} setIsEdit={setIsEdit} updateUser={updateUser} superUser={superUser}/>}
    </div>
  )
}


