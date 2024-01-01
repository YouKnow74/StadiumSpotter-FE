import React, { useEffect, useState } from 'react'
import startTime from './startTime'
import endTime from './endTime'
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ReservationCreateForm(props) {

    console.log("user Data",props.user);

    const [newReserve, setNewReserve] = useState({})
    const stadium = useParams();
    const [currentStadium, setCurrentStadium] = useState({})

    const [selectedStartTime, setSelectedStartTime] = useState(startTime[0]);
    const [selectedEndTime, setSelectedEndTime] = useState(endTime[0])
    const [availableEndTime, setAvailableEndTime] = useState([...endTime]);



    const navigate = useNavigate();

    useEffect(() => {
    
        gettingStadiumData();
      
    }, [])
    
    const gettingStadiumData = () => {
        Axios.get(`/reservation/add?id=${stadium.id}`)
        .then((res) => {
            const stadiumData = res.data.stadium;
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
        const reservation = { ...newReserve, startTime: selectedValue, endTime: endTime[startTimeIndex] };
        console.log(reservation);
        setNewReserve(reservation);
    }

    const handleEndTime = (e) => {
        const selectedValue = e.target.value;
        setSelectedEndTime(selectedValue);
        // Calculate the price based on the index of the selected start time and end time
        const startTimeIndex = startTime.indexOf(selectedStartTime);
        const endTimeIndex = endTime.indexOf(selectedValue);

        const durationInHours = endTimeIndex - startTimeIndex;

        const stadiumPrice = currentStadium.price;
        const totalPrice = stadiumPrice * (durationInHours + 1);

        const reservation = { ...newReserve, endTime: selectedValue, price: totalPrice };
        console.log(reservation);
        setNewReserve(reservation);
    };

    const addReservation = (reservation) => {
        Axios.post('/reservation/add', reservation)
        .then(res => {
            console.log("Reservation is Successful!");
        })
        .catch( err => {
            console.log("Error Addding reservation!");
            console.log(err);
        })
    }

    const handleChange = (event) => {
        const reservation = {...newReserve, user: props.user, stadiumName: currentStadium.name, stadium: stadium.id, Status: "Pending"};

        reservation[event.target.name] = event.target.value;
        console.log(reservation);
        setNewReserve(reservation);
        console.log(reservation.endTime);
    }

    const submitReservation = (e) =>{
        e.preventDefault();
        // newReserve.date =JSON.stringify(newReserve.date);
        addReservation(newReserve);
        navigate(`/`)
    }

  return (
    <div>
        <h1>Reservation</h1>
        <div><img src='' alt='...'/></div>
        <div>
            <h2>{currentStadium.name}</h2>
            <form onSubmit={submitReservation}>
                <div>
                    <label htmlFor="inputdate" class="form-label">Choose a Date</label>
                    <input type="date" class="form-control" id="inputdate" name="date" onChange={handleChange} />
                </div>
                <div>
                    <label>Start Time</label>
                    <select name='startTime' onChange={handleStartTime}>
                        {startTime.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>End Time</label>
                    <select name='endTime' value={selectedEndTime} onChange={handleEndTime}>
                        {availableEndTime.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div> 
                
                {/* <input type='hidden' value={props.user.id} name='user' onSubmit={handleChange} /> 
                <input type='hidden' value={currentStadium.name} name='stadiumName' onSubmit={handleChange} />
                <input type='hidden' value={stadium.id} name='stadium' onSubmit={handleChange} />
                <input type='hidden' value={newReserve.Status} name='Status' onSubmit={handleChange} /> */}
                <button type='submit'>Reserve Stadium</button>
            </form>
        </div>
    </div>
  )
}
