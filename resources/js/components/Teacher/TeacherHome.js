import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { TeacherAllInfo } from '../Services/TeacherService';
import TeacherUpdate from './TeacherUpdate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from './ImageUpload';
import { PUBLIC_URL } from "../CommonURL";
//Datatable Modules
//import 'jquery/dist/jquery.min.js';
// import "datatables.net-dt/js/dataTables.dataTables.min.js"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
//import $ from 'jquery';
class TeacherHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            individualInfo: '',
            teachertdata:{},
            isLoading:false,
            toggleUpdateTask:true,
        }
    }
    componentDidMount() {
        this.TeacherGetAllInfo();



    }


    TeacherGetAllInfo = async () => {
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
        // this.setState({ individualInfo:email  });



        //console.log("studentemail",email );
        const response = await TeacherAllInfo(email);
        if (response) {
            this.setState({ teachertdata: response });
            console.log("final", this.state.teachertdata);

        }

    }
    toggleUpdateStudent=()=>{
        this.setState({ toggleUpdateTask:!this.state.toggleUpdateTask,  });
    }
    onCompleteTeacherUpdate=()=>{
        this.TeacherGetAllInfo();
        this.toggleUpdateStudent();
        toast("Data Update successfully!");

    }
    onCompleteTeacherUpdateImage=()=>{
        this.TeacherGetAllInfo();

        toast("Image Uploaded successfully!");

    }


    render() {
        const image =this.state.teachertdata.image;
        const abc="hi hello";
        let showimage;
        // if(image){
        //   showimage=
        // }
        // else{

        // }
        return (
            <>
            <ToastContainer/>
            <div class="containerCustom">
            <div class="topMargin">
            <div class="jumbotron">
                   <div class="row">


                {this.state.isLoading && (
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                )}
                 <div class="col-md-4">
                 {/* image show when toggleUpdateTask true */}
                 {this.state.toggleUpdateTask &&  (

                <>
                <img src={`${PUBLIC_URL}storage/app/public/uploads/${this.state.teachertdata.image}`} class="student-card-img-top" alt="..."/>
                <ImageUpload  onCompleteTeacherUpdateimage={this.onCompleteTeacherUpdateImage} />
                </>
          )}
          </div>
          <div class="col-md-8">
               {/* here show all data after redirect from login */}
                  { this.state.toggleUpdateTask && (
               <>

                      <div class="table-responsive">
                          <table>
                              <tbody>
                                  <tr>
                                      <th>{this.state.teachertdata.name}</th>
                                  </tr>
                                  <tr>
                                      <th>Designation</th>
                                      <td>{this.state.teachertdata.designation}</td>
                                  </tr>

                                  <tr>
                                      <th>Blood Group</th>
                                      <td>{this.state.teachertdata.bloodg}</td>
                                  </tr>
                                  <tr>
                                      <th>Phone</th>
                                      <td>{this.state.teachertdata.phone}</td>
                                  </tr>
                                  <tr>
                                      <th>Email</th>
                                      <td>{this.state.teachertdata.email}</td>
                                  </tr>

                                  <tr>
                                      <th>Current Address</th>
                                      <td>{this.state.teachertdata.caddress}</td>
                                  </tr>
                                  <tr>
                                      <th>Permanent Address</th>
                                      <td>{this.state.teachertdata.paddress}</td>
                                  </tr>

                              </tbody>
                          </table>
                      </div>

                            <div class="card-body">

                                <p style={{display:'block'}}>
                                    {localStorage.setItem('session',this.state.teachertdata.session)}
                                </p>


                            </div>


            </>
                )}
                </div>
                  </div>


            <div class="row">
                <div class="col-md-12">
                      {/* after clicked the update button show update from StudentUpdate.js component */}
                      {! this.state.toggleUpdateTask && (
    <TeacherUpdate teacherDataPass={this.state.teachertdata}
    onCompleteTeacherUpdate={this.onCompleteTeacherUpdate}  />
)}

                <button
                    class="btn btn-success mr-2"
                    onClick={() => this.toggleUpdateStudent()}
                >
                    {this.state.toggleUpdateTask && <span>Update </span>}
                    {!this.state.toggleUpdateTask && <span>Cancel Updating</span>}
                </button>
                </div>
            </div>


           </div>
           </div>
           </div>


        </>
        );
    }
}

export default withRouter(TeacherHome);

