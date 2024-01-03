import React, { useEffect, useState } from 'react'
import startTime from './startTime'
import endTime from './endTime'
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ReservationEditForm(props) {


    console.log(props.reservation)
    const [newReserve, setNewReserve] = useState(props.reservation)
    const stadium = useParams();
    const [currentStadium, setCurrentStadium] = useState()

    const [selectedStartTime, setSelectedStartTime] = useState(props.reservation.startTime);
    const [selectedEndTime, setSelectedEndTime] = useState(props.reservation.endTime)
    const [availableEndTime, setAvailableEndTime] = useState([...endTime]);

    const addUser =(e)=>{
        newReserve["user"]=props.user.id;
    }

    const navigate = useNavigate();

    const getStadium = ()=>{
        Axios.get('stadium/')
    }

    useEffect(() => {
    
        gettingStadiumData();
        setSelectedStartTime(props.reservation.startTime)
        setSelectedEndTime(props.reservation.endTime)
     
        setNewReserve({startTime: selectedStartTime, endTime: selectedEndTime,user: props.user._id, stadiumName: props.reservation.stadiumName, stadium: props.reservation.stadium , Status: "Pending" })
      
    }, [])
    
    const gettingStadiumData = () => {
        Axios.get(`/reservation/add?id=${props.reservation.stadium}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then((res) => {
            const reservationData = res.data.reservation;
            const stadiumData = res.data.stadium;
            console.log(reservationData);
            console.log(stadiumData);
            setCurrentStadium(stadiumData);
        })
        .catch(err => {
            console.log("Error Fetching Data!");
            console.log(err);
        })
    }

    const handleStartTime = (e) => {
        const selectedValue = e.target.value;
        setSelectedStartTime (selectedValue)

        let startTimeIndex = startTime.indexOf(selectedValue)

        const slicedEndTime = endTime.slice(startTimeIndex, endTime.length)
        // console.log("Selected Start Time:", selectedValue);
        // console.log("Start Time Index:", startTimeIndex);
        // console.log("Sliced End Time:", slicedEndTime);
        setAvailableEndTime([...slicedEndTime]);
        

        // console.log(reservation);
        const reservation = { ...newReserve, startTime: selectedValue, endTime: null};
        console.log(reservation);
        setNewReserve(reservation);
    }

    const handleEndTime = (e) => {
        const selectedValue = e.target.value;
        setSelectedEndTime(selectedValue);
        const startTimeIndex = startTime.indexOf(selectedStartTime);
        const endTimeIndex = endTime.indexOf(selectedEndTime);

        const durationInHours = endTimeIndex - startTimeIndex;

        const stadiumPrice = currentStadium.price;
        console.log(stadiumPrice);
        const totalPrice = stadiumPrice * (durationInHours + 1);
        // reservation.price = totalPrice;
        console.log("price",parseInt(totalPrice));
        const reservation = { ...newReserve, endTime: selectedValue, price: totalPrice };
        console.log(reservation);
        setNewReserve(reservation);
    };


    const handleChange = (event) => {
        const reservation = {...newReserve, Status: newReserve.Status};


        reservation[event.target.name] = event.target.value;
        console.log(reservation);
        setNewReserve(reservation);
        console.log(reservation.endTime);
    }

    const calculate = ()=>{
        const startTimeIndex1 = startTime.indexOf(selectedStartTime);
        const endTimeIndex = endTime.indexOf(selectedEndTime);

        const durationInHours = endTimeIndex - startTimeIndex1;

        const stadiumPrice = currentStadium.price;
        console.log(stadiumPrice);
        const totalPrice = stadiumPrice * (durationInHours + 1);
        return totalPrice;
    }

    const submitReservation = (e) =>{
        e.preventDefault();
        const reservation = { ...newReserve,_id:props.reservation._id};
        // newReserve.date =JSON.stringify(newReserve.date);
        props.updateReservation(reservation)
        e.target.reset();
        // addReservation(newReserve);
    }
  return (
    <div>
        <h2>Edit Reservation</h2>
            <h2>{newReserve.stadiumName}</h2>
            <form class=" row g-2 " onSubmit={submitReservation}>
               
         <div class=" row g-2 p-2 ">
          <div class="col-12">
              <div class="row g-3  ">
                <div className='col-auto'> 
                    <label htmlFor="inputdate" class="form-label">Choose a Date:</label>
                </div>
                    <div className='col-auto'>
                    <input value={newReserve.date} type="date" class="form-control" id="inputdate" name="date" onChange={handleChange} />
                </div>
                </div>
                </div>
                </div>

            <div class="col-12">
              <div class="row g-2 p-2 ">
                <div className='col-auto'>
                    <label class="form-label">Start Time:</label>
                    </div>
                    <div className='col-auto'>
                    <select class="form-control"  value={selectedStartTime} name='startTime' onChange={handleStartTime}>

                        {startTime.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                    </div>  
                      </div>  
                      </div>
                       
                
              

                <div class="col-12">
              <div class="row g-2 p-2  ">
                <div className='col-auto'>          
                       <label class="form-label">End Time</label>
                </div>

                <div className='col-auto'>             
                     <select  class="form-control"  value={selectedEndTime} name='endTime'onChange={handleEndTime}>

                        {availableEndTime.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                    </div>  
                    </div>

                </div>
               
                {props.user && ((props.user.role == 'stadium owner') || (props.user.role == 'Admin')) &&
                
                <div class="col-12">
                <div class="row g-2 p-2  ">
                  <div className='col-auto'>  
                    <label class="form-label" >Status</label>
                    </div>
                    <div className='col-auto'> 
                    <input value={newReserve.Status} type="text" class="form-control" name="Status" onChange={handleChange} />
                    </div>  
                    </div>

                </div>
                }
                
                {/* <input type='hidden' value={props.user.id} name='user' onSubmit={handleChange} /> 
                <input type='hidden' value={currentStadium.name} name='stadiumName' onSubmit={handleChange} />
                <input type='hidden' value={stadium.id} name='stadium' onSubmit={handleChange} />
                <input type='hidden' value={newReserve.Status} name='Status' onSubmit={handleChange} /> */}
    
            </form>
            <button class="d-flex btn btn-success w-10 p-2 m-3 g-2 " type='submit'>Save Reservation</button>
            </div>

 
  )
}
