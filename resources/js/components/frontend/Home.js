import React from 'react';
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
                        <div class="col-md-3 col-sm-12">
                            <div class="card chairmanprofile">
                                <img class="card-img-top" src="public/Images/shahin.jpg" alt="Card image" style={{width:'100%'}}></img>
                                    <div class="card-body">
                                <h5 class="card-title">Professor Dr. Mohammad Shain Uddin</h5>
                                <h5>Chairman</h5>
                                <p class="card-text">Dept. Of ICT,MBSTU</p>

                                    </div>
                            </div>
                        </div>
                        <div class="col-md-9 col-sm-12">
                            <h3>Notice</h3>
                        <div class="row">
                            <div class="col-4">
                                <div class="list-group" id="list-tab" role="tablist">
                                    {this.state.NoticeResult.slice(0,1).map((row,index)=>(

                                  <>
                                    <a class="list-group-item list-group-item-action active" id={`list${row.id}`} data-toggle="list" href="#list-home" role="tab" aria-controls="home">{row.title}</a>

                                  </>
                                    ))}
                                     {this.state.NoticeResult.slice(1,lengthR).map((row,index)=>(

                   <>
           <a class="list-group-item list-group-item-action " id={`list${row.id}`} data-toggle="list" href="#list-home" role="tab" aria-controls="home">{row.title}</a>

           </>
  ))}
                                    </div>
                            </div>
                            <div class="col-8">
                                <div class="tab-content" id="nav-tabContent">
                                {this.state.NoticeResult.slice(0,1).map((row,index)=>(
                                    <div class="tab-pane fade show active" id={`list${row.id}`} role="tabpanel" aria-labelledby="list-home-list">
                                      { row.description }
                                   </div>
                                ))}
                                   {this.state.NoticeResult.slice(1.,lengthR).map((row,index)=>(
                                    <div  class="tab-pane fade" id={`list${row.id}`} role="tabpanel" aria-labelledby="list-profile-list">
                                         { row.description }

                                    </div>
                                   ))}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <h2 className="btn btn-success">okkfd</h2>
              </div>
            </>
         );
    }
}

export default Home;
