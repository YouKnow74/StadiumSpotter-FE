import './App.css';
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
// import Signin from './components/user/Signin';
// import Signup from './components/user/Signup';
import {Routes,Route,Link} from 'react-router-dom';
import  Axios  from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useEffect } from 'react';
import StadiumList from './components/stadium/StadiumList';

function App() {
  return (
    <div className="App">
      
   <StadiumList />
    </div>
  );
}

export default App;
