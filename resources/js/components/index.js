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
import Login from './frontend/Login';
import Register from './frontend/Register';
import Verification from './frontend/Verification';
import { checkIfAuthenticated } from './Services/LoginRegService';
import StudentHome from './Student/StudentHome';
import Attendance from './Teacher/Attendence';
import TeacherHome from './Teacher/TeacherHome';
import TeacherRoutine from './Teacher/TeacherRoutine';


class Index extends React.Component {
    constructor(props){
        super(props);
            this.state={
              user12:"",
                isLoggedIn:false,
            }

    }
    componentDidMount() {
        if (checkIfAuthenticated()) {
            this.setState({
                user12: checkIfAuthenticated(),
                isLoggedIn: true,
            });
         //  console.log('checkIfAuthenticated', checkIfAuthenticated());
        }

    }
    render(){
        return (
            <Router>
                <Header authData={this.state}/>
                <Switch>
                    <Route exact path="/OARS/loginuser/">
                         <Login/>
                     </Route>
                    <Route exact path="/OARS/registeruser">
                        <Register />
                    </Route>
                    <Route exact path="/OARS/verification">
                        <Verification />
                    </Route>
                    {/* student routes access check is usr authenticated or not and if hit
                    url with differnt way to access homepage first check is logged?? if logged in, then access otherways redireect to login page */}
                    <AccessRoute
                        authed={this.state.isLoggedIn}
                      exact  path="/OARS/studenthome"
                        component={StudentHome}
                    />
                    {/* after login specific user access specific routes */}
                    {this.state.isLoggedIn && this.state.user12.user_rule == 'Student' && (
                        <Route exact path="/OARS/">
                            <StudentHome />
                        </Route>
                    )}
                    {/* student routes end*/}
                        {/* Teacher routes  start*/}
                    <AccessRoute
                        authed={this.state.isLoggedIn}
                      exact  path="/OARS/teacherhome"
                        component={TeacherHome}
                    />


                    {this.state.user12.user_rule == 'Teacher' && (

                        <>
                         {/* after login specific user access specific routes */}

                        <Route exact path="/OARS/">
                            <TeacherHome />
                        </Route>
                        {/* <Route exact path="/OARS/attendance/:session">
                            <Attendance/>

                        </Route>
                       {* if declare route this way , parameter is not pass by componenet
                        */}
                           <Route exact path="/OARS/attendance/:session" component={Attendance}
                            isSession={true}
                           />
                        <Route exact path='/OARS/teacherRoutine'>
                           <TeacherRoutine/>

                        </Route>
                        </>
                    )}
               {/* end teacher routes */}
                    <Route exact path="/OARS/">
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