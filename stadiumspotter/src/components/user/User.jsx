import React from 'react'

export default function User(props) {
  return (
    <>
    <td><img src={"/images/"+props.image} style={{width:"35px",height:"35px"}}/></td>
    <td>{props.userName}</td>
    <td>{props.firstName} {props.lastName}</td>
    <td>{props.emailAddress}</td>
    <td>{props.phoneNumber}</td>
    <td>{props.role}</td>
    <td><button className="btn btn-outline-secondary" onClick={() => props.viewEdit(props._id)}>Edit</button></td>
    <td><button className="btn btn-outline-secondary" onClick={() => props.deleteUser(props._id)}>Delete</button></td>
    </>
  )
}
