import React from 'react'

export default function Reservation(props) {
  return (
    <>
    {/* <td></td> */}
    <td>{props.date}</td>
    <td>{props.startTime}</td>
    <td>{props.endTime}</td>
    <td>{props.Status}</td>
    <td>{props.price}</td>
    <td>{props.user.userName}</td>
    <td>{props.stadiumName}</td>
    <td><button onClick={ () => props.edit(props._id) }>Edit</button></td>
    </>
  )
}
