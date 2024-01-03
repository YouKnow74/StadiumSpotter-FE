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
<button onClick={()=>setIsAdd(!isAdd)}>Add Sport</button>
    {/* This is temporary only and needs to be designed diffrently */}
    <div>
        <table className='table table-dark table-striped-columns'>
            <tbody>
            <tr>
                <th>Sport Category</th>
                <th>Sport image</th> {/* Needs to be implemented with Multer / cloudinary CURRENTLY ONLY PLAIN TEXT*/ }
                <th>Sport Stadiums</th>
                <th>Delete</th>
            </tr>
            {allSports}
            </tbody>
        </table>
        {isAdd ?
        <SportCreateForm setIsAdd={setIsAdd} add={addSport} stadiums={stadiums}/>:
        ""
        }
        
    </div>
    </div>
  )
}
