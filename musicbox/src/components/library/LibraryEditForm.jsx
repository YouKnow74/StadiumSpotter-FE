import React, { useState } from 'react';
import locations from './location';

export default function LibraryEditForm({library,update,communities,albums, setIsEdit,user}) {
  
  const [editLibrary,setEditLibrary]=useState(library);
  const [communitiesArr,setcommunitiesArr]=useState(editLibrary.communities);
  const [image,setImage]=useState("");

  const handleImage=(e)=>{
    console.log(e.target.files);
   
    setImage(e.target.files[0])
    console.log("image");
    // console.log(newLibrary.image.name);
  }

  const handleMultiple =(e)=>{
    const comArr = Array.from(e.target.selectedOptions, (option)=>option.value);
    setcommunitiesArr(facArr);
  }

  const handleChange = (e)=>{
    const updatedLibrary = {...editLibrary};
    updatedLibrary[e.target.name] = e.target.value;
    console.log(updatedLibrary);
    setEditLibrary(updatedLibrary);
  }
  
  const updateLibrary = (e)=>{
    e.preventDefault();
    editLibrary.communities = communitiesArr;
    const formData = new FormData();
    formData.append("library",JSON.stringify(editLibrary));
    formData.append("image",image);
    update(formData);
    setIsEdit(false);
    e.target.reset();
  }

  return (
    <div>

    <h2>Library Edit Form</h2>
    <img src={"/images/"+editLibrary.image} className='myImg'/>
    <form onSubmit={updateLibrary} encType="multipart/form-data">

      <div>
        <label className='form-label'>Library Name:</label>
        <input className='form-control' type='text' name="name"  onChange={handleChange} value={editLibrary.name}/>
      </div>

      <div>
        <label className='form-label'>Library Description:</label>
        <input className='form-control' type='text' name="descriptin"  onChange={handleChange} value={editLibrary.descriptin}/>
      </div>

      <div>
        <label className='form-label'>Library Size:</label>
        <input className='form-control' type='text' name="size"  onChange={handleChange} value={editLibrary.size}/>
      </div>

      <div>
        <label className='form-label'>Library Price:</label>
        <input className='form-control' type='text' name="price"  onChange={handleChange} value={editLibrary.price}/>
      </div>
  
      <div>
        <label className='form-label'>Library Location:</label>
        {/*should be a dropdown select option TO BE EDITED */ }
        {/* <input type='text' name="location"  onChange={handleChange} value={editLibrary.location}/> */}
        <select className='form-control' name='location' onChange={handleChange} value={editLibrary.location}>
           {locations.map((oneLocation, index) => (
            <option key={index} value={oneLocation}>{oneLocation}</option>
              ))}
        </select>
      </div>

      <div>
        <label className='form-label'>Library image:</label>
        <input className='form-control' type='file' name="image" id='image' onChange={handleImage} />
      </div>

      <div>
        <label className='form-label'>Library Albums:</label>
        <p>Selected</p>
        <input className='form-control' value={editLibrary.category.category} disabled/>
        <p>New Value</p>
        <select className='form-control' type="text" name='category'  onChange={handleChange}>
          {albums.map((oneAlbum,index) => (
            <option key={index} value={oneAlbum._id}>{oneAlbum.category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className='form-label'>Library Communities:</label>
        <p>Already Selected</p>
        <select className='form-control' multiple='multiple' disabled>
          {editLibrary.communities.map((oneCommunity,index)=>(
            <option key={index} >{oneCommunity.community}</option>
          ))}
        </select>
        <p>Change To</p>
        <select className='form-control' type="text" name='communities' multiple='multiple' onChange={handleMultiple} value={communitiesArr}>
          {communities.map((oneCommunity,index)=>(
            <option key={index} value={oneCommunity._id}>{oneCommunity.community}</option>
          ))}
        </select>
      </div>

      {/* 

      IMPORTANT TO BE ADDED IN THE DATA 

      <input type='hidden' value={userid} name='user' /> 
      
      */}
     {user && user.role == "Admin" ?<button className='btn btn-success my-button' type='submit'>Update Library</button>:""}
    </form>

    
    </div>
  )
}
