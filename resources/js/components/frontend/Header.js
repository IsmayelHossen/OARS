
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link,withRouter, Redirect } from "react-router-dom";
import { AttendanceService } from '../Services/AttendanceService';
import $ from 'jquery';
import { PUBLIC_URL } from "../CommonURL";;
 class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = { Semester:[],
            email:this.props.authData.user12.user_rule,
            userName:this.props.authData.user12.name,
         }
    }

        componentDidMount() {
            console.log('header punlic',PUBLIC_URL);
            this.getSemester();
            console.log(this.state.email);
        }
        getSemester=async()=>{
            const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
            const getSemesterData= await AttendanceService(email);
            this.setState({ Semester:getSemesterData.data});
            console.warn('get',this.state.Semester);
            console.log('email4545',this.state.email);
        }
        Logout=()=>{
            localStorage.removeItem("LoginData");
            window.location.href =`${PUBLIC_URL}loginuser`;
         }
         semesterFunction=async(session)=>{
             const {history}=this.props;
           //const abd= await history.push(`/OARS/attendance/${session}`);
          window.location.href = `${PUBLIC_URL}attendance/${session}`;

        //    alert('hi');
         }
        render(){
            // if(!localStorage.getItem('LoginData')){
            //     return <Redirect to={'/OARS/loginuser'} />;
            // }

            return(
                <div>




  {/* <!--/ Nav Star /--> */}
  <nav class="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
    <div class="container">
      <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarDefault"
        aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Link class="navbar-brand text-brand" to={PUBLIC_URL}><img src={`http://localhost/OARS/storage/app/public/uploads/logo.png`} width="60px"></img></Link>

      <div class="navbar-collapse collapse justify-content-center" id="navbarDefault">

      <ul class="navbar-nav mx-auto">
          {/* before login start */}
                            {!this.props.authData.isLoggedIn && (
                                <>
                            <li class="nav-item active">

                                <Link class="nav-link" to={PUBLIC_URL} ><i class="fa fa-home" aria-hidden="true"></i>
Home <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">

             <Link class="nav-link" to={`${PUBLIC_URL}about`}>About</Link>
                     </li>
                     <li class="nav-item">

            < Link class="nav-link" to={`${PUBLIC_URL}services`}>Services</Link>
            </li>
            <li class="nav-item">

                <Link class="nav-link" to={`${PUBLIC_URL}gallary`}>Gallary</Link>
                </li>
                <li class="nav-item">

            <Link class="nav-link" to={`${PUBLIC_URL}contactus`}>Contact Us</Link>
            </li>
            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                 </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>



                            </>
                            )}
    {/* before login end */}

                                     {/* after login for student home start */}
                            {this.props.authData.isLoggedIn && this.props.authData.user12.user_rule == 'Student' && (
                              <>
                              <li class="nav-item">

                                    <Link class="nav-link" to={`${PUBLIC_URL}studentallInfo`}>All Info</Link>
                                </li>
                                 <li class="nav-item">

                                 <Link class="nav-link" to={`${PUBLIC_URL}seeclassmate`}>See Classmate</Link>
                             </li>
                             </>
                            )}
                               {/* after login for student home end */}


                                {/* after login for Admiin Links and routes start */}
                                {this.props.authData.isLoggedIn && this.props.authData.user12.user_rule == 'Admin' && (

                                // mobile menu start
                                <div class="AdminMMenu">
                                        <li class="nav-item">

                          <Link class="nav-link" to={PUBLIC_URL}>All Info</Link>
                             </li>

                             <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Teachers
                                 </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link class="dropdown-item" to={`${PUBLIC_URL}addSemesterCourse`}>addSemesterCourse</Link>
                                <Link class="dropdown-item" to={`${PUBLIC_URL}addSemesterCourse`}>add</Link>
                                </div>
                            </li>

                                </div>

                                //mobile menu end

                            )}

                                 {/* after login for Admin Links and routes end */}
                            {/* specific routes access after login(teacher) */}
                            {this.props.authData.isLoggedIn && this.props.authData.user12.user_rule == 'Teacher' && (
                              <>
                              {/* <li class="nav-item">

                                    <Link class="nav-link" to='/OARS/teacherhome'>{this.props.authData.user12.user_rule}</Link>
                                </li> */}
                                 <li class="nav-item">

                                 <Link class="nav-link" to={`${PUBLIC_URL}teacherRoutine`}>Routine</Link>
                             </li>
                             <li class="nav-item">

                       <Link class="nav-link" to={`${PUBLIC_URL}allinformation`} >AllInformation</Link>
                        </li>

                             <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Semester
                                 </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">

                                {this.state.Semester.map((sem, index) => (


                                        <Link  class="dropdown-item"  onClick={()=>this.semesterFunction(sem.session)}>Semester {sem.semester}</Link>

                                 ) )}
                                   {this.state.Semester==0 &&(

                              <a class="dropdown-item" href="#">Not yet assign into any semster to take class</a>

                    )}

                                </div>
                            </li>
                            <li class="nav-item">

               <Link class="nav-link" to={`${PUBLIC_URL}colleague`}>Colleague</Link>
                            </li>

                             </>
                            )}
                             </ul>


                             <ul  class="navbar-nav ml-auto">
                            {this.props.authData.isLoggedIn && (
                                <li class="nav-item ">
                                    <Link to="/logout" onClick={() => this.Logout()} class="nav-link">
                                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                                   Logout ( {this.props.authData.user12.name})</Link>
                                </li>
                            )}
                             </ul>
                             {!this.props.authData.isLoggedIn && (
                                <>
                             <ul class="navbar-nav navbar-right">
                                            <li class="nav-item ">

                                <Link class="nav-link" to={`${PUBLIC_URL}loginuser`}>Login</Link>
                            </li>
                            <li class="nav-item ">

                                <Link class="nav-link" to={`${PUBLIC_URL}registeruser`}>Registration</Link>
                            </li>
                            </ul>
                            </>
                             )}
      </div>
      {/* <button type="button" class="btn btn-b-n navbar-toggle-box-collapse d-none d-md-block" data-toggle="collapse"
        data-target="#navbarTogglerDemo01" aria-expanded="false">
        <span class="fa fa-search" aria-hidden="true"></span>
      </button> */}
    </div>
  </nav>
  {/* <!--/ Nav End /--> */}
            </div>

            );
        }
 }

export default withRouter(Header);



