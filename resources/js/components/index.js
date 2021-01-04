import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router, Switch, Route,Link} from "react-router-dom";
//toaster
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
//
import AccessRoute from './AuthenticatedRoutes/AccessRoutes';
import Footer from './frontend/Footer';
import Header from './frontend/Header';
import Home from './frontend/Home';
import About from './frontend/About';
import Login from './frontend/Login';
import Register from './frontend/Register';
import Verification from './frontend/Verification';
import { checkIfAuthenticated } from './Services/LoginRegService';
import { StudentAllInfo } from './Services/StudentService';
import Print from './Student/Print';
import StudentAllinfos from './Student/StudentAllinfos';
import StudentHome from './Student/StudentHome';
import StudentSemesterInfo from './Student/StudentSemesterInfo';
import AdminHome from './Admin/AdminHome';
import Allinformation from './Teacher/Allinformation';
import AttendanceUpdate from './Teacher/AttendanceUpdate';
import Attendance from './Teacher/Attendence';
import successClasses from './Teacher/successClasses';
import TakenClasses from './Teacher/TakenClasses';
import TakenClasss from './Teacher/TakenClasses';
import TeacherHome from './Teacher/TeacherHome';
import TeacherRoutine from './Teacher/TeacherRoutine';
import AddSemesterCourse from './Admin/AddSemesterCourse';
import EditSemCourse from './Admin/EditSemCourse';
import ForgetPassword from './CFPassword/ForgetPassword';
import resetPassword from './CFPassword/resetPassword';
import { PUBLIC_URL } from "./CommonURL";
import AddNotice from './Admin/AddNotice';
import AdminStudentInfo from './Admin/AdminStudentInfo';
import AddCtMark from './Teacher/AddCtMark';
import SeeClassMate from './Student/SeeClassMate';
import Colleague from './Teacher/Colleague';
import ViewStudents from './Admin/ViewStudents';
import CCodeTitle from './Admin/CCodeTitle';
import MakeResult from './Admin/MakeResult';
import GetResult from './Admin/GetResult';
import GradeSheet from './Admin/GradeSheet';
import Gallary from './frontend/Gallary';
import ContactUs from './frontend/ContactUs';
import Admission from './frontend/Admission';
import Thanks from './frontend/Thanks';
import RequestInfo from './Admin/RequestInfo';
import Message from './Social/Message';
import Vedio from './Social/Vedio';
import Post from './Social/Post';
import EditPost from './Social/EditPost';
import Newsfeed from './Social/Newsfeed';
import AddRoutine from './Admin/AddRoutine';
import ViewRoutine from './Admin/ViewRoutine';

class Index extends React.Component {
    constructor(props){
        super(props);
            this.state={
              user12:"",
                isLoggedIn:false,
                getUserData:{},
                userData1:{},
                PUBLIC_URL:PUBLIC_URL,
            }

    }
    componentDidMount() {
          console.log('public url',PUBLIC_URL)
        if (checkIfAuthenticated()) {
            this.setState({
                user12: checkIfAuthenticated(),
                isLoggedIn: true,
            });
         //  console.log('checkIfAuthenticated', checkIfAuthenticated());
        }

    }
    GetUser=(data)=>{
        this.setState({ userData1:data.user });
        console.log('userdata12',this.state.userData1);

    }
    render(){

        return (
            <Router>
                <Header authData={this.state} />
                <Switch>
                    <Route exact     path={`${PUBLIC_URL}loginuser`}>
                         <Login GetUser={this.GetUser}/>
                     </Route>
                     <Route exact path={`${PUBLIC_URL}resetPassword`} component={resetPassword}/>
                     <Route exact path={`${PUBLIC_URL}thanks`} component={Thanks}/>
                    <Route exact path={`${PUBLIC_URL}registeruser`}>
                        <Register />
                    </Route>
                    <Route exact path={`${PUBLIC_URL}verification`}>
                        <Verification />
                    </Route>
                       <Route exact path={`${PUBLIC_URL}about`}>
                        <About />
                    </Route>
                    <Route exact path={`${PUBLIC_URL}admission`}>
                        <Admission />
                    </Route>

                    <Route exact path={`${PUBLIC_URL}gallary`}>
                        <Gallary />
                    </Route>
                    <Route exact path={`${PUBLIC_URL}contactus`}>
                        <ContactUs />
                    </Route>
                    <Route exact path={`${PUBLIC_URL}forgetPassword`}>
                        <ForgetPassword />
                    </Route>

                    {/* student routes access check is usr authenticated or not and if hit
                    url with differnt way to access homepage first check is logged?? if logged in, then access otherways redireect to login page */}
                    <AccessRoute
                        authed={this.state.isLoggedIn}
                      exact  path={`${PUBLIC_URL}studenthome`}
                        component={StudentHome}
                    />
                    {/* after login specific user access specific routes */}
                    {this.state.isLoggedIn && this.state.user12.user_rule == 'Student' && (
                       <>
                          <Route exact path={`${PUBLIC_URL}vedio`}>
                        <Vedio/>
                        </Route>

                       <Route exact path={PUBLIC_URL}>
                       <StudentHome />
                   </Route>
                   <Route exact path={`${PUBLIC_URL}message`}>
                        <Message />
                    </Route>
                    <Route exact path={`${PUBLIC_URL}post`}>
                        <Post />
                    </Route>
                    <Route exact path={`${PUBLIC_URL}newsfeed`}>
                        <Newsfeed />
                    </Route>
                       <Route exact path={`${PUBLIC_URL}studentallInfo`} component={StudentAllinfos}/>
                       <Route exact path= {`${PUBLIC_URL}seeclassmate`} component={SeeClassMate}/>

                        <Route exact path={`${PUBLIC_URL}studentsemesterinfo/:it/:semester`} component={StudentSemesterInfo}
                            isSession={true}
                           />
                             <Route exact path={`${PUBLIC_URL}print/:it/:coursecode`} component={Print}
                            isSession={true}
                           />
                              <Route exact path={`${PUBLIC_URL}editpost/:id/:email`} component={EditPost}
                            isSession={true}
                           />
                        </>
                    )}
                   { /* after login for Admiin Links and routes start */}
                   <AccessRoute
                        authed={this.state.isLoggedIn}
                      exact  path={`${PUBLIC_URL}adminhome`}
                        component={AdminHome}
                    />
                     {this.state.isLoggedIn && this.state.user12.user_rule == 'Admin' && (
                       <>
                        <Route exact path={`${PUBLIC_URL}editpost/:id/:email`} component={EditPost}
                            isSession={true}
                           />
                             <Route exact path={`${PUBLIC_URL}viewroutine/:email`} component={ViewRoutine}
                            isSession={true}
                           />
                            <Route exact path={`${PUBLIC_URL}addroutine`} component={AddRoutine}
                            isSession={true}
                           />
                      <Route exact path={`${PUBLIC_URL}post`}>
                        <Post />
                    </Route>
                    <Route exact path={`${PUBLIC_URL}newsfeed`}>
                        <Newsfeed />
                    </Route>
                       <Route exact path={PUBLIC_URL}>
                    <AdminHome userData1={this.state.userData1}/>
                   </Route>
                   <Route exact path={`${PUBLIC_URL}vedio`}>
                        <Vedio />
                        </Route>
                   <Route exact path={`${PUBLIC_URL}adminStudentInfo`}>
                           <AdminStudentInfo/>

                        </Route>
                   <Route path={`${PUBLIC_URL}addSemesterCourse`}>
                         <AddSemesterCourse/>
                   </Route>
                   <Route exact path={`${PUBLIC_URL}addNotice`}>
                       <AddNotice/>
                   </Route>
                   <Route exact path={`${PUBLIC_URL}message`}>
                        <Message />
                    </Route>
                   <Route exact path={`${PUBLIC_URL}viewstudent/:session`}
                    component={ViewStudents}  />
                        <Route exact path={`${PUBLIC_URL}makeresult`}
                    component={MakeResult}  />
                      <Route exact path={`${PUBLIC_URL}getresult`}
                    component={GetResult}  />
                      <Route exact path={`${PUBLIC_URL}printmarksheet/:it/:semester`}
                    component={GradeSheet}  />
                      <Route exact path={`${PUBLIC_URL}requestinfo/:request`}
                    component={RequestInfo}  />

                      <Route exact path={`${PUBLIC_URL}addccodetitle`}
                    component={CCodeTitle}  />
                     <Route exact path={`${PUBLIC_URL}editSCourse/:email/:ccode/:session/:editSemCourseId`}  component={() => <EditSemCourse userData1={this.state.userData1} />}  />

                        </>
                    )}
                        {/* student routes end*/}
                   { /* after login for Admiin Links and routes end */}


                        {/* Teacher routes  start*/}
                    <AccessRoute
                        authed={this.state.isLoggedIn}
                      exact  path={`${PUBLIC_URL}teacherhome`}
                        component={TeacherHome}
                    />


                    {this.state.user12.user_rule == 'Teacher' && (

                        <>
                         {/* after login specific user access specific routes */}
                         <Route exact path={`${PUBLIC_URL}editpost/:id/:email`} component={EditPost}
                            isSession={true}
                           />
                         <Route exact path={`${PUBLIC_URL}post`}>
                        <Post />
                    </Route>
                    <Route exact path={`${PUBLIC_URL}newsfeed`}>
                        <Newsfeed />
                    </Route>
                        <Route exact path={PUBLIC_URL}>
                            <TeacherHome />
                        </Route>
                        {/* <Route exact path="/OARS/attendance/:session">
                            <Attendance/>

                        </Route>
                       {* if declare route this way , parameter is not pass by componenet
                        */}
                         <Route exact path={`${PUBLIC_URL}message`}>
                        <Message />
                    </Route>
                    <Route exact path={`${PUBLIC_URL}vedio`}>
                        <Vedio/>
                    </Route>
                           <Route exact path={`${PUBLIC_URL}attendance/:session`} component={Attendance}
                            isSession={true}
                           />
                            <Route exact path={`${PUBLIC_URL}colleague`} component={Colleague}
                            isSession={true}
                           />
                              <Route exact path={`${PUBLIC_URL}Addctmark/:it/:session/:ccode`} component={AddCtMark}
                            isSession={true}
                           />
                        <Route exact path={`${PUBLIC_URL}teacherRoutine`}>
                           <TeacherRoutine/>

                        </Route>

                        <Route exact path={`${PUBLIC_URL}takenclasses/:course_code`} component={TakenClasses} />
                        <Route exact path={`${PUBLIC_URL}allinformation`}>
                            <Allinformation/>
                        </Route>
                        <Route path={`${PUBLIC_URL}suceessClasses`}>
                            <successClasses/>
                        </Route>

                        {/* <AccessRoute
                        authed={this.state.isLoggedIn}
                      exact  path="/OARS/successclasses"
                        component={successClasses}
                    /> */}
                       <Route exact path={`${PUBLIC_URL}attendanceupdate/:ccode/:scode`} component={AttendanceUpdate}
                            isSession={true}
                           />

                        </>
                    )}
               {/* end teacher routes */}
                    <Route exact path={PUBLIC_URL}>
                        <Home />
                    </Route>


                </Switch>
                <Footer/>
            </Router>

        );
    }

}

export default Index;

if (document.getElementById('example')) {
    ReactDOM.render(<Index />, document.getElementById('example'));
}
