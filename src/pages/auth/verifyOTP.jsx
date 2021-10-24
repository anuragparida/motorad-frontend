import React from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { Link } from 'react-router-dom';
import { server } from "../../env";
import Cookies from "js-cookie";
import axios from "axios";

const VerifyOTP = (props) => {

  const verifyOtp = async (e) => {

    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});
    localStorage.setItem("email", e.target.email.value);

    axios
    .post(server + "/api/user/login", params)
    .then((rsp) => {
      console.log(rsp);
      Cookies.set("token", rsp.data.payload.token);
      Cookies.set("tokenDate", new Date());

      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
        if (err.response.status === 422) {
          if (err.response.data.payload.is_email_verified === 0) {
            this.props.history.push("/verifyEmail");
          }
        }
      }
    });

  }

  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <section class="signup_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="signup_frm_wrap">
              <div class="signup_frm_head">
                <img src="images/em-img.png" alt="EM" class="img-fluid" />
                <h5>Enter OTP</h5>
                <p>
                  Please enter the OTP Sent<br />
                  to your registerd email address.
                </p>
              </div>
              <form>
                <div class="form-group">
                  <label for="">OTP</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter OTP"
                  />
                </div>

                <div class="form-group">
                  <button type="submit" class="btn btn_submit">Submit</button>
                </div>
              </form>
            </div>
            <div class="login_links">
              <p>Didn't Receive OTP <a href="#">Resend OTP </a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
export default VerifyOTP;