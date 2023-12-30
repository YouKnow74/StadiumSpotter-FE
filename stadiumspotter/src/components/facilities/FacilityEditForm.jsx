import React,{useState} from 'react'

export default function FacilityEditForm({facility,update,setIsEdit}) {

    const [facilityToEdit,setFacilityToEdit]=useState(facility);

    const handleChange =(e)=>{
        const editingFac = {...facilityToEdit};
        editingFac[e.target.name]=e.target.value;
        setFacilityToEdit(editingFac);
    }

    const updateFac =(e)=>{
        e.preventDefault();
        update(facilityToEdit);
        setIsEdit(false);
        e.target.reset();
    }

  return (
    <div>
        <h2>Facility Edit Form</h2>
    
      <form onSubmit={updateFac}>

        <div>
          <label>Facility Name</label>
          <input name='facility' type='text' value={facilityToEdit.facility} onChange={handleChange}/>
        </div>

        <div>
          <label>Facility Image</label>
          <input name='image' type='text' value={facilityToEdit.image} onChange={handleChange}/>{/*NEEDS TO BE IMAGE WITH MULTER / Cloudinary*/}
        </div>
        <button type='submit'>Submit</button>
      </form>

    </div>
  )
}
