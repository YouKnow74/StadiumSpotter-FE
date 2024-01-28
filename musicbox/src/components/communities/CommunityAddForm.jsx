import React,{useState} from 'react'

export default function CommunityAddForm({add,setIsAdd,user}) {

  const [newCommunity,setNewCommunity]=useState({});
  const [image,setImage]=useState("");

  const handleImage=(e)=>{
    console.log(e.target.files);
    setImage(e.target.files[0]);
    console.log("image");
  }

  const handleChange =(e)=>{
    const com = {...newCommunity};
    fac[e.target.name] = e.target.value;
    setNewCommunity(com);
  }

  const submitCommunity =(e)=>{
    e.preventDefault();
    console.log("new community",newCommunity);
    const formData = new FormData();
    formData.append("community",JSON.stringify(newCommunity));
    formData.append("image",image);
    add(formData);
    setIsAdd(false);
    e.target.reset();
  }
  
  return (
    <div>
        <form onSubmit={submitCommunity} class=" row g-2 " encType="multipart/form-data">
<div class=" row g-2 ">
<div class="col-12">
              <div class="row g-3  ">
                <div className='col-auto'>  
          <label class="form-label">Community Name :</label>
          </div>
          <div className='col-auto'>
          <input name='community' type='text' class="form-control "onChange={handleChange}/>
        </div>
</div>
</div>
</div>
<div class=" col-12">
            <div class="row g-3  ">
                <div className='col-auto'>

          <label class="form-label">Community Image</label>
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
