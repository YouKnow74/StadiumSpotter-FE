import React,{useState} from 'react';

export default function SportCreateForm({setIsAdd,add,stadiums}) {

    const [newSport,setNewSport]=useState({});
    const [stadiumsArr,setStadiumsArr]=useState([]);
    const [image,setImage]=useState("");

    const handleImage=(e)=>{
      console.log(e.target.files);
 
      setImage(e.target.files[0])
      console.log("image");

    }

    const handleMultiple =(e)=>{
        const stadArr = Array.from(e.target.selectedOptions, (option)=>option.value);
        setStadiumsArr(stadArr);
      }

    const handleChange=(e)=>{
        const sprt = {...newSport};
        sprt[e.target.name]=e.target.value;
        console.log(sprt);
        setNewSport(sprt);
    }
    
    const addSport =(e)=>{
        e.preventDefault();
        console.log(newSport);
        newSport.stadium = stadiumsArr;
        const formData = new FormData();
        formData.append("sport",JSON.stringify(newSport));
        formData.append("image",image);
        add(formData);
        e.target.reset();
        setIsAdd(false);
    }
  return (
    <div>
        <h2>Add Sport</h2>
        <form onSubmit={addSport} encType="multipart/form-data">

            <div>
                <label>Category:</label>
                <input type='text' name='category' onChange={handleChange}/>
            </div>

            <div>
                <label>Image:</label>
      
                <input type='file' name='image' onChange={handleImage}/>
            </div>

            <div>
        <label>Stadiums:</label>
        <select type="text" name='stadium' multiple='multiple' onChange={handleMultiple} value={stadiumsArr}>
          {stadiums.map((oneStadium,index)=>(
            <option key={index} value={oneStadium._id}>{oneStadium.name}</option>
          ))}
        </select>
      </div>
            <button type='submit'>Add Sport</button>
        </form>

    </div>
  )
}
