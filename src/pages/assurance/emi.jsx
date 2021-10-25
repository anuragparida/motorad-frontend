import React, {useRef} from "react";
import Footer from "../../components/Footer";
import MobileNavbar from "../../components/MobileNavbar";
import Navbar from "../../components/Navbar";
import { server } from "../../env";
import axios from "axios";

const EMI = (props) => {
  {/*
  <script>
        $(document).ready(function(){
          $('.select_product_wrap span').click(function(){
            $('.select_product_wrap span').removeClass("actt");
            $(this).addClass("actt");
         });
            
        });
    </script>
    FIX LATER
  */}

  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const sendEMI = async (e) => {

    //UPDATE

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
                EMI
              </h6>
              <h2>
                EM's Insured
                <br />
                EMI Partner
              </h2>
              <p>
                Its about more than just a firm handshake. Its
                <br />
                about commiting to a cleaner envisonment.
              </p>
              <div class="hero_btn">
                <a href="javascript:void(0)" onClick={scrollToForm}>
                  Get Started
                </a>
                <a href="#">
                  Our EMI Partners
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="emi_hero_img">
              <img class="img-fluid" src="images/emi-hero.png" alt="a" />
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
          <div class="col-lg-11">
            <div class="row">
              <div class="col-lg-3 col-6">
                <div class="emi_hero_btm_wrapp">
                  <img class="img-fluid" src="images/check_medium.svg" alt="a" />
                  <p>
                    Instant approval
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="emi_hero_btm_wrapp">
                  <img class="img-fluid" src="images/care_icon.svg" alt="a" />
                  <p>
                    Easy Process
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="emi_hero_btm_wrapp">
                  <img class="img-fluid" src="images/green_leaf_ic.svg" alt="a" />
                  <p>
                    Budget Friendly
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="emi_hero_btm_wrapp">
                  <img class="img-fluid" src="images/lock_icon.svg" alt="a" />
                  <p>
                    No hidden fees
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <p>
       
    </p>
    <section class="emi_partner_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-11">
            <div class="row">
              <div class="col-12">
                <div class="emi_partner_head">
                  <h6>
                    Our EMI Partners
                  </h6>
                  <div class="emi_partners_all">
                    <a href="#">
                      <img class="img-fluid" src="images/loantap_logo.svg" alt="a" />
                    </a>
                    <a href="#">
                      <img class="img-fluid" src="images/capital_logo.svg" alt="a" />
                    </a>
                    <a href="#">
                      <img class="img-fluid" src="images/bajaj_pusar.svg" alt="a" />
                    </a>
                    <a href="#">
                      <img class="img-fluid" src="images/early_logo.png" alt="a" />
                    </a>
                    <a href="#">
                      <img class="img-fluid" src="images/zest_logo.png" alt="a" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <p>
       
    </p>
    <section class="emi_plan_select_sec" ref={formRef}>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="emi_plan_head">
              <h6>
                Please Select A Bike For EMI Plans
              </h6>
            </div>
            <div class="emi_plan_frm">
              <form >
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your First Name
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your First Name" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your Last Name
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your First Name" />
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
                        Your Email Address
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your email" />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="slect_plan_btn">
                      <h6>
                        Select Product
                      </h6>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="select_product_wrap">
                          <img class="img-fluid" src="images/cycle_warenty.png" alt="a" />
                          T-REX
                        </div>
                      </div>
                      <div class="col-lg-4 mt-2">
                        <div class="select_product_wrap">
                          <img class="img-fluid" src="images/bicycle_3.png" alt="a" />
                          <span class="actt">
                            EMX
                          </span>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="select_product_wrap">
                          <img class="img-fluid" src="images/bicycle_2.png" alt="a" />
                          DOODLE
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="plan_submit_btn">
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
export default EMI;