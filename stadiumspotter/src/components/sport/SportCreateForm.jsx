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
     <form onSubmit={addSport} class=" row g-2 " encType="multipart/form-data">

<div class=" row g-2  ">
           
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
              <label  class="form-label" >Stadiums:</label>
              </div>
              <div className='col-auto'>
                <select type="text" class="form-control" name='stadium' multiple='multiple' onChange={handleMultiple} value={stadiumsArr}>
                  {stadiums.map((oneStadium,index)=>(
                    <option key={index} value={oneStadium._id}>{oneStadium.name}</option>
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
