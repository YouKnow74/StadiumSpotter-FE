import React, { useState } from 'react'
import startTime from './startTime'
import endTime from './endTime'
import Axios from 'axios';

export default function ReservationCreateForm() {

    const [newReserve, setNewReserve] = useState({})

    const [selectedStartTime, setSelectedStartTime] = useState("");
    const [availableEndTime, setAvailableEndTime] = useState([...endTime]);

    const handleStartTime = (e) => {
        const selectedValue = e.target.value;
        setSelectedStartTime (selectedValue)

        console.log(availableEndTime)
        const startTimeIndex = startTime.indexOf(selectedValue)

        const slicedEndTime = endTime.slice(startTimeIndex, endTime.length)
        setAvailableEndTime(slicedEndTime);
    }

    const addReservation = (reservation) => {
        Axios.post('/reservation/add', reservation)
        .then(res => {
            console.log("Reservation is Successful!");
        })
        .catch( err => {
            console.log("Error Addding Author!");
            console.log(err);
        })
    }

  return (
    <div>
        <h1>Reservation</h1>
        <div><img/></div>
        <div>
            <h2></h2>
            <form>
                <div>
                    <label htmlFor="inputdate" class="form-label">Choose a Date</label>
                    <input type="date" class="form-control" id="inputdate" name="date" />
                </div>
                <div>
                    <label>Start Time</label>
                    <select name='startTime' onChange={handleStartTime}>
                        {startTime.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
                {selectedStartTime ? 
                <div>
                    <label>End Time</label>
                    <select name='endTime'>
                        {availableEndTime.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div> 
                :
                <div>
                    <label>End Time</label>
                    <select name='endTime' aria-label="Disabled select example" disabled>
                        {endTime.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div> 
                }
                
            </form>
        </div>
    </div>
  )
}
