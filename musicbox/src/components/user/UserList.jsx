import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import User from './User'
import UserEditForm from './UserEditForm';

export default function UserList(props) {
    console.log(props);

    const [users, setUsers] = useState([])
    const [isEdit, setIsEdit] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    // const [superUser,setSuperUser]=useState(superData);

    const passTokenHeader=()=>{
        const header={
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    }
    return header;
    }

    useEffect(() => {
        // setSuperUser(superData);
        // Call API
        allUsersList()
    }, [])

    

    const allUsersList = () => {
        Axios.get('user/index', {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then((res) => {
            console.log(res);
            setUsers(res.data.alluser)
        })
        .catch((err) => {
            console.log(err)
        })
        // console.log("superUser",superUser);
    }

    const viewEdit = (id) => {
        console.log(id);
        Axios.get(`user/edit?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res => {
            // console.log(res.data.editUser);
            console.log("Loaded User Information");
            let user = res.data.editUser ;
            setIsEdit(!isEdit);
            setCurrentUser(user)
        })
        .catch(err => {
            console.log("Error Loading User Information");
            console.log(err);
        })

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
            allUsersList();
            setIsEdit(false)
        })
        .catch(err => {
            console.log("Error Updating User Info");
            console.log(err);
        })
    }

    const deleteUser = (id) => {
        Axios.delete(`user/delete?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res => {
            console.log("User Deleted Successfully");
            console.log(res);
            allUsersList();
        })
        .catch(err => {
            console.log("Error Deleting User");
            console.log(err);
        })
    }


    const allUsers = users.map((user, index) => (
        <tr key={index}>
            <User {...user} viewEdit={viewEdit} deleteUser={deleteUser} />
        </tr>
    ))

  return (
    <div>
        <h1>Users List</h1>
        <div className='d-flex '>

        {(isEdit) && <UserEditForm key={currentUser._id} user={currentUser} updateUser={updateUser} superUser={props.superData} />}
        
            <table className=' justify-content-center table w-100 table-bordered '>
                <tbody>
                    <tr>
                        <th class="   table-success ">User Image</th >
                        <th  class="   table-success "  >UserName</th>
                        <th  class="   table-success ">Full Name</th>
                        <th  class="   table-success ">Email</th>
                        <th  class="   table-success ">Phone Number</th>
                        <th  class="   table-success ">Role</th>
                        <th  class="   table-success ">Edit</th>
                        <th  class="   table-success ">Delete</th>
                    </tr>
                    {allUsers}
                </tbody>
            </table>
            </div>
       
       
    </div>
  )
}
