import React,{useState} from 'react'

export default function FacilityAddForm({add,setIsAdd}) {

  const [newFacility,setNewFacility]=useState({});
  const [image,setImage]=useState("");

  const handleImage=(e)=>{
    console.log(e.target.files);
    setImage(e.target.files[0]);
    console.log("image");
  }

  const handleChange =(e)=>{
    const fac = {...newFacility};
    fac[e.target.name] = e.target.value;
    setNewFacility(fac);
  }

  const submitFacility =(e)=>{
    e.preventDefault();
    console.log("new facility",newFacility);
    const formData = new FormData();
    formData.append("facility",JSON.stringify(newFacility));
    formData.append("image",image);
    add(formData);
    setIsAdd(false);
    e.target.reset();
  }
  
  return (
    <div>

      <h2>Add Facility Form</h2>
      <form onSubmit={submitFacility} encType="multipart/form-data">

        <div>
          <label>Facility Name</label>
          <input name='facility' type='text' onChange={handleChange}/>
        </div>

        <div>
          <label>Facility Image</label>
          <input name='image' type='file' onChange={handleImage}/>
        </div>
        <button type='submit'>Submit</button>
      </form>

    </div>
  )
}
