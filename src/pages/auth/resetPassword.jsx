import React, {useState} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { Link } from 'react-router-dom';
import { server } from "../../env";
import Cookies from "js-cookie";
import axios from "axios";

const ResetPassword = (props) => {
  const [country, setCountry] = useState(true); 

  const resetPass = async (e) => {

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
    <Navbar setCountry={setCountry} country={country}/>
    <MobileNavbar/>
    <section class="signup_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="signup_frm_wrap">
              <div class="signup_frm_head">
                <img src="images/em-img.png" alt="EM" class="img-fluid" />
                <h5>Reset Password</h5>
                <p>Enter your New Password<br /></p>
              </div>
              <form>
                <div class="form-group">
                  <label for="">New Password</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter New Password"
                  />
                </div>
                <div class="form-group">
                  <label for="">Confirm New Password</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Re-Enter New Password"
                  />
                </div>

                <div class="form-group">
                  <button type="submit" class="btn btn_submit">
                    Reset Password
                  </button>
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
export default ResetPassword;