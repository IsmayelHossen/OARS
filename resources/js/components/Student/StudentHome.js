import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { StudentAllInfo } from '../Services/StudentService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentUpdate from './StudentUpdate';
import ImageUpload from '../Teacher/ImageUpload';
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
                {this.state.isLoading && (
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                )}

                 {/* image show when toggleUpdateTask true */}
                 {this.state.toggleUpdateTask &&  (

                <>
                <img src={`http://localhost/OARS/storage/app/public/uploads/${this.state.studentdata.image}`} class="student-card-img-top" alt="..."/>
                <ImageUpload  StudentImage={this.StudentImage} />
                </>
          )}
               {/* here show all data after redirect from login */}
                  { this.state.toggleUpdateTask && (
               <>

                        <div class="card" style={{ width: "18rem;" }}>

                            <div class="card-body">
                                <h5 class="card-title">{this.state.studentdata.name}</h5>

                                <p class="card-text">{this.state.studentdata.email}</p>
                                <p class="card-text">{this.state.studentdata.it}</p>
                                <p class="card-text">{this.state.studentdata.session}</p>
                                <p class="card-text">{this.state.studentdata.bloodg}</p>
                                <p class="card-text">{this.state.studentdata.phone}</p>
                                <p class="card-text">{this.state.studentdata.faname}</p>
                                <p class="card-text">{this.state.studentdata.maname}</p>
                                <p class="card-text">{this.state.studentdata.caddress}</p>
                                <p class="card-text">{this.state.studentdata.paddress}</p>
                            </div>
                        </div>

            </>
                )}
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


        </>
         );
    }
}

export default withRouter(StudentHome);
