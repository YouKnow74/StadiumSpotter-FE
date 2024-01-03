import React,{useEffect,useState} from 'react'
import  Axios  from 'axios';
import Stadium from './Stadium';
import Reservation from '../reservation/Reservation';
import StadiumEditForm from './StadiumEditForm';
import StadiumCreateForm from './StadiumCreateForm';
import dayjs from 'dayjs'
import ReservationEditForm from '../reservation/ReservationEditForm';

export default function MyStadium({user}) {

    const [myStadiums,setMyStadiums]=useState([]);
    const [myReservations,setMyReservations]=useState([]);
    const [viewS,setViewS]=useState(false);
    const [viewR,setViewR]=useState(false);
    const [isEdit,setIsEdit]=useState(false);
    const [isAdd,setIsAdd]=useState(false);
    const [currentStadium,setCurrentStadium]=useState({});
    const [sports,setSports]=useState([]);
    const [facilities,setFacilities]=useState([]);
    const [currentReservation, setCurrentReservation] = useState({});
    const [isResEdit, setIsResEdit] = useState(false)
    // const [currentUser,setCurrentUser]=useState(props.user)


    useEffect(() => {
    // setCurrentUser();
    loadMyStadiumslist();
    
      
    }, [])
    
    const changeToAdd=()=>{
        setIsAdd(!isAdd)
        setIsEdit(false)
    }

    const loadMyStadiumslist =()=>{
        // Axios.get(`reservation/stadiumOwner?id=${user._id}`)
        // .then(res=>{
        //     console.log("Stadiums Fetched");
        //     console.log(res);
        //     setMyStadiums(res.data.stadium);
        // })
        // .catch(err=>{
        //     console.log("Stadiums not fetched");
        //     console.log(err);
        // })
        console.log("show stad user",user);
        Axios.get(`stadium/detail?id=${user._id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(response => {
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
            setMyStadiums(response.data.stadiums)
        })
        .catch(err => {
            console.log("Error Getting all Stadiums");
            console.log(err);
        })
    }

    const viewReservations =(id)=>{
        Axios.get(`reservation/reserved?id=${id}`)
        .then(res=>{
            console.log("List Fetched");
            console.log(res);
            setMyReservations(res.data.reserved);
        })
        .catch(err=>{
            console.log("Error fetching reservations list");
            console.log(err);
        })
        setViewR(true);
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
            loadMyStadiumslist();
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
            loadMyStadiumslist();
            // setIsEdit(false);
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
            loadMyStadiumslist();
        })
        .catch(err=>{
            console.log("Error Deleting Stadium");
            console.log(err);
        })
    }

    // Edit Updat and Delete Reservations
    const editView = (id) => {
        Axios.get(`reservation/edit?id=${id}`, {
          headers: {
              "Authorization":"Bearer "+localStorage.getItem("token")
              }
      })
        .then((res) => {
          console.log(res.data.reservation);
          let reservation = res.data.reservation;
          reservation.date = dayjs(reservation.date).format('YYYY-MM-DD')
          console.log(reservation.date)
        //   setIsEdit(!isEdit);
        setIsResEdit(!isResEdit);
          setCurrentReservation(reservation);
          console.log(reservation);
        })
        .catch((err) => {
          console.log(err)
        })
      }
    
      const updateReservation = (reservation) => {
        Axios.put('/reservation/update', reservation, {
          headers: {
              "Authorization":"Bearer "+localStorage.getItem("token")
              }
      })
        .then((res) => {
          console.log('Reservation updated Successfully');
          console.log(res);
          viewReservations();
        //   setIsEdit(false);
            setIsResEdit(isResEdit);
        })
        .catch((err) => {
          console.log(err)
        })
      }
    
      const deleteReservation = (id) => {
        Axios.delete(`reservation/delete?id=${id}`, {
          headers: {
              "Authorization":"Bearer "+localStorage.getItem("token")
              }
      })
        .then((res) => {
          console.log('Reservation deleted Successfully');
          console.log(res);
          viewReservations();
        })
        .catch((err) => {
          console.log(err)
        })
      }

    
    const allMyStadiums = myStadiums.map((oneStadium,index)=>(
        <tr key={index}>
            {/* <Stadium {...oneStadium} reserve={viewReservations}/> */}
            <td>{oneStadium.name}</td>
            <td>{oneStadium.descriptin}</td>
            <td>{oneStadium.size}</td>
            <td>{oneStadium.location}</td>
            <td>{oneStadium.price}</td>
            <td>{oneStadium.facilities.map((fac, index) => (
                    <p key={index}>{fac.facility}</p>
                    ))}</td>
            <td>{oneStadium.category.category}</td>
            <td><img src={"/images/"+oneStadium.image} style={{width:"35px",height:"35px"}}/></td>
            <td><button className="btn btn-outline-secondary" onClick={() => viewReservations(oneStadium._id)}>View</button></td>
            <td><button  className="btn btn-outline-secondary"onClick={()=>editStadium(oneStadium._id)}>Edit</button></td>
            <td><button className="btn btn-outline-secondary" onClick={()=>deleteStadium(oneStadium._id)}>Delete</button></td>
            
        </tr>
    ))
    
    const myReservationsList = myReservations.map((oneReserve,index)=>(
        <tr key={index}>
            <Reservation {...oneReserve} edit={editView} delete={deleteReservation}/>
        </tr>
    ))

  return (
    <div>
        
        <h1>My Stadiums</h1>
        <button className='btn btn-success my-button' onClick={changeToAdd}>Add Stadium</button>
        {isEdit ?
        <StadiumEditForm key={currentStadium._id} setIsEdit={setIsEdit} stadium={currentStadium} update={updateStadium} 
        sports={sports} facilities={facilities}/>
        :""}
      {isAdd ?
        <StadiumCreateForm setIsAdd={setIsAdd} add={addStadium} sports={sports} facilities={facilities} user={user}/>:""}
                <div className='d-md-flex d-sm-flex '> 

         <table className='justify-content-center  table d-md-flex d-sm-flex w-100 table-bordered'>
            <tbody>
            <tr>
                <th className="   table-success ">Stadium Name</th>
                <th className="   table-success ">Stadium Description</th>
                <th className="   table-success ">Stadium Size</th>
                <th className="   table-success ">Stadium Location</th>
                <th className="   table-success ">Stadium Facilities</th>
                <th className="   table-success ">Stadium Category</th>
                <th className="   table-success ">Stadium Price (each hour)</th>
                <th className="   table-success ">Stadium Image</th>{/* Needs to be implemented with Multer / cloudinary CURRENTLY ONLY PLAIN TEXT*/}
                <th className="   table-success ">View Stadium Reservations</th>
                <th className="   table-success ">Edit</th>
                <th className="   table-success ">Delete</th>
            </tr>
            {allMyStadiums}
            </tbody>
        </table>
        </div>

        <h1>My Reservations</h1>
        <table className='justify-content-center table w-100 table-bordered'>
              <tbody>
                <tr>
                  {/* <th>Reservation id</th> */}
                  <th className="   table-success " >Date</th>
                  <th className="   table-success " >Start Time</th>
                  <th className="   table-success " >End Time</th>
                  <th className="   table-success " >Status</th>
                  <th className="   table-success " >Price</th>
                  <th className="   table-success " >User</th>
                  <th className="   table-success " >Stadium Name</th>
                  <th className="   table-success ">Edit</th>
                <th className="   table-success ">Delete</th>
                </tr>
                {myReservationsList}
              </tbody>
        </table>
            {isResEdit && < ReservationEditForm key={currentReservation._id} updateReservation={updateReservation} reservation={currentReservation} user={user}/>}
    </div>
  )
}
