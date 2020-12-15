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
                    <h3>@copy 2020.All right reserved by depertment of ICT</h3>
                    <div class="row">

                        <div class="col-md-12">


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
