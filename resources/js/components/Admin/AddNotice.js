import React from 'react';
import { GetTeacherInfo, NoticeSave,GetSemesterCourseInfo,deleteSpecificSemesterCourse } from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
import { Editor } from '@tinymce/tinymce-react';

class AddNotice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TeacherData:[],
            email:'',
            batch:'',
            semester:'',
            session:'',
            courseCode:'',
            errors:'',
            description:'',
            content:'',
            errormessage:'',
            SemesterCourseInfo:[],
            SemesterCourseToggle:'',
            toggleButton:false,
            ToggleData:true,
            title:'',
            category:'',
          }
          this.handleEditorChange = this.handleEditorChange.bind(this);
    }
    componentDidMount() {
        this.getSemesterCourse();
    }

    getSemesterCourse=async()=>{
          const result= await GetSemesterCourseInfo();
          if(result.success){
              this.setState({ SemesterCourseInfo:result.data  });


          }
          console.log('semesterInfo',this.state.SemesterCourseInfo);
    }
    sidebarMenu=()=>{

        $('#sidebar').fadeToggle();

    }

    changeInput=(e)=>{
        this.setState({ [e.target.name]:e.target.value });
    }
    handleEditorChange(content) {
        this.setState({ content });
        console.log('dara',this.state.content);
      }
    formSubmit=async(e)=>{
        e.preventDefault();
        const {history}=this.props;
        const xyz = $("#Notice").serializeArray();
        alert(this.state.title+this.state.category+this.state.content);
        const postBody={
            title:this.state.title,
            category:this.state.category,
            description:this.state.content
        }
        const response = await NoticeSave(postBody);

        if(response.success){
            $('#exampleModal').modal('hide');
            this.getSemesterCourse();
            console.log('norice',response.data);
            toast('Data Inserted Successfully')
         this.setState({
              email:"",
              batch:"",
              semester:"",
              session:"",
              courseCode:"",
              errors:"",
              errormessage:"",
              isLoading:true,

          });


            }
            else if(response.checkedData){
                this.setState({
                      errors:"",
                errormessage:"", });
                toast('Already Data Exists!')

            }
        else {
            console.log("response.errors", response.errors);
            this.setState({
                errors: response.errors,
               // isLoading: false,
                errormessage: response.message,
            });
        }
    }
    deleteSemCourse=(email,ccode,session)=>{
        Swal.fire({
            title: 'Are you sure?',
        text: 'Want To delete',
          icon: 'warning',
            showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
       confirmButtonText: 'Yes!'})
       .then(async(result) => {
            if(result.value){
              //   this.props.submitUser(this.state)
            const response = await deleteSpecificSemesterCourse(email,ccode,session);
            if(response.success){
                this.getSemesterCourse();
                toast('Semester Course Code-'+' '+ccode+' '+' Deleted Successfully');
                this.totalClasses();

            }

              }
          });
    }
    EditSemCourse=async(email,ccode,session,id)=>{
     const {history}=this.props;
     history.push(`${PUBLIC_URL}editSCourse/${email}/${ccode}/${session}/${id}`);
    }
    DataToggle=()=>{
  $(function() {
    $('#toggle-one').bootstrapToggle();
  })
    }
    ToggleButtonClick=()=>{
        this.setState({ toggleButton:!this.state.toggleButton ,ToggleData:!this.state.ToggleData });
    }
    render() {
        let i=1;
        return (
            <>
            <ToastContainer/>
            <div class="containerCustom">
                 <div class="topMargin">

                <div class="wrapper">
           <SideBar/>


                    <div id="content">

                <button type="button" class=" btn btn-success float-right clearfix"   style={{marginRight:"5px"}} data-toggle="modal" data-target="#exampleModal">
  Add Notice
</button>

{/* modal start */}
<div class="modal fade"   id="exampleModal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Notice</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <div>
                            <h3>Add Notice</h3>

                            <form onSubmit={this.formSubmit} method="post" id="Notice" >
                            <div class="form-group">
            <label for="exampleFormControlSelect1">For Whose </label>
            <select class="form-control" id="exampleFormControlSelect1" name="category"
                onChange={(e) => {this.setState({ category:e.target.value  });}}>
                    <option value="">Select</option>

               <option value="A">A</option>
               <option value="B">B</option>



            </select>
            {this.state.errors && this.state.errors.email && (
                <p class="text-danger">{this.state.errors.email[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Title</label>
           <input type="text" class="form-control" id="password" placeholder="Enter title" name="title"
            value={this.state.title} onChange={(e) => {this.setState({ title:e.target.value  });}}/>
            {this.state.errors && this.state.errors.image && (
                <p class="text-danger">{this.state.errors.image[0]}</p>
            )}
        </div>

        <div class="form-group">
            <label for="password">Session</label>
           <input type="file" class="form-control" id="password" placeholder="Enter Session" name="image"
            value={this.state.session} onChange={(e) => this.changeInput(e)}/>
            {this.state.errors && this.state.errors.image && (
                <p class="text-danger">{this.state.errors.image[0]}</p>
            )}
        </div>
        <div class="form-group">
        <Editor

  init={{ plugins: ['advlist autolink link image lists charmap print preview hr anchor pagebreak',
  'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
  'table emoticons template paste help'],toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
  'bullist numlist outdent indent | link image | print preview media fullpage | ' +
  'forecolor backcolor emoticons | help',
menu: {
  favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
},
menubar: 'favs file edit view insert format tools table help',
content_css: 'css/content.css' ,    entity_encoding: "raw",
extended_valid_elements : "em[class|name|id]",
valid_children : "+body[style], +style[type]",
apply_source_formatting : false,                //added option
verify_html : false,          }} value={this.state.content} name="content" onEditorChange={this.handleEditorChange} />

            {this.state.errors && this.state.errors.description && (
                <p class="text-danger">{this.state.errors.description[0]}</p>
            )}
        </div>



{/* <div class="form-group form-check">
<label class="form-check-label">
    <input class="form-check-input" type="checkbox" value="checked"> Remember me</input>
</label>
</div> */}
<button type="submit" class="btn btn-success btn-block" >Submit</button>
</form>
</div>

        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
  {/* modal end */}
  </div>



                            <div class="container-fluid">
                                <button onClick={()=>this.sidebarMenu()} type="button" id="sidebarCollapse" class="btn btn-info ">
                                <i class="fa fa-align-right"></i>  <span class="glyphicon glyphicon-align-right " aria-hidden="true">Toggle</span>
                                </button>

                            </div>



                        <br></br>
                         <h3>Here all notice</h3>
                         <div class="table-responsive">
                         <table class="table table-striped">
                             <thead>
                               <tr>
                                   <th>No</th>
                                   <th>Course Teacher</th>
                                   <th>Email</th>
                                   <th>Course Code</th>
                                   <th>Batch</th>
                                   <th>Session</th>
                                   <th>Status</th>
                                   <th>Edit</th>
                                   <th>Delete</th>



                               </tr>
                             </thead>
                             <tbody>
                                 {this.state.SemesterCourseInfo.map((row,index)=>(

                                  <tr>
                                      <td>{i++}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.course_code}</td>
                                <td>{row.batch}</td>
                                <td>{row.session}</td>
                                <td>

           {row.status=='1' && (
                 <div class="example btn btn-success">
               <span>On</span>
               </div>
           )}
              {row.status=='0' && (
              <div class="example btn btn-danger">
              <span>Off</span>
              </div>
           )}



</td>
                                <td>
                              <button class="btn btn-success" onClick={()=>this.EditSemCourse(row.email,row.course_code,row.session,row.id)}>Edit</button>
                             </td>
                                <td> <button onClick={()=>this.deleteSemCourse(row.email,row.course_code,row.session)} class="btn btn-danger">Delete</button> </td>
                                  </tr>

                                 ))}
                             </tbody>
                         </table>
                         </div>


                    </div>


                </div>


                 </div>
                 </div>





            </>
          );
    }
}

export default withRouter(AddNotice);
