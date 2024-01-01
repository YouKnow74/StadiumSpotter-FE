// import Axios from 'axios';
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// export default function UserIndex({user}) {
//     console.log(user);
//     // console.log(user.userName);


//   return (
//     <div>
//         <h1>Profile</h1>
//         <div><img src='' alt='...'/></div>
//         <div>{user.userName}</div>
//         <div>{user.firstName} {user.lastName}</div>
//         <div>{user.emailAddress}</div>
//         <div>{user.phoneNumber}</div>
//         <div>{user.role}</div>
//     </div>
//   )
// }


import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function UserIndex(props) {

    const id = useParams().id;
    console.log(id);
    const [userData, setUserData] = useState({})
    const [error, setError] = useState(null);

    // useEffect(() => {
    //   profileInfo();
    // }, [])

    useEffect(() => {
      const user = getUser();
      console.log(user);
      if(user){
        setIsAuth(true);
        setUser(user);
        console.log("user",user);
        Axios.get(`user/detail?id=${user.id}`)
        .then(res=>{
        console.log("user fetched");
        console.log(res);
        setUserDetails(res.data.userDetail);
        })
        .catch(err=>{
          console.log("User details not fetched");
          console.log(err);
        })
      }else{
        localStorage.removeItem("token");
        setIsAuth(false);
        setUser(null);
      }
    }, [])
  
    

    // const profileInfo = async () => {
    //   console.log(id);
    //   console.log(`user/detail?id=${id}`);
    //   await Axios.get(`user/detail?id=${id}`)
    //   .then(res => {
    //     console.log(res);
    //     const userDetail = res.data.userDetail
    //     setUserData(userDetail)
    //   })
    //   .catch(err => {
    //     // console.log("Error Fetching User Data");
    //     console.error("Error Fetching User Data",err);
    //     setError(err)
    //   })
    // }


    console.log(userData);

    if (error) {
      return <div>Error fetching data: {error.message}</div>;
    }

  return (
    <div>
        <h1>Profile</h1>
        <div><img src='' alt='...'/></div>
        <div>{userData.userName}</div>
        <div>{userData.firstName} {userData.lastName}</div>
        <div>{userData.emailAddress}</div>
        <div>{userData.phoneNumber}</div>
        <div>{userData.role}</div>
    </div>
  )
}