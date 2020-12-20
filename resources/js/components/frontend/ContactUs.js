import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
export class ContactUs extends Component {
    render() {
        return (
            <div>
               <div class="topMargin containerCustom">
               <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Contact Us</a></li>

  </ol>
</nav>
                   <div class="row" >

                       <div class="col-md-6">
                         <div >

                       <table class="table table-bordered">
                       <Fade left>
      <thead>
      <tr>
        <th>Name</th>
        <th>  DESIGNATION</th>
        <th>Contact</th>
         <th>Location</th>

         </tr>
        </thead>
           <tbody>
         <tr >
                <td>মুহাম্মদ আতাউর রহমান খান</td>
             <td>উপ-রেজিস্টার,
            আইসিটি বিভাগ,
              মাভাবিপ্ৰবি</td>
              <td>Cell: +8801716831229
                      email: md.arripon@gmail.com</td>
                 <td>আইসিটি বিভাগ,মাভাবিপ্ৰবি</td>
                </tr>
                 <tr class="table-hover ">
                <td>মুহাম্মদ আতাউর রহমান খান</td>
             <td>উপ-রেজিস্টার,
            আইসিটি বিভাগ,
              মাভাবিপ্ৰবি</td>
              <td>Cell: +8801716831229
                      email: md.arripon@gmail.com</td>
                 <td>আইসিটি বিভাগ,মাভাবিপ্ৰবি</td>
                </tr>
                 <tr class="table-hover ">
                <td>মুহাম্মদ আতাউর রহমান খান</td>
             <td>উপ-রেজিস্টার,
            আইসিটি বিভাগ,
              মাভাবিপ্ৰবি</td>
              <td>Cell: +8801716831229
                      email: md.arripon@gmail.com</td>
                 <td>আইসিটি বিভাগ,মাভাবিপ্ৰবি</td>
                </tr>
              </tbody>
              </Fade>
            </table>

                         </div>

                       </div>

                       <div class="col-md-6">
                       <Fade right>
                           <div>
                           <div class="contactusForm">

                       <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Email</label>
    <input type="email" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Subject</label>
    <input type="text" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Description</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
  <button type="submit" class="btn btn-success float-right clearfix">Send</button>
</form>

</div>
</div>
</Fade>
                       </div>
                   </div>
                <div class="row">
                    <div>
                        <div class="gmap" id="googleMap">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58210.75156622155!2d89.86115077365098!3d24.23576323736838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xda791ddc1ce793bd!2sMawlana%20Bhashani%20Science%20and%20Technology%20University(MBSTU)!5e0!3m2!1sen!2sus!4v1608051978723!5m2!1sen!2sus"
                        width="1400" height="550" frameborder="0" style={{border:"0;"}}
                        allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                        </div>
                    </div>
                    </div>
            </div>
            </div>
        )
    }
}

export default ContactUs
