import React, {useState, useEffect} from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import MobileNavbar from './../../components/MobileNavbar';
import { formDataConfig, server } from "../../env";
import axios from "axios";

const Insurance = (props) => {
  // <script>
  //       let cards = [...document.querySelectorAll(".card")];
  //       cards.forEach(card => {
  //         card.addEventListener("click", function() {
  //           cards.forEach(c => c.classList.remove("show"));
  //           this.classList.add("show")
  //         })
  //       });
  //   </script>

  const [insFaq, setInsFaq] = useState([]);
  const [partOne, setPartOne] = useState({});

  const loadFAQ = async () => {
    await axios
    .get(server + "/api/faq/read")
    .then((rsp) => {
      console.log(rsp);
      setInsFaq(rsp.data.payload.filter(el => el.type==="insurance"));
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

  const savePartOne = (e) => {
    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    setPartOne(params);
    window.showSecondForm();
  }

  const sendInsurance = async(e) => {
    e.preventDefault();

    var params2 = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    let params = {...partOne, ...params2}

    params.type = "insurance"

    delete params.invoice;

    console.log(params);

    let formData = new FormData();
  
    for (const [key, value] of Object.entries(params)) {
      formData.append(key, value);
    }

    formData.append("invoice", e.target.elements.invoice.files[0]);

    axios
    .post(server + "/api/rsa/create", formData, formDataConfig)
    .then((rsp) => {
      console.log(rsp);
      window.location.reload();
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
                INSURANCE
              </h6>
              <h2>
                EM Insurance
                <br />
                Protection
              </h2>
              <p>
                EMotorad and GlobalAssure jointly bring you a
                <br />
                comprehensive eBike insurance policy.
              </p>
              <div class="hero_btn rsa_hero_btn">
                <a href="#" data-toggle="modal" data-target="#exampleModalLong">
                  Get Now
                </a>
                <a href="#">
                  <img class="img-fluid" src="images/download_w_icon.svg" alt="a" />
                  Insurance Document
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block">
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
          <div class="col-lg-11">
            <div class="row">
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/headphn_icon.svg" alt="a" />
                  <p>
                    Support whenever
                    <br />
                    you need it
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/calendar_icon.svg" alt="a" />
                  <p>
                    Avail within 30
                    <br />
                    days of Purchase
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/leaf_icon.svg" alt="a" />
                  <p>
                    PAN India
                    <br />
                    Coverage
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/note_icon.svg" alt="a" />
                  <p>
                    Multiple Payment
                    <br />
                    methods
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
    <section class="insuarence_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-9">
            <div class="insuarence_txt_wrap">
              <h6>
                We Want You To Remember Your Ride, Not Your Bills!
              </h6>
              <p>
                That’s why EMotorad and GlobalAssure jointly bring you the comprehensive eBike insurance policy. Our goal is for you to cycle without you being preoccupied with fears or worries. Our Protection Plan is tailored so that cyclists can enjoy their rides while enjoying an extensive list of benefits. Enjoy health assistance, theft protection and roadside assistance, all while being easy on the pocket.
              </p>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-11">
            <div class="row">
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/energy_icon.svg" alt="a" />
                  <h6>
                    SUPPORT
                  </h6>
                  <p>
                    24x7 Phone
                    <br />
                    Support
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/wheel_chair.svg" alt="a" />
                  <h6>
                    MEDICAL
                  </h6>
                  <p>
                    Doctor
                    <br />
                    Consultation
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/message_icon.svg" alt="a" />
                  <h6>
                    MESSAGE
                  </h6>
                  <p>
                    Emergency Message
                    <br />
                    Relay
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/car_icon.svg" alt="a" />
                  <h6>
                    POLICE
                  </h6>
                  <p>
                    Locating Nearest Police
                    <br />
                    Station
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/call_icon.svg" alt="a" />
                  <h6>
                    CONTACT
                  </h6>
                  <p>
                    Ambulance
                    <br />
                    Referral
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/vut_icon.svg" alt="a" />
                  <h6>
                    THEFT
                  </h6>
                  <p>
                    Complimentary Cycle
                    <br />
                    Theft Insurance*
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/fire_icon.svg" alt="a" />
                  <h6>
                    FIRE
                  </h6>
                  <p>
                    Complimentary Cycle Damage From Fire*
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="rsa_hero_btm_wrapp">
                  <img class="img-fluid" src="images/circle_dot_ic.svg" alt="a" />
                  <h6>
                    LIFE
                  </h6>
                  <p style={{"font-size": "10px", "line-height": "16px"}}>
                    Complimentary Permanent Disability/ Accident Death Insurance Rs. 2,00,000*
                  </p>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="insuarence_btttns">
                  <a href="#">
                    Get Now
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
                    insFaq.map(f => {
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
                  <form onSubmit={savePartOne}>
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
                            Enter State
                          </label>
                          <input class="form-control" type="text" placeholder="Enter your state" name="state" required/>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Your City
                          </label>
                          <input class="form-control" type="text" placeholder="Enter your city" name="city" required/>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Pincode
                          </label>
                          <input class="form-control" type="number" placeholder="Enter your pincode" name="pincode" required/>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="">
                            Your Address
                          </label>
                          <textarea class="form-control" style={{"min-height": "80px"}} cols="30" name="address" rows="10" placeholder="Enter your address" required>
                          </textarea>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Your Email
                          </label>
                          <input class="form-control" type="email" placeholder="Enter your email" name="email" required/>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Your Contact
                          </label>
                          <input class="form-control" type="number" placeholder="Enter your contact" name="contact" required/>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="accnt_submit_modal">
                          {/* <button class="btn btn_submit" type="submit" data-toggle="modal" data-target="#exampleModal" data-dismiss="modal"> */}
                          <button class="btn btn_submit" type="submit">
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
                    Buy Insurance
                  </h5>
                  <h5 style={{"color": "#10b068"}}>
                    Rs. 999
                  </h5>
                </div>
                <div class="emi_plan_frm accnt_modal_plan rsa_modal_txt">
                  <form onSubmit={sendInsurance}>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Make of the cycle
                          </label>
                          <input class="form-control" type="text" placeholder="Enter make of your cycle" name="makeCycle" required/>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Select a Bike
                          </label>
                          <select name="bike" class="form-control" defaultValue="TREX" required>
                            <option value="TREX">TREX</option>
                            <option value="EMX">EMX</option>
                            <option value="DOODLE">DOODLE</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Frame Number
                          </label>
                          <input class="form-control" type="text" placeholder="Enter Frame Number" name="frameNumber" required/>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Select Cycle Color
                          </label>
                          <input class="form-control" type="text" placeholder="Select Color" name="color" required/>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Invoice Number
                          </label>
                          <input class="form-control" type="text" placeholder="Enter Invoice number" name="invoiceNumber" required/>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Invoice Date
                          </label>
                          <input class="form-control" type="date" name="invoiceDate" required/>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="rsa_modal_upload">
                          <label class="upload-area">
                            <input type="file" name="invoice" required/>
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
export default Insurance;