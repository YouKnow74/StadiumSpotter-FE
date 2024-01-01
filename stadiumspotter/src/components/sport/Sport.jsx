import React from 'react';


export default function Sport(props) {

  return (
    <>
        <td>{props.category}</td>
        <td><img src={"/images/"+props.image} style={{width:"35px",height:"35px"}}/></td>
        <td>{props.stadium.map((oneStadium,index)=>(
            <p key={index}>{oneStadium.name}</p>
        ))}</td>
        <td><button onClick={()=>props.delete(props._id)}>Delete</button></td>
    </>
  )
}
