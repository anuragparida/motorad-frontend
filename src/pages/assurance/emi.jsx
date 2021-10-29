import React, {useState, useEffect, useRef} from "react";
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

  const [sendSuccess, setSendSuccess] = useState(false);
  const [bike, setBike] = useState('emx');
  const [emi, setEmi] = useState([]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const sendEMI = async (e) => {

    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    axios
    .post(server + "/api/emi/contact/create", params)
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

  const setEMI = async () => {
    axios
    .get(server + "/api/emi/read")
    .then((rsp) => {
      console.log(rsp);
      setEmi(rsp.data.payload);
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
      }
    });
  }

  useEffect(()=>{
    setEMI();
  }, [])

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
                <a href="#" data-toggle="modal" data-target="#exampleModalLong">
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
    <section class="emi_partner_section" ref={formRef}>
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
    {
      ! sendSuccess ?
      <section class="emi_plan_select_sec">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="emi_plan_head">
              <h6>
                Please Select A Bike For EMI Plans
              </h6>
            </div>
            <div class="emi_plan_frm">
              <form onSubmit={sendEMI}>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your First Name
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your First Name" name="firstName" required />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your Last Name
                      </label>
                      <input class="form-control" type="text" placeholder="Enter your Last Name" name="lastName" required />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your Contact Number
                      </label>
                      <input class="form-control" type="number" placeholder="Enter Contact Number" name="contact" required />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Your Email Address
                      </label>
                      <input class="form-control" type="email" placeholder="Enter your email" name="email" required />
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
                        <div class="select_product_wrap" onClick={()=>{setBike("trex")}}>
                          <img class="img-fluid" src="images/cycle_warenty.png" alt="a" />
                          <span class={bike==="trex"?"actt":""}>
                            T-REX
                          </span>
                        </div>
                      </div>
                      <div class="col-lg-4 mt-2">
                        <div class="select_product_wrap" onClick={()=>{setBike("emx")}}>
                          <img class="img-fluid" src="images/bicycle_3.png" alt="a" />
                          <span class={bike==="emx"?"actt":""}>
                            EMX
                          </span>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="select_product_wrap" onClick={()=>{setBike("doodle")}}>
                          <img class="img-fluid" src="images/bicycle_2.png" alt="a" />
                          <span class={bike==="doodle"?"actt":""}>
                            DOODLE
                          </span>
                        </div>
                      </div>
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
      :
      <section class="warrenty_succes_section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="warenty_succes_wrap">
                        <img src="images/chec_big-cir.svg" alt="a" class="img-fluid"/>
                        <h5>Your Response has been <br/> submitted Successfully</h5>
                    </div>
                    <div class="warenty_suc_btn">
                        <a href="index.html">Go to HomePage</a>
                    </div>
                </div>
            </div>
        </div>
      </section>
    }

<section class="modal_section">
      <div id="exampleModalLong" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="accnt_setting_modal">
                <a href="#" data-dismiss="modal">
                  <img class="img-fluid" src="images/close_icon.svg" alt="x" />
                </a>
                <div class="accnt_modal_head">
                  <h5>
                    EMI Partners
                  </h5>
                  <h5 style={{"color": "#10b068"}}>
                    
                  </h5>
                </div>
                <div class="emi_plan_frm accnt_modal_plan rsa_modal_txt">
                  <table class="table table-striped table-hover">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">Partner Bank</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        emi.map(el => (
                          <tr>
                            <td>{el.partner}</td>
                            <td>{el.rate}</td>
                            <td>{el.duration}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
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