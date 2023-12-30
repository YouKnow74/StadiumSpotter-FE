import React from 'react';


export default function Sport(props) {

  return (
    <>
        <td>{props.category}</td>
        <td>{props.image}</td>
        <td>{props.stadium.map((oneStadium,index)=>(
            <p key={index}>{oneStadium.name}</p>
        ))}</td>
        <td><button onClick={()=>props.delete(props._id)}>Delete</button></td>
    </>
  )
}
