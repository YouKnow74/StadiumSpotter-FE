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
              <label  className="form-label" >Stadiums:</label>
              </div>
              <div className='col-auto'>
                <select type="text" className="form-control green-border focus-ring focus-ring-success" name='stadium' multiple='multiple' onChange={handleMultiple} value={stadiumsArr}>
                  {stadiums.map((oneStadium,index)=>(
                    <option key={index} value={oneStadium._id}>{oneStadium.name}</option>
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
