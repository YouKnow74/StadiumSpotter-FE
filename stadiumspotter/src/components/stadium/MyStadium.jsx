import React,{useEffect,useState} from 'react'
import  Axios  from 'axios';
import Stadium from './Stadium';
import Reservation from '../reservation/Reservation';

export default function MyStadium({user}) {

    const [myStadiums,setMyStadiums]=useState([]);
    const [myReservations,setMyReservations]=useState([]);
    const [viewS,setViewS]=useState(false);
    const [viewR,setViewR]=useState(false);
    // const [currentUser,setCurrentUser]=useState(props.user)


    useEffect(() => {
    // setCurrentUser();
    loadMyStadiumslist();
    
      
    }, [])
    
    

    const loadMyStadiumslist =()=>{
        Axios.get(`reservation/stadiumOwner?id=${user._id}`)
        .then(res=>{
            console.log("Stadiums Fetched");
            console.log(res);
            setMyStadiums(res.data.stadium);
        })
        .catch(err=>{
            console.log("Stadiums not fetched");
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

    
    const allMyStadiums = myStadiums.map((oneStadium,index)=>(
        <tr key={index}>
            <Stadium {...oneStadium} reserve={viewReservations}/>
        </tr>
    ))
    
    const myReservationsList = myReservations.map((oneReserve,index)=>(
        <tr key={index}>
            <Reservation {...oneReserve}/>
        </tr>
    ))

  return (
    <div>
        
        <h1>My Stadiums</h1>
         <table className='table table-dark table-striped-columns'>
            <tbody>
            <tr>
                <th>Stadium Name</th>
                <th>Stadium Description</th>
                <th>Stadium Size</th>
                <th>Stadium Location</th>
                <th>Stadium Facilities</th>
                <th>Stadium Category</th>
                <th>Stadium Price (each hour)</th>
                <th>Stadium Image</th>{/* Needs to be implemented with Multer / cloudinary CURRENTLY ONLY PLAIN TEXT*/}
                <th>View My Reservations</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            {allMyStadiums}
            </tbody>
        </table>
        <h1>My Reservations</h1>
        <table className='table table-dark table-striped-columns'>
              <tbody>
                <tr>
                  {/* <th>Reservation id</th> */}
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>User</th>
                  <th>Stadium Name</th>
                </tr>
                {myReservationsList}
              </tbody>
            </table>
    </div>
  )
}
