import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { Form, Button, Card} from 'react-bootstrap';
import { TeacherUpdateData } from '../Services/TeacherService';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
class TeacherUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              image:this.props.teacherDataPass.image,
            name: this.props.teacherDataPass.name,
            email: this.props.teacherDataPass.email,
            designation: this.props.teacherDataPass.designation,
            bloodg: this.props.teacherDataPass.bloodg,
            phone: this.props.teacherDataPass.phone,
            caddress: this.props.teacherDataPass.caddress,
            paddress: this.props.teacherDataPass.paddress,
            validated:false,
            errors:'',
            selectedFile:'',

      }
    }
    handleInputChange=(e)=> {
          const files=e.target.fiels;
          const formData=new formData();
         formData.append('image',fiels[0]);

        this.setState({

            image:formData,


          })
          console.log(this.state.image);
    //     let files = e.target.files || e.dataTransfer.files;
    //     if (!files.length)return;
    //     this.createImage(files[0]);
    // }
    // createImage(file)
    //  {let reader = new FileReader();
    //     reader.onload = (e) => {this.setState({image: e.target.result})};
    //     reader.readAsDataURL(file);}
        }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    submitform = async (event) => {
        event.preventDefault();
        this.setState({ validated:true  });
       const { history } = this.props;
        // this.setState({ isLoading:true  });
        const postBody = {

            image:this.state.image,
            name:this.state.name,
            bloodg:this.state.bloodg,
            designation:this.state.designation,
            email:this.state.email,
            phone:this.state.phone,
            caddress:this.state.caddress,
            paddress:this.state.paddress,

            // user_id:1,
        };

            const response = await TeacherUpdateData(this.state.email, postBody);
            if (response.success) {
                this.setState({

                    isLoading: false,
                });
                //alert('Update successfully');
                //  history.push('/ProjectList');
                // console.log('response',response);

                this.props.onCompleteTeacherUpdate();
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
            <>
                <Card >
                    <Card.Body>
                        <div className="col-md-8 m-auto text-align-justify studentupdate">
                        <Card.Title style={{textAlign:"center"}}>Update Information</Card.Title>
                            <Form  onSubmit={this.submitform} enctype="multipart/form-data">
                             <div class="row">
                                 <div className="col-md-6">
                                 <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                required
                                            type="text" name="name" value={this.state.name}
                                            onChange={(e) => this.changeInput(e)} placeholder=" Your name" />
                                            {this.state.errors && this.state.errors.name && (
                                                <p class="text-danger">{this.state.errors.name[0]}</p>
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                Please write your name.
                                      </Form.Control.Feedback>

                            </Form.Group>
                                 </div>
                                 <div className="col-md-6">
                                 <Form.Group controlId="formBasicPassword">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control
                                                required
                                                value={this.state.designation}
                                type="text" name="designation" onChange={(e) => this.changeInput(e)} placeholder="designation" />
                                            {this.state.errors && this.state.errors.designation && (
                                                <p class="text-danger">{this.state.errors.designation[0]}</p>
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                Please write your designation.
                                      </Form.Control.Feedback>
                            </Form.Group>
                                 </div>
                             </div>


                            <div className="row">
                                <div className="col-md-6">
                                <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control
                                                required
                                            type="number" name="phone"
                                                value={this.state.phone}
                                            placeholder=" Your phone"
                                                onChange={(e) => this.changeInput(e)} pattern="01[3|4|6|7|8|9][0-9]{8}" />
                                            {this.state.errors && this.state.errors.phone && (
                                                <p class="text-danger">{this.state.errors.phone[0]}</p>
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                Please write your phone number.
                                      </Form.Control.Feedback>
                                        </Form.Group>
                                </div>
                             <div className="col-md-6">
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Blood Group</Form.Label>
                                <Form.Control
                                                required
                                                value={this.state.bloodg}
                                type="text" name="bloodg" onChange={(e) => this.changeInput(e)} placeholder="Blood group" />
                                            {this.state.errors && this.state.errors.bloodg && (
                                                <p class="text-danger">{this.state.errors.bloodg[0]}</p>
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                Please write your blood Group.
                                      </Form.Control.Feedback>
                            </Form.Group>
                            </div>
                            </div>


                                <div className="row">
                                    <div className="col-md-12">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" name="email" value={this.state.email}
                                                onChange={(e) => this.changeInput(e)} placeholder="Your email" readOnly />
                                        </Form.Group>
                                    </div>

                                </div>


                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Current Address</Form.Label>
                                    <Form.Control
                                        required
                                    as="textarea" name="caddress"
                                        value={this.state.caddress}
                                        onChange={(e) => this.changeInput(e)} rows={2} />
                                    {this.state.errors && this.state.errors.caddress && (
                                        <p class="text-danger">{this.state.errors.caddress[0]}</p>
                                    )}
                                    <Form.Control.Feedback type="invalid">
                                        Please write your caddress.
                                      </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Permanent Address</Form.Label>
                                    <Form.Control
                                        required
                                    as="textarea" name="paddress"
                                        value={this.state.paddress}
                                        onChange={(e) => this.changeInput(e)} rows={2} />
                                    {this.state.errors && this.state.errors.paddress && (
                                        <p class="text-danger">{this.state.errors.paddress[0]}</p>
                                    )}
                                    <Form.Control.Feedback type="invalid">
                                        Please write your paddress.
                                      </Form.Control.Feedback>
                                </Form.Group>

                            <Button variant="success" type="submit">
                                Update
                         </Button>
                        </Form>

                        </div>
                    </Card.Body>

                </Card>

            </>
         );
    }
}

export default TeacherUpdate;
