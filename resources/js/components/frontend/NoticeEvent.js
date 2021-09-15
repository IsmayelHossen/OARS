import React from 'react';
import Slider from './Slider';
import { getIndviNoticeEvent }
 from '../Services/Admin/AdminServices';
import Fade from 'react-reveal/Fade';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
class NoticeEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NoticeResult:{},
            email:'ismayelhossen123@gmail.com'
         }
    }
    componentDidMount() {


        this.getNoticeEvent();
    }
    getNoticeEvent=async()=>{
      //  alert(this.user.email);
        const response= await getIndviNoticeEvent(this.props.match.params.id);
        if(response.success){
            this.setState({ NoticeResult:response.data  });

        }
        console.log('notice data',this.state.NoticeResult)
    }

    render() {
        const lengthR=this.state.NoticeResult.length;
        let i=1;
        let i2=1;
        return (
            <>
            <div class="topMargin ">

                <Fade bottom>
                    <div>
                <div class="jumbotron" >

                 <h3 style={{paddingTop:'2em'}}>{this.state.NoticeResult.category}</h3>
                 <h5>{this.state.NoticeResult.title}</h5>
                 {this.state.NoticeResult.image!=null &&(
                     <div style={{maxWidth:'300px',marginBottom:'5px',marginTop:'5px'}}>
            <img  style={{width:'100%'}} src={`${PUBLIC_URL}storage/app/public/uploads/post/${this.state.NoticeResult.image}`} class="" alt="Image"/>
                     </div>

                 )}
                <p style={{paddingBottom:'2em'}}>{this.state.NoticeResult.description}</p>
                </div>
                </div>
                </Fade>

              </div>
            </>
         );
    }
}

export default withRouter(NoticeEvent);
