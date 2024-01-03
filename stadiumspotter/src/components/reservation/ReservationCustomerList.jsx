import React,{useEffect,useState} from 'react';
import  Axios  from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Reservation from './Reservation';
import ReservationEditForm from './ReservationEditForm';
import dayjs from 'dayjs'

export default function ReservationCustomerList({user}) {

  const [reservations, setReservations] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentReservation, setCurrentReservation] = useState({});


  useEffect(() => {
    loadReservations();
  }, [])
  

  const loadReservations = () => {
    console.log(user._id);
    Axios.get(`reservation/detail?id=${user._id}`, {
      headers: {
          "Authorization":"Bearer "+localStorage.getItem("token")
          }
  })
    .then((response) => {
      console.log(response);
      const resData = response.data.reservstions;
      setReservations(resData)
      console.log(resData);
    })
    .catch((err) => {
      console.log(err)
    })
  }

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
      setIsEdit(!isEdit);
      setCurrentReservation(reservation);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const updateReservation = (reservation) => {
    Axios.put('reservation/update', reservation, {
      headers: {
          "Authorization":"Bearer "+localStorage.getItem("token")
          }
  })
    .then((res) => {
      console.log('Reservation updated Successfully');
      console.log(res);
      loadReservations();
      setIsEdit(false);
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
      loadReservations();
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const allReservations = reservations.map((reservation, index) => {

    // reservation.date = dayjs(reservation.date).format('DD/MM/YYYY')
    // console.log(reservation.date)

    return (<tr key={index}>
      <Reservation {...reservation} edit={editView} delete={deleteReservation} user={user}/>
    </tr>
  )});

  return (
    <div>
        <h1>Reservation List</h1>
        <div className='d-flex table-responsive'>
            <table className='justify-content-center table w-100 table-bordered'>
              <tbody>
                <tr>
                  {/* <th>Reservation id</th> */}
                  <th className='table-success'>Date</th>
                  <th className='table-success'>Start Time</th>
                  <th className='table-success'>End Time</th>
                  <th className='table-success'>Status</th>
                  <th className='table-success'>Price</th>
                  <th className='table-success'>User</th>
                  <th className='table-success'>Stadium Name</th>
                  <th className='table-success'></th>
                  <th className='table-success'></th>
                </tr>
                {allReservations}
              </tbody>
            </table>
        </div>
        {isEdit && < ReservationEditForm key={currentReservation._id} user={user} updateReservation={updateReservation} reservation={currentReservation} />}
        
    </div>
  )
}
