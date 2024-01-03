import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import StadiumEditForm from './StadiumEditForm';
import StadiumCreateForm from './StadiumCreateForm';

export default function StadiumShow({user}) {
    
    const [allStadiums, setAllStadiums] = useState([])
    const [sports,setSports]=useState([]);
    const [facilities,setFacilities]=useState([]);
    const [isEdit,setIsEdit]=useState(false);
    const [currentStadium,setCurrentStadium]=useState({});

    useEffect(() => {
        showStadiums();
    }, [])
    

    const showStadiums = () => {
        console.log("show stad user",user);
        Axios.get(`stadium/detail?id=${user._id}`)
        .then(response => {
            Axios.get("stadium/add")
            .then(res=>{
                console.log("sport list");
                console.log(res);
                setSports(res.data.sports);
            })
            .catch(err=>{
                console.log("error bringing sports list");
                console.log(err);
            })
            Axios.get("facility/index")
            .then(res=>{
                console.log("Facilities list");
                console.log(res);
                setFacilities(res.data.facility);
            })
            .catch(err=>{
                console.log("error bringing facilites list");
                console.log(err);
            })
            console.log(response);
            setAllStadiums(response.data.stadiums)
        })
        .catch(err => {
            console.log("Error Getting all Stadiums");
            console.log(err);
        })
    }

    const addStadium =(stadium)=>{
        Axios.post("stadium/add",stadium, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("Stadium Added");
            console.log(res);
            showStadiums();
        })
        .catch(err=>{
            console.log("Error Adding Stadium ");
            console.log(err);
        })
    }

    const editStadium = (id)=>{
        Axios.get(`stadium/edit?id=${id}`)
        .then(res=>{
            console.log("info good for editing");
            console.log(res.data.stadium);
            setIsEdit(true);
            setCurrentStadium(res.data.stadium);

        })
        .catch(err=>{
            console.log("error in editing stadium");
            console.log(err);
        })

    }
    
    const updateStadium =(stadium)=>{
        Axios.put("stadium/update",stadium , {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
        .then(res=>{
            console.log("Stadium Updated");
            console.log(res);
            showStadiums();
            setIsEdit(false);
        })
        .catch(err=>{
            console.log("error updating stadium");
            console.log(err);
        })
    }

    const deleteStadium = (id)=>{
        Axios.delete(`stadium/delete?id=${id}`)
        .then(res=>{
            console.log("deleted");
            console.log(res);
            showStadiums();
        })
        .catch(err=>{
            console.log("Error Deleting Stadium");
            console.log(err);
        })
    }

    const myStadiums = allStadiums.map((stadium,index)=>(
        <>
        <tr key={index}>
            <td>{stadium.name}</td>
            <td>{stadium.descriptin}</td>
            <td>{stadium.size}</td>
            <td>{stadium.location}</td>
            <td>{stadium.price}</td>
            <td>{stadium.facilities.map((fac, index) => (
                    <p key={index}>{fac.facility}</p>
                    ))}</td>
            <td>{stadium.category.category}</td>
            <td><img src={"/images/"+stadium.image} style={{width:"35px",height:"35px"}}/></td>
            <td><button onClick={()=>editStadium(stadium._id)}>Edit</button></td>
            <td><button onClick={()=>deleteStadium(stadium._id)}>Delete</button></td>
        </tr>
        
        </>
    ));

  return (
    <div>
        <h1>Stadiums</h1>
        <table>
            <tbody>
                <tr>
                    <th>Stadium Name</th>
                    <th>Descriptin</th>
                    <th>Size</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Facilities</th>
                    <th>Category</th>
                    <th>image</th>
                </tr>
                {myStadiums}
            </tbody>
        </table>
        {isEdit ?
        <StadiumEditForm key={currentStadium._id} stadium={currentStadium} update={updateStadium} 
        sports={sports} facilities={facilities}/>
        :
        <StadiumCreateForm add={addStadium} sports={sports} facilities={facilities} user={user}/>}
    </div>
  )
}
