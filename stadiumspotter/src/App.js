
import './App.css';
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Signin from './components/user/Signin';
import Signup from './components/user/Signup';
import {Routes,Route,Link} from 'react-router-dom';
import  Axios  from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useEffect } from 'react';
import StadiumList from './components/stadium/StadiumList';
import ReservationCreateForm from './components/reservation/ReservationCreateForm';


function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
 

  useEffect(() => {
    const user = getUser();
    console.log(user);
    if(user){
      setIsAuth(true);
      setUser(user);
    }else{
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser(null);
    }
  }, [])

  const registerHandler = (user) => {
    Axios.post("user/signup", user)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const loginHandler = (cred) => {
    Axios.post("user/signin", cred)
    .then(res => {
      console.log(res.data.token);
      let token = res.data.token;

      if(token != null)
      {
        localStorage.setItem("token", token);
        const user = getUser();
        console.log(user);
        user ? setIsAuth(true) : setIsAuth(false)
        user ? setUser(user) : setUser(null)
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  const getUser = () => {
    const token = getToken();
    return token ? jwtDecode(token).user : null
  }

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token
  }

  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null)
  }


  return (

    <div>
    <nav>
      {isAuth ?
      (
      <div>
        <Link to="/">Home</Link> &nbsp;
        <Link to='/logout' onClick={onLogoutHandler}>Logout</Link>&nbsp;
        <Link to="/stadium">Stadium List</Link> &nbsp;
      </div>
      )
      :
      (
        <div>
        <Link to="/">Home</Link> &nbsp;
        <Link to='/signup'>Signup</Link> &nbsp;
        <Link to='/signin'>Signin</Link> &nbsp;
      </div>
      )
      }
    </nav>
    <div className="App">
      <Routes>
        <Route path="/stadium" element={isAuth ? <StadiumList user={user}/>:<Signin login={loginHandler}/>}></Route>
        <Route path='/signup' element={ <Signup register={registerHandler} /> } />
        <Route path='/signin' element={ <Signin login={loginHandler} /> } />
        <Route path='/reserve' element={ <ReservationCreateForm /> }/>
      </Routes>
    </div>
   

    </div>
    
  );
}

export default App;
