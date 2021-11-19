import React, {useState} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server } from "../../env";
import axios from "axios";
import Alert from './../../components/Alert';
import Loader from './../../components/Loader';

const VerifyOTP = (props) => {
  const [country, setCountry] = useState(true);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState("");
  const [email, setEmail] = useState("");

  const verifyOtp = async (e) => {

    e.preventDefault();

    setLoader(<Loader/>);

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});
    localStorage.setItem("email", e.target.email.value);

    axios
    .post(server + "/api/user/confirm", params)
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

  const resendOTP = async () => {

    setLoader(<Loader/>);

    if (!email) {
      setMessage(<Alert className="warning" message={"Please enter email and then click Resend OTP."} />);
      setLoader("");
      return;
    }

    axios
    .post(server + "/api/user/resend-otp", {"email": email})
    .then((rsp) => {
      console.log(rsp);
      setMessage(<Alert className="success" message={rsp.data.message} />);
      setLoader("");
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
                <h5>Enter OTP</h5>
                <p>
                  Please enter the OTP Sent<br />
                  to your registerd email address.
                </p>
              </div>
              <form onSubmit={verifyOtp}>
                {message}
              <div class="form-group">
                  <label for="">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your Email"
                    name="email"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
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
                  <button type="submit" class="btn btn_submit">Submit {loader}</button>
                </div>
              </form>
            </div>
            <div class="login_links">
              <p>Didn't Receive OTP <a href="javascript:void(0)" onClick={resendOTP}>Resend OTP </a></p>
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