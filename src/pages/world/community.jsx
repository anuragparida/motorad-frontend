import React from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';

const Community = (props) => {
  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <section class="community_hero_sec">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="comminty_hero_head">
              <h3>
                Join The
                <br />
                Community
              </h3>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="comminty_hero_head">
              <p>
                Join the community and get
                <br />
                invites and updates on all EM
                <br />
                events accross the country
              </p>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="community_img">
              <img class="img-fluid" src="images/community_img.png" alt="a" />
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
          <div class="col-lg-9">
            <div class="emi_plan_head">
              <h6>
                Please Fill in the Form
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
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your Contact Number
                      </label>
                      <input class="form-control" type="text" placeholder="Enter Contact Number" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your City
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your city name" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="">
                        Frame Number
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your Frame Number" />
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
export default Community;