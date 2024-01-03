import Axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserEditForm from './UserEditForm';

export default function UserIndex({user,getUser,superUser}) {

const [isEdit, setIsEdit] = useState(false);
const [userInfo,setUserInfo]= useState({user});
// const [supUser,setSupUser]=useState({superUser});

let getUserInfo;

useEffect(() => {
  // fetch the user 
  getUserInfo= getUser();
  // save the id value directly not as an object
  getUserInfo = getUserInfo.id
  // Call API
  userInfoFetch();

 console.log("get user Info",getUserInfo);
//  loadSuperUser();

}, [])

// const loadSuperUser =()=>{
//   Axios.get(`user/detail?id=${supUser._id}`, {
//       headers: {
//           "Authorization":"Bearer "+localStorage.getItem("token")
//           }
//   })
//   .then(res=>{
//       console.log("super user fetched");
//       console.log(res);
//       setSupUser(res.data.userDetail)
//   })

//   .catch(err=>{
//   console.log("super User not fetched");
//   console.log(err);
//   })
  
// }
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
    setIsEdit(true)
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



        {user && <div><img className="ProfileImg" src={"/images/"+userInfo.image}/></div>}
        <div className='col-auto'>
        <label>
       

        {user &&<div className=' form-control border'>{userInfo.firstName} {userInfo.lastName}</div>}
        </label>
        </div>
        <label className=' p-2 ' >
        Usename:{user &&<div className='form-control border'>{userInfo.userName}</div>}
        </label>
           
        
      
  
        <label className=' p-2 '>
        Email Address:
        {user &&<div className='form-control border'>{userInfo.emailAddress}</div>}
        </label>
      
        
        <label className=' p-2 '>
        Phone Number:
        {user &&<div className='form-control border'>{userInfo.phoneNumber}</div>}
        </label>
        
        
        <label className=' p-2 '>
       Role:
        {user &&<div className='form-control1 border'>{userInfo.role}</div>}
        </label>
        <div className='col-auto'>
        <button  className="btn btn-outline-secondary" onClick={handleClick}>Edit</button>
        </div>
        {isEdit && <UserEditForm user={userInfo} setIsEdit={setIsEdit} updateUser={updateUser} superUser={superUser}/>}
       
       </div>
  
  )
}


