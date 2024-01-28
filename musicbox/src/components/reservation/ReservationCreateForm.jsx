import React, { useEffect, useState } from 'react'
import startTime from './startTime'
import endTime from './endTime'
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Reserved from './Reserved';

export default function ReservationCreateForm(props) {

    console.log("user Data",props.user);

    const [newReserve, setNewReserve] = useState({})
    const library = useParams();
    const [currentLibrary, setCurrentLibrary] = useState({})

    const [selectedStartTime, setSelectedStartTime] = useState(startTime[0]);
    const [selectedEndTime, setSelectedEndTime] = useState(endTime[0])
    const [availableEndTime, setAvailableEndTime] = useState([...endTime]);
    const [reservedTimes,setReservedTimes] = useState([])
    
    const reservedTimesFetch=()=>{
        Axios.get(`/reservation/reserved?id=${library.id}`)
        .then(res=>{
            console.log("Reserved list fetched");
            console.log(res);
            setReservedTimes(res.data.reserved);
        })
        .catch(err=>{
            console.log("error fetching reserved list");
            console.log(err);
        })

    }


    const navigate = useNavigate();

    useEffect(() => {

   
        gettingStadiumData();
        setSelectedStartTime(startTime[0])
        setSelectedEndTime(endTime[0])
        const startTimeIndex = startTime.indexOf(selectedStartTime);
        const endTimeIndex = endTime.indexOf(selectedEndTime);

        const durationInHours = endTimeIndex - startTimeIndex;

        const libraryPrice = currentLibrary.price;
        const totalPrice = libraryPrice * (durationInHours + 1);
        setNewReserve({startTime: selectedStartTime, endTime: selectedEndTime, price: totalPrice, user: props.user, libraryName: currentLibrary.name, library: library.id, Status: "Pending" })

        reservedTimesFetch();
        
    }, [])
    

        
    const gettingLibraryData = () => {
        Axios.get(`/reservation/add?id=${library.id}`, {
        headers: {
            "Authorization":"Bearer "+localStorage.getItem("token")
            }
        })
        .then((res) => {
            const libraryData = res.data.library;
            console.log(libraryData);
            setCurrentLibrary(libraryData);
        })
        .catch(err => {
            console.log("Error Fetching Data!");
            console.log(err);
        })
        
    }

console.log(reservedTimes);

// for (let i = 0; i< reservedTimes.length;i++){
//     // console.log(startTime.indexOf("7:00 AM"));
//     console.log(reservedTimes[i].startTime);
//     if()
//     if(startTime.indexOf(reservedTimes[i].startTime) > 0){
//     console.log(startTime.indexOf(reservedTimes[i].startTime));
//     startTime.splice(startTime.indexOf(reservedTimes[i].startTime),1)
//     }

//     if(endTime.indexOf(reservedTimes[i].endTime) > 0){
//         console.log(endTime.indexOf(reservedTimes[i].endTime));
//         endTime.splice(endTime.indexOf(reservedTimes[i].endTime),1)
//     }
//     // endTime.splice(endTime.indexOf(reservedTimes[i].endTime),1)
    
//    } 

    const handleStartTime = (e) => {


        const selectedValue = e.target.value;
        setSelectedStartTime (selectedValue);

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

        const libraryPrice = currentLibrary.price;
        const totalPrice = libraryPrice * (durationInHours + 1);

        const reservation = { ...newReserve, endTime: selectedValue, price: totalPrice };
        console.log(reservation);
        setNewReserve(reservation);
    };

    const addReservation = (reservation) => {
        Axios.post('/reservation/add', reservation, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res => {
            console.log("Reservation is Successful!");
        })
        .catch( err => {
            console.log("Error Addding reservation!");
            console.log(err);
        })
    }

    const handleChange = (event) => {
        const reservation = {...newReserve, libraryName: currentLibrary.name};

        reservation[event.target.name] = event.target.value;
        console.log(reservation);
        setNewReserve(reservation);
        console.log(reservation.endTime);
    }

    const submitReservation = (e) =>{
        e.preventDefault();
        let flag = true;
        for (let i = 0;i<reservedTimes.length;i++){
            if(newReserve.date){
                if(selectedStartTime==reservedTimes[i].startTime || selectedEndTime==reservedTimes[i].endTime){
                    flag =false;
                    break;
                }
            }
        }
        // newReserve.date =JSON.stringify(newReserve.date);
        if(flag==true){
        addReservation(newReserve);
        navigate(`/`)
        }
        e.target.reset();
        
    }

    const allReserved = reservedTimes.map((oneReserv,index)=>(
        <tr key={index}>
            <Reserved {...oneReserv}/>
        </tr>
    ))
  return (
    <div>   
        <h1>Reservation</h1>
        <div><img src={"/images/"+currentLibrary.image} style={{width:"35px",height:"35px"}}/></div>
        <div>
            <table>
                <thead>Reserved Table</thead>
                <tbody>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                </tbody>
                {allReserved}
            </table>
        </div>
        <div>
            <h2>{currentLibrary.name}</h2>
            <form onSubmit={submitReservation}>
                <div>
                    <label htmlFor="inputdate" className="form-label">Choose a Date</label>
                    <input type="date" className="form-control green-border focus-ring focus-ring-success" id="inputdate" name="date" onChange={handleChange} />
                </div>
                <div>
                    <label>Start Time</label>
                    <select name='startTime' className='form-control green-border focus-ring focus-ring-success' value={selectedStartTime} onChange={handleStartTime}>
                        {startTime.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>End Time</label>
                    <select name='endTime' className='form-control green-border focus-ring focus-ring-success' value={selectedEndTime} onChange={handleEndTime}>
                        {availableEndTime.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div> 
                
                {/* <input type='hidden' value={props.user.id} name='user' onSubmit={handleChange} /> 
                <input type='hidden' value={currentLibrary.name} name='libraryName' onSubmit={handleChange} />
                <input type='hidden' value={library.id} name='library' onSubmit={handleChange} />
                <input type='hidden' value={newReserve.Status} name='Status' onSubmit={handleChange} /> */}
                <button type='submit' className='btn btn-success my-button'>Reserve Library</button>
            </form>
        </div>
    </div>
  )
}