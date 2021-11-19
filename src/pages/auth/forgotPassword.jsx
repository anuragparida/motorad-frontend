import React, {useState} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server } from "../../env";
import axios from "axios";
import Alert from './../../components/Alert';
import Loader from './../../components/Loader';

const ForgotPassword = (props) => {
  const [country, setCountry] = useState(true);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState("");

  const forgotPass = async (e) => {

    e.preventDefault();

    setLoader(<Loader/>);

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});
    localStorage.setItem("email", e.target.email.value);

    axios
    .post(server + "/api/user/forgot", params)
    .then((rsp) => {
      console.log(rsp);
      setMessage(<Alert className="success" message={rsp.data.message} />);
      setLoader("");
      window.location.href = "/resetpass";
    })
    .catch((err) => {
      console.log(err.response);
      setMessage(<Alert className="danger" message={err.response.data.message} />);
      setLoader("");
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
                <h5>Forgot Password</h5>
                <p>
                  Please enter your register email address,<br />
                  We will share an OTP to Reset your Password.
                </p>
              </div>
              <form onSubmit={forgotPass}>
                {message}
                <div class="form-group">
                  <label for="">Your Email Address</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your email"
                    name="email"
                    required
                  />
                </div>

                <div class="form-group">
                  <button type="submit" class="btn btn_submit">Send OTP {loader}</button>
                </div>
              </form>
            </div>
            <div class="login_links">
              <p>
                <a href="/signup">Sign Up </a>Or
                <a href="/login">Log In</a> Instead
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
export default ForgotPassword;