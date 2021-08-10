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
                         <div class="table-responsive">

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
                               <h5>Send Us Email</h5>

                       <form>
  <div class="mb-3">

    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name"/>
  </div>
  <div class="mb-3">

    <input type="email" class="form-control" id="exampleInputPassword1" placeholder="Email"/>
  </div>
  <div class="mb-3">

    <input type="text" class="form-control" id="exampleInputPassword1"  placeholder="Subject"/>
  </div>
  <div class="mb-3">

  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description"></textarea>
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
                        <div class="googlemap" id="googleMap">
                        <iframe class="googlemap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58210.75156622155!2d89.86115077365098!3d24.23576323736838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xda791ddc1ce793bd!2sMawlana%20Bhashani%20Science%20and%20Technology%20University(MBSTU)!5e0!3m2!1sen!2sus!4v1608051978723!5m2!1sen!2sus"
                     frameborder="0" style={{border:"0;"}}
                        allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                        </div>
                    </div>
                    </div>
                    {/* contact us footer start */}
                    <div class="contactUs_footer">
                        <div class="row">
                            <div class="col-md-8">
                                <ul>
                                    <li><i class="fa fa-phone"></i> 01952152883,01952152883</li>
                                    <li><i class="fa fa-envelope-o"></i> department.ict@mbstu.ac.bd</li>
                                    <li><i class="fa fa-location-arrow"></i> Santosh-1902,Tangail,Bangladesh</li>
                                </ul>


                            </div>
                            <div class="col-md-4">
                               <div class="social">
                                   <div>
                                       <h1 class="facebook"><i class="fa fa-facebook-square"></i></h1>
                                       </div>
                                       <div>
                                       <h1 class="instragram">  <i class="fa fa-instagram"></i></h1>
                                       </div>
                               </div>
                            </div>
                        </div>
                    </div>
                      {/* contact us footer end */}
            </div>
            </div>
        );
    }
}

export default ContactUs
