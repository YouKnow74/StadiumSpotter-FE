import React from 'react'
import home from '../../videos/home.mp4';
// import Football from '../../images/Football.jpg'

export default function Home() {
  return (
   
 
   <div className="row align-items-md-stretch" style={{background: "rgba(47, 126, 47, 0.2)"}}>

      <div className=" col-md-6 ">
        <div>
        <video className="video" autoPlay loop muted >
        <source src={home} typeof='video/mp4'></source>
        </video>
        </div>
      </div>

      <div className="col-md-6 d-flex align-items-center justify-content-center" style={{color: "rgba(47, 126, 47)" }}>
        <div>
          <h2 className='myClasss'>Welcome to Staduim Spotter</h2>
          <p className='para'>Unlock the thrill of outdoor sports!

            <br/>
           Reserve your ideal spot here , where every booking is a step towards active fun and camaraderie.</p>
        </div>
      </div>
  </div>
 
 
 
 

  )
  
}
