import React, {useState} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server } from "../../env";
import axios from "axios";
import Alert from './../../components/Alert';
import Loader from './../../components/Loader';

const ResetPassword = (props) => {
  const [country, setCountry] = useState(true);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState("");

  const resetPass = async (e) => {

    e.preventDefault();

    setLoader(<Loader/>);

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});
    localStorage.setItem("email", e.target.email.value);

    if (params.password !== params.repassword) {
      setMessage(<Alert className="warning" message={"Passwords don't match. Please try again."} />);
      setLoader("");
      return;
    }

    delete params.repassword;

    axios
    .post(server + "/api/user/reset", params)
    .then((rsp) => {
      console.log(rsp);
      setMessage(<Alert className="success" message={rsp.data.message} />);
      setLoader("");
      window.location.href = "/login";
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
                <h5>Reset Password</h5>
                <p>Enter your Email, New Password and OTP<br /></p>
              </div>
              <form onSubmit={resetPass}>
                <div class="form-group">
                  <label for="">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your Email"
                    name="email"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="">OTP</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter OTP"
                    name="otp"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="">New Password</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Enter New Password"
                    name="password"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="">Confirm New Password</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Re-Enter New Password"
                    name="repassword"
                    required
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