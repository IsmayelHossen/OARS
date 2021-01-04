import React from 'react';
import Slider from './Slider';
import { GetTeacherInfo, getNoticeData,GetSemesterCourseInfo,deleteSpecificSemesterCourse } from '../Services/Admin/AdminServices';
import Fade from 'react-reveal/Fade';
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
            <div class="topMargin ">
                <div>
                    <Fade top>
               <Slider/>
               </Fade>
               </div>
                <Fade bottom>
                    <div>
                <div class="jumbotron">

                    <h2 style={{textAlign:"center"}}>Welcome To Dept. Of ICT Online Attendance & Result System</h2>
                    <p style={{textAlign:"center"}} class="homeP">To Get the MemberShip Please Registration </p>

                </div>
                </div>
                </Fade>
                <div class="Headline">
                    <marquee direction="left" onmouseout="this.start()" onmouseover="this.stop()" scrolldelay="1" scrollamount="4">

          <span><a href="#" style={{color:'#fff'}}>&nbsp;In aliquet mattis volutpat. Maecenas tempor augue a orci tempus, sed tempor eros maximus.</a>&nbsp;&nbsp;&nbsp;</span>


                  </marquee>
                </div>

                    <div class="row">
                        <div class="col-md-8 col-sm-12">
                        <div class="row">
                        <div class="col-md-4">
                        <Fade bottom>
                            <div>
                         <div class="card chairmanprofile">
                                <img class="card-img-top" src="public/Images/shahin.jpg" alt="Card image" style={{width:'100%'}}></img>
                                    <div class="card-body">
                                <h5 class="card-title" style={{color:'#ae3333',fontWeight:'600',}}>Professor Dr. Mohammad Shain Uddin</h5>
                                <h5 style={{fontWeight:'600'}}>Chairman</h5>
                                <p class="card-text" style={{fontWeight:'600',color:'#291b37'}}>Dept. Of ICT,MBSTU</p>

                              </div>
                            </div>
                            </div>
                            </Fade>
                        </div>

                         <div class="col-md-8">
                         <Fade bottom>
                         <h4 style={{paddingTop:'5px',color:'#242b29',fontWeight:'600'}}>Message from Chairman</h4>
                         <p>Vestibulum nisi quam, sodales a egestas sagittis, suscipit et risus.
                             Aenean fermentum, eros pharetra tincidunt pretium, libero sem posuere sapien,
                              ac pellentesque quam metus sit amet dui. Pellentesque ut elit dapibus, imperdiet odio et,
                               commodo est. Vivamus pretium orci ut posuere mattis. Sed volutpat aliquam dui ut consequat.
                                In aliquet mattis volutpat. Maecenas tempor augue a orci tempus, sed tempor eros maximus.
                                 Phasellus molestie velit augue, vitae dignissim nisl imperdiet eu.
                                  Ut vehicula euismod imperdiet. Sed ut sapien eget diam convallis pharetra.
                                   Proin mollis ultrices vestibulum. Integer dapibus condimentum blandit.
                                   Vestibulum luctus, sem vitae vestibulum pretium, odio dui sodales nisi, in dapibus purus augue nec dolor.
                                   Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                              per inceptos himenaeos. Praesent a fermentum tellus.</p>
                              </Fade>
                        </div>

                        </div>

                        </div>
                        <div class="col-md-4 col-sm-12">


<ul class="nav nav-tabs" style={{marginTop:'10px'}}>
  <li class="nav-item">
    <a class="nav-link active" data-toggle="tab" href="#home">Notice   <span class="badge badge-primary badge-pill">12</span></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#menu1">News<span class="badge badge-primary badge-pill">4</span></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#menu2">Events<span class="badge badge-primary badge-pill">2</span></a>
  </li>
</ul>


<div class="tab-content" style={{marginLeft:'-15px;'}}>
  <div class="tab-pane container active" id="home">
  <ul class="list-group" style={{marginLeft:'-15px'}}>
  <li class="list-group-item d-flex justify-content-between align-items-center">
  Vivamus pretium orci ut posuere mattis.  Class aptent taciti sociosqu

  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
  Vivamus pretium orci ut posuere mattis.  Class aptent taciti sociosqu

  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
  Vivamus pretium orci ut posuere mattis.  Class aptent taciti sociosqu

  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
  Vivamus pretium orci ut posuere mattis.  Class aptent taciti sociosqu

  </li>
</ul>
</div>
  <div class="tab-pane container fade" id="menu1">
   <ul class="list-group" style={{marginLeft:'-15px'}}>
  <li class="list-group-item d-flex justify-content-between align-items-center">
  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
  </li>
</ul>
  </div>
  <div class="tab-pane container fade" id="menu2">...</div>
</div>

                        </div>
                    </div>
                    <Fade top>
                        <div>
                     <div class="row counter">

                         <div class="col-md-4">
                             <div class="counterin">
                             <h3>Teachers</h3>
                             <span>16</span>
                         </div>
                         </div>
                         <div class="col-md-4">
                         <div class="counterin">
                             <h3>Students</h3>
                             <span>320</span>
                             </div>
                         </div>
                         <div class="col-md-4">
                         <div class="counterin">
                             <h3>Stuffs</h3>
                             <span>20</span>
                           </div>
                         </div>

                     </div>
                     </div>
               </Fade>
              </div>
            </>
         );
    }
}

export default Home;
