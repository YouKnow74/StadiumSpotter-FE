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
    const [facilityEdit,setFacilityEdit]=useState({})

    useEffect(() => {
   
        loadFacilitesList();
    
      
    }, []);

    const changeToAdd=()=>{
    setIsAdd(!isAdd)
    setIsEdit(false)
    }
    
    const changeToEdit =()=>{
        setIsAdd(false);
        setIsEdit(!isEdit);
    }

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

    const editFacility =(id)=>{
        Axios.get(`facility/edit?id=${id}`)
        .then(res=>{
            console.log("Fetched facility to edit");
            console.log(res);
            setFacilityEdit(res.data.facility)
        })
        .catch(err=>{
            console.log("error fetching facility to edit");
            console.log(err);
        })

    }

    const updateFacility=(facility)=>{
        Axios.put("facility/update",facility)
        .then(res=>{
            console.log("Facility updated");
            console.log(res);
            loadFacilitesList();
        })
        .catch(err=>{
            console.log("error updating facility");
            console.log(err);
        })
    }
    const deleteFacility=(id)=>{
        Axios.delete(`facility/delete?id=${id}`)
        .then(res=>{
            console.log("facility deleted");
            console.log(res);
            loadFacilitesList();
        })
        .catch(err=>{
            console.log("Facility Did not Delete");
            console.log(err);
        })
    }
    const allFacilites = facilities.map((onefacility,index)=>(
        <tr key={index}>
            <Facility {...onefacility} edit={editFacility} 
            changeToEdit={changeToEdit} delete={deleteFacility}
            />
        </tr>
    ))
  return (
    <div>

<h1>All Facilities</h1>
<button onClick={changeToAdd}>Add Facility Form</button>
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
        <FacilityAddForm add={addFacility} setIsAdd={setIsAdd}/>:
        ""
        }
        {
            isEdit ?
            <FacilityEditForm key={facilityEdit._id} facility={facilityEdit} update={updateFacility} setIsEdit={setIsEdit} />:
            null
        }
        
    </div>
    </div>
  )
}
