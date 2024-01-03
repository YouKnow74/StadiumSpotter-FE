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


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    let user = getUser();
    console.log(user);

    user = { _id: user.id };

    if (user) {
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
      {isAuth ?
      (
      <div class="d-flex flex-wrap justify-content-between align-items-center ">
        <Link to="/" class="nav-link px-2">Home</Link> &nbsp;
        <Link to="/stadium" class="nav-link px-2">Stadium List</Link> &nbsp;
        <Link to="/sport" class="nav-link px-2">Sport List</Link> &nbsp;
        <Link to="/facility" class="nav-link px-2">Facility List</Link> &nbsp;
        <Link to="/reservations" class="nav-link px-2">Reservations</Link> &nbsp;
        <Link to={`/profile`} class="nav-link px-2">{userDetails &&<img src={"/images/"+userDetails.image} style={{width:"35px",height:"35px"}}/>}</Link>&nbsp;
        <Link to='/logout'class="nav-link px-2" onClick={onLogoutHandler}>Logout</Link>&nbsp;

      </div>
      )
      :
      (
        <div>
        <Link to="/" class=" px-2 link-secondary">Home</Link> &nbsp;
        <Link to='/signup' class="btn btn-outline-primary me-2">Signup</Link> &nbsp;
        <Link to='/signin' class="btn btn-outline-primary me-2">Signin</Link> &nbsp;
      </div>
      )
      }
    </nav>
      </ul>

      <div class="col-md-3 text-end">
        <button type="button" class="btn btn-outline-primary me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button>
      </div>
    </header>

    
    <div className="App">
      <Routes>


    
      <Route path="/facility" element={isAuth ? <FacilityList user={userDetails}/>:<Signin login={loginHandler}/>}></Route>
      <Route path="/sport" element={isAuth ? <SportList user={userDetails}/>:<Signin login={loginHandler}/>}></Route>
      <Route path="/stadium" element={isAuth ? <StadiumList user={userDetails}/>:<Signin login={loginHandler}/>}></Route>

      <Route path='/signup' element={ <Signup register={registerHandler} /> } />
      <Route path='/signin' element={ isAuth ? <StadiumList user={userDetails}/>:<Signin login={loginHandler} /> } />
      <Route path='/reservation/:id' element={ <ReservationCreateForm user={userDetails} /> }/>
      <Route path='/reservations' element={ isAuth ? <ReservationList user={userDetails} /> : <Signin login={loginHandler} /> } />
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
        
//       </div>

      //} */}
      <Route path='/allStadiums' element={ userDetails ? <StadiumShow user={userDetails} /> :""} />
      <Route path='/usersList' element={ <UserList superData={userDetails}/> } />
      <Route path='/profile' element={ <UserIndex getUser={getUser} user={userDetails} superUser={userDetails}/> } />
      <Route path='/editProfile' element={ <UserEditForm user={userDetails} superUser={userDetails} /> } />
      <Route path='/' element={ <Home />}/>


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
