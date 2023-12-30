import React from 'react'
import{useEffect,useState} from 'react';
import  Axios  from 'axios';
import Facility from './Facility';
import FacilityAddForm from "./FacilityAddForm";
import FacilityEditForm from './FacilityEditForm';

export default function FacilityList() {
    const [facilities,setFacilites]=useState([])
    const [isAdd,setIsAdd]=useState(false);
    const [isEdit,setIsEdit]=useState(false);

    useEffect(() => {
   
        loadFacilitesList();
    
      
    }, [])

    const loadFacilitesList =()=>{
        Axios.get("facility/index")
        .then(res=>{
            console.log("facilites fetched");
            console.log(res);
            setFacilites(res.data.facility);
        })
        .catch(err=>{
            console.log("error fetching facilites");
            console.log(err);
        })
    }

    const addFacility =(facility)=>{
        Axios.post("facility/add",facility)
        .then(res=>{
            console.log("Facility added");
            console.log(res);
            loadFacilitesList();
        })
        .catch(err=>{
            console.log("error adding facility");
            console.log(err);
        })
    }
    const allFacilites = facilities.map((onefacility,index)=>(
        <tr key={index}>
            <Facility {...onefacility} />
        </tr>
    ))
  return (
    <div>

<h1>All Facilities</h1>
<button onClick={()=>(setIsAdd(!isAdd)&& setIsEdit(false))}>Add Facility Form</button>
    {/* This is temporary only and needs to be designed diffrently */}
    <div>
        <table className='table table-dark table-striped-columns'>
            <tbody>
            <tr>
                <th>Facility Name</th>
                <th>Facility image</th> {/* Needs to be implemented with Multer / cloudinary CURRENTLY ONLY PLAIN TEXT*/ }
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            {allFacilites}
            </tbody>
        </table>
        {isAdd ?
        <FacilityAddForm />:
        ""
        }
        {
            isEdit ?
            <FacilityEditForm />:
            ""
        }
        
    </div>
    </div>
  )
}
