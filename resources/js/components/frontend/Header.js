import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
         semesterFunction=(session)=>{
           window.location.href = `/OARS/attendance/${session}`;
           console.log('semester',semester);
        //    alert('hi');
         }
        render(){

    console.log('emailllll',this.state.email);
            return(
                <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <Link class="navbar-brand" to='/OARS/'><img src={`http://localhost/OARS/storage/app/public/uploads/logo.png`} width="60px"></img></Link>
                    <a  href="#"></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
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

                                    <Link class="nav-link" to='/OARS/studenthome'>{this.props.authData.user12.user_rule}</Link>
                                </li>
                            )}
                            {/* specific routes access after login(teacher) */}
                            {this.props.authData.isLoggedIn && this.props.authData.user12.user_rule == 'Teacher' && (
                              <>
                              <li class="nav-item">

                                    <Link class="nav-link" to='/OARS/teacherhome'>{this.props.authData.user12.user_rule}</Link>
                                </li>
                                 <li class="nav-item">

                                 <Link class="nav-link" to='/OARS/teacherRoutine'>Routine</Link>
                             </li>
                             <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Semester
                                 </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">

                                {this.state.Semester.map((sem, index) => (


                                        <Link  class="nav-link"  onClick={()=>this.semesterFunction(sem.session)}>Semester {sem.semester}</Link>

                                 ) )}
                                   {this.state.Semester==0 &&(

                   <a class="dropdown-item" href="#">Not yet assign into any semster to take class</a>

                    )}

                                </div>
                            </li>
                             </>
                            )}
                            {this.props.authData.isLoggedIn && (
                                <li class="nav-item">
                                    <Link to="/logout" onClick={() => this.Logout()} class="nav-link">Logout {this.props.authData.user12.email} {this.props.authData.user12.name}</Link>
                                </li>
                            )}
                        </ul>
                        {/* <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                         </form> */}

  </div>
</nav>
            </div>

            );
        }
 }

export default Header;
