import React from 'react'
import home from '../../videos/home.mp4';
// import Football from '../../images/Football.jpg'

export default function Home() {
  return (
   
 
   <div class="row align-items-md-stretch">
      <div class=" col-md-6 ">
        <div>
        <video className="video" autoPlay loop muted >
        <source src={home} typeof='video/mp4'></source>
        </video>
        </div>
      </div>
      <div class="col-md-6">
        <div>
          <br/>
          <br/>
          <br/>
          <h2>Welcome to staduim spotter</h2>
          <p>Unlock the thrill of outdoor sports!
            <br/>
           Reserve your ideal spot here , where every booking is a step towards active fun and camaraderie.</p>
        </div>
      </div>
  </div>
 
 
 
 

  )
  
}
