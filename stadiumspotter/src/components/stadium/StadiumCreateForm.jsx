import React ,{useState} from 'react';

export default function StadiumCreateForm({add,sports,facilities,user}) {

  const [newStadium,setNewStadium]=useState({});
  const [facilitesArr,setfacilitesArr]=useState([]);
  const [image,setImage]=useState("");

  const handleImage=(e)=>{
    console.log(e.target.files);
    // newStadium.image=e.target.files[0]
    setImage(e.target.files[0])
    console.log("image");
    // console.log(newStadium.image.name);
  }

  const handleMultiple =(e)=>{
    const facArr = Array.from(e.target.selectedOptions, (option)=>option.value);
    setfacilitesArr(facArr);
  } 

  const addUser =(e)=>{
    newStadium["user"]=user._id;
  }

  const handleChange =(e)=>{
    console.log(user);
    const stad = {...newStadium};
    stad[e.target.name] = e.target.value;
    console.log(stad);
    setNewStadium(stad);
  }

  const addStadium =(e)=>{
    e.preventDefault();
    const formData = new FormData();
    console.log(newStadium);
    console.log("facility array"+facilitesArr);
    newStadium.facilities = facilitesArr;
    addUser();
    formData.append("stadium",JSON.stringify(newStadium));
    formData.append("image",image);
    console.log("form data",formData);
    add(formData);
    e.target.reset();
  }


  return (
    <div>
      <h2>Add Stadium</h2>

    <form onSubmit={addStadium} encType="multipart/form-data">

      <div>
        <label>Stadium Name:</label>
        <input type='text' name="name"  onChange={handleChange}/>
      </div>

      <div>
        <label>Stadium Description:</label>
        <input type='text' name="descriptin"  onChange={handleChange}/>
      </div>

      <div>
        <label>Stadium Size:</label>
        <input type='text' name="size"  onChange={handleChange}/>
      </div>

      <div>
        <label>Stadium Location:</label>
        {/*should be a dropdown select option TO BE EDITED */ }
        <input type='text' name="location"  onChange={handleChange}/>
      </div>
      <div>
        <label>Stadium Price:</label>
        <input type='text' name="price"  onChange={handleChange}/>
      </div>

      <div>
        <label>Stadium image:</label>
        <input type='file' name="image" onChange={handleImage} />
      </div>

      <div>
        <label>Stadium Sports:</label>
        <select type="text" name='category'  onChange={handleChange}>
          {sports.map((oneSport,index) => (
            <option key={index} value={oneSport._id}>{oneSport.category}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Stadium Facilites:</label>
        <select type="text" name='facilities' multiple='multiple' onChange={handleMultiple} value={facilitesArr}>
          {facilities.map((oneFacility,index)=>(
            <option key={index} value={oneFacility._id}>{oneFacility.facility}</option>
          ))}
        </select>
      </div>

      

      {/*IMPORTANT TO BE ADDED IN THE DATA */}

      <input type='hidden' value={user} name='user' onSubmit={addUser} /> 
      
      
      <button type='submit'>Add Stadium</button>
    </form>

    </div>
  )
}
