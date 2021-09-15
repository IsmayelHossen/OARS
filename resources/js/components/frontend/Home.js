import React from 'react';
import Slider from './Slider';
import { SavePost,PostGet, PostDelete,SaveNoticeEvent,getNoticeEvent1,getSemesterCodeTitle }
 from '../Services/Admin/AdminServices';
import Fade from 'react-reveal/Fade';
import { PUBLIC_URL } from "../CommonURL";
import { Link, withRouter } from "react-router-dom";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NoticeResult:[],
            email:'ismayelhossen123@gmail.com'
         }
    }
    componentDidMount() {


        this.getNoticeEvent();
    }
    getNoticeEvent=async()=>{
      //  alert(this.user.email);
        const response= await getNoticeEvent1(this.state.email);
        if(response.success){
            this.setState({ NoticeResult:response.data  });

        }
        console.log('notice data',this.state.NoticeResult)
    }
NEvent=async(id)=>{

    const {history}=this.props;
    history.push(`${PUBLIC_URL}noticeEvent/${id}`);
}
    render() {
        const lengthR=this.state.NoticeResult.length;
        let i=1;
        let i2=1;
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

          <span><a href="#" style={{color:'#fff'}}>&nbsp;Welcome To Dept. Of ICT Online Attendance & Result System.</a>&nbsp;&nbsp;&nbsp;</span>


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
                         <p>Welcome to the Department of Information and Communication Technology (ICT) which is one of the leading and prestigious departments of Mawlana Bhashani Science and Technology University (MBSTU). From the establishment of the University, the department has started its journey. And within a short period of time it has been able to produce undergraduate and graduate students who are excelling in various sectors like software development, communication sectors and in different government and non-government organizations etc. in home and abroad. Faculties are contributing in innovative research magnificently, and the department is getting recognition in the country for research contribution. The department provides a congenial environment for the growth of the students and helps them to achieve their goal by maintaining the requirements of 4the industrial revolution. The department also follows the pathways to meet the standards of Digital Bangladesh..</p>
                              </Fade>
                        </div>

                        </div>

                        </div>
                        <div class="col-md-4 col-sm-12">


<ul class="nav nav-tabs" style={{marginTop:'10px'}}>
  <li class="nav-item">
    <a class="nav-link active" data-toggle="tab" href="#home">Notice   <span class="badge badge-primary badge-pill"></span></a>
  </li>

  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#menu2">Events<span class="badge badge-primary badge-pill"></span></a>
  </li>
</ul>


<div class="tab-content" style={{marginLeft:'-15px;'}}>
  <div class="tab-pane container active" id="home">
  <ul class="list-group" style={{marginLeft:'-15px'}}>
  {this.state.NoticeResult.map((row,index)=>(
       <>
       {row.category=='Notice' &&(
        <li class="list-group-item d-flex justify-content-between align-items-center" onClick={()=>this.NEvent(row.id)}>
    {row.title}

  </li>
       )}
       </>
    ))}

</ul>
</div>
  <div class="tab-pane container fade" id="menu2">
   <ul class="list-group" style={{marginLeft:'-15px'}}>
   {this.state.NoticeResult.map((row,index)=>(
       <>
       {row.category=='Event' &&(
        <li class="list-group-item d-flex justify-content-between align-items-center" onClick={()=>this.NEvent(row.id)}>
    {row.title}

  </li>
       )}
       </>
    ))}
</ul>
  </div>

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

export default withRouter(Home);
