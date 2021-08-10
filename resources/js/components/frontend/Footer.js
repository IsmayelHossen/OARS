import React from 'react';
import Scroll from 'react-scroll';
var Link1 = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;
const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.scrollToTop = this.scrollToTop.bind(this);
    }
    componentDidMount() {
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
          });

          Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
          });

        scrollSpy.update();
    }
    scrollToTop() {
        scroll.scrollToTop({
           duration:2500,
           delay: 0,
           smooth: 'easeInOutQuart'
        });

     }
    render() {
        return (
            <div>

                <div>

                <div class="footer1">
                <div class="copyright">
        © Copyright <strong>DEPT. Of ICT,MBSTU 2021</strong>. All Rights Reserved
      </div>
                    <div class="row">

                        <div class="col-md-12" >
                        <p>Change Language <span id="google_translate_element"></span></p>

                        </div>
                    </div>
                </div>

                <a  onClick={this.scrollToTop} href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>
  <div id="preloader"></div>
            </div>

            </div>

          );
    }
}

export default Footer;
