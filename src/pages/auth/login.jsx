import React from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { Link } from 'react-router-dom';
import { server } from "../../env";
import Cookies from "js-cookie";
import axios from "axios";

const Login = (props) => {

  const login = async (e) => {

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
              <form onSubmit={login}>
                <div class="form-group">
                  <label for="">Your Email Address / Contact Number</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your email or contact"
                    name="email"
                    required
                    autoFocus={true}
                  />
                </div>
                <div class="form-group">
                  <div class="d-flex justify-content-between">
                    <label for="">Your Password</label>
                    <a href="#">Forgot Password?</a>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn_submit">Log In</button>
                </div>
              </form>
            </div>
            <div class="login_links">
              <p>
                Don’t have an Account? <Link to="/signup">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
export default Login;