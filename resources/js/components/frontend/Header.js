
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link,withRouter } from "react-router-dom";
import { AttendanceService } from '../Services/AttendanceService';
 class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = { Semester:[],
            email:this.props.authData.user12.user_rule, }
    }

        componentDidMount() {
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
            window.location.href = "/OARS/loginuser";
         }
         semesterFunction=async(session)=>{
             const {history}=this.props;
           //const abd= await history.push(`/OARS/attendance/${session}`);
          window.location.href = `/OARS/attendance/${session}`;

        //    alert('hi');
         }
        render(){


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
      <Link class="navbar-brand text-brand" to='/OARS/'><img src={`http://localhost/OARS/storage/app/public/uploads/logo.png`} width="60px"></img></Link>
      <button type="button" class="btn btn-link nav-search navbar-toggle-box-collapse d-md-none" data-toggle="collapse"
        data-target="#navbarTogglerDemo01" aria-expanded="false">
        <span class="fa fa-search" aria-hidden="true"></span>
      </button>
      <div class="navbar-collapse collapse justify-content-center" id="navbarDefault">
      <ul class="navbar-nav ">
                            {!this.props.authData.isLoggedIn && (
                                <>
                            <li class="nav-item active">

                                <Link class="nav-link" to='/OARS/' >Home <span class="sr-only">(current)</span></Link>
                            </li>

                            <li class="nav-item">

                                <Link class="nav-link" to='/OARS/loginuser'>Login</Link>
                            </li>
                            <li class="nav-item">

                                <Link class="nav-link" to='/OARS/registeruser'>Registration</Link>
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
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li>
                            </>
                            )}

                            {this.props.authData.isLoggedIn && this.props.authData.user12.user_rule == 'Student' && (
                                <li class="nav-item">

                                    <Link class="nav-link" to='/OARS/studentallInfo'>All Info</Link>
                                </li>
                            )}
                            {/* specific routes access after login(teacher) */}
                            {this.props.authData.isLoggedIn && this.props.authData.user12.user_rule == 'Teacher' && (
                              <>
                              {/* <li class="nav-item">

                                    <Link class="nav-link" to='/OARS/teacherhome'>{this.props.authData.user12.user_rule}</Link>
                                </li> */}
                                 <li class="nav-item">

                                 <Link class="nav-link" to='/OARS/teacherRoutine'>Routine</Link>
                             </li>
                             <li class="nav-item">

                       <Link class="nav-link" to='/OARS/allinformation' >AllInformation</Link>
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

                             </>
                            )}
                             </ul>


                             <ul  class="navbar-nav ml-auto">
                            {this.props.authData.isLoggedIn && (
                                <li class="nav-item ">
                                    <Link to="/logout" onClick={() => this.Logout()} class="nav-link">Logout ( {this.props.authData.user12.name})</Link>
                                </li>
                            )}
                             </ul>
      </div>
      <button type="button" class="btn btn-b-n navbar-toggle-box-collapse d-none d-md-block" data-toggle="collapse"
        data-target="#navbarTogglerDemo01" aria-expanded="false">
        <span class="fa fa-search" aria-hidden="true"></span>
      </button>
    </div>
  </nav>
  {/* <!--/ Nav End /--> */}
            </div>

            );
        }
 }

export default withRouter(Header);



