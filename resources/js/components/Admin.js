import React from 'react';
import ReactDOM from 'react-dom';

import ContactUs from './frontend/ContactUs';
class Admin extends React.Component {
    constructor(props){
        super(props);
            this.state={
              user12:"",
                isLoggedIn:false,
                getUserData:{},
                userData1:{},

            }

    }


    render(){

        return (
            <>
             <div class="containerCustom">
            <div class="topMargin takenclasss">
            <h2 style={{marginTop:'70px'}}>index2</h2>
             <h2 style={{marginTop:'70px'}}>index2</h2>
             <h2 style={{marginTop:'70px'}}>index2</h2>
                <ContactUs/>

             </div>
             </div>
             </>

        );
    }

}

export default Admin;

if (document.getElementById('adminId')) {
    ReactDOM.render(<Admin />, document.getElementById('adminId'));
}
