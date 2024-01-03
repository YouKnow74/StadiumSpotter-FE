import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import './App.css';
import Signin from './components/user/Signin';
import Signup from './components/user/Signup';
import {Routes,Route,Link} from 'react-router-dom';
import  Axios  from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useEffect } from 'react';
import StadiumList from './components/stadium/StadiumList';
import Home from './components/home/Home';
import logo from './images/logo.svg'

import SportList from './components/sport/SportList';
import FacilityList from './components/facilities/FacilityList';

import ReservationCreateForm from './components/reservation/ReservationCreateForm';
import ReservationList from './components/reservation/ReservationList';
import UserList from './components/user/UserList';
import UserIndex from './components/user/UserIndex';
import UserEditForm from './components/user/UserEditForm';
import StadiumShow from './components/stadium/StadiumShow';
import ReservationCustomerList from './components/reservation/ReservationCustomerList';
import MyStadium from './components/stadium/MyStadium';


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    let user = getUser();
    console.log(user);

    

    if (user) {
      user = { _id: user.id };
      setIsAuth(true);
      setUser(user);
      console.log("user", user);
      Axios.get(`user/detail?id=${user._id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log("user fetched");
          console.log(res);
          setUserDetails(res.data.userDetail);
          console.log("userdetails");
        })
        .catch((err) => {
          console.log("User details not fetched");
          console.log(err);
        });
    } else {
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser(null);
    }
  }, []);
  console.log("UD", userDetails);

  const registerHandler = (user) => {
    Axios.post("user/signup", user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginHandler = (cred) => {
    Axios.post("user/signin", cred)
      .then((res) => {
        console.log(res.data.token);
        let token = res.data.token;

        if (token != null) {
          localStorage.setItem("token", token);
          const user = getUser();
          console.log(user);
          user ? setIsAuth(true) : setIsAuth(false);
          user ? setUser(user) : setUser(null);
          user ? setUserDetails(user) : setUserDetails(null);
          if (user) {
            Axios.get(`user/detail?id=${user.id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
              .then((res) => {
                console.log("user fetched");
                console.log(res);
                setUserDetails(res.data.userDetail);
                console.log("userdetails");
              })
              .catch((err) => {
                console.log("User details not fetched");
                console.log(err);
              });
          } else {
            setUserDetails(null)
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = () => {
    const token = getToken();
    return token ? jwtDecode(token).user : null;
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    setUserDetails({});
  };

  console.log(userDetails);

  return (
    <div>
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <img className='logo' src={logo}/>
        </a>
      </div>
      <ul class=" col-12 col-md-auto justify-content-center mb-md-0">
        <nav>
      {userDetails && userDetails.role=='Admin'  ?
      (
      <div class="d-flex flex-wrap justify-content-between align-items-center ">
        {/* <Link to="/" class="btn btn-outline-primary me-2">Home</Link> &nbsp; */}
        <Link to="/" class=" px-2 link-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg></Link> &nbsp;
        <Link to="/stadium" class="nav-link px-2">Stadium List</Link> &nbsp;
        <Link to="/sport" class="nav-link px-2">Sport List</Link> &nbsp;
        <Link to="/facility" class="nav-link px-2">Facility List</Link> &nbsp;
        <Link to="/reservations" class="nav-link px-2">Reservations</Link> &nbsp;
        <Link to='/mystadium'class="nav-link px-2">My Stadiums</Link>
        <div class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
            {userDetails &&<img src={"/images/"+userDetails.image} alt="mdo" width="32" height="32" class="rounded-circle"/>}
          </a>
          <ul class="dropdown-menu text-small"  data-popper-placement="bottom-end">

            <li><Link to={`/profile`} class="nav-link px-2">Profile</Link></li>
            <li><Link to={`/usersList`} class="nav-link px-2">All Users</Link></li>
            <li><hr class="dropdown-divider"/></li>
            <li><Link to='/logout'class="btn " onClick={onLogoutHandler}>Logout</Link></li>
          </ul>
        </div>
        {/* <Link to='/logout'class="btn btn-outline-primary me-2" onClick={onLogoutHandler}>Logout</Link> */}
      </div>
      )
      :
      (
        ""
      )
      }
     {userDetails && userDetails.role=='renter'  ?
      (
      <div class="d-flex flex-wrap justify-content-between align-items-center ">
        {/* <Link to="/" class="btn btn-outline-primary me-2">Home</Link> &nbsp; */}
        <Link to="/" class=" px-2 link-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg></Link> &nbsp;
        <Link to="/stadium" class="nav-link px-2">Stadium List</Link> &nbsp;
        {/* <Link to="/sport" class="nav-link px-2">Sport List</Link> &nbsp; */}
        {/* <Link to="/facility" class="nav-link px-2">Facility List</Link> &nbsp; */}
        {/* <Link to="/reservations" class="nav-link px-2">Reservations</Link> &nbsp; */}
        {/* <Link to='/mystadium'class="nav-link px-2">My Stadium </Link> */}
        <div class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
            {userDetails &&<img src={"/images/"+userDetails.image} alt="mdo" width="32" height="32" class="rounded-circle"/>}
          </a>
          <ul class="dropdown-menu text-small"  data-popper-placement="bottom-end">

            <li><Link to={`/profile`} class="nav-link px-2">Profile</Link></li>
            <li><Link to='/logout'class="btn " onClick={onLogoutHandler}>Logout</Link></li>
          </ul>
        </div>
        {/* <Link to='/logout'class="btn btn-outline-primary me-2" onClick={onLogoutHandler}>Logout</Link>&nbsp; */}
      </div>
      )
      :
      (
        ""
      )
      }
     {userDetails && userDetails.role=='stadium owner'  ?
      (
      <div class="d-flex flex-wrap justify-content-between align-items-center ">
        {/* <Link to="/" class="btn btn-outline-primary me-2">Home</Link> &nbsp; */}
        <Link to="/" class=" px-2 link-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg></Link> &nbsp;
        <Link to="/stadium" class="nav-link px-2">Stadium List</Link> &nbsp;
        {/* <Link to="/sport" class="nav-link px-2">Sport List</Link> &nbsp; */}
        {/* <Link to="/facility" class="nav-link px-2">Facility List</Link> &nbsp; */}
        {/* <Link to="/reservations" class="nav-link px-2">Reservations</Link> &nbsp; */}
        <Link to='/mystadium'class="nav-link px-2">My Stadiums</Link>
        <div class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
            {userDetails &&<img src={"/images/"+userDetails.image} alt="mdo" width="32" height="32" class="rounded-circle"/>}
          </a>
          <ul class="dropdown-menu text-small"  data-popper-placement="bottom-end">

            <li><Link to={`/profile`} class="nav-link px-2">Profile</Link></li>
            <li><hr class="dropdown-divider"/></li>
            <li><Link to='/logout'class="btn " onClick={onLogoutHandler}>Logout</Link></li>
          </ul>
        </div>
        {/* <Link to='/logout'class="btn btn-outline-primary me-2" onClick={onLogoutHandler}>Logout</Link>&nbsp; */}
      </div>
      )
      :
      (
        ""
      )
      }
      {!isAuth ? (
                <div class="d-flex flex-wrap justify-content-between align-items-center ">
                <Link to="/" class=" px-2 link-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg></Link> &nbsp;
                <Link to='/signup' class="btn btn-outline-success me-2">Signup</Link> &nbsp;
                <Link to='/signin' class="btn btn-outline-success me-2">Signin</Link> &nbsp;
              </div>
      ):
      ""}
    </nav>
      </ul>

      {/* <div class="col-md-3 text-end">
        <button type="button" class="btn btn-outline-primary me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button>
      </div> */}
    </header>

    
    <div className="App">
      <Routes>


    
      <Route path="/facility" element={isAuth && userDetails && userDetails.role=="Admin" ? <FacilityList user={userDetails}/>:<Signin login={loginHandler}/>}></Route>
      <Route path="/sport" element={isAuth && userDetails && userDetails.role=="Admin" ? <SportList user={userDetails}/>:<Signin login={loginHandler}/>}></Route>
      <Route path="/stadium" element={userDetails ? <StadiumList user={userDetails}/>:<Home /> }></Route>

      <Route path='/signup' element={ <Signup register={registerHandler} /> } />
      <Route path='/signin' element={ isAuth ? <StadiumList user={userDetails}/>:<Signin login={loginHandler} />  } />
      <Route path='/reservation/:id' element={ userDetails && <ReservationCreateForm user={userDetails} /> }/>
      <Route path='/reservations' element={ isAuth && userDetails && userDetails.role=="Admin" ? <ReservationList user={userDetails} /> : <Home /> } />
      {/*
       superData is for when the admin is going to edit another user details we need to save the data of current user
        to be passed into user edit form      

      */}

         {/* <Route

//             path="/usersList"
//             element={<UserList superData={userDetails} />}
//           />
//           <Route
//             path="/profile"
//             element={
//               userDetails && (
//                 <UserIndex
//                   getUser={getUser}
//                   user={userDetails}
//                   superUser={userDetails}
//                 />
//               )
//             }
//           />
//           <Route
//             path="/editProfile"
//             element={
//               <UserEditForm user={userDetails} superUser={userDetails} />
//             }
//           />
//   <Route
//             path="/myReservations"
//             element={
//               isAuth ? (userDetails &&
//                 <ReservationCustomerList user={userDetails} />
//               ) : (
//                 <Signin login={loginHandler} />
//               )
//             }
//           />
//         </Routes>
        
//       </div> */}

      {/*} */ } 


      {/* //} */} 
      <Route path='/allStadiums' element={ userDetails ? <StadiumShow user={userDetails} /> :""} />
      <Route path='/usersList' element={ isAuth && userDetails && userDetails.role=="Admin" ? <UserList superData={userDetails}/> :<Home />} />
      <Route path='/profile' element={ isAuth && <UserIndex getUser={getUser} user={userDetails} superUser={userDetails}/> } />
      <Route path='/editProfile' element={ isAuth && <UserEditForm user={userDetails} superUser={userDetails} /> } />
      <Route path='/' element={ <Home />}/>
      <Route path='/mystadium' element={ userDetails &&(userDetails.role=="stadium owner" || userDetails.role=="Admin") ?<MyStadium user={userDetails}/>:<Home />} />


      </Routes>
    </div>
   

    
    <footer class="d-flex flex-wrap justify-content-between align-items-center border-top">
    <p class="col-md-4 mb-0 text-body-secondary">© 2024 Company, Inc</p>

    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
    <img className='logo' src={logo}/>

    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Features</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Pricing</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About</a></li>
    </ul>
  </footer>
  </div>

  );

}

export default App;
