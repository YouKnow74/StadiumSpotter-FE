import React,{useState} from 'react';

export default function SportCreateForm({setIsAdd,add,stadiums}) {

    const [newSport,setNewSport]=useState({});
    const [stadiumsArr,setStadiumsArr]=useState([]);

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
        add(newSport);
        e.target.reset();
        setIsAdd(false);
    }
  return (
    <div>
        <h2>Add Sport</h2>
        <form onSubmit={addSport}>

            <div>
                <label>Category:</label>
                <input type='text' name='category' onChange={handleChange}/>
            </div>

            <div>
                <label>Image:</label>
                {/* NEEDS TO BE FILE UPLOAD USING MULTER / CLOUDINARY*/ }
                <input type='text' name='image' onChange={handleChange}/>
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
