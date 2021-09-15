import React, { Component } from "react";
import { PUBLIC_URL } from "../CommonURL";
import { GetAllMsg,saveMsg, AllFriendData,AllFriendData2,AllFriendData3
} from "../Services/Admin/AdminServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
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
            Allfriend2: [],
            Allfriend3:[],
            searchProject:[],
            name: "",
            selectUser: false,
            image:'',
            search:'0'
        };
        this.user = window.user;
    }

    componentDidMount() {
        this.getAllfriend();
        this.getAllfriend2();
        this.getAllfriend3();

      console.log('user id',this.user.id);
 //window.Echo.channel(`messages.${this.user.id}`)
 window.Echo.private(`messages.${this.user.id}`)
    .listen('NewMessage', (e) => {
        alert(e.message.msg);
        console.log(e.message);
        this.hanleIncoming(e.message);
    });

    }
     hanleIncoming = async(message) => {
         console.log(message);
        if (this.state.friendid) {
            alert('comming from'+message.from)
            //this.setState({allMsg:message  });
            this.state.allMsg.push(message);
            return await true;
        }
    };

    getAllfriend = async () => {
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const myid = data1.user.id;
        const response = await AllFriendData(myid);
        if (response.success) {
            this.setState({ Allfriend: response.data});
        }
        console.log('all friend',this.state.Allfriend);
    };
    getAllfriend2= async () => {
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const myid = data1.user.id;
        const response = await AllFriendData2(myid);
        if (response.success) {
            this.setState({ Allfriend2: response.data, searchProject:response.data });
        }
        console.log('all friend 2',this.state.Allfriend2);
    };
    getAllfriend3= async () => {
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const myid = data1.user.id;
        const response = await AllFriendData3(myid);
        if (response.success) {
            this.setState({ Allfriend3: response.data});
        }
        console.log('all friend 3',this.state.Allfriend3);
    };
    chatConversation = async (friendId,name,image) => {
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const myid = data1.user.id;

        this.setState({
            chatStart: true,
            friendid: friendId,
            name: name,
            selectUser: true,
            image:image,
        });
        // const getLoginData = localStorage.getItem("LoginData");
        // const data1 = JSON.parse(getLoginData);
        // const myid = data1.user.id;
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
    MsgEvent =async (e) => {
        e.preventDefault();
        //  alert(this.state.msg);

        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const myid = data1.user.id;
        // if (this.state.msg.length == 0) {
        //     return;
        // }

        const postBody = {
            myid: myid,
            msg: this.state.msg,
            friendid: this.state.friendid,
            created_at: new Date()
        };
        // this.state.allMsg.push({
        //     from: myid,
        //     msg: this.state.msg,
        //     to: this.state.friendid,
        //     created_at: new Date()
        // });
        const response= await saveMsg(postBody);
        if (response.success) {
            console.log('Message Data',response);
             this.state.allMsg.push(response.data);
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
        // search functionality
        onSearch=(e)=>{
           // alert('hi')

            const search=e.target.value;
            console.log('search',search);
            this.setState({
                search:e.target.value,

                isLoading:true,
            });
            if(search.length>0){
                const searchData = this.state.searchProject.filter(function (item) {
                    const itemData = item.name + " " + item.it+" "+item.session;
                    const textData = search.trim().toLowerCase();
                    return itemData.trim().toLowerCase().indexOf(textData) !== -1;
                });
                this.setState({

                    searchProject: searchData,
                    search:search,
                    isLoading: false,
                });
            }
            else{

                //here call this method when search result length is empty

                this.getAllfriend2();

            }
        }
        //end search functionality
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
                                {  this.state.Allfriend2 !=0 && this.state.searchProject.length === 0 && (
                     <span class=" alert-warning" style={{padding:".2em .5em",
                        marginLeft:"4.5em"}}>
                        No result found!
                     </span>
                         )}
                                <form>
                                    <input type="text" placeholder="Search  using It,Name,Session" name="search" class="search" onChange={(e)=>this.onSearch(e)} />
                                </form>

                                {this.state.search==0 && (<>
                                {this.state.Allfriend.map((row, index) => (
                                    <div
                                        class="msgfriend"
                                        id={this.state.friendid==row.id ? "activeUser":"inactiveUser" }>
                                      <img
                                           src={`${PUBLIC_URL}storage/app/public/uploads/${row.image}`}
                                           />
                                 <h5 onClick={()=>this.chatConversation(row.id,row.name,row.image)}> {row.name} </h5>
                                 <span style={{color:'red'}}>T</span>
                                    </div>
                                ))}
                             </>)}

                             {this.state.search==0 && (<>
                                 {this.state.Allfriend3.map((row, index) => (
                                    <div
                                        class="msgfriend"
                                        id={this.state.friendid==row.id ? "activeUser":"inactiveUser" }>
                                      <img
                                            src={`${PUBLIC_URL}storage/app/public/uploads/${row.image}`}
                                      alt="Admin"  />
                                 <h5 onClick={()=>this.chatConversation(row.id,row.name,row.image)}> {row.name} </h5>
                                 <span style={{color:'red'}}>A</span>
                                    </div>
                                ))}
                                   </>)}
                                   {this.state.searchProject.map((row, index) => (
                                         <>
                                    <div
                                        class="msgfriend"
                                        id={this.state.friendid==row.id ? "activeUser":"inactiveUser" }>
                                      <img
                                            src={`${PUBLIC_URL}storage/app/public/uploads/${row.image}`}
                                        />
                                 <h5 onClick={()=>this.chatConversation(row.id,row.name,row.image)}> {row.name}
                                 <p style={{fontSize:'12px',marginBottom:'.1rem'}}> IT-{row.it}</p>
                                 <p style={{fontSize:'12px',marginBottom:'.1rem'}}> Session-{row.session}</p>
                               </h5>


                                    </div>


                                     </>
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
                                            src={`${PUBLIC_URL}storage/app/public/uploads/${this.state.image}`}
                                        />

                            <h6 style={{paddingTop: "10px",  paddingLeft: "10px"}}  >
                              {this.state.name}</h6>
                              </div>
                             </div>





                                            <div class="col-md-3">

                    <button  class="btn"  onClick={() =>this.VedioFun() } >
                    <i class="fa fa-video-camera"></i>  </button>
                    <button class="btn"> <i class="fa fa-phone"></i>  </button>

                                  </div>
                                        </div>
                                    </div>


                        <div class="Rightbar scroll"   ref={this.chatContainer} >
                                    <ul class="messages">
                                    {this.state.allMsg.map((row, index) => (
                                      <li class="message clearfix">
                            <div class={  row.from ==myid?"sent":"received" } >
                                 <p>{row.msg}</p>
                                 <p> {new Date(row.created_at ).toLocaleString()}</p>
                                 </div> </li>  ) )}

                                   </ul>
                                    </div>

                                    <form onSubmit={this.MsgEvent}>
                                        {this.state.errors &&
                                            this.state.errors.msg && (
                     <p  class="text-danger"   style={{ fontSize: "10px",  marginBottom: "-7px"}} >
                               {this.state.errors.msg[0]}</p>   )}

              <input type="text"name="msg"  value={this.state.msg} onChange={e =>  this.onchangeInput(e)  } />

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
