import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { getColleagueInfo } from '../Services/TeacherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from '../Teacher/ImageUpload';
import { PUBLIC_URL } from "../CommonURL";
import { Row } from 'react-bootstrap';
import Pagination1 from '../Teacher/Pagination1';

export default class Colleague extends React.Component {
    state={
        InfoColleague:[],
    }
    componentDidMount() {
        this.ColleagueInfo();
    }
    ColleagueInfo=async()=>{
        const response= await getColleagueInfo();
        if(response.success){
            this.setState({ InfoColleague:response.data  });
        }
    }
    render() {
        return (
            <div>
               <div class="containerCustom">
            <div class="topMargin takenclasss">
        <h3 class="heading animate__bounce"> Colleague Informations</h3>
            <div class="row ">
           {this.state.InfoColleague.map((row,index)=>(


            <div class="col-md-3">
                   <div class="allclassmate">
                   <img  class="allclassmateImg"  src={`${PUBLIC_URL}storage/app/public/uploads/${row.image}`}
                    alt={row.name} />
                       <h6><button class="btn btn-success">{row.name}</button></h6>

                    <p style={{color:'#13114d'}}>{row.designation}</p>
                    <p style={{color:'#118655'}}>Blood Group:{row.bloodg}</p>
                    <p style={{color:'#a22e0b'}}>Phone:{row.phone}</p>
                    <p><button class="btn btn-primary">Email:{row.email}</button></p>
                    <p>Permanent Address:{row.paddress}</p>

                   </div>
                </div>
                  ))}

                </div>
                </div>
                </div>
            </div>
        )
    }
}
