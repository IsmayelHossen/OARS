import React, { Component } from "react";
import { PUBLIC_URL } from "../CommonURL";
import {
    GetAllMsg,
    saveMsg,
    AllFriendData
} from "../Services/Admin/AdminServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
import Echo from "laravel-echo";
class Message extends Component {
    chatContainer = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            chatStart: false,
            allMsg: [],
            msg: "",
            Submitbutton: false,
            friendid: "",
            errors: "",
            date1: new Date().toLocaleString(),
            Allfriend: [],
            name: "",
            selectUser: false
        };
        this.user = window.user;
    }

    componentDidMount() {
        this.getAllfriend();
        // this.PushMessage();
        // window.Echo.private(`message.${this.state.friendid}`)
        // .listen(`messages.${this.state.friendid}`, (e)=>{console.log(e)});
        //     console.log('msg',this.state.msg);
        window.Echo.private(`messages.${this.state.friendid}`).listen(
            "NewMessage",
            e => {
                console.log(e);

                alert(e);
                this.handleIncoming(e);
            }
        );
    }
    handleIncoming = message => {
        //  console.log(message);
        if (this.state.friendid) {
            this.state.allMsg.push(message);
        }
    };

    getAllfriend = async () => {
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const myid = data1.user.id;
        const response = await AllFriendData(myid);
        if (response.success) {
            this.setState({ Allfriend: response.data });
        }
    };
    chatConversation = async friendId => {
        this.setState({
            chatStart: true,
            friendid: friendId,
            name: name,
            selectUser: true
        });
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const myid = data1.user.id;
        const response = await GetAllMsg(friendId, myid);
        if (response.success) {
            this.setState({ allMsg: response.data }, this.scrollToMyRef());
        }
    };
    //  scrollToMyRef1=()=>{
    //     this.chatContainer.current.scrollIntoView({ behavior: "smooth" })
    //  }
    onchangeInput = e => {
        this.setState({
            msg: e.target.value,
            Submitbutton: !this.state.Submitbutton
        });
    };
    MsgEvent = async e => {
        e.preventDefault();
        //  alert(this.state.msg);

        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const myid = data1.user.id;
        if (this.state.msg.length == 0) {
            return;
        }

        const postBody = {
            myid: myid,
            msg: this.state.msg,
            friendid: this.state.friendid,
            created_at: new Date()
        };
        this.state.allMsg.push({
            from: myid,
            msg: this.state.msg,
            to: this.state.friendid,
            created_at: new Date()
        });
        const response = await saveMsg(postBody);
        if (response.success) {
            this.setState({ msg: "", errors: "" }, () => this.scrollToMyRef());
        } else {
            this.setState({ errors: response.errors });
        }
    };
    scrollToMyRef = () => {
        setTimeout(() => {
            this.chatContainer.current.scrollTop =
                this.chatContainer.current.scrollHeight -
                this.chatContainer.current.clientHeight;
        }, 50);

        // this.chatContainer.current.scrollTo(0, scroll);
        // this.chatContainer.current.scrollIntoView({ behavior: "smooth" })
    };
    //  _onScroll = () => {
    // 	// not scrolled to the bottom
    // 	if (( this.myRef.current.scrollHeight - this.myRef.current.clientHeight ) > this.myRef.current.scrollTop) {
    // 			 //Not to the end
    // 	} else {
    // 		 //At the bottom
    // 		this.chatConversation(this.state.friendid);
    // 	}
    // };
    VedioFun = () => {
        const { history } = this.props;
        history.push(`${PUBLIC_URL}vedio`);
    };
    render() {
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const myid = data1.user.id;
        return (
            <>
                <ToastContainer />
                <div class="topMargin">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="messageSidebar">
                                <h3>Chat</h3>
                                <form>
                                    <input type="text" placeholder="Search" />
                                </form>
                                {this.state.Allfriend.map((row, index) => (
                                    <div
                                        class="msgfriend"
                                        id={
                                            this.state.friendid == row.id
                                                ? "activeUser"
                                                : "inactiveUser"
                                        }
                                    >
                                        <img
                                            src={`${PUBLIC_URL}storage/app/public/uploads/mbstu2.png`}
                                        />
                                        <h5
                                            onClick={() =>
                                                this.chatConversation(row.id)
                                            }
                                        >
                                            {row.name}
                                        </h5>
                                        <span>12</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div class="col-md-8">
                            {this.state.chatStart == true && (
                                <div class="messageRightbar">
                                    <div class="head">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <div class="subhead">
                                                    <img
                                                        src={`${PUBLIC_URL}storage/app/public/uploads/mbstu2.png`}
                                                    />
                                                    <h6
                                                        style={{
                                                            paddingTop: "10px",
                                                            paddingLeft: "10px"
                                                        }}
                                                    >
                                                        {this.state.name}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <button
                                                    class="btn"
                                                    onClick={() =>
                                                        this.VedioFun()
                                                    }
                                                >
                                                    <i class="fa fa-video-camera"></i>
                                                </button>
                                                <button class="btn">
                                                    <i class="fa fa-phone"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="Rightbar scroll"
                                        ref={this.chatContainer}
                                    >
                                        <ul class="messages">
                                            {this.state.allMsg.map(
                                                (row, index) => (
                                                    <li class="message clearfix">
                                                        <div
                                                            class={
                                                                row.from == myid
                                                                    ? "sent"
                                                                    : "received"
                                                            }
                                                        >
                                                            <p>{row.msg}</p>
                                                            <p>
                                                                {new Date(
                                                                    row.created_at
                                                                ).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    <form onSubmit={this.MsgEvent}>
                                        {this.state.errors &&
                                            this.state.errors.msg && (
                                                <p
                                                    class="text-danger"
                                                    style={{
                                                        fontSize: "10px",
                                                        marginBottom: "-7px"
                                                    }}
                                                >
                                                    {this.state.errors.msg[0]}
                                                </p>
                                            )}
                                        <input
                                            type="text"
                                            name="msg"
                                            value={this.state.msg}
                                            onChange={e =>
                                                this.onchangeInput(e)
                                            }
                                        />
                                        {/* {this.state.msg.length !=0 && this.state.Submitbutton &&(
                        <input type="submit" value="send"/>
                        )} */}
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Message);
