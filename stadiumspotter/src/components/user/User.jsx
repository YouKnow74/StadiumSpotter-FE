import React from 'react'

export default function User(props) {
  return (
    <>
    <td>{props.image}</td>
    <td>{props.userName}</td>
    <td>{props.firstName} {props.lastName}</td>
    <td>{props.emailAddress}</td>
    <td>{props.phoneNumber}</td>
    <td>{props.role}</td>
    <td><button onClick={() => props.viewEdit(props._id)}>Edit</button></td>
    <td><button onClick={() => props.deleteUser(props._id)}>Delete</button></td>
    </>
  )
}
