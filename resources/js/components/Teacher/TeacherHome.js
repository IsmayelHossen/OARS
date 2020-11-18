import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { TeacherAllInfo } from '../Services/TeacherService';
import TeacherUpdate from './TeacherUpdate';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from './ImageUpload';
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
        let showimage;
        // if(image){
        //   showimage=
        // }
        // else{

        // }
        return (
            <>
               <ToastContainer/>
                {this.state.isLoading && (
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                )}

                  {/* image show when toggleUpdateTask true */}
                  {this.state.toggleUpdateTask &&  this.state.teachertdata.image &&(

        <>
                        <img src={`http://localhost/OARS/storage/app/public/uploads/${this.state.teachertdata.image}`} class="student-card-img-top" alt="..."/>
                        <ImageUpload  onCompleteTeacherUpdateimage={this.onCompleteTeacherUpdateImage} />
             </>
                  )}

               {/* here show all data after redirect from login */}
                  { this.state.toggleUpdateTask && (
               <>

                        <div class="card" style={{ width: "18rem;" }}>

                            <div class="card-body">
                                <h5 class="card-title">{this.state.teachertdata.name}</h5>
                                <p class="card-text">{this.state.teachertdata.designation}</p>
                                <p class="card-text">{this.state.teachertdata.bloodg}</p>
                                <p class="card-text">{this.state.teachertdata.phone}</p>
                                <p class="card-text">{this.state.teachertdata.email}</p>
                                <p class="card-text">{this.state.teachertdata.caddress}</p>
                                <p class="card-text">{this.state.teachertdata.paddress}</p>
                            </div>
                        </div>

            </>
                )}
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


        </>
        );
    }
}

export default withRouter(TeacherHome);

