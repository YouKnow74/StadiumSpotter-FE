import React, { useState } from 'react';
import locations from './location';

export default function StadiumEditForm({stadium,update,facilities,sports, setIsEdit,user}) {
  
  const [editStadium,setEditStadium]=useState(stadium);
  const [facilitesArr,setfacilitesArr]=useState(editStadium.facilities);
  const [image,setImage]=useState("");

  const handleImage=(e)=>{
    console.log(e.target.files);
    // newStadium.image=e.target.files[0]
    setImage(e.target.files[0])
    console.log("image");
    // console.log(newStadium.image.name);
  }

  const handleMultiple =(e)=>{
    const facArr = Array.from(e.target.selectedOptions, (option)=>option.value);
    setfacilitesArr(facArr);
  }

  const handleChange = (e)=>{
    const updatedStadium = {...editStadium};
    updatedStadium[e.target.name] = e.target.value;
    console.log(updatedStadium);
    setEditStadium(updatedStadium);
  }
  
  const updateStadium = (e)=>{
    e.preventDefault();
    editStadium.facilities = facilitesArr;
    const formData = new FormData();
    formData.append("stadium",JSON.stringify(editStadium));
    formData.append("image",image);
    update(formData);
    setIsEdit(false);
    e.target.reset();
  }

  return (
    <div>

    <h2>Stadium Edit Form</h2>
    <img src={"/images/"+editStadium.image} className='myImg'/>
    <form onSubmit={updateStadium} encType="multipart/form-data">

      <div>
        <label className='form-label'>Stadium Name:</label>
        <input className='form-control green-border focus-ring focus-ring-success' type='text' name="name"  onChange={handleChange} value={editStadium.name}/>
      </div>

      <div>
        <label className='form-label'>Stadium Description:</label>
        <input className='form-control green-border focus-ring focus-ring-success' type='text' name="descriptin"  onChange={handleChange} value={editStadium.descriptin}/>
      </div>

      <div>
        <label className='form-label'>Stadium Size:</label>
        <input className='form-control green-border focus-ring focus-ring-success' type='text' name="size"  onChange={handleChange} value={editStadium.size}/>
      </div>

      <div>
        <label className='form-label'>Stadium Price:</label>
        <input className='form-control green-border focus-ring focus-ring-success' type='text' name="price"  onChange={handleChange} value={editStadium.price}/>
      </div>
  
      <div>
        <label className='form-label'>Stadium Location:</label>
        {/*should be a dropdown select option TO BE EDITED */ }
        {/* <input type='text' name="location"  onChange={handleChange} value={editStadium.location}/> */}
        <select className='form-control green-border focus-ring focus-ring-success' name='location' onChange={handleChange} value={editStadium.location}>
           {locations.map((oneLocation, index) => (
            <option key={index} value={oneLocation}>{oneLocation}</option>
              ))}
        </select>
      </div>

      <div>
        <label className='form-label'>Stadium image:</label>
        <input className='form-control green-border focus-ring focus-ring-success' type='file' name="image" id='image' onChange={handleImage} />
      </div>

      <div>
        <label className='form-label'>Stadium Sports:</label>
        <p>Selected</p>
        <input className='form-control green-border focus-ring focus-ring-success' value={editStadium.category.category} disabled/>
        <p>New Value</p>
        <select className='form-control green-border focus-ring focus-ring-success' type="text" name='category'  onChange={handleChange}>
          {sports.map((oneSport,index) => (
            <option key={index} value={oneSport._id}>{oneSport.category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className='form-label'>Stadium Facilites:</label>
        <p>Already Selected</p>
        <select className='form-control green-border focus-ring focus-ring-success' multiple='multiple' disabled>
          {editStadium.facilities.map((oneFacility,index)=>(
            <option key={index} >{oneFacility.facility}</option>
          ))}
        </select>
        <p>Change To</p>
        <select className='form-control green-border focus-ring focus-ring-success' type="text" name='facilities' multiple='multiple' onChange={handleMultiple} value={facilitesArr}>
          {facilities.map((oneFacility,index)=>(
            <option key={index} value={oneFacility._id}>{oneFacility.facility}</option>
          ))}
        </select>
      </div>

      {/* 

      IMPORTANT TO BE ADDED IN THE DATA 

      <input type='hidden' value={userid} name='user' /> 
      
      */}
     {user && user.role == "Admin" ?<button className='btn btn-success my-button' type='submit'>Update Stadium</button>:""}
    </form>

    
    </div>
  )
}
