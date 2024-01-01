import Axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function UserList() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        // Call API
        allUsersList()
    }, [])

    const allUsersList = () => {
        Axios.get('user/index')
        .then((res) => {
            console.log(res);
            setUsers(res.data.alluser)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    const allUsers = users.map((user, index) => (
        <tr>
            <td>{user.image}</td>
            <td>{user.userName}</td>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.emailAddress}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.role}</td>
        </tr>
    ))

  return (
    <div>
        <h1>User List</h1>
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>User Image</th>
                        <th>UserName</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                    </tr>
                    {allUsers}
                </tbody>
            </table>
        </div>
    </div>
  )
}
