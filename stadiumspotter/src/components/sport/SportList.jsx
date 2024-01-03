import React from 'react'
import { useEffect, useState } from "react";
import Axios from 'axios';
import Sport from './Sport';
import SportCreateForm from './SportCreateForm';

export default function SportList() {
    const [sports,setSports]=useState([]);
    const [isAdd,setIsAdd]=useState(false);
    const [stadiums,setStadiums]=useState([])

    useEffect(() => {
      
    loadSportList();
    
      
    }, [])
    
    const loadSportList =()=>{
        Axios.get("sport/index")
        .then(res=>{
            console.log(res);
            setSports(res.data.Sports);
        })
        .catch(err=>{
            console.log("Error fetching sport list");
            console.log(err);
        })
        Axios.get("stadium/index", {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("loaded stadiums");
            console.log(res);
            setStadiums(res.data.stadium)

        })
        .catch(err=>{
            console.log("error fetching stadiums for sports");
            console.log(err);
        })
    }

    const addSport=(sport)=>{
        Axios.post("sport/add",sport, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("sport added");
            console.log(res);
            loadSportList();
        })
        .catch(err=>{
            console.log("error adding sport");
            console.log(err);
        })
    }

    const deleteSport =(id)=>{
        Axios.delete(`sport/delete?_id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("Sport Deleted");
            console.log(res);
            loadSportList();
        })
        .catch(err=>{
            console.log("error deleting sport");
            console.log(err);
        })
    }

    const allSports = sports.map((oneSport,index)=>(
        <tr key={index}>
            <Sport {...oneSport} delete={deleteSport}/>
        </tr>
    ))
  return (
    <div>

<h1>All Sports</h1>
<button class="d-flex btn btn-success p-2 m-3 g-2 " onClick={()=>setIsAdd(!isAdd)}>Add Sport</button>
    {/* This is temporary only and needs to be designed diffrently */}
    <div className='d-flex '>
       
    {isAdd ?
        <SportCreateForm setIsAdd={setIsAdd} add={addSport} stadiums={stadiums}/>:
        ""
        }
        <table className=' justify-content-center table w-100 table-bordered '>
            <tbody >
            <tr>
                <th class="   table-success " >Sport Category</th>
                <th   class="   table-success " >Sport image</th> {/* Needs to be implemented with Multer / cloudinary CURRENTLY ONLY PLAIN TEXT*/ }
                <th  class="   table-success ">Sport Stadiums</th>
                <th  class="   table-success ">Delete</th>
            </tr>
            {allSports}
            </tbody>
        </table>
        </div>
      
        
    </div>
  
  )
}
