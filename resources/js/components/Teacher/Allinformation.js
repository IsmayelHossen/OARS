import React from 'react';
import { Link, withRouter} from "react-router-dom";

import { AllinformationGet1, getAttendaceResult1 ,SearchByCode} from '../Services/AttendanceService';
import Pagination1 from './Pagination1';
import ViewAttendanceResult from './ViewAttendanceResult';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PUBLIC_URL } from "../CommonURL";
import Bounce from 'react-reveal/Bounce';
class Allinformation extends React.Component {
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
    SeeDetails=async(coursecode)=>{
      //  alert('hi');
        const {history}=this.props;
        //window.location.href = `/OARS/takenclasses/${coursecode}`;
      const abc= await history.push(`${PUBLIC_URL}takenclasses/${coursecode}`);

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
                  <h3 class="heading"> <Bounce left ><div>All Information</div> </Bounce></h3>
                          <div class="row">
                              {this.state.getallInfo.map((row,index)=>(


                              <div class="col-md-4">
                                  <div class="AllInfo_course">
                                  <h3>Course Code:{row.course_code}</h3>
                              <h3>Semester:{row.semester}</h3>
                              <button class="btn btn-success btn-sm mb-3" onClick={()=>this.SeeDetails(row.course_code)}>See Details</button>

                                  </div>
                              </div>
                                   ))}
                          </div>
                   </div>
               </div>
           </div>
            {/* add ct marks start */}


                 {/* add ct marks end */}
           <div class="row">
               <div class="col-md-12">
                   <div class="takenclasss" style={{marginTop:'.5em'}}>
                       <h4 class="Allinformation_h4">Search here to get individual student all informations </h4>

                     <h5 style={{marginBottom: ".1em",paddingLeft:"10px"}}>Course Code: {this.state.getallInfo.map((row,index)=>(
                        <span>{ row.course_code},</span>
                        ))}</h5>
{/* form search start */}
<form class="form-inline" onSubmit={this.formSubmit} style={{marginBottom: ".7em",paddingLeft:"10px"}}>
  <div class="form-group mb-2">
   <select class="form-control" id="exampleFormControlSelect1" name="searchWcode"
                                 onChange={(e) => this.SearchInput(e)}>
                            <option value="">Select Course Code</option>
                                     {this.state.getallInfo.map((row,index)=>(
                              <option value={ row.course_code}>{ row.course_code}</option>

                                     ))}  </select>
  </div>
  <div class="form-group  mb-2">
 <input type="submit" value="Search" class="btn btn-success"/>
</div>
</form>
{/* form search end */}

{/* //specific searcg start */}
{/*
<form style={{marginBottom: ".7em",paddingLeft:"10px"}}>
                  Search: <input type="text" class="search" onChange={(e)=>this.onSearch(e)}>

                                  </input>
                    </form>
                              {  this.state.SemesterStudent !=0 && this.state.searchProject.length === 0 && (
                     <span class=" alert-warning" style={{padding:".2em .5em",
                        marginLeft:"4.5em"}}>
                        No result found!
                     </span>
                         )} */}

     {/* //specific searc */}
                      {/* <p style={{marginBottom: ".1em",paddingLeft:"10px"}}>Total Result:{this.state.AttendanceResult.length}</p> */}


               <div class="table-responsive max_tableHeight">

                       <table class="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Session</th>
        <th>Course Code</th>
        <th>Add CT Mark</th>
        <th>View</th>
      </tr>
    </thead>
    <tbody>
    {this.state.SearchByCourseCode.map((row,index)=>(
      <tr>
        <td>{row.name}</td>
    <td>{row.it}</td>
    <td>{row.session}</td>
    <td>{row.course_code}</td>
    <td><Link class="btn btn-primary" to={`${PUBLIC_URL}Addctmark/${row.it}/${row.session}/${row.course_code}`}>Add </Link></td>
    <td><ViewAttendanceResult random={randNum++} it={row.it} courseCode={row.course_code}/></td>
      </tr>
    ))}

    </tbody>
  </table>
  {/* <Pagination1 totalpage={this.state.SearchByCourseCode.length} perpage="5"  paginate={this.paginate}/> */}
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

export default withRouter(Allinformation);


