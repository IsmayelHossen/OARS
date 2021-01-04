import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { StudentAllInfo } from '../Services/StudentService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentUpdate from './StudentUpdate';
import ImageUpload from '../Teacher/ImageUpload';
import { PUBLIC_URL } from "../CommonURL";
class StudentHome extends React.Component {

        state = {
               image: "",
                name: "",
                it: "",
                session: "",
                bloodg: "",
                email: "",
                phone: "",
                fname: "",
                mname: "",
                caddress: "",
                paddress: "",
            getstudent: {},
            studentdata:{},
            studentname:'',
            studentemail:'',
            session: '',
            studentpassword:'',


            isLoading:true,
            toggleButton:false,
            toggleUpdateTask:true,
          }

    componentDidMount() {
        this.StudentGetAllInfo();
    }
    StudentGetAllInfo=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;



        //console.log("studentemail",email );
        const response =await StudentAllInfo(email);
        if(response){
            this.setState({
                studentdata:response,
               isLoading:false,
           });


        }

       // console.log("reponse data name", response.data.data);

    }
    //toggle update ,cancel
    toggleUpdateStudent = () => {
        this.setState({
            isLoading: false,
            toggleUpdateTask: !this.state.toggleUpdateTask,
        });
    };
    onCompleteStudentUpdate = ()=>{
        this.StudentGetAllInfo();
        this.toggleUpdateStudent();
        // this.setState({ session:postBody.session  });
        // console.log('session',this.state.session)
    }
    StudentImage=()=>{
        this.StudentGetAllInfo();

        toast("Image Uploaded successfully!");

    }

    render() {
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
                <img src={`${PUBLIC_URL}storage/app/public/uploads/${this.state.studentdata.image}`} class="student-card-img-top" alt="..."/>
                <ImageUpload  StudentImage={this.StudentImage} />
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
                                      <th>{this.state.studentdata.name}</th>
                                  </tr>
                                  <tr>
                                      <th>Email</th>
                                      <td>{this.state.studentdata.email}</td>
                                  </tr>
                                  <tr>
                                      <th>IT</th>
                                      <td>{this.state.studentdata.it}</td>
                                  </tr>
                                  <tr>
                                      <th>Session</th>
                                      <td>{this.state.studentdata.session}</td>
                                  </tr>
                                  <tr>
                                      <th>Blood Group</th>
                                      <td>{this.state.studentdata.bloodg}</td>
                                  </tr>
                                  <tr>
                                      <th>Phone</th>
                                      <td>{this.state.studentdata.phone}</td>
                                  </tr>
                                  <tr>
                                      <th>Father Name</th>
                                      <td>{this.state.studentdata.faname}</td>
                                  </tr>
                                  <tr>
                                      <th>Mother Name</th>
                                      <td>{this.state.studentdata.maname}</td>
                                  </tr>
                                  <tr>
                                      <th>Current Address</th>
                                      <td>{this.state.studentdata.caddress}</td>
                                  </tr>
                                  <tr>
                                      <th>Permanent Address</th>
                                      <td>{this.state.studentdata.paddress}</td>
                                  </tr>

                              </tbody>
                          </table>
                      </div>

                            <div class="card-body">

                                <p style={{display:'block'}}>
                                    {localStorage.setItem('session',this.state.studentdata.session)}
                                </p>


                            </div>


            </>
                )}
                </div>
                  </div>


            <div class="row">
                <div class="col-md-12">
                      {/* after clicked the update button show update from StudentUpdate.js component */}
                { !this.state.toggleUpdateTask && (
                    <StudentUpdate studentdataPass={this.state.studentdata}
                        onCompleteStudentUpdate={this.onCompleteStudentUpdate}  />
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

export default withRouter(StudentHome);
