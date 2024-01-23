import React from 'react'
import LibraryCreateForm from './LibraryCreateForm'
import LibraryList from './LibraryList'

export default function Library(props) {
  
  return (

    <>
    <img className='bd-placeholder-img card-img-top' style={{width: "100%", height: "225px"}} src={"/images/"+props.image}/>
    <div className='card-body'>
      <h2>{props.name}</h2>
      <h5 className='card-subtitle mb-2 text-body-secondary'>{props.category.category} Library</h5>
      <p className='card-text'>{props.descriptin}</p>
      <div className='mb-1 text-body-secondary'>Library Size: {props.size}</div>
      <div className='mb-1 text-body-secondary'>Location: {props.location}</div>
      <h6>Communities:</h6>
      <ul className='list-group'>{props.communities.map((com, index) => (
                    <li className='list-group-item' key={index}>{com.community}</li>
                    ))}</ul>
      <div className='d-flex justify-content-between align-items-center'>
        {}
        {
          
          props.userDetails &&
          (props.userDetails.role=="Admin") &&
        <div className='btn-group'>
        <button type='button' className='btn btn-sm btn-outline-secondary' onClick={()=>props.edit(props._id)}>Edit</button>
        <button type='button' className='btn btn-sm btn-outline-secondary' onClick={()=>props.delete(props._id)}>Delete</button>
        </div>}
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
