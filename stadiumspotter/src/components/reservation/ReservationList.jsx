import React,{useEffect,useState} from 'react';
import  Axios  from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Reservation from './Reservation';
import ReservationEditForm from './ReservationEditForm';
import dayjs from 'dayjs'

export default function ReservationList() {

  const [reservations, setReservations] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentReservation, setCurrentReservation] = useState({});


  useEffect(() => {
    loadReservations();
  }, [])
  

  const loadReservations = () => {
    Axios.get("reservation/index")
    .then((response) => {
      console.log(response);
      const resData = response.data.reservation;
      setReservations(resData)
      console.log(resData);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const editView = (id) => {
    Axios.get(`reservation/edit?id=${id}`)
    .then((res) => {
      console.log(res.data.reservation);
      let reservation = res.data.reservation;
      reservation.date = dayjs(reservation.date).format('YYYY-MM-DD')
      console.log(reservation.date)
      setIsEdit(true);
      setCurrentReservation(reservation);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const updateReservation = (reservation) => {
    Axios.put('reservation/update', reservation)
    .then((res) => {
      console.log('Author updated Successfully');
      console.log(res);
      loadReservations();
      setIsEdit(false);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const allReservations = reservations.map((reservation, index) => {

    // reservation.date = dayjs(reservation.date).format('DD/MM/YYYY')
    // console.log(reservation.date)

    return (<tr key={index}>
      <Reservation {...reservation} edit={editView} />
    </tr>
  )});

  return (
    <div>
        <h1>Reservation List</h1>
        <div>
            <table>
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
                {allReservations}
              </tbody>
            </table>
        </div>
        < ReservationEditForm key={currentReservation._id} updateReservation={updateReservation} reservation={currentReservation} />
    </div>
  )
}
