import React from 'react'

export default function Stadium(props) {
  return (
    <>
    
               <td>{props.name}</td>
               <td>{props.descriptin}</td>
               <td>{props.size}</td>
               <td>{props.location}</td>
               <td>{props.facilities.map((fac, index) => (
                    <p key={index}>{fac.facility}</p>
                    ))}</td>
               <td>{props.category.category}</td>
               <td><button onClick={()=>props.edit(props._id)}>Edit</button></td>
    </>
  )
}
