import React from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { GetCTMarks } from '../Services/AttendanceService';
import {  GradeSheetResult ,getlpgrade} from '../Services/Admin/AdminServices';
import { PUBLIC_URL } from "../CommonURL";

class ComponentToPrint  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AttendanceIndivi:[],
            isLoading:true,
            TeacherInfo:{},
            CTMark:[],
            MarksheetResult:[],
            GradePoint:[],
         }
    }
    componentDidMount() {
     this.Marksheet();
            this.LPGrade();

    }
    LPGrade=async()=>{

        const result= await getlpgrade();
        if(result.success){

           this.setState({ GradePoint:result.data  });
           console.log('AttendanceIndivi',this.state.AttendanceIndivi);
        }
    }

    Marksheet=async()=>{
        const it= localStorage.getItem('it');
          const semester= localStorage.getItem('semester');
        const result= await GradeSheetResult(it,semester);
        console.log('show marks',result);
        if(result.success){

            this.setState({ MarksheetResult:result.data ,isLoading:false });
            console.log('show marks',this.state.CTMark);


         }
    }
    render() {
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const name = data1.user.name;
        const coursecode= localStorage.getItem('coursecode');
             let i=1;
             let PresentCount=0;
             let ctmark=0;
             let totalCT=0;
             let gpa=0;
             let avg=0;
             let crdithours=0;
      return (

            <div class="containerCustom">
            <div class="topMargin Notprinttopmargin ">
            <div class="row" styel={{paddingLeft: '10px',}}>

              {/* display flex part-1 start */}
              <div style={{display:'flex'}}>
              <div class="note">
                <b>Note:</b>
                <ul class="gradesheet_ul">
                    <li><span>LG =</span>Letter Grade</li>
                    <li><span>GG =</span>Grade Point</li>
                    <li><span>CO =</span>Credit(s) Offered</li>
                    <li><span>CE =</span>Credit(s) Earned</li>
                    <li><span>TPS =</span>Total Point Secured</li>
                    <li><span>GPA =</span>(Grade Points Average)=TPS/CO</li>
                    <li><span>CGPA =</span>Cumulative Grade Point Average</li>
                </ul>
                </div>

               <div class="sheetheading">
                   <div class="imgtop">
               <img src={`${PUBLIC_URL}storage/app/public/uploads/mbstu2.png`}  alt="MBSTU"/>
               </div>
                <h1>Mawlana Bashani Science And Technology University,Tangail,Bangladesh</h1>
                <h1 style={{textAlign:'center'}}> Grade Sheet For</h1>
                <div class="middle">
                    {this.state.MarksheetResult.slice(0,1).map((row,index)=>(
                        <>
                        { row.semester=='4-2' && (

                            <h5>4<sup>th</sup> Year 2<sup>nd</sup> Semester B.Sc(Engg.) Final Examination,{row.finalexamyr}</h5>
                            ) }
                             { row.semester=='4-1' && (
                         <h5>4<sup>th</sup> Year 1<sup>st</sup> Semester B.Sc(Engg.) Final Examination,{row.finalexamyr}</h5>
                        ) }
                         { row.semester=='3-2' && (

                        <h5>3<sup>rd</sup> Year 2<sup>nd</sup> Semester B.Sc(Engg.) Final Examination,{row.finalexamyr}</h5>
                        ) }
                           { row.semester=='3-1' && (
                         <h5>3<sup>rd</sup> Year 1<sup>st</sup> Semester B.Sc(Engg.) Final Examination,{row.finalexamyr}</h5>
                        ) }
                        { row.semester=='2-2' && (

                        <h5>2<sup>nd</sup> Year 2<sup>nd</sup> Semester B.Sc(Engg.) Final Examination,{row.finalexamyr}</h5>
                        ) }
                           { row.semester=='2-1' && (
                         <h5>2<sup>nd</sup> Year 1<sup>st</sup> Semester B.Sc(Engg.) Final Examination,{row.finalexamyr}</h5>
                        ) }
                         { row.semester=='1-2' && (

                        <h5>1<sup>st</sup> Year 2<sup>nd</sup> Semester B.Sc(Engg.) Final Examination,{row.finalexamyr}</h5>
                        ) }
                           { row.semester=='1-1' && (
                         <h5>1<sup>st</sup> Year 1<sup>st</sup> Semester B.Sc(Engg.) Final Examination,{row.finalexamyr}</h5>
                        ) }
                       </>
                    ))}

                <h6 ><strong>Held in:</strong>
                 {this.state.MarksheetResult.slice(0,1).map((row,index)=>(
                    <span>{row.heldIn}</span>
                 ))}</h6>
                <h6><strong>Department:</strong>Information And Comminication Technology(ICT)</h6>
                <h6><strong>Faculty:</strong>Engineering</h6>
                {this.state.MarksheetResult.slice(0,1).map((row,index)=>(
                    <>
                <h6><strong>Name of the candidate:</strong>{row.name}</h6>
                <h6><strong>Student ID:</strong><strong>IT-</strong>{row.it}</h6>
                <h6><strong>Session:</strong>{row.session}</h6>
                </>
                ))}
                </div>

               </div>
               <div class="pointList" >
               <p class="lettergradeP">Letter grade and corresponding grade points<br/>
shall be determined as follows:</p>
                  <table class="pointlistTable" >

                          <tr  class="pointlistTabletr" >
                              <th  class="pointlistTableth" style={{fontSize:'12px'}}>Numerical Grade</th>
                              <th class="pointlistTableth" style={{fontSize:'12px'}}>Grade Point</th>
                              <th class="pointlistTableth" style={{fontSize:'12px'}}>Letter Grade</th>
                          </tr>


                          {this.state.GradePoint.map((row,index)=>(


                          <tr  class="pointlistTabletr">
                              <td class="pointlistTabletd" style={{fontSize:'10px'}}>{row.ngrade}</td>
                              <td class="pointlistTabletd" style={{fontSize:'10px'}}>{row.gpoint}</td>
                              <td class="pointlistTabletd" style={{fontSize:'10px'}}>{row.lgrade}</td>
                          </tr>
                             ))}




                  </table>

               </div>

              </div>
       {/* display flex part-1 end */}
        {/* marksheet start */}
        {this.state.MarksheetResult.map((row,index)=>(

            <span style={{display:'none'}}>
                {gpa=row.gp+gpa}
                {avg=gpa/this.state.MarksheetResult.length}
            </span>
         ))}
                         <table class="marksheet">
                             <tr class="marksheettr">
                                 <th class="marksheetth">Course Code</th>
                                 <th  class="marksheetth">Course Title</th>
                                 <th  class="marksheetth">Credit Hour(s)</th>
                                 <th  class="marksheetth">LG</th>
                                 <th  class="marksheetth">GP</th>
                                 <th  class="marksheetth">GPA</th>
                             </tr>
                             {this.state.MarksheetResult.slice(0,1).map((row,index)=>(


                             <tr  class="marksheetr">
                                 <td class="marksheettd">{row.ccode}</td>
                                 <td class="marksheettd">{row.ctitle}</td>
                                 <td class="marksheettd">{row.chours}</td>
                                 <td class="marksheettd">{row.lg}</td>
                                 <td class="marksheettd">{row.gp}</td>
                                 <td  class="marksheettd" rowSpan={this.state.MarksheetResult.length}>{avg}</td>
                             </tr>
                                ))}

                                  {this.state.MarksheetResult.slice(1,this.state.MarksheetResult.length).map((row,index)=>(
                                   <tr class="marksheettr">
                                <td class="marksheettd">{row.ccode}</td>
                                <td class="marksheettd">{row.ctitle}</td>
                                <td class="marksheettd">{row.chours}</td>
                                <td class="marksheettd">{row.lg}</td>
                                <td class="marksheettd">{row.gp}</td>


                            </tr>
                            ))}
{/* count course credit hours */}
{this.state.MarksheetResult.map((row1,index)=>(

      <span style={{display:'none'}}>
      {crdithours=row1.chours+crdithours}

  </span>
 ))}
                            {/* dame data start */}
                               {/* <tr>
                               <td class="marksheettd">123</td>
                               <td class="marksheettd">Microwave Communication and Radar</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd">A</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd" >3</td>

                           </tr>
                           <tr>
                               <td class="marksheettd">123</td>
                               <td class="marksheettd">Microwave Communication and Radar</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd">A</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd" >3</td>

                           </tr>
                           <tr>
                               <td class="marksheettd">123</td>
                               <td class="marksheettd">Microwave Communication and Radar</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd">A</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd" >3</td>

                           </tr>
                           <tr>
                               <td class="marksheettd">123</td>
                               <td class="marksheettd">Microwave Communication and Radar</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd">A</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd" >3</td>

                           </tr>
                           <tr>
                               <td class="marksheettd">123</td>
                               <td class="marksheettd">Microwave Communication and Radar</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd">A</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd" >3</td>

                           </tr>
                           <tr>
                               <td class="marksheettd">123</td>
                               <td class="marksheettd">Microwave Communication and Radar</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd">A</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd" >3</td>

                           </tr>
                           <tr>
                               <td class="marksheettd">123</td>
                               <td class="marksheettd">Microwave Communication and Radar</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd">A</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd" >3</td>

                           </tr>
                           <tr>
                               <td class="marksheettd">123</td>
                               <td class="marksheettd">Microwave Communication and Radar</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd">A</td>
                               <td class="marksheettd">3</td>
                               <td class="marksheettd" >3</td>

                           </tr> */}
                           {/* dame data end */}
                         </table>






  {/* marksheet start end */}

  {/* pointtable letter abbrevation start flex */}
  {/* <div style={{display:'flex'}}>



               </div> */}
    {/* pointtable letter abbrevation start end */}

   {/* display flex part-2 start */}
   <div style={{display:"flex",marginTop:'40px',marginLeft:'10px'}}>
       <div class="datepublish">
                   <p><strong>Date of Publication:.................</strong> </p>
                   <p><strong>Date of Issue:.....................</strong> </p>
       </div>
       <div class="prepared">
                   <p><strong>Prepared By:</strong>.................. </p>
                   <p><strong>Compared By:</strong>............... </p>
       </div>
       <div class="earncredit">
       <p><strong>Credit(s) Offered:</strong> </p>
                   <p><strong>Credit(s) Earned:</strong>6</p>
                   <p><strong>CGPA:</strong>20 </p>
                   <p><strong>Remarks:</strong> </p>
       </div>

       <div class="seal">
                     <p>  </p>
                   <p><strong>Seal:</strong> </p>
       </div>
       <div class="controller">
                     <p>  --------------------------------------</p>
                   <p><strong>Deputy Controller of Examinations MBSTU</strong> </p>
       </div>
   </div>

    {/* display flex part-2 end */}

           </div>
            </div>
            </div>
      );
    }
  }

class GradeSheet extends React.Component {
  render() {
      localStorage.setItem('it',this.props.match.params.it);
      localStorage.setItem('semester',this.props.match.params.semester);
    console.log('it ok',this.props.match.params.it);
    console.log('semester',this.props.match.params.semester);
    return (

        <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a class="btn btn-success float-right clearfix" href="#">Print!</a>;
          }}

          pageStyle='@page { size:landscape; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact;  padding-left:20px !important; padding-right:20px !important; padding-top:5px !important; } }'
          content={() => this.componentRef}
        />
        <ComponentToPrint  ref={el => (this.componentRef = el)} />
      </div>

    );
  }
}
export default GradeSheet;

