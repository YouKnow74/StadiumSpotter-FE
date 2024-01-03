import React,{useState} from 'react'

export default function FacilityEditForm({facility,update,setIsEdit,user}) {

    const [facilityToEdit,setFacilityToEdit]=useState(facility);
    const [image,setImage]=useState("");


    const handleImage=(e)=>{
        console.log(e.target.files);
        setImage(e.target.files[0])
        console.log("image");
        
      }

    const handleChange =(e)=>{
        const editingFac = {...facilityToEdit};
        editingFac[e.target.name]=e.target.value;
        setFacilityToEdit(editingFac);
    }

    const updateFac =(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("facility",JSON.stringify(facilityToEdit));
        formData.append("image",image);
        update(formData);
        setIsEdit(false);
        e.target.reset();
    }

  return (
    <div>
        <h2>Facility Edit Form</h2>
    
      <form onSubmit={updateFac} encType="multipart/form-data">

        <div>
          <label>Facility Name</label>
          <input name='facility' type='text' value={facilityToEdit.facility} onChange={handleChange}/>
        </div>

        <div>
          <label>Facility Image</label>
          <input name='image' type='file' onChange={handleImage}/>
        </div>
       { user.role=="Admin" ? (
                    <>
                <button type='submit'>Submit</button>
                </>
                ):""}
      </form>

    </div>
  )
}
