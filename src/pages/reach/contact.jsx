import React from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';

const Contact = (props) => {
  // <script>
  //       let cards = [...document.querySelectorAll(".card")];
  //       cards.forEach(card => {
  //         card.addEventListener("click", function() {
  //           cards.forEach(c => c.classList.remove("show"));
  //           this.classList.add("show")
  //         })
  //       });
  //   </script>
  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <section class="contact_map_section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="contact_map_txt">
              <h3>
                Contact Us
              </h3>
              <p>
                We're always excited to hear from our customers and form new
                <br />
                partnerships.
              </p>
              <img class="img-fluid" src="images/map_img.svg" alt="a" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <p>
       
    </p>
    <section class="emi_hero_btm_sec">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4">
            <div class="rsa_hero_btm_wrapp">
              <img class="img-fluid" src="images/chair_icon.svg" alt="a" />
              <h6>
                EMotorad Head Office
              </h6>
              <p>
                At post Jambe, taluka Mulshi, 169/2
                <br />
                Sangawade Road,
                <br />
                Pune - 411033,
                <br />
                Maharashtra
              </p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="rsa_hero_btm_wrapp">
              <img class="img-fluid" src="images/light_icon.svg" alt="a" />
              <h6>
                Em International Office
              </h6>
              <p>
                The Business Center, Al Shmookh
                <br />
                Building, UMM Al Quwain FTZ
                <br />
                UMM Al Quwain,
                <br />
                UAE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <p>
       
    </p>
    <section class="emi_plan_select_sec warrenty_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="emi_plan_head">
              <h6>
                Ask any Query
              </h6>
            </div>
            <div class="emi_plan_frm">
              <form>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your Name
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your Name" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your Email Address
                      </label>
                      <input class="form-control" type="text" placeholder="Enter Email Address" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="">
                        Your Contact Number
                      </label>
                      <input class="form-control" type="text" placeholder="Enter Contact Number" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="">
                        Message
                      </label>
                      <input class="form-control" type="text" placeholder="Your Message" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="plan_submit_btn text-center">
                      <a href="#">
                        Submit
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
    </>
  );
}
export default Contact;