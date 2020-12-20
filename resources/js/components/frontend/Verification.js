import React from 'react';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { PUBLIC_URL } from '../CommonURL';
import { storeVcode } from '../Services/LoginRegService';
class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vcode:'',
            errors:'',
         }
    }
    changeInput=(e)=>{
        this.setState({ vcode:e.target.value  });

    }
    submitform = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        // this.setState({ isLoading:true  });
        const postBody = {
            vcode: this.state.vcode,
            vcode1:1,

            // user_id:1,
        };
        // const response = await storeData(postBody);
        const response = await storeVcode(postBody);
           if(response.WrongCode){
               toast.error('Sorry Conformation code is invaild');
               this.setState({ errors:'',  });
           }
       else if (response.success) {
            this.setState({
                vcode: "",
                errors: false,
                // isLoading:false,
            });
        // alert('confirm');
             //toast.info('check your email for verification');
             history.push(`${PUBLIC_URL}thanks`);
           // console.log('register',response.data);
        }
        else {
            console.log("response.errors", response.errors);
            this.setState({
                errors: response.errors,
                isLoading: false,
            });
        }

    }

    render() {
        return (
            < >
            <ToastContainer/>
            <div class="confarmation_page">
                <h2>Registration Confarmation form</h2>
                <form onSubmit={this.submitform} >

                            <div class="form-group">
                                <label for="email"> Verification Code which  have been already sent to your email</label>
                                <input type="number" class="form-control" id="name" placeholder="Enter Verification code" name="vcode" value={this.state.vcode}
                                    onChange={(e) => this.changeInput(e)} ></input>
                                {this.state.errors && this.state.errors.vcode&& (
                                    <p class="text-danger">{this.state.errors.vcode[0]}</p>
                                )}
                       </div>
                       <div className="form-group">
                           <button type="submit"  className="btn btn-success">Submit</button>
                       </div>
                       </form>
                </div>
            </>
         );
    }
}

export default withRouter(Verification);
