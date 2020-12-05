import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link,withRouter } from "react-router-dom";
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
                                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Teachers</a>
                                    <ul class="list-unstyled collapse" id="homeSubmenu">
                                        <li>
                                        <Link class="hrefa" to='/OARS/addSemesterCourse'>AddSemesterCourse</Link>

                                        </li>
                                        <li>
                                            <a href="#565">Home2</a>
                                        </li>

                                    </ul>
                                </li>

                                <li >
                                    <a href="">About</a>
                                </li>
                                <li class="active">
                                    <a href="#homeSubmenu1" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
                                    <ul class="list-unstyled collapse" id="homeSubmenu1">
                                        <li>
                                            <a href="#565">Home3</a>
                                        </li>
                                        <li>
                                            <a href="#565">Home4</a>
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
