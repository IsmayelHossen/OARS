import React from 'react';
import SideBar from './SideBar';
class AdminHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {

    }
    sidebarMenu=()=>{

        $('#sidebar').fadeToggle();
    }
    render() {
        return (
            <>
              <div class="containerCustom">
                 <div class="topMargin">
                <div class="wrapper">
                      <SideBar/>


                    <div id="content">

                            <div class="container-fluid">
                                <button onClick={()=>this.sidebarMenu()} type="button" id="sidebarCollapse" class="btn btn-info ">
                                <i class="fa fa-align-right"></i>  <span class="glyphicon glyphicon-align-right " aria-hidden="true">Toggle</span>
                                </button>

                            </div>



                        <br></br>
                            <h3 style={{textAlign:'center',fontWeight:'700',textShadow:'0px 1px #8c2533'}}>Welcome to Admin Panel</h3>

                                 <div class="line"></div>

                          {this.props.userData1.name}
                          {this.props.userData1.email}

                      </div>
                </div>


                 </div>
                 </div>
            </>


         );
    }
}

export default AdminHome;
