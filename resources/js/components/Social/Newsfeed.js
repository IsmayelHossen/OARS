import React from 'react'
import { PUBLIC_URL } from '../CommonURL';
import { AllPostRetrive,saveMsg ,AllFriendData} from '../Services/SocialServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import Echo from 'laravel-echo';
export default class Newsfeed extends React.Component {
    state={
        comment:'',
        errors:'',
        AllPost:[],
    }
    componentDidMount() {
        this.GetAllPost();
    }
    GetAllPost=async()=>{
        const response = await AllPostRetrive();
        if(response.success){
             this.setState({ AllPost:response.data  });
             console.log('allpost',this.state.AllPost)

    }
    console.log('allpost',this.state.AllPost)
}
    render() {
        return (
            <div>
  <ToastContainer/>
            <div class="containerCustom">
                 <div class="topMargin">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-offset-4 ">
                    {this.state.AllPost.map((row,index)=>(
                          <>
                      <div class="postMain">


                          {/* first part */}
                          <div class="row postSubmain">
                              <div class="headingImg">
                              <img   src={`${PUBLIC_URL}storage/app/public/uploads/${row.creatorimg}`} class="" alt="Image"/>
                              </div>
                              <div class="headingName">
                                 <h4>{row.creatorname}</h4>
                                 <span>{row.date1}</span>
                                  </div>
                                  <div class="headingShare">
                                  <h5>............</h5>
                                  </div>
                          </div>
                              {/* first part end */}


                                  {/* 2nd  part */}
                                  <div class="row">
                                      <div class="col-md-12">
                                      {!row.image &&(
                                          <div class="postText">
                                          <p>
                                          {row.text}
                                          </p>
                                          </div>
                                      )}
                                          {row.image &&(


                                          <div class="postTextWithImage">
                                          <p>
                                          {row.text}
                                          </p>
                                          <img   src={`${PUBLIC_URL}storage/app/public/uploads/post/${row.image}`} style={{width:'100%'}} class="" alt="Image"/>
                                          </div>
                                            )}


                                      </div>
                                  </div>


                                      {/* 2nd  part end */}
                                         {/* 3rd  part start*/}
                                         <div class="row Main3rdPart">
                                             <div class="col">
                                             <i class="fa fa-thumbs-up"></i>  <span>Like</span>
                                                 <span>50</span>
                                             </div>
                                             <div class="col">
                                             <i class="fa fa-thumbs-down"></i> <span>Dislike</span>
                                                 <span>50</span>
                                             </div>
                                             <div class="col">
                                                 <span>Comment</span>
                                                 <span>60</span>
                                             </div>
                                         </div>
                                          {/* 3rd  part end*/}
                                             {/* 4th  part start*/}
                                             <div  class="row Main4thPart">
                                                 <div class="col-md-12">

                                             <form >
  <div >
  <div class="mb-3 mt-2">
            <textarea class="form-control" id="exampleFormControlTextarea1" name="text" rows="2" value={this.state.comment} onChange={(e) => this.changeInput(e)} placeholder="Write Comment">

            </textarea>
            {this.state.errors && this.state.errors.comment && (
                <p class="text-danger">{this.state.errors.comment[0]}</p>
            )}
        </div>
  </div>

</form>
</div>

                                             </div>

                                                 {/* 4th  part end*/}
                                                    {/* 5th  part start*/}
                                                      <div class="row Main5thPart">
                                                        <div class="col-md-12 eachcomment">

                                                         <div class="commentImg">
                                                        <img  style={{maxWidth:'60px'}} src={`${PUBLIC_URL}storage/app/public/uploads/post/5fe3b193e14a9.JPG`} class="" alt="Image"/>
                                                        </div>
                                                        <div class="commentName">
                                                            <h6>Abir hossain</h6>
                                                        </div>

                                                            <p> that can be accessed (and autocompleted) from within an
                                                             These are similar to elements, but come with more menu styling limitations and differences.
                                                                 While
                                                                 </p>

                                                    </div>
                                                    <div class="col-md-12 eachcomment">

<div class="commentImg">
<img  style={{maxWidth:'60px'}} src={`${PUBLIC_URL}storage/app/public/uploads/post/5fe3b193e14a9.JPG`} class="" alt="Image"/>
</div>
<div class="commentName">
   <h6>Abir hossain</h6>
</div>

   <p> that can be accessed (and autocompleted) from within an
    These are similar to elements, but come with more menu styling limitations and differences.
        While
        </p>

</div>




                                                   </div>

                                                       {/* 5th  part end*/}

                      </div>
                      </>
                      ))}

                    </div>
                </div>
                 </div>
                 </div>
            </div>
        )
    }
}
