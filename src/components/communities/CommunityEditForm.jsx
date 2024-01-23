import React,{useState} from 'react'

export default function CommunityEditForm({community,update,setIsEdit,user}) {

    const [communityToEdit,setCommunityToEdit]=useState(community);
    const [image,setImage]=useState("");


    const handleImage=(e)=>{
        console.log(e.target.files);
        setImage(e.target.files[0])
        console.log("image");
        
      }

    const handleChange =(e)=>{
        const editingCom = {...communityToEdit};
        editingCom[e.target.name]=e.target.value;
        setCommunityToEdit(editingCom);
    }

    const updateFac =(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("community",JSON.stringify(communityToEdit));
        formData.append("image",image);
        update(formData);
        setIsEdit(false);
        e.target.reset();
    }

  return (
    <div>
          <h2>Community Edit Form</h2>

      <form onSubmit={updateFac} encType="multipart/form-data" class=" row g-2 ">

      <div class=" row g-2 ">
<div class="col-12">
              <div class="row g-3  ">
                <div className='col-auto'>  
          <label  class="form-label">Community Name :</label>
          </div>
          <div className='col-auto'>

          <input name='community' type='text' class="form-control " value={communityToEdit.communityToEditty} onChange={handleChange}/>
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
        <button class="d-flex btn btn-success p-2 m-3 g-2 " type='submit'>Submit</button>
        </div>

       { user.role=="Admin" ? (
                    <>
                <button class="d-flex btn btn-success p-2 m-3 g-2 " type='submit'>Submit</button>
                </>
                ):""}

      </form>

    </div>
  )
}
