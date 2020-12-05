import React from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { SemesterWithCourseCodeRes, TeacherInformation } from '../Services/StudentService';
import ViewAttendance from './ViewAttendance';

class ComponentToPrint  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AttendanceIndivi:[],
            isLoading:true,
            TeacherInfo:{},
         }
    }
    componentDidMount() {

            this.GetIndividulStudentAttendance();

        this.TeacherInformationForStudent();
    }
    GetIndividulStudentAttendance=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
       const it= localStorage.getItem('it');
       const coursecode= localStorage.getItem('coursecode');
        const result= await SemesterWithCourseCodeRes(it,coursecode);
        if(result.success){

           this.setState({ AttendanceIndivi:result.data ,isLoading:false });
           console.log('AttendanceIndivi',this.state.AttendanceIndivi);
        }
    }
    TeacherInformationForStudent=async()=>{
       const temail=localStorage.getItem('TeacherEmail');
          const result= await TeacherInformation(temail);
          if(result){
              this.setState({ TeacherInfo:result  });
          }
    }
    render() {
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const name = data1.user.name;
        const coursecode= localStorage.getItem('coursecode');
             let i=1;
             let PresentCount=0;
      return (
        <div>
            <div class="containerCustom">
            <div class="topMargin">
            <div class="row">
                <div class="col-md-12" >
                    <div style={{paddingLeft:'.6em'}}>

        <div style={{textAlign:'left',paddingTop:'.5em'}}>
          <h5 style={{color:'#c43838',fontWeight:'600',textAlign:'center'}}>Course Code:{coursecode}</h5>
          <img style={{width:"90px"}} src={`http://localhost/OARS/storage/app/public/uploads/${this.state.TeacherInfo.image}`}
           alt={this.state.TeacherInfo.image} />
              <h6 style={{color:'#ac3e13',paddingTop:'.2em'}}>Course Teacher Name:{this.state.TeacherInfo.name} </h6>
              <h6> phone:{this.state.TeacherInfo.phone} </h6>
              <h6> email: {this.state.TeacherInfo.email} </h6>


      {this.state.AttendanceIndivi.slice(0,1).map((row,index)=>(
 <>

        <h6>Student Name:{name}</h6>
        <h6 >ID:IT- {row.it} </h6>

        <span style={{display:"none"}}>{localStorage.setItem('TeacherEmail',row.teacheremail)}</span>
        </>

  ))}
   </div>
      <div class="table-responsive " >
                <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Lecture</th>
      <th scope="col">Attendance</th>
      <th scope="col">Date</th>

    </tr>
  </thead>
  <tbody>
      {this.state.AttendanceIndivi.map((row,index)=>(

  <tr>
      <th scope="row">{i++}</th>
      <td>{row.attend=='P' &&(
          <span style={{color:'green'}}>P</span>

      )}
       {row.attend!='P' &&(
          <span style={{color:'red'}}>A</span>
      )}
<p style={{display:'none'}}>{row.attend=='P'?(PresentCount++):''}</p>
      </td>
      <td>{row.TakenDate}</td>

    </tr>
      ))}
 </tbody>
 </table>
 </div>

 <div style={{textAlign:'left'}} >
       <h5 style={{fontWeight:'600'}}>Total Lecture:{this.state.AttendanceIndivi.length}</h5>
       <h6  >Total Present:{PresentCount}</h6>
       <h6 >Total Absent:{this.state.AttendanceIndivi.length-PresentCount}</h6>
       <h6 style={{color:((PresentCount*100)/this.state.AttendanceIndivi.length>60)?'#2c601e':'red'}}>Attendance Percentance:{(PresentCount*100)/this.state.AttendanceIndivi.length}%</h6>
 </div>
     </div>

     </div>
            </div>
            </div>
            </div>
            </div>
      );
    }
  }

class Print extends React.Component {
  render() {
      localStorage.setItem('it',this.props.match.params.it);
      localStorage.setItem('coursecode',this.props.match.params.coursecode);
    console.log('it ok',this.props.match.params.it);
    console.log('coursecode ok',this.props.match.params.coursecode);
    return (

        <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a class="btn btn-success float-right clearfix" href="#">Print!</a>;
          }}
          content={() => this.componentRef}
        />
        <ComponentToPrint  ref={el => (this.componentRef = el)} />
      </div>

    );
  }
}
export default Print;

