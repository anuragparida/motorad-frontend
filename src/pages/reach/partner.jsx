import React, {useState, useRef} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server } from "../../env";
import axios from "axios";
import { Link } from 'react-router-dom';

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

  const formRef = useRef(null);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [country, setCountry] = useState(true); 


  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

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
    <section class="emi_hero_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="emi_hero_txt">
              <h6>
                PARTNER WITH US
              </h6>
              <h2 style={{"font-size": "60px", "line-height": "68px"}}>
                Selling Best-In-Class
                <br />
                Electric Cycles
              </h2>
              <p>
              Want to join the electric revolution?<br /> From Business Opportunities to <br /> Dealership inquiries, this is the place for you.
              
              </p>
              <div class="hero_btn">
                <a href="javascript:void(0)" onClick={scrollToForm}>Get Started</a>
                <Link to="/about">
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="emi_hero_img">
              <img class="img-fluid" src="images/anim2.gif" alt="a" />
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
      <section class="emi_plan_select_sec warrenty_section" ref={formRef}>
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
    }
    

    <Footer setCountry={setCountry} country={country}/>
    </>
  );
}
export default Partner;