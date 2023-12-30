import React,{useState} from 'react'

export default function FacilityAddForm({add,setIsAdd}) {

  const [newFacility,setNewFacility]=useState({});

  const handleChange =(e)=>{
    const fac = {...newFacility};
    fac[e.target.name] = e.target.value;
    setNewFacility(fac);
  }

  const submitFacility =(e)=>{
    e.preventDefault();
    console.log("new facility",newFacility);
    add(newFacility);
    setIsAdd(false);
    e.target.reset();
  }
  
  return (
    <div>

      <h2>Add Facility Form</h2>
      <form onSubmit={submitFacility}>

        <div>
          <label>Facility Name</label>
          <input name='facility' type='text' onChange={handleChange}/>
        </div>

        <div>
          <label>Facility Image</label>
          <input name='image' type='text' onChange={handleChange}/>{/*NEEDS TO BE IMAGE WITH MULTER / Cloudinary*/}
        </div>
        <button type='submit'>Submit</button>
      </form>

    </div>
  )
}
