import React from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server } from "../../env";
import axios from "axios";

const Partner = (props) => {
  // <script>
  //       let cards = [...document.querySelectorAll(".card")];
  //       cards.forEach(card => {
  //         card.addEventListener("click", function() {
  //           cards.forEach(c => c.classList.remove("show"));
  //           this.classList.add("show")
  //         })
  //       });
  //   </script>

  const createPartner = async (e) => {

    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    params.isDealer = params.isDealer === "true" ? true : false;

    axios
    .post(server + "/api/partner/create", params)
    .then((rsp) => {
      console.log(rsp);
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
      }
    });

  }

  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <section class="emi_hero_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="emi_hero_txt">
              <h6>
                PARTNER WITH US
              </h6>
              <h2 style={{"font-size": "60px", "line-height": "68px"}}>
                Selling Best In
                <br />
                Class Electric
                <br />
                Cycles
              </h2>
              <p>
                Its about more than just a firm handshake. Its
                <br />
                about commiting to a cleaner envisonment.
              </p>
              <div class="hero_btn">
                <a href="#">
                  Get Started
                </a>
                <a href="#">
                  Learn About Us
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="emi_hero_img">
              <img class="img-fluid" src="images/insuarence_hero.png" alt="a" />
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
          <div class="col-lg-3 col-6">
            <div class="rsa_hero_btm_wrapp">
              <img class="img-fluid" src="images/rupi_icon.svg" alt="a" />
              <p>
                Great return on
                <br />
                Investment
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="rsa_hero_btm_wrapp">
              <img class="img-fluid" src="images/hand_heart.svg" alt="a" />
              <p>
                Complete training
                <br />
                to all employees
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="rsa_hero_btm_wrapp">
              <img class="img-fluid" src="images/bag_icon.svg" alt="a" />
              <p>
                Become a part of the
                <br />
                online sales channel
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
                Please Select A Bike For EMI Plans
              </h6>
            </div>
            <div class="emi_plan_frm">
              <form onSubmit={createPartner}>
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
                      <input class="form-control" type="text" placeholder="Enter your email" name="email" required/>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Contact Number
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your Contact" name="contact" required/>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Are you already a dealer?
                      </label>
                      <select name="isDealer" class="form-control" defaultValue={true}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                      {/* <input class="form-control" type="checkbox" placeholder="Yes/No" name="name" required/> */}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your City
                      </label>
                      <input class="form-control" type="text" placeholder="Enter City Name" name="city" required/>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your Address
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your Address" name="address" required/>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="plan_submit_btn">
                      <button type="submit">
                        Submit
                      </button>
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
export default Partner;