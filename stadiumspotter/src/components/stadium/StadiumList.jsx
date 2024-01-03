import React,{useEffect,useState} from 'react';
import  Axios  from 'axios';
import Stadium from './Stadium';
import StadiumCreateForm from './StadiumCreateForm';
import "bootstrap/dist/css/bootstrap.min.css"
import StadiumEditForm from './StadiumEditForm';
import { useNavigate } from 'react-router-dom';

export default function StadiumList(props) {
    const [stadiums,setStadiums]=useState([]);
    const [sports,setSports]=useState([]);
    const [facilities,setFacilities]=useState([]);
    const [isEdit,setIsEdit]=useState(false);
    const [isAdd,setIsAdd]=useState(false);
    const [currentStadium,setCurrentStadium]=useState({});
    const [userDetails, setUserDetails]=useState({});
    const navigate = useNavigate();

    useEffect(() => {
      
    loadStadiumsList();
      
    }, []);

    const changeToAdd=()=>{
        setIsAdd(!isAdd)
        setIsEdit(false)
        }

    /*

    To be loaded directly:

    -setting the lists of stadiums.
    -setting the list of sports for create stadium form
    -setting the list of facilites for create stadium form
    */
    const loadStadiumsList = ()=>{
        // console.log("user:",user.id);
        Axios.get("stadium/index",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        })
        .then(response=>{
            Axios.get("stadium/add", {
                headers: {
                    "Authorization":"Bearer "+localStorage.getItem("token")
                    }
            })
            .then(res=>{
                console.log("sport list");
                console.log(res);
                setSports(res.data.sports);
            })
            .catch(err=>{
                console.log("error bringing sports list");
                console.log(err);
            })
            Axios.get("facility/index", {
                headers: {
                    "Authorization":"Bearer "+localStorage.getItem("token")
                    }
            })
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
            setStadiums(response.data.stadium);
        })
        .catch(err=>{
            console.log("Error in bringing list of stadiums ");
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
            loadStadiumsList();
        })
        .catch(err=>{
            console.log("Error Adding Stadium ");
            console.log(err);
        })
    }

    const editStadium = (id)=>{
        Axios.get(`stadium/edit?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("info good for editing");
            console.log(res.data.stadium);
            setIsEdit(!isEdit);
            setIsAdd(false)
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
                'Content-Type' : 'multipart/form-data',
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        })
        .then(res=>{
            console.log("Stadium Updated");
            console.log(res);
            loadStadiumsList();
            setIsEdit(false);
        })
        .catch(err=>{
            console.log("error updating stadium");
            console.log(err);
        })
    }

    const deleteStadium = (id)=>{
        Axios.delete(`stadium/delete?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("deleted");
            console.log(res);
            loadStadiumsList();
        })
        .catch(err=>{
            console.log("Error Deleting Stadium");
            console.log(err);
        })
    }

    const reserveStadium = (id) => {
        Axios.get(`reservation/add?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then((response) => {
            const stadiumData = response.data.stadium
            setCurrentStadium(stadiumData)
            console.log(response.data.stadium);
            navigate(`/reservation/${stadiumData._id}`)
        })
        .catch(err=>{
            console.log("Error Reserving Stadium");
            console.log(err);
        })
    }


    const allStadiums = stadiums.map((stadium,index)=>(
        
        <div className='col'>
            <div className='card shadow-sm' key={index}> 
                <Stadium  {...stadium} edit={editStadium} delete={deleteStadium} reserve={reserveStadium} userDetails={props.user} />
            </div>
        </div>
    ));

  return (
   <div>
    <h1>All Stadiums</h1>
   
    {props.user && (props.user.role=='Admin' || props.user.role =='stadium owner') ? <button className='btn btn-success my-button' onClick={changeToAdd}>Add Stadium</button>:""}
    <div>
        {isEdit ?
        <StadiumEditForm key={currentStadium._id} stadium={currentStadium} update={updateStadium} 
        sports={sports} facilities={facilities} setIsEdit={setIsEdit} user={props.user} />
        :null}
        {isAdd?
        <StadiumCreateForm setIsAdd={setIsAdd} add={addStadium} sports={sports} facilities={facilities} user={props.user}/>:""}

        <div className='album py-5 bg-body-tertiary'>
            <div className='container'>
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                    {allStadiums}
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
