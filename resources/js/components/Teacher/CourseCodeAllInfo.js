import React from 'react';
import { Link, withRouter} from "react-router-dom";

import { AllinformationGet1, getAttendaceResult1 ,SearchByCode} from '../Services/AttendanceService';
import Pagination1 from './Pagination1';
import ViewAttendanceResult from './ViewAttendanceResult';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PUBLIC_URL } from "../CommonURL";
class CourseCodeAllInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getallInfo:[],
            AttendanceResult:[],
            searchProject:[],
            IndexOfFirst:'0',
            IndexOfLast:'5',
            searchWcode:'',
            SearchByCourseCode:[],
          }

    }
    componentDidMount() {
        this.GetAllinformation();
     //   this.ResultOfAttendance();

    }
    GetAllinformation=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
        const response= await AllinformationGet1(email);
        if(response.success){
            this.setState({ getallInfo:response.data  });


        }
    }
    TakeAttend=async(session,ccode)=>{
        const {history}=this.props;
        //window.location.href = `/OARS/takenclasses/${coursecode}`;
        $(".modal").modal('hide');
      await history.push(`${PUBLIC_URL}attendance/${session}/${ccode}`);
    }
    SeeDetails=async(coursecode)=>{
      //  alert('hi');
        const {history}=this.props;
        //window.location.href = `/OARS/takenclasses/${coursecode}`;
        $(".modal").modal('hide');
      const abc= await history.push(`${PUBLIC_URL}takenclasses/${coursecode}`);


    }
    AddCtMark=async(session,ccode)=>{
        const {history}=this.props;
        //window.location.href = `/OARS/takenclasses/${coursecode}`;
        $(".modal").modal('hide');
      await history.push(`${PUBLIC_URL}addCtMarkF/${session}/${ccode}`);

    }
    CtmarkDetails=async(session,ccode)=>{
        const {history}=this.props;
        //window.location.href = `/OARS/takenclasses/${coursecode}`;
        $(".modal").modal('hide');
      await history.push(`${PUBLIC_URL}detailsCt/${session}/${ccode}`);

    }

    // ResultOfAttendance=async()=>{
    //     const getLoginData = localStorage.getItem("LoginData");
    //     const data1 = JSON.parse(getLoginData);
    //     const email = data1.user.email;
    //     const AttendanceResultRes= await getAttendaceResult1(email);
    //     if(AttendanceResultRes.success)
    //     this.setState({ AttendanceResult:AttendanceResultRes.data,searchProject:AttendanceResultRes.data  });{

    //     }
    //     console.log('attendance result',this.state.AttendanceResult)

    // }
    SearchInput=(e)=>{
      this.setState({ searchWcode:e.target.value });
        console.log('searchWcode',this.state.searchWcode)


    }
    formSubmit=async(e)=>{
        e.preventDefault();
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;

        if(this.state.searchWcode.length==0){
     toast('Please Select Course Code');
        }
        else{

            const result=await SearchByCode(this.state.searchWcode,email);
            if(result.success){
                this.setState({ SearchByCourseCode:result.data  });


            }

        }

    }
      // search functionality
    //   onSearch=(e)=>{
    //     const search=e.target.value;
    //    // console.log('search',search);
    //     this.setState({


    //         isLoading:true,
    //     });
    //     if(search.length>0){
    //         const searchData = this.state.searchProject.filter(function (item) {
    //             const itemData = item.name + " " + item.it+" "+item.course_code;
    //             const textData = search.trim().toLowerCase();
    //             return itemData.trim().toLowerCase().indexOf(textData) !== -1;
    //         });
    //         this.setState({

    //             searchProject: searchData,
    //             search:search,
    //             isLoading: false,
    //         });
    //     }
    //     else{

    //         //here call this method when search result length is empty

    //         this.ResultOfAttendance();

    //     }
    // }
    //end search functionality

    //pagination
paginate=(pageNum)=>{
   // alert(pageNum);
    const currentPage=pageNum;
    const PostPerPage=5;
    const IndexOfLast=currentPage*PostPerPage;
    const IndexOfFirst=IndexOfLast-PostPerPage;
    this.setState({ IndexOfLast:IndexOfLast,IndexOfFirst:IndexOfFirst  });
}
    render() {
        let randNum=1;
        return (
            <>
            <ToastContainer/>
            <div class="containerCustom">
            <div class="topMargin">
           <div class="row">
               <div class="col-md-12">
                   <div class="takenclasss">
                        <h3 class="heading"></h3>
                          <div class="row">
                              {this.state.getallInfo.map((row,index)=>(


                              <div class="col-md-4">
                                  {/* <!-- Button to Open the Modal --> */}

                                  <div class="AllInfo_course">
                                  <h3>Session:{row.session}</h3>
                              <h3>Semester:{row.semester}</h3>
                              <h4>Course Code:{row.course_code}</h4>
                              <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#myModal${row.course_code}`}>
  See Details
</button>

{/* <!-- The Modal --> */}
<div class="modal" id={`myModal${row.course_code}`} >
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      {/* <!-- Modal Header --> */}
      <div class="modal-header">
        <h4 class="modal-title">Course Code:{row.course_code}</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      {/* <!-- Modal body --> */}
      <div class="modal-body">
        <button class="btn btn-success" style={{marginLeft:"4px",marginRight:"4px",marginBottom:"2px"}}
        onClick={()=>this.TakeAttend(row.session,row.course_code)} >Take Attendance</button>
        <button  class="btn btn-success"style={{marginLeft:"4px",marginRight:"4px",marginBottom:"2px"}}  onClick={()=>this.SeeDetails(row.course_code)}>Details Attendance</button>
        <button  class="btn btn-primary" style={{marginLeft:"4px",marginRight:"4px",marginBottom:"2px"}}
       onClick={()=>this.AddCtMark(row.session,row.course_code)} >Add CT Mark</button>
        <button class="btn btn-secondary" style={{marginLeft:"4px",marginRight:"4px",marginBottom:"2px"}}   onClick={()=>this.CtmarkDetails(row.session,row.course_code)} >Details CT Marks and Attendance</button>

      </div>

      {/* <!-- Modal footer --> */}
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>

                                  </div>
                              </div>
                                   ))}
                          </div>
                   </div>
               </div>
           </div>
           </div>
           </div>

           </>
         );
    }
}

export default withRouter(CourseCodeAllInfo);


