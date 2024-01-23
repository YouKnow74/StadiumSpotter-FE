import React from 'react'

export default function Community(props) {
  const editCommunity =(e)=>{
  props.edit(props._id);
  props.changeToEdit();
  }
  return (
    <>
    <td>{props.community}</td>
    <td><img src={"/images/"+props.image} style={{width:"35px",height:"35px"}}/></td>

    { props.user.role=="Admin" ? (
      <>
      <td><button onClick={editCommunity}>Edit</button></td>
    <td><button onClick={()=>props.delete(props._id)}>Delete</button></td>


    </>
    ):""
    }
    </>
  )
}
