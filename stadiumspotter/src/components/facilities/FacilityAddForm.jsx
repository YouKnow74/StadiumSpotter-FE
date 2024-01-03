import React,{useState} from 'react'

export default function FacilityAddForm({add,setIsAdd,user}) {

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
        <form onSubmit={submitFacility} class=" row g-2 " encType="multipart/form-data">
<div class=" row g-2 ">
<div class="col-12">
              <div class="row g-3  ">
                <div className='col-auto'>  
          <label class="form-label">Facility Name :</label>
          </div>
          <div className='col-auto'>
          <input name='facility' type='text' class="form-control "onChange={handleChange}/>
        </div>
</div>
</div>
</div>
<div class=" col-12">
            <div class="row g-3  ">
                <div className='col-auto'>

          <label class="form-label">Facility Image</label>
          </div>
          <div className='col-auto'>

          <input name='image' type='file' class="form-control" onChange={handleImage}/>
        </div>
        </div>

        { user.role=="Admin" ? (
                    <>
                <button type='submit'>Submit</button>
                </>
                ):""}
        </div>
      </form>
</div>



  )
}
