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
                            <h3>Collaspeable sidebar</h3>
                            <p>orem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                 when an unknown printer took a galley of type and scrambled it to make a type
                                  specimen book. It has survived not only five centuries, but also the leap into
                                  electronic typesetting, remaining essentially unchanged. It was popularised in
                                   the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop
                                 publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                                 <div class="line"></div>
                                 <h3>Collaspeable sidebar</h3>
                            <p>orem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                 when an unknown printer took a galley of type and scrambled it to make a type
                                  specimen book. It has survived not only five centuries, but also the leap into
                                  electronic typesetting, remaining essentially unchanged. It was popularised in
                                   the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop
                                 publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    </div>
                </div>


                 </div>
                 </div>
            </>


         );
    }
}

export default AdminHome;
