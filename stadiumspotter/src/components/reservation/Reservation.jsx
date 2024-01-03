import React from 'react'
import dayjs from 'dayjs'

export default function Reservation(props) {
  return (
    <>
    {/* <td></td> */}
    <td>{dayjs(props.date).format('YYYY-MM-DD')}</td>
    <td>{props.startTime}</td>
    <td>{props.endTime}</td>
    <td>{props.Status}</td>
    <td>{props.price}</td>
    <td>{props.stadiumName}</td>
    <td><button onClick={ () => props.edit(props._id) }>Edit</button></td>
    <td><button onClick={ () => props.delete(props._id) }>Delete</button></td>
    </>
  )
}
