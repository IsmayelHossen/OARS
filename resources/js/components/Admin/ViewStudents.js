import React from 'react';
import { GetSessionStudent} from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
import { Editor } from '@tinymce/tinymce-react';

class ViewStudents extends React.Component {
    state={
        SessionStudent:[],
        searchProject:[],
    }
    componentDidMount() {
        this.ViewSessionStudent();
    }
    ViewSessionStudent=async()=>{
        const response=await GetSessionStudent(this.props.match.params.session);
        if(response.success){
            this.setState({ SessionStudent:response.data,searchProject:response.data  });
        }
    }
    sidebarMenu=()=>{

        $('#sidebar').fadeToggle();
    }
   // search functionality
   onSearch=(e)=>{
    const search=e.target.value;
   // console.log('search',search);
    this.setState({


        isLoading:true,
    });
    if(search.length>0){
        const searchData = this.state.searchProject.filter(function (item) {
            const itemData = item.name + " " + item.it+" "+item.phone;
            const textData = search.trim().toLowerCase();
            return itemData.trim().toLowerCase().indexOf(textData) !== -1;
        });
        this.setState({

            searchProject: searchData,
            search:search,
            isLoading: false,
        });
    }
    else{

        //here call this method when search result length is empty

        this.ViewSessionStudent();

    }
}
//end search functionality
    render() {
        return (
            <div class="containerCustom">
            <div class="topMargin">
           <div class="wrapper">
                 <SideBar/>


               <div id="content">


            <button onClick={()=>this.sidebarMenu()} type="button" id="sidebarCollapse" class="btn btn-info ">
            <i class="fa fa-align-right"></i>  <span class="glyphicon glyphicon-align-right " aria-hidden="true">Toggle</span>
            </button>
             <br></br>
        <h3 class="adminStudentH3">Student Information({this.props.match.params.session})</h3>
        <br></br>
        <form style={{marginBottom: ".7em",paddingLeft:"10px"}}>
                  Search: <input type="text" class="search" onChange={(e)=>this.onSearch(e)}>

                                  </input>
                    </form>
                              {  this.state.SessionStudent !=0 && this.state.searchProject.length === 0 && (
                     <span class=" alert-warning" style={{padding:".2em .5em",
                        marginLeft:"4.5em"}}>
                        No result found!
                     </span>
                         )}

                 <div class="row">
                     {this.state.searchProject.map((row,index)=>(


<div class="col-md-4">
<div class="allclassmate">
<img  class="allclassmateImg"  src={`${PUBLIC_URL}storage/app/public/uploads/${row.image}`}
 alt={row.name} />
    <h6><button class="btn btn-success">{row.name}</button></h6>

 <p style={{color:'#7d760d'}}>ID:IT-{row.it}</p>
 <p style={{color:'#0d881bc4'}}>Session:{row.session}</p>
 <p>Blood Group:{row.bloodg}</p>
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
            </div>
        )
    }
}
export default ViewStudents;
