import React,{useState} from 'react';

export default function AlbumCreateForm({setIsAdd,add,libraries}) {

    const [newAlbum,setNewAlbum]=useState({});
    const [librariesArr,setLibrariessArr]=useState([]);
    const [image,setImage]=useState("");

    const handleImage=(e)=>{
      console.log(e.target.files);
 
      setImage(e.target.files[0])
      console.log("image");

    }

    const handleMultiple =(e)=>{
        const libArr = Array.from(e.target.selectedOptions, (option)=>option.value);
        setLibrariesArr(libArr);
      }

    const handleChange=(e)=>{
        const albm = {...newAlbm};
        albm[e.target.name]=e.target.value;
        console.log(albm);
        setNewAlbum(albm);
    }
    
    const addAlbum =(e)=>{
        e.preventDefault();
        console.log(newAlbum);
        newAlbuum.library = librariesArr;
        const formData = new FormData();
        formData.append("album",JSON.stringify(newAlbum));
        formData.append("image",image);
        add(formData);
        e.target.reset();
        setIsAdd(false);
    }
  return (
   <div>
     <form onSubmit={addAlbum} class=" row g-2 " encType="multipart/form-data">

<div class=" row g-2 ">
           
            <div class="col-12">
              <div class="row g-3  ">
                <div className='col-auto'>
                 <label class="form-label">Category:</label>
                 </div>
                 <div className='col-auto'>
                <input type='text' name='category' class="form-control " onChange={handleChange}/>    
                </div>
              </div>    
            </div>
            <div class=" col-12">
            <div class="row g-3  ">
                <div className='col-auto'>
                <label class="form-label">Image:</label>
                </div>
                <div className='col-auto'>
               <input type='file'  class="form-control" id="username" name='image' onChange={handleImage}/>
               </div>
         </div>
            </div>
            <div class="col-12">
            <div class="row g-3  ">
            <div className='col-auto'>
              <label  class="form-label" >Libraries:</label>
              </div>
              <div className='col-auto'>
                <select type="text" class="form-control" name='library' multiple='multiple' onChange={handleMultiple} value={librariesArr}>
                  {libraries.map((oneLibrary,index)=>(
                    <option key={index} value={oneLibrary._id}>{oneLibrary.name}</option>
                  ))}
                </select>
                </div>
            </div>

      </div>
      <button type='submit' class=" col-2 p-2 m-3 g-5 btn btn-success" >Submit</button>

          </div>

    </form>
</div>

  )
}
