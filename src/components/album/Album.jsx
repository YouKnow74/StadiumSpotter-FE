import React from 'react';


export default function Album(props) {

  return (
    <>
        <td >{props.category}</td>
        <td><img src={"/images/"+props.image} style={{width:"35px",height:"35px"}}/></td>
        <td>{props.library.map((oneLibrary,index)=>(
            <p key={index}>{oneLibrary.name}</p>
        ))}</td>
        <td><button class="btn btn-outline-secondary" onClick={()=>props.delete(props._id)}>Delete</button></td>
    </>
  )
}
