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
          <h2>Welcome to Music Box Library</h2>
          <p>Unlock the thrill of classical albums!
            <br/>
           Reserve your ideal album here , where every booking is a step towards excitement.</p>
        </div>
      </div>
  </div>
 
 
 
 

  )
  
}
