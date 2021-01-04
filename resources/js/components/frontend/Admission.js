import React, { Component } from 'react'
import Pulse from 'react-reveal/Pulse';
import Fade from 'react-reveal/Fade';

 class Admission extends Component {
    render() {
        return (
            <div class="containerCustom topMargin">
                   <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Admission</a></li>

  </ol>
</nav>
             <div class="row">

             <div class="col-lg-12">
             <Fade bottom>
         <div class="Admission_head">

           <h3>Admission Information</h3>
         </div>

         <div class="Admission_main">
          <h5>B.Sc (Engineering):</h5>
          <p>There are three departments in Faculty of Engineering.</p>
          <ul>
            <li><p>Information and Communication Technology</p></li>
            <li><p>Computer Science and Engineering</p></li>
            <li><p>Textile Engineering</p></li>

          </ul>
          <p>
        Department of Information and Communication Technology in MBSTU, popularly known as ICT MBSTU,
        is under Faculty of Engineering , and interested students must appear in the Ka (A) unit exam for the admission.
            Currently, there are 50 seats in ICT MBSTU.</p>

               <p>To appear in the admission exam of a session, a student must fulfill the criteria of one of the following categories:</p>

                <ul>
            <li><p>Passed in the HSC exam in Science from any of the education board of Bangladesh</p></li>
            <li><p>Passed in the Alim exam from Madrasa board</p></li>
            <li><p>Passed in the A-level or equivalent exam with science background</p></li>

          </ul>

       </div>
       </Fade>

    </div>

  </div>

             </div>


        )
    }
}

export default Admission
