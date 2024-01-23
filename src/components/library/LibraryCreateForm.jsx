import React ,{useState} from 'react';
import locations from './location';

export default function LibraryCreateForm({add,albums,communities,user, setIsAdd}) {

  const [newLibrary,setNewLibrary]=useState({});
  const [communitiesArr,setcommunitiesArr]=useState([]);
  const [image,setImage]=useState("");

  const handleImage=(e)=>{
    console.log(e.target.files);
    // newLibrary.image=e.target.files[0]
    setImage(e.target.files[0])
    console.log("image");
    // console.log(newLibrary.image.name);
  }

  const handleMultiple =(e)=>{
    const comArr = Array.from(e.target.selectedOptions, (option)=>option.value);
    setcommunitiesArr(comArr);
  } 

  const addUser =(e)=>{
    newLibrary["user"]=user._id;
  }

  const handleChange =(e)=>{
    console.log(user);
    const lib = {...newLibrary};
    lib[e.target.name] = e.target.value;
    console.log(lib);
    setNewLibrary(lib);
  }

  const addLibrary =(e)=>{
    e.preventDefault();
    const formData = new FormData();
    console.log(newLibrary);
    console.log("community array"+communitiesArr);
    newLibrary.communities = communitiesArr;
    addUser();
    formData.append("library",JSON.stringify(newLibrary));
    formData.append("image",image);
    console.log("form data",formData);
    add(formData);
    setIsAdd(false)
    e.target.reset();
  }


  return (
    <div>
      <h2>Add Library</h2>

    <form onSubmit={addLibrary} encType="multipart/form-data">

      <div>
        <label className='form-label'>Library Name:</label>
        <input className='form-control' type='text' name="name"  onChange={handleChange}/>
      </div>

      <div>
        <label className='form-label'>Library Description:</label>
        <input className='form-control' type='text' name="descriptin"  onChange={handleChange}/>
      </div>

      <div>
        <label className='form-label'>Library Size:</label>
        <input className='form-control' type='text' name="size"  onChange={handleChange}/>
      </div>

      <div>
        <label className='form-label'>Library Location:</label>
        {/*should be a dropdown select option TO BE EDITED */ }
        {/* <input type='text' name="location"  onChange={handleChange}/> */}
        <select className='form-control' name='location' onChange={handleChange}>
           {locations.map((oneLocation, index) => (
            <option key={index} value={oneLocation}>{oneLocation}</option>
              ))}
        </select>
      </div>
      <div>
        <label className='form-label'>Library Price:</label>
        <input className='form-control' type='text' name="price"  onChange={handleChange}/>
      </div>

      <div>
        <label className='form-label'>Library image:</label>
        <input className='form-control' type='file' name="image" onChange={handleImage} />
      </div>

      <div>
        <label className='form-label'>Library Albums:</label>
        <select className='form-control' type="text" name='category'  onChange={handleChange}>
          {albums.map((oneAlbum,index) => (
            <option key={index} value={oneAlbum._id}>{oneAlbum.category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className='form-label'>Library Communities:</label>
        <select className='form-control' type="text" name='communities' multiple='multiple' onChange={handleMultiple} value={communitiesArr}>
          {communities.map((oneCommunity,index)=>(
            <option key={index} value={oneCommunity._id}>{oneCommunity.community}</option>
          ))}
        </select>
      </div>

      

      {/*IMPORTANT TO BE ADDED IN THE DATA */}

      <input type='hidden' value={user} name='user' onSubmit={addUser} /> 
      
      
      {user && user.role == "Admin" ?<button className='btn btn-success my-button' type='submit'>Add Library</button>:""}
    </form>

    </div>
  )
}
