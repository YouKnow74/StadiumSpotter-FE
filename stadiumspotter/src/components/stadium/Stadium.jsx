import React from 'react'
import StadiumCreateForm from './StadiumCreateForm'
import StadiumList from './StadiumList'

export default function Stadium(props) {
  
  return (

    <>
    <img className='bd-placeholder-img card-img-top' style={{width: "100%", height: "225px"}} src={"/images/"+props.image}/>
    <div className='card-body'>
      <h2>{props.name}</h2>
      <h5 className='card-subtitle mb-2 text-body-secondary'>{props.category.category} Stadium</h5>
      <p className='card-text'>{props.descriptin}</p>
      <div className='mb-1 text-body-secondary'>Stadium Size: {props.size}</div>
      <div className='mb-1 text-body-secondary'>Location: {props.location}</div>
      <h6>Facilities:</h6>
      <ul className='list-group'>{props.facilities.map((fac, index) => (
                    <li className='list-group-item' key={index}>{fac.facility}</li>
                    ))}</ul>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='btn-group'>
        <button type='button' className='btn btn-sm btn-outline-secondary' onClick={()=>props.edit(props._id)}>Edit</button>
        <button type='button' className='btn btn-sm btn-outline-secondary' onClick={()=>props.delete(props._id)}>Delete</button>
        </div>
        <button type='button' className='btn btn-sm btn-success' onClick={()=>props.reserve(props._id)}>Reserve</button>
      </div>
    </div>
{/*     
               <td>{props.name}</td>
               <td>{props.descriptin}</td>
               <td>{props.size}</td>
               <td>{props.location}</td>
               <td>{props.facilities.map((fac, index) => (
                    <p key={index}>{fac.facility}</p>
                    ))}</td>
               <td>{props.category.category}</td>
               <td>{props.price}</td>

               <td><img src={"/images/"+props.image} style={{width:"35px",height:"35px"}}/></td>
                 
               <td><button onClick={()=>props.reserve(props._id)}>Reserve</button></td>

               <td><button onClick={()=>props.edit(props._id)}>Edit</button></td>
               <td><button onClick={()=>props.delete(props._id)}>Delete</button></td> */}

    </>
  )
}
