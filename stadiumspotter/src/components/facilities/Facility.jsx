import React from 'react'

export default function Facility(props) {
  const editFacility =(e)=>{
  props.edit(props._id);
  props.changeToEdit();
  }
  return (
    <>
    <td>{props.facility}</td>
    <td><img src={"/images/"+props.image} style={{width:"35px",height:"35px"}}/></td>
    <td><button onClick={editFacility}>Edit</button></td>
    <td><button onClick={()=>props.delete(props._id)}>Delete</button></td>
    </>
  )
}
