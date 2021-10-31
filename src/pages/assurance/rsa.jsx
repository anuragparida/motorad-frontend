import React, {useState, useEffect} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server } from "../../env";
import axios from "axios";

const RSA = (props) => {
  // <script>
  //       let cards = [...document.querySelectorAll(".card")];
  //       cards.forEach(card => {
  //         card.addEventListener("click", function() {
  //           cards.forEach(c => c.classList.remove("show"));
  //           this.classList.add("show")
  //         })
  //       });
  //   </script>

  const [rsaFaq, setRsaFaq] = useState([]);

  const loadFAQ = async () => {
    await axios
    .get(server + "/api/faq/read")
    .then((rsp) => {
      console.log(rsp);
      setRsaFaq(rsp.data.payload.filter(el => el.type==="rsa"));
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
      }
    });
  }

  useEffect(()=>{
    loadFAQ();
  }, []);

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
                RSA
              </h6>
              <h2>
                EM Roadside
                <br />
                Assistance
              </h2>
              <p>
                EMotorad and GlobalAssure jointly bring you EM
                <br />
                Protection Plan.
              </p>
              <div class="hero_btn rsa_hero_btn">
                <a href="#" data-toggle="modal" data-target="#exampleModalLong">
                  Get Now
                </a>
                <a href="#">
                  <img class="img-fluid" src="images/download_w_icon.svg" alt="a" />
                  RSA Document
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="emi_hero_img">
              <img class="img-fluid" src="images/rsa_hero.png" alt="a" />
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
              <div class="col-12">
                <div class="rsa_hero_btm_head">
                  <h5>
                    Why you should get EM Roadside Assistance ?
                  </h5>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/small_bike.svg" alt="a" />
                  <h6>
                    RANGE
                  </h6>
                  <p>
                    PAN India
                    <br />
                    Coverage
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/call_icon.svg" alt="a" />
                  <h6>
                    SUPPORT
                  </h6>
                  <p>
                    Breakdown Support Over
                    <br />
                    Phone
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/energy_icon.svg" alt="a" />
                  <h6>
                    BATTERY
                  </h6>
                  <p>
                    Battery
                    <br />
                    Swapping*
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/truck_icon.svg" alt="a" />
                  <h6>
                    TOWING
                  </h6>
                  <p>
                    Towing Service Up To
                    <br />
                    25 Km
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/headphn_icon.svg" alt="a" />
                  <h6>
                    CONTACT
                  </h6>
                  <p>
                    Message Relay To
                    <br />
                    Emergency Contact
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/info_icon.svg" alt="a" />
                  <h6>
                    ACCOMODATION
                  </h6>
                  <p>
                    Hotel Accommodation
                    <br />
                    Assistance
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/gps_icon.svg" alt="a" />
                  <h6>
                    EMERGENCY
                  </h6>
                  <p>
                    Ambulance
                    <br />
                    Assistance
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/setting_icon.svg" alt="a" />
                  <h6>
                    REPAIRS
                  </h6>
                  <p>
                    On-Site
                    <br />
                    Minor Repair
                  </p>
                </div>
              </div>
              <div class="col-12">
                <div class="ras_hero_btm_btn">
                  <a href="#" data-toggle="modal" data-target="#exampleModalLong">
                    Buy RSA
                    <img class="img-fluid" src="images/arrw_w_rgt.svg" alt="a" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <p>
       
    </p>
    <section class="faq_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="rsa_hero_btm_head mb-5">
              <h5>
                Frequently Asked Questions about EM Roadside Assitance
              </h5>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="faq_txt_wrap">
              <div class="bs-example">
                <div id="accordionExample" class="accordion">
                  {
                    rsaFaq.map(f => {
                      return(
                        <div class="card">
                          <div id={"heading" + f.id} class="card-header">
                            <h2 class="mb-0">
                              <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse" + f.id}>
                                {f.question}
                              </button>
                            </h2>
                          </div>
                          <div id={"collapse" + f.id} class="collapse" data-parent="#accordionExample">
                            <div class="card-body">
                              <p>
                                {f.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
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
                    Buy RSA
                  </h5>
                  <h5 style={{"color": "#10b068"}}>
                    Rs. 999
                  </h5>
                </div>
                <div class="emi_plan_frm accnt_modal_plan rsa_modal_txt">
                  <form>
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
                            Select State
                          </label>
                          <input class="form-control" type="text" placeholder="Select your state" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Your City
                          </label>
                          <input class="form-control" type="text" placeholder="Select your city" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Pincode
                          </label>
                          <input class="form-control" type="text" placeholder="Enter your pincode" />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="">
                            Your Address
                          </label>
                          <textarea id="" class="form-control" style={{"min-height": "80px"}} cols="30" name="" rows="10" placeholder="Enter your address">
                          </textarea>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Your Email
                          </label>
                          <input class="form-control" type="text" placeholder="Enter your email" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Your Contact
                          </label>
                          <input class="form-control" type="text" placeholder="Enter your contact" />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="accnt_submit_modal">
                          <button class="btn btn_submit" type="submit" data-toggle="modal" data-target="#exampleModal" data-dismiss="modal">
                            Next
                            <img class="img-fluid" src="images/arrw_w_rgt.svg" alt="a" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <p>
       
    </p>
    <section class="modal_section">
      <div id="exampleModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="accnt_setting_modal">
                <a href="#" data-dismiss="modal">
                  <img class="img-fluid" src="images/close_icon.svg" alt="x" />
                </a>
                <div class="accnt_modal_head">
                  <h5>
                    Buy RSA
                  </h5>
                  <h5 style={{"color": "#10b068"}}>
                    Rs. 999
                  </h5>
                </div>
                <div class="emi_plan_frm accnt_modal_plan rsa_modal_txt">
                  <form>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Make of the cycle
                          </label>
                          <input class="form-control" type="text" placeholder="Enter make of your cycle" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Select a Bike
                          </label>
                          <input class="form-control" type="text" placeholder="Select a bike" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Frame Number
                          </label>
                          <input class="form-control" type="text" placeholder="Select your city" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Select Cycle Color
                          </label>
                          <input class="form-control" type="text" placeholder="Select Color" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Invoice Number
                          </label>
                          <input class="form-control" type="text" placeholder="Enter Invoice number" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Invoice Date
                          </label>
                          <input class="form-control" type="text" placeholder="27-09-2021" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="rsa_modal_upload">
                          <label class="upload-area">
                            <input type="file" />
                            <span class="upload-button">
                              <img class="img-fluid" src="images/upload_plus.svg" alt="a" />
                            </span>
                          </label>
                          <p>
                            Upload your Invoice
                          </p>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="accnt_submit_modal text-right">
                          <button class="btn btn_submit" type="submit">
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
        </div>
      </div>
    </section>

    </>
  );
}
export default RSA;