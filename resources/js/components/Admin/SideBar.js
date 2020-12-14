import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link,withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    deleteSidebar=()=>{
        $('#sidebar').toggle();
    }
    render() {
        return (  <>

                    <nav id="sidebar">
                        <div class="sidebarLeft" >
                            <h3 class="sidebar-header">Admin</h3><span class="deleteSidebar" onClick={()=>this.deleteSidebar()}> cross</span>
                            <ul class="list-unstyled components">
                                <li class="active">

                                        <Link class="hrefa" to={`${PUBLIC_URL}addSemesterCourse`}>Add Semester Course</Link>

                                        </li>
                                        <li class="active">

                    <Link class="hrefa" to={`${PUBLIC_URL}addccodetitle`}>
                   Add Course Code Title</Link>

                    </li>


                                <li >
                                <Link class="hrefa" to={`${PUBLIC_URL}addNotice`}>AddNotice</Link>
                                </li>

                                <li class="active">
                                    <a href="#homeSubmenu1" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Students</a>
                                    <ul class="list-unstyled collapse" id="homeSubmenu1">
                                        <li>
                                        <Link class="hrefa" to={`${PUBLIC_URL}adminStudentInfo`}>Current Student</Link>
                                        </li>
                                        <li>
                                            <a href="#565">Ex Student</a>
                                        </li>

                                    </ul>
                                </li>
                                <li class="active">
                                    <a href="#homeSubmenu2" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Result</a>
                                    <ul class="list-unstyled collapse" id="homeSubmenu2">
                                        <li>
                                        <Link class="hrefa" to={`${PUBLIC_URL}makeresult`}>Make Result</Link>
                                        </li>
                                        <li>
                                        <Link class="hrefa" to={`${PUBLIC_URL}getresult`}>Get Result</Link>
                                        </li>

                                    </ul>
                                </li>


                            </ul>
                        </div>
                    </nav>
        </>);
    }
}

export default SideBar;
