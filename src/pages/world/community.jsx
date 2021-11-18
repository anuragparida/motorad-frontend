import React, {useState} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server } from "../../env";
import axios from "axios";

const Community = (props) => {

  const [sendSuccess, setSendSuccess] = useState(false);
  const [country, setCountry] = useState(true); 


  const createCommunity = async (e) => {

    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    axios
    .post(server + "/api/community/create", params)
    .then((rsp) => {
      console.log(rsp);
      setSendSuccess(true);
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
      }
    });

  }

  return(
    <>
    <Navbar setCountry={setCountry} country={country}/>
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
              Join the EMRads, connect <br /> 
              with cyclists, and get
              <br />
              invites and updates on all EM
              <br />
              events across the country
              </p>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="community_img">
              <img class="img-fluid" src="images/community.jpg" alt="a" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <p>
       
    </p>
    {
      sendSuccess ? 
      <section class="order_success_sec">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7">
              <div class="order_placed_wrap">
                <img src="images/big_check.svg" alt="a" class="img-fluid" />
                <h3>
                  Your response has<br />
                  been sent successfully.
                </h3>
                {/* <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  id ullamcorper sem. Phasellus vitae dui erat. Donec ligula erat,
                  venenatis vitae molestie vel, dapibus nec libero.
                </p> */}
                <div class="ordr_placed_btnns">
                  <a href="/">Go to HomePage</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    :
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
              <form onSubmit={createCommunity}>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your Name
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your Name" name="name" required/>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your Email Address
                      </label>
                      <input class="form-control" type="email" placeholder="Enter Email Address" name="email" required/>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your Contact Number
                      </label>
                      <input class="form-control" type="number" placeholder="Enter Contact Number" name="contact" required/>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your City
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your city name" name="city" required/>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="">
                        Frame Number
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your Frame Number" name="frameNumber" required/>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="plan_submit_btn text-center">
                      {/* <a href="#">
                        Submit
                      </a> */}
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    }
    

    <Footer/>
    </>
  );
}
export default Community;