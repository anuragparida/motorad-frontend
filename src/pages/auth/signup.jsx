import React from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';

const Signup = (props) => {
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
                <h5>Welcome to EMotorad</h5>
                <p>
                  Lorem ipsum dolor sit amet, <br />
                  consectetur adipiscing elit ut aliquam.
                </p>
                <a href="#"><i class="fa fa-google"></i>Sign Up with Google</a>
                <a href="#" class="blue_bg"
                  ><i class="fa fa-facebook"></i>Sign Up with Facebook</a
                >
                <img src="images/or.svg" alt="or" class="img-fluid" />
              </div>
              <form>
                <div class="form-group">
                  <label for="">Your Email Address</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your email"
                  />
                </div>
                <div class="form-group">
                  <label for="">Your Contact Number</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your Contact Number"
                  />
                </div>
                <div class="form-group">
                  <label for="">Your Password</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Create a Password"
                  />
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn_submit">
                    Create Account
                  </button>
                </div>
              </form>
            </div>
            <div class="login_links">
              <p>Or <a href="login.html">Log In</a> Instead</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
export default Signup;