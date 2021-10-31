import React, {useState} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server } from "../../env";
import axios from "axios";

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

  const [sendSuccess, setSendSuccess] = useState(false);

  const createContact = async (e) => {

    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    axios
    .post(server + "/api/contact/create", params)
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
              {/* <img class="img-fluid" src="images/chair_icon.svg" alt="a" /> */}
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
              {/* <img class="img-fluid" src="images/light_icon.svg" alt="a" /> */}
              <h6>
                EM International Office
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
        <div class="row justify-content-center">
          <div class="col-lg-4">
            <div class="rsa_hero_btm_wrapp">
              {/* <img class="img-fluid" src="images/chair_icon.svg" alt="a" /> */}
              <h6>
                EMotorad Nepal Office
              </h6>
              <p>
                Gwarko-17,<br/>
                Lalitpur,
                <br />
                Nepal 44700
              </p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="rsa_hero_btm_wrapp">
              {/* <img class="img-fluid" src="images/light_icon.svg" alt="a" /> */}
              <h6>
                EM Japan Office
              </h6>
              <p>
              170-0013<br/>
              東京都豊島区東池袋1-17-11-1105<br/>
              フェニックス合同会社
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
                <form onSubmit={createContact}>
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
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="">
                          Your Contact Number
                        </label>
                        <input class="form-control" type="number" placeholder="Enter Contact Number" name="contact" required/>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="">
                          Message
                        </label>
                        <input class="form-control" type="text" placeholder="Your Message" name="message" required/>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="plan_submit_btn text-center">
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
    

    <Footer/>
    </>
  );
}
export default Contact;