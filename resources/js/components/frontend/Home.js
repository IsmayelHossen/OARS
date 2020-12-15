import React from 'react';
import Slider from './Slider';
import { GetTeacherInfo, getNoticeData,GetSemesterCourseInfo,deleteSpecificSemesterCourse } from '../Services/Admin/AdminServices';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NoticeResult:[],
         }
    }
    componentDidMount() {
       this. getNotice();
    }
    getNotice=async()=>{
        const result=await getNoticeData();
        if(result.success){
            this.setState({ NoticeResult:result.data });
        }
        console.log('notice result',result.data);

    }
    render() {
        const lengthR=this.state.NoticeResult.length;
        return (
            <>
            <div class="topMargin">
               <Slider/>

                <div class="jumbotron">

                    <h1 style={{textAlign:"center"}}>Welcome to ICT Online Attendance & Result System</h1>
                    <p style={{textAlign:"center"}}>To Get the MemberShip Please Registration </p>

                </div>
                <div class="Headline">
                    <marquee direction="left" onmouseout="this.start()" onmouseover="this.stop()" scrolldelay="1" scrollamount="4">

        <span><a href="#" style={{color:'#fff'}}>●&nbsp;৪র্থ রেফারী কেন ইস্তাম্বুলের কর্মকর্তাকে নিগ্রো বলে ডেকেছে সেটা জানতে ম্যাচ অফিশিয়ালের কাছে নেইমার </a>&nbsp;&nbsp;&nbsp;</span>


                  </marquee>
                </div>

                    <div class="row">
                        <div class="col-md-8 col-sm-12">
                        <div class="row">
                        <div class="col-md-4">
                         <div class="card chairmanprofile">
                                <img class="card-img-top" src="public/Images/shahin.jpg" alt="Card image" style={{width:'100%'}}></img>
                                    <div class="card-body">
                                <h5 class="card-title">Professor Dr. Mohammad Shain Uddin</h5>
                                <h5>Chairman</h5>
                                <p class="card-text">Dept. Of ICT,MBSTU</p>

                              </div>
                            </div>
                        </div>
                         <div class="col-md-8">
                         <h3>Message from Chairman</h3>
                         <p>Computer Science and Engineering is at the intellectual forefront of the digital
                         revolution that will define the 21st century. That revolution is in its early stages
                         but is visible all around us. New scientific, economic and social paradigms are arising
                          from computing science and being felt across all sectors of the economy and society at
                          large. For accepting this technological challenge of 21st century, the Department of
                          Computer Science and Engineering is one of the most pioneering soloist of MBSTU and the
                          country since its commencement in 2003. The department is keen on pushing the boundaries
                          of traditional education system and it is the optimum combination of knowledge
                          generation and application that makes the distinctive feature of the Department.</p>
                        </div>
                        </div>

                        </div>
                        <div class="col-md-4 col-sm-12">


<ul class="nav nav-tabs" style={{marginTop:'10px'}}>
  <li class="nav-item">
    <a class="nav-link active" data-toggle="tab" href="#home">Notice</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#menu1">News</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#menu2">Events</a>
  </li>
</ul>


<div class="tab-content">
  <div class="tab-pane container active" id="home">
   <ul class="list-group">
  <li class="list-group-item list-group-item-success">Success item</li>
  <li class="list-group-item list-group-item-secondary">Secondary item</li>
  <li class="list-group-item list-group-item-info">Info item</li>
  <li class="list-group-item list-group-item-warning">Warning item</li>
  <li class="list-group-item list-group-item-danger">Danger item</li>
  <li class="list-group-item list-group-item-primary">Primary item</li>
  <li class="list-group-item list-group-item-dark">Dark item</li>
  <li class="list-group-item list-group-item-light">Light item</li>
</ul>
</div>
  <div class="tab-pane container fade" id="menu1">
   <ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Inbox
    <span class="badge badge-primary badge-pill">12</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Ads
    <span class="badge badge-primary badge-pill">50</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Junk
    <span class="badge badge-primary badge-pill">99</span>
  </li>
</ul>
  </div>
  <div class="tab-pane container fade" id="menu2">...</div>
</div>

                        </div>
                    </div>

              </div>
            </>
         );
    }
}

export default Home;
