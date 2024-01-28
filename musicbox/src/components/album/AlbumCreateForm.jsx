import React,{useState} from 'react';

export default function AlbumCreateForm({setIsAdd,add,libraries}) {

    const [newAlbum,setNewAlbum]=useState({});
    const [albumsArr,setAlbumsArr]=useState([]);
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
        const albm = {...newAlbum};
        albm[e.target.name]=e.target.value;
        console.log(albm);
        setNewAlbum(albm);
    }
    
    const addAlbum =(e)=>{
        e.preventDefault();
        console.log(newAlbum);
        newSport.library = librariesArr;
        const formData = new FormData();
        formData.append("album",JSON.stringify(newAlbum));
        formData.append("image",image);
        add(formData);
        e.target.reset();
        setIsAdd(false);
    }
  return (
   <div>
     <form onSubmit={addSport} className=" row g-2 " encType="multipart/form-data">


<div className=" row g-2 ">


           
            <div className="col-12">
              <div className="row g-3  ">
                <div className='col-auto'>
                 <label className="form-label">Category:</label>
                 </div>
                 <div className='col-auto'>
                <input type='text' name='category' className="form-control green-border focus-ring focus-ring-success" onChange={handleChange}/>    
                </div>
              </div>    
            </div>
            <div className=" col-12">
            <div className="row g-3  ">
                <div className='col-auto'>
                <label className="form-label">Image:</label>
                </div>
                <div className='col-auto'>
               <input type='file'  className="form-control green-border focus-ring focus-ring-success" id="username" name='image' onChange={handleImage}/>
               </div>
         </div>
            </div>
            <div className="col-12">
            <div className="row g-3  ">
            <div className='col-auto'>
              <label  className="form-label" >Libraries:</label>
              </div>
              <div className='col-auto'>
                <select type="text" className="form-control green-border focus-ring focus-ring-success" name='library' multiple='multiple' onChange={handleMultiple} value={librariesArr}>
                  {libraries.map((oneLibrary,index)=>(
                    <option key={index} value={oneLibrary._id}>{oneLibrary.name}</option>
                  ))}
                </select>
                </div>
            </div>
            <button type='submit' className="btn btn-success my-button" >Submit</button>
      </div>
      

          </div>

    </form>
</div>

  )
}
