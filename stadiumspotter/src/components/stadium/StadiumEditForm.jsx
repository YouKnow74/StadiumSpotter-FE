import React, { useState } from 'react';
import locations from './location';

export default function StadiumEditForm({stadium,update,facilities,sports}) {
  
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
    e.target.reset();
  }

  return (
    <div>

    <h2>Stadium Edit Form</h2>
    <img src={"/images/"+editStadium.image} width={50} height={50} style={{border: "1px solid red"}}/>
    <form onSubmit={updateStadium} encType="multipart/form-data">

      <div>
        <label>Stadium Name:</label>
        <input type='text' name="name"  onChange={handleChange} value={editStadium.name}/>
      </div>

      <div>
        <label>Stadium Description:</label>
        <input type='text' name="descriptin"  onChange={handleChange} value={editStadium.descriptin}/>
      </div>

      <div>
        <label>Stadium Size:</label>
        <input type='text' name="size"  onChange={handleChange} value={editStadium.size}/>
      </div>

      <div>
        <label>Stadium Price:</label>
        <input type='text' name="price"  onChange={handleChange} value={editStadium.price}/>
      </div>
  
      <div>
        <label>Stadium Location:</label>
        {/*should be a dropdown select option TO BE EDITED */ }
        {/* <input type='text' name="location"  onChange={handleChange} value={editStadium.location}/> */}
        <select name='location' onChange={handleChange} value={editStadium.location}>
           {locations.map((oneLocation, index) => (
            <option key={index} value={oneLocation}>{oneLocation}</option>
              ))}
        </select>
      </div>

      <div>
        <label>Stadium image:</label>
        <input type='file' name="image" id='image' onChange={handleImage} />
      </div>

      <div>
        <label>Stadium Sports:</label>
        <p>Selected</p>
        <input value={editStadium.category.category} disabled/>
        <p>New Value</p>
        <select type="text" name='category'  onChange={handleChange}>
          {sports.map((oneSport,index) => (
            <option key={index} value={oneSport._id}>{oneSport.category}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Stadium Facilites:</label>
        <p>already selected</p>
        <select multiple='multiple' disabled>
          {editStadium.facilities.map((oneFacility,index)=>(
            <option key={index} >{oneFacility.facility}</option>
          ))}
        </select>
        <p>change</p>
        <select type="text" name='facilities' multiple='multiple' onChange={handleMultiple} value={facilitesArr}>
          {facilities.map((oneFacility,index)=>(
            <option key={index} value={oneFacility._id}>{oneFacility.facility}</option>
          ))}
        </select>
      </div>

      {/* 

      IMPORTANT TO BE ADDED IN THE DATA 

      <input type='hidden' value={userid} name='user' /> 
      
      */}
      <button type='submit'>Update Stadium</button>
    </form>

    
    </div>
  )
}
