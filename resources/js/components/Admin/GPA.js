import React, { Component } from 'react'
import { GPAMark} from '../Services/Admin/AdminServices';
export default class GPA extends Component {
    state={
        GPAResult:[],
    }
    componentDidMount() {
        this.GetGPA();
    }
    GetGPA=async()=>{

        const result= await GPAMark(this.props.it,this.props.semester);
        if(result.success){
            this.setState({ GPAResult:result.data  });
            console.log('GPAResult',this.state.GPAResult)
        }
    }
    render() {
        let Avg=0;
        return (
            <div>
              {this.state.GPAResult.map((row,index)=>(
                  <span style={{display:'none'}}>
                      {Avg=row.gp+Avg}

                  </span>

              ))}
             {Avg/this.state.GPAResult.length}
            </div>
        )
    }
}
