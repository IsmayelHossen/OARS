import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { Form, Button, Card} from 'react-bootstrap';
import { StudenUpdateData } from '../Services/StudentService';
import StudentHome from './StudentHome';
class StudentUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

           // image:this.props.studentdataPass.image,
            name: this.props.studentdataPass.name,
            it: this.props.studentdataPass.it,
            session: this.props.studentdataPass.session,
            bloodg: this.props.studentdataPass.bloodg,
            email: this.props.studentdataPass.email,
            phone: this.props.studentdataPass.phone,
            faname: this.props.studentdataPass.faname,
            maname: this.props.studentdataPass.maname,
            caddress: this.props.studentdataPass.caddress,
            paddress: this.props.studentdataPass.paddress,

            validated:false,
            errors:'',


      }
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

          //  image:this.state.image,
            name:this.state.name,
            it:this.state.it,
            session:this.state.session,
            bloodg:this.state.bloodg,
            email:this.state.email,
            phone:this.state.phone,
            faname:this.state.faname,
            maname:this.state.maname,
            caddress:this.state.caddress,
            paddress:this.state.paddress,

            // user_id:1,
        };

            const response = await StudenUpdateData(this.state.email, postBody);
            if (response.success) {
                this.setState({
                    // image: "",
                    // name: "",
                    // it: "",
                    // session: "",
                    // bloodg: "",
                    // email: "",
                    // phone: "",
                    // fname: "",
                    // mname: "",
                    // caddress: "",
                    // paddress: "",

                    isLoading: false,
                });
                //alert('Update successfully');
                //  history.push('/ProjectList');
                // console.log('response',response);
                this.props.onCompleteStudentUpdate();
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

                    <Card.Body>
                        <div className="col-md-8 m-auto text-align-justify studentupdate">
                        <Card.Title style={{textAlign:"center",fontWeight:"600"}}>Update Information</Card.Title>
                            <Form  onSubmit={this.submitform}>



                            <div className="row">
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
                                <Form.Label>Id</Form.Label>
                                <Form.Control
                                                required
                                                value={this.state.it}
                                type="text" name="it" onChange={(e) => this.changeInput(e)} placeholder="Id:It-16054" />
                                            {this.state.errors && this.state.errors.it && (
                                                <p class="text-danger">{this.state.errors.it[0]}</p>
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                Please write your It.
                                      </Form.Control.Feedback>
                            </Form.Group>
                            </div>
                            </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Session</Form.Label>
                                            <Form.Control
                                                required
                                            type="text" name="session" value={this.state.session}
                                                onChange={(e) => this.changeInput(e)} placeholder=" Session 2015-16" />
                                            {this.state.errors && this.state.errors.session && (
                                                <p class="text-danger">{this.state.errors.session[0]}</p>
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                Please write your session.
                                      </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Blood Group</Form.Label>
                                            <Form.Control
                                                required
                                            type="text" name="bloodg"
                                                value={this.state.bloodg}
                                                onChange={(e) => this.changeInput(e)} placeholder="Blood Group" />
                                            {this.state.errors && this.state.errors.bloodg && (
                                                <p class="text-danger">{this.state.errors.bloodg[0]}</p>
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                Please write your session.
                                      </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" name="email" value={this.state.email}
                                                onChange={(e) => this.changeInput(e)} placeholder="Your email" readOnly />
                                        </Form.Group>
                                    </div>
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
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Father Name</Form.Label>
                                            <Form.Control
                                                required
                                                value={this.state.faname}
                                            type="text" name="faname"
                                                onChange={(e) => this.changeInput(e)}  placeholder=" Father name" />
                                            {this.state.errors && this.state.errors.faname && (
                                                <p class="text-danger">{this.state.errors.faname[0]}</p>
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                Please write your father name.
                                      </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Mother Name</Form.Label>
                                            <Form.Control
                                                required
                                            type="text" name="maname"
                                                value={this.state.maname}
                                                onChange={(e) => this.changeInput(e)} placeholder="Mother name" />
                                            {this.state.errors && this.state.errors.maname && (
                                                <p class="text-danger">{this.state.errors.maname[0]}</p>
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                Please write your mother name.
                                      </Form.Control.Feedback>
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

                            <button class="btn btn-success float-right clearfix" type="submit">
                                Update
                         </button>
                        </Form>

                        </div>
                    </Card.Body>



            </>
         );
    }
}

export default StudentUpdate;
