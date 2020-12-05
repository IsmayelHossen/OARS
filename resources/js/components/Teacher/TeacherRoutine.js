import React from 'react';
class TeacherRoutine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (

           <>
              <div class="containerCustom">
              <div class="topMargin">
           <div class="row">
               <div class="col-md-12">
                   <div class="takenclasss">
               <div class="table-responsive">
               <table class="table table-striped" style={{textAlign:'center'}}>
                    <thead>
                        <tr>
                    <th>SL</th>
                    <th>Day</th>
                    <th>Lec-1</th>
                    <th>Lec-2</th>
                    <th>Lec-3</th>
                    <th>Lec-4</th>
                    <th>Lec-5</th>
                    <th>Lec-6</th>
                    <th>Lec-7</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Saturday</td>
                            <td>
                            <p>Semester:4-2</p>
                            <p>Time:10am</p>
                            </td>
                            <td>
                            <p>Semester:4-2</p>
                            <p>Time:10am</p>
                            </td>
                            <td>
                            <p>Semester:4-2</p>
                            <p>Time:10am</p>
                            </td>
                            <td>
                            <p>Semester:4-2</p>
                            <p>Time:10am</p>
                            </td>
                            <td>
                            <p>Semester:4-2</p>
                            <p>Time:10am</p>
                            </td>
                            <td>
                            <p>Semester:4-2</p>
                            <p>Time:10am</p>
                            </td>
                            <td>
                            <p>Semester:4-2</p>
                            <p>Time:10am</p>
                            </td>

                        </tr>
                 </tbody>
             </table>
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

export default TeacherRoutine;
