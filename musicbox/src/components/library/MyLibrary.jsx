import React,{useEffect,useState} from 'react'
import  Axios  from 'axios';
import Stadium from './Library';
import Reservation from '../reservation/Reservation';
import StadiumEditForm from './LibraryEditForm';
import StadiumCreateForm from './LibraryCreateForm';
import dayjs from 'dayjs'
import ReservationEditForm from '../reservation/ReservationEditForm';

export default function MyLibrary({user}) {

    const [myLibraries,setMyLibraries]=useState([]);
    const [myReservations,setMyReservations]=useState([]);
    const [viewS,setViewS]=useState(false);
    const [viewR,setViewR]=useState(false);
    const [isEdit,setIsEdit]=useState(false);
    const [isAdd,setIsAdd]=useState(false);
    const [currentLibrary,setCurrentLibrary]=useState({});
    const [sports,setAlbums]=useState([]);
    const [communities,setCommunities]=useState([]);
    const [currentReservation, setCurrentReservation] = useState({});
    const [isResEdit, setIsResEdit] = useState(false)
    // const [currentUser,setCurrentUser]=useState(props.user)


    useEffect(() => {
    // setCurrentUser();
    loadMyLibrarieslist();
    
      
    }, [])
    
    const changeToAdd=()=>{
        setIsAdd(!isAdd)
        setIsEdit(false)
    }

    const loadMyLibrarieslist =()=>{
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
        Axios.get(`library/detail?id=${user._id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(response => {
            Axios.get("library/add", {
                headers: {
                    "Authorization":"Bearer "+localStorage.getItem("token")
                    }
            })
            .then(res=>{
                console.log("album list");
                console.log(res);
                setAlbums(res.data.albums);
            })
            .catch(err=>{
                console.log("error bringing albums list");
                console.log(err);
            })
            Axios.get("community/index", {
                headers: {
                    "Authorization":"Bearer "+localStorage.getItem("token")
                    }
            })
            .then(res=>{
                console.log("Communities list");
                console.log(res);
                setCommunities(res.data.community);
            })
            .catch(err=>{
                console.log("error bringing communities list");
                console.log(err);
            })
            console.log(response);
            setMyLibraries(response.data.libraries)
        })
        .catch(err => {
            console.log("Error Getting all Libraries");
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

    const addLibrary =(library)=>{
        Axios.post("library/add",library, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("Library Added");
            console.log(res);
            loadMyLibrarieslist();
        })
        .catch(err=>{
            console.log("Error Adding Library ");
            console.log(err);
        })
    }

    const editLibrary = (id)=>{
        Axios.get(`library/edit?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("info good for editing");
            console.log(res.data.library);
            setIsEdit(!isEdit);
            setIsAdd(false)
            setCurrentLibrary(res.data.library);

        })
        .catch(err=>{
            console.log("error in editing library");
            console.log(err);
        })

    }
    
    const updateLibrary =(library)=>{
        Axios.put("library/update",library , {
            headers: {
                'Content-Type' : 'multipart/form-data',
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("Library Updated");
            console.log(res);
            loadMyLibrarieslist();
            // setIsEdit(false);
        })
        .catch(err=>{
            console.log("error updating library");
            console.log(err);
        })
    }

    const deleteLibrary = (id)=>{
        Axios.delete(`library/delete?id=${id}`, {
            headers: {
               
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("deleted");
            console.log(res);
            loadMyLibrarieslist();
        })
        .catch(err=>{
            console.log("Error Deleting Library");
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

    
    const allMyLibraries = myLibraries.map((oneLibrary,index)=>(
        <tr key={index}>
            {/* <Stadium {...oneLibrary} reserve={viewReservations}/> */}
            <td>{oneLibrary.name}</td>
            <td>{oneLibrary.descriptin}</td>
            <td>{oneLibrary.size}</td>
            <td>{oneLibrary.location}</td>
            <td>{oneLibrary.price}</td>
            <td>{oneLibrary.communities.map((fac, index) => (
                    <p key={index}>{com.community}</p>
                    ))}</td>
            <td>{oneLibrary.category.category}</td>
            <td><img src={"/images/"+oneLibrary.image} style={{width:"35px",height:"35px"}}/></td>
            <td><button onClick={() => viewReservations(oneLibrary._id)}>View</button></td>
            <td><button onClick={()=>editLibrary(oneLibrary._id)}>Edit</button></td>
            <td><button onClick={()=>deleteLibrary(oneLibrary._id)}>Delete</button></td>
            
        </tr>
    ))
    
    const myReservationsList = myReservations.map((oneReserve,index)=>(
        <tr key={index}>
            <Reservation {...oneReserve} edit={editView} delete={deleteReservation}/>
        </tr>
    ))

  return (
    <div>
        
        <h1>My Libraries</h1>
        <button className='btn btn-success my-button' onClick={changeToAdd}>Add Library</button>
        {isEdit ?
        <LibraryEditForm key={currentLibrary._id} setIsEdit={setIsEdit} library={currentLibrary} update={updateLibrary} 
        albums={albumss} communitiesties={communities}/>
        :""}
        {isAdd ?
        <LibraryCreateForm setIsAdd={setIsAdd} add={addLibrary} albums={albums} communities={communities} user={user}/>:""}
         <table className='table table-dark table-striped-columns'>
            <tbody>
            <tr>
                <th>Library Name</th>
                <th>Library Description</th>
                <th>Library Size</th>
                <th>Library Location</th>
                <th>Library Communities</th>
                <th>Library Category</th>
                <th>Library Price (each hour)</th>
                <th>Library Image</th>{/* Needs to be implemented with Multer / cloudinary CURRENTLY ONLY PLAIN TEXT*/}
                <th>View Library Reservations</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            {allMyLibraries}
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
                  <th>Library Name</th>
                </tr>
                {myReservationsList}
              </tbody>
        </table>
            {isResEdit && < ReservationEditForm key={currentReservation._id} updateReservation={updateReservation} reservation={currentReservation} user={user}/>}
    </div>
  )
}
