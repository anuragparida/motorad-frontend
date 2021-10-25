import React from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server } from "../../env";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from 'react-router-dom';

const Signup = (props) => {

  const signup = async (e) => {

    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    // var format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    // if (format.test(e.target.username.value)) {
    //   this.setState({
    //     message: (
    //       <Alert
    //         className="danger"
    //         message="No special characters are allowed in username."
    //       />
    //     ),
    //   });
    //   return;
    // }

    axios
      .post(server + "/api/user/signup", params)
      .then((rsp) => {
        console.log(rsp);
        this.props.history.push("/verifyEmail");
      })
      .catch((error) => {
      });
  };

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
                {/* <a href="#"><i class="fa fa-google"></i>Sign Up with Google</a>
                <a href="#" class="blue_bg"
                  ><i class="fa fa-facebook"></i>Sign Up with Facebook</a
                >
                <img src="images/or.svg" alt="or" class="img-fluid" /> */}
              </div>
              <form onSubmit={signup}>
                <div class="form-group">
                  <label for="">Your Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your Name"
                    name="name"
                    required
                    autoFocus={true}
                  />
                </div>
                <div class="form-group">
                  <label for="">Your Email</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your Email"
                    name="email"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="">Your Password</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Create a Password"
                    name="password"
                    required
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
              <p>Or <Link to="/login">Log In</Link> Instead</p>
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