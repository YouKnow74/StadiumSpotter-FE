import React, { useEffect, useState } from 'react'
import startTime from './startTime'
import endTime from './endTime'
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ReservationEditForm(props) {


    console.log(props.reservation)
    const [newReserve, setNewReserve] = useState(props.reservation)
    const stadium = useParams();
    const [currentStadium, setCurrentStadium] = useState({})

    const [selectedStartTime, setSelectedStartTime] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("")
    const [availableEndTime, setAvailableEndTime] = useState([...endTime]);

    const addUser =(e)=>{
        newReserve["user"]=props.user.id;
    }

    const navigate = useNavigate();

    useEffect(() => {
    
        gettingStadiumData();
        setSelectedStartTime(startTime[0])
        setSelectedEndTime(endTime[0])
        const startTimeIndex = startTime.indexOf(selectedStartTime);
        const endTimeIndex = endTime.indexOf(selectedEndTime);

        const durationInHours = endTimeIndex - startTimeIndex;

        const stadiumPrice = currentStadium.price;
        const totalPrice = stadiumPrice * (durationInHours + 1);
        setNewReserve({startTime: selectedStartTime, endTime: selectedEndTime, price: totalPrice, user: props.user, stadiumName: currentStadium.name, stadium: stadium.id, Status: "Pending" })
      
    }, [])
    
    const gettingStadiumData = () => {
        Axios.get(`/reservation/add?id=${stadium.id}`, {
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

        const startTimeIndex = startTime.indexOf(selectedValue)

        const slicedEndTime = endTime.slice(startTimeIndex, endTime.length)
        // console.log("Selected Start Time:", selectedValue);
        // console.log("Start Time Index:", startTimeIndex);
        // console.log("Sliced End Time:", slicedEndTime);
        setAvailableEndTime([...slicedEndTime]);
        const reservation = { ...newReserve, startTime: selectedValue, endTime: null };
        console.log(reservation);
        setNewReserve(reservation);
    }

    const handleEndTime = (e) => {
        const selectedValue = e.target.value;
        setSelectedEndTime(selectedValue);
        const reservation = { ...newReserve, endTime: selectedValue, };
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

    const submitReservation = (e) =>{
        e.preventDefault();
        // newReserve.date =JSON.stringify(newReserve.date);
        props.updateReservation(newReserve)
        e.target.reset();
        // addReservation(newReserve);
    }
  return (
    <div>
        <h1>Edit Reservation</h1>
        <div><img src='' alt='...'/></div>
        <div>
            <h2>{newReserve.stadiumName}</h2>
            <form onSubmit={submitReservation}>
                <div>
                    <label htmlFor="inputdate" class="form-label">Choose a Date</label>
                    <input value={newReserve.date} type="date" class="form-control" id="inputdate" name="date" onChange={handleChange} />
                </div>
                <div>
                    <label>Start Time</label>
                    <select value={newReserve.startTime} name='startTime' onChange={handleStartTime}>
                        {startTime.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>End Time</label>
                    <select value={newReserve?newReserve.endTime:props.reservation.endTime} name='endTime'onChange={handleEndTime}>
                        {availableEndTime.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
                {props.user && ((props.user.role == 'stadium owner') || (props.user.role == 'Admin')) &&
                
                <div>
                    <label>Status</label>
                    <input value={newReserve.Status} type="text" class="form-control" name="Status" onChange={handleChange} />
                </div>
                }
                
                {/* <input type='hidden' value={props.user.id} name='user' onSubmit={handleChange} /> 
                <input type='hidden' value={currentStadium.name} name='stadiumName' onSubmit={handleChange} />
                <input type='hidden' value={stadium.id} name='stadium' onSubmit={handleChange} />
                <input type='hidden' value={newReserve.Status} name='Status' onSubmit={handleChange} /> */}
                <button type='submit'>Save Reservation</button>
            </form>
        </div>
    </div>
  )
}
