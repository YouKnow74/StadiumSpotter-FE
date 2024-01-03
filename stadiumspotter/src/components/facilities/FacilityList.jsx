import React from 'react'
import{useEffect,useState} from 'react';
import  Axios  from 'axios';
import Facility from './Facility';
import FacilityAddForm from "./FacilityAddForm";
import FacilityEditForm from './FacilityEditForm';

export default function FacilityList(props) {
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
        Axios.get("facility/index", {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
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
        Axios.post("facility/add",facility, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
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
        Axios.get(`facility/edit?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
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
        Axios.put("facility/update",facility, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
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
        Axios.delete(`facility/delete?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
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
            user={props.user}
            />
        </tr>
    ))
  return (
    <div>

<h1>All Facilities</h1>
<button class="d-flex btn btn-success p-2 m-3 g-2 " onClick={changeToAdd}>Add Facility Form</button>
    {/* This is temporary only and needs to be designed diffrently */}


 <div className='d-md-flex  '>
        {isAdd ?
        <FacilityAddForm add={addFacility} setIsAdd={setIsAdd} user={props.user}/>:

        ""
        }
       
        
        {
            isEdit ?
            <FacilityEditForm key={facilityEdit._id} facility={facilityEdit} update={updateFacility} setIsEdit={setIsEdit} user ={props.user}/>:
            null
        }
                
        <table className='justify-content-center table w-100 table-bordered'>
            <tbody>
            <tr>
                <th class="   table-success ">Facility Name</th>
                <th class="   table-success ">Facility image</th> {/* Needs to be implemented with Multer / cloudinary CURRENTLY ONLY PLAIN TEXT*/ }
                <th class="  table-success ">Edit</th>
                <th class="  table-success ">Delete</th>
            </tr>
            {allFacilites}
            </tbody>
        </table>
        
        
        </div>

        </div>
       
  )
}
