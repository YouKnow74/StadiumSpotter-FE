import React,{useEffect,useState} from 'react';
import  Axios  from 'axios';
import Stadium from './Stadium';
import StadiumCreateForm from './StadiumCreateForm';
import "bootstrap/dist/css/bootstrap.min.css"
import StadiumEditForm from './StadiumEditForm';

export default function StadiumList(props) {
    const [stadiums,setStadiums]=useState([]);
    const [sports,setSports]=useState([]);
    const [facilities,setFacilities]=useState([]);
    const [isEdit,setIsEdit]=useState(false);
    const [currentStadium,setCurrentStadium]=useState({});
    const [userDetails, setUserDetails]=useState({});

    useEffect(() => {
      
    loadStadiumsList();
    // userGet(user);
      
    }, []);

    // const userGet =(user)=>{
    //     Axios.get(`user/detail?id=${user.id}`)
    //     .then(res=>{
    //         console.log("res",res);
    //         console.log(res.data.userDetail);
    //         setUserDetails(res.data.userDetail);
    //         // userDetails.password=null;
    //         console.log(userDetails);
    //     })
    //     .catch(err=>{
    //         console.log("User undefined");
    //         console.log(err);
    //     })
    // }

    /*

    To be loaded directly:

    -setting the lists of stadiums.
    -setting the list of sports for create stadium form
    -setting the list of facilites for create stadium form
    */
    const loadStadiumsList = ()=>{
        // console.log("user:",user.id);
        Axios.get("stadium/index")
        .then(response=>{
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
            setStadiums(response.data.stadium);
        })
        .catch(err=>{
            console.log("Error in bringing list of stadiums ");
            console.log(err);
        })
    }

    const addStadium =(stadium)=>{
        Axios.post("stadium/add",stadium)
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
        Axios.put("stadium/update",stadium)
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
        Axios.delete(`stadium/delete?id=${id}`)
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


    const allStadiums = stadiums.map((stadium,index)=>(
        <>
        <tr key={index}>
            <Stadium {...stadium} edit={editStadium} delete={deleteStadium}/>
        </tr>
        
        </>
    ));

  return (
   <div>
    <h1>All Stadiums</h1>
    {/* This is temporary only and needs to be designed diffrently */}
    <div>
        <table className='table table-dark table-striped-columns'>
            <tbody>
            <tr>
                <th>Stadium Name:</th>
                <th>Stadium Description</th>
                <th>Stadium Size</th>
                <th>Stadium Location</th>
                <th>Stadium Facilities</th>
                <th>Stadium Category</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            {allStadiums}
            </tbody>
        </table>
        {isEdit ?
        <StadiumEditForm key={currentStadium._id} stadium={currentStadium} update={updateStadium} 
        sports={sports} facilities={facilities}/>
        :
        <StadiumCreateForm add={addStadium} sports={sports} facilities={facilities} user={props.user}/>}
        
    </div>
    </div>
  )
}
