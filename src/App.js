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
import LibraryList from './components/library/LibraryList';
import Home from './components/home/Home';
import logo from './images/officiallogo.jpg'


import AlbumList from './components/album/AlbumList';
import CommunityList from './components/communities/CommunityList';

import ReservationCreateForm from './components/reservation/ReservationCreateForm';
import ReservationList from './components/reservation/ReservationList';
import UserList from './components/user/UserList';
import UserIndex from './components/user/UserIndex';
import UserEditForm from './components/user/UserEditForm';
import LibraryShow from './components/library/LibraryShow';
import ReservationCustomerList from './components/reservation/ReservationCustomerList';
import MyLibrary from './components/library/MyLibrary';



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
        console.log(err.message);
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
    <div className='FontChange'>
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <img className='logo' src={logo}/>
        </a>
      </div>
      <nav><ul class=" col-12 col-md-auto justify-content-center mb-md-0">
      <div className="d-flex flex-wrap justify-content-between align-items-center ">
        {/* <Link to="/" className="btn btn-outline-primary me-2">Home</Link> &nbsp; */}
        <Link to="/" className=" px-2 link-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg></Link> &nbsp;
        <Link to="/library" className="nav-link px-2">Library List</Link> &nbsp;
        <Link to="/album" className="nav-link px-2">Album List</Link> &nbsp;
        <div className="dropdown text-end">
          <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
            {userDetails &&<img src={"/images/"+userDetails.image} alt="mdo" width="32" height="32" className="rounded-circle"/>}
            <div>
      <a href="file:///C:/Users/ASUS-PC/OneDrive/Desktop/Game%202/game2.html" classname="Enetertain">Game 2</a>
    </div>

          <ul className="dropdown-menu text-small"  data-popper-placement="bottom-end">

            <li><Link to={`/profile`} className="nav-link px-2"></Link></li>
            <li><Link to={`/usersList`} className="nav-link px-2"></Link></li>
            <li><hr className="dropdown-divider"/></li>
           
          </ul>
          </a>
        </div>
        <Link to="/community" className="nav-link px-2">Community List</Link> &nbsp;
        <Link to="/reservations" className="nav-link px-2">Reservations</Link> &nbsp;
        <Link to="/myReservations" className="nav-link px-2">My Reservations</Link>&nbsp;
        <Link to='/mylibrary'className="nav-link px-2">My Libraries</Link>
        <div className="dropdown text-end">
          <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
            {userDetails &&<img src={"/images/"+userDetails.image} alt="mdo" width="32" height="32" className="rounded-circle"/>}
          </a>

          <ul className="dropdown-menu text-small"  data-popper-placement="bottom-end">

            <li><Link to={`/profile`} className="nav-link px-2">Profile</Link></li>
            <li><Link to={`/usersList`} className="nav-link px-2">All Users</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link to='/logout'className="btn " onClick={onLogoutHandler}>Logout</Link></li>
          </ul>
        </div>
        {/* <Link to='/logout'class="btn btn-outline-primary me-2" onClick={onLogoutHandler}>Logout</Link> */}
      </div>


     {userDetails && userDetails.role=='renter'  ?
      (
      <div className="d-flex flex-wrap justify-content-between align-items-center ">
        {/* <Link to="/" className="btn btn-outline-primary me-2">Home</Link> &nbsp; */}
        <Link to="/" className=" px-2 link-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg></Link> &nbsp;
        <Link to="/library" className="nav-link px-2">Library List</Link> &nbsp;
        <Link to="/myReservations" className="nav-link px-2">My Reservations</Link> &nbsp;
        {/* <Link to="/album" className="nav-link px-2">Album List</Link> &nbsp; */}
        {/* <Link to="/community" className="nav-link px-2">Community List</Link> &nbsp; */}
        {/* <Link to="/reservations" className="nav-link px-2">Reservations</Link> &nbsp; */}
        {/* <Link to='/mylibrary'className="nav-link px-2">My Library </Link> */}
        <div className="dropdown text-end">
          <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
            {userDetails &&<img src={"/images/"+userDetails.image} alt="mdo" width="32" height="32" className="rounded-circle"/>}
          </a>
          <ul className="dropdown-menu text-small"  data-popper-placement="bottom-end">

            <li><Link to={`/profile`} className="nav-link px-2">Profile</Link></li>
            <li><Link to='/logout'className="btn " onClick={onLogoutHandler}>Logout</Link></li>
          </ul>
        </div>
        {/* <Link to='/logout'className="btn btn-outline-primary me-2" onClick={onLogoutHandler}>Logout</Link>&nbsp; */}
      </div>
      )
      :
      (
        ""
      )
      }



  





     
{userDetails && userDetails.role=='library owner'  ?
      (
      <div className="d-flex flex-wrap justify-content-between align-items-center ">
        {/* <Link to="/" className="btn btn-outline-primary me-2">Home</Link> &nbsp; */}
        <Link to="/" className=" px-2 link-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg></Link> &nbsp;

        <Link to="/library" className="nav-link px-2">Library List</Link> &nbsp;
        <Link to="/myReservations" className="nav-link px-2">My Reservations</Link> &nbsp;
        {/* <Link to="/album" className="nav-link px-2">Album List</Link> &nbsp; */}
        {/* <Link to="/community" className="nav-link px-2">Community List</Link> &nbsp; */}
        {/* <Link to="/reservations" className="nav-link px-2">Reservations</Link> &nbsp; */}
        <Link to='/mylibrary'className="nav-link px-2">My Libraries</Link>
        <div className="dropdown text-end">
          <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
            {userDetails &&<img src={"/images/"+userDetails.image} alt="mdo" width="32" height="32" className="rounded-circle"/>}
          </a>
          <ul className="dropdown-menu text-small"  data-popper-placement="bottom-end">

            <li><Link to={`/profile`} className="nav-link px-2">Profile</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link to='/logout'className="btn " onClick={onLogoutHandler}>Logout</Link></li>
          </ul>
        </div>
        {/* <Link to='/logout'className="btn btn-outline-primary me-2" onClick={onLogoutHandler}>Logout</Link>&nbsp; */}
      </div>
      )
      :
      (
        ""
      )
      }








{!isAuth ? (
                <div className="d-flex flex-wrap justify-content-between align-items-center ">
                <Link to="/" className=" px-2 link-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg></Link> &nbsp;
                <Link to='/signup' className="btn btn-outline-success me-2">Signup</Link> &nbsp;
                <Link to='/signin' className="btn btn-outline-success me-2">Signin</Link> &nbsp;
              </div>
      ):
      ""}
    
      </ul>
</nav>
      {/* <div className="col-md-3 text-end">
        <button type="button" className="btn btn-outline-primary me-2">Login</button>
        <button type="button" className="btn btn-primary">Sign-up</button>
      </div> */}
    </header>
    









    <div className="App">
      <Routes>


    
      <Route path="/community" element={isAuth && userDetails && userDetails.role=="Admin" ? <CommunityList user={userDetails}/>:<Signin login={loginHandler}/>}></Route>
      <Route path="/album" element={isAuth && userDetails && userDetails.role=="Admin" ? <AlbumList user={userDetails}/>:<Signin login={loginHandler}/>}></Route>
      <Route path="/library" element={userDetails ? <LibraryList user={userDetails}/>:<Home /> }></Route>

      <Route path='/signup' element={ <Signup register={registerHandler} /> } />
      <Route path='/signin' element={ isAuth ? <LibraryList user={userDetails}/>:<Signin login={loginHandler} />  } />
      <Route path='/reservation/:id' element={ userDetails && <ReservationCreateForm user={userDetails} /> }/>
      <Route path='/reservations' element={ isAuth && (userDetails && userDetails.role=="Admin") ? <ReservationList user={userDetails} /> : <Home /> } />




 <Route path="/myReservations" element={ isAuth ? (userDetails && <ReservationCustomerList user={userDetails} />
            ) : (
             <Signin login={loginHandler} />
            )
           }
           />

      <Route path='/allLibraries' element={ userDetails ? <LibraryShow user={userDetails} /> :""} />
      <Route path='/usersList' element={ isAuth && userDetails && userDetails.role=="Admin" ? <UserList superData={userDetails}/> :<Home />} />
      <Route path='/profile' element={ isAuth && <UserIndex getUser={getUser} user={userDetails} superUser={userDetails}/> } />
      <Route path='/editProfile' element={ isAuth && <UserEditForm user={userDetails} superUser={userDetails} /> } />


      <Route path='/' element={ <Home />}/>
      <Route path='/mylibrary' element={ userDetails &&(userDetails.role=="library owner" || userDetails.role=="Admin") ?<MyLibrary user={userDetails}/>:<Home />} />


      </Routes>
    </div>


    
    <footer class="d-flex flex-wrap justify-content-between align-items-center border-top">
    <p class="col-md-4 mb-0 text-body-secondary">© 2024 Music Box Library, Inc</p>

    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
    <img className='logo' src={logo}/>

    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Albums</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Membership</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Visit our Branches</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About US</a></li>
    </ul>


    

  </footer>
  </div>

  );

}

export default App;
