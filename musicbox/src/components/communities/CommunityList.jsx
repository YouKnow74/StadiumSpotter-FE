import React from 'react'
import{useEffect,useState} from 'react';
import  Axios  from 'axios';
import Community from './Community';
import CommunityAddForm from "./CommunityAddForm";
import CommunityEditForm from './CommunityEditForm';

export default function CommunityList(props) {
    const [communities,setCommunities]=useState([])
    const [isAdd,setIsAdd]=useState(false);
    const [isEdit,setIsEdit]=useState(false);
    const [communityEdit,setCommunityEdit]=useState({})

    useEffect(() => {
   
        loadCommunitiesList();
    
      
    }, []);

    const changeToAdd=()=>{
    setIsAdd(!isAdd)
    setIsEdit(false)
    }
    
    const changeToEdit =()=>{
        setIsAdd(false);
        setIsEdit(!isEdit);
    }

    const loadCommunitiesList =()=>{
        Axios.get("community/index", {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("communities fetched");
            console.log(res);
            setCommunities(res.data.community);
        })
        .catch(err=>{
            console.log("error fetching communities");
            console.log(err);
        })
    }

    const addCommunity =(community)=>{
        Axios.post("community/add",community, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("Community added");
            console.log(res);
            loadCommunitiesList();
        })
        .catch(err=>{
            console.log("error adding community");
            console.log(err);
        })
    }

    const editCommunity =(id)=>{
        Axios.get(`community/edit?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("Fetched community to edit");
            console.log(res);
            setCommunityEdit(res.data.community)
        })
        .catch(err=>{
            console.log("error fetching community to edit");
            console.log(err);
        })

    }

    const updateCommunity=(community)=>{
        Axios.put("community/update",community, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("Community updated");
            console.log(res);
            loadCommunitiesList();
        })
        .catch(err=>{
            console.log("error updating community");
            console.log(err);
        })
    }
    const deleteCommunity=(id)=>{
        Axios.delete(`community/delete?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("community deleted");
            console.log(res);
            loadCommunitiesList();
        })
        .catch(err=>{
            console.log("Community Did not Delete");
            console.log(err);
        })
    }
    const allCommunities = communities.map((onecommunity,index)=>(
        <tr key={index}>
            <Community {...onecommunity} edit={editCommunity} 
            changeToEdit={changeToEdit} delete={deleteCommunity}
            user={props.user}
            />
        </tr>
    ))
  return (
    <div>

<h1>All Communities</h1>
<button class="d-flex btn btn-success p-2 m-3 g-2 " onClick={changeToAdd}>Add Community Form</button>
    {/* This is temporary only and needs to be designed diffrently */}


 <div className='d-flex '>
        {isAdd ?
        <CommunityAddForm add={addCommunity} setIsAdd={setIsAdd} user={props.user}/>:

        ""
        }
       
        
        {
            isEdit ?
            <CommunityEditForm key={communityEdit._id} community={communityEdit} update={updateCommunity} setIsEdit={setIsEdit} user ={props.user}/>:
            null
        }
                
        <table className='justify-content-center table w-100 table-bordered'>
            <tbody>
            <tr>
                <th class="   table-success ">Community Name</th>
                <th class="   table-success ">Community image</th> {/* Needs to be implemented with Multer / cloudinary CURRENTLY ONLY PLAIN TEXT*/ }
                <th class="   table-success ">Edit</th>
                <th class="   table-success ">Delete</th>
            </tr>
            {allFacilites}
            </tbody>
        </table>
        
        
        </div>

        </div>
       
  )
}
