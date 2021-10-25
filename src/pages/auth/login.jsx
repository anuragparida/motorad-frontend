import React, {useState} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { Link } from 'react-router-dom';
import { server } from "../../env";
import Cookies from "js-cookie";
import axios from "axios";
import Alert from './../../components/Alert';
import Loader from './../../components/Loader';
import GoogleLogin from 'react-google-login';

const Login = (props) => {

  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState("");

  const login = async (e) => {

    e.preventDefault();

    setLoader(<Loader/>);

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});
    localStorage.setItem("email", e.target.email.value);

    axios
    .post(server + "/api/user/login", params)
    .then((rsp) => {
      // ADD IS VERIFIED CHECK
      console.log(rsp);
      Cookies.set("token", rsp.data.payload.token);
      Cookies.set("tokenDate", new Date());

      setMessage(<Alert className="success" message={rsp.data.message} />);
      setLoader("");

      var dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "loginSuccess",
      });
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
        setMessage(<Alert className="danger" message={err.response.data.message} />);
        setLoader("");
        if (err.response.status === 422) {
          if (err.response.data.payload.is_email_verified === 0) {
            this.props.history.push("/verifyEmail");
          }
        }
      }
    });

  }

  const googleLogin = (rsp) => {
    console.log(rsp);
    // const gapi = window.gapi;

    // gapi.load("auth2", function () {
    //   let auth2 = gapi.auth2.init({
    //     client_id: GOOGLE_CLIENT_ID,
    //   });
    //   auth2.grantOfflineAccess().then((token) => {
    //     const params = {
    //       token: token.code,
    //     };

    //     self.setState({
    //       loader: <Loader />,
    //       message: "",
    //     });

    //     axios
    //       .post(server + "/v1/auth/google", params)
    //       .then((rsp) => {
    //         Cookies.set("token", rsp.data.payload.token);
    //         self.setState({
    //           loader: "",
    //           message: <Alert className="success" message={rsp.data.detail} />,
    //         });
    //         window.location.href = "/";
    //       })
    //       .catch((err) => {
    //         self.setState({
    //           message: (
    //             <Alert className="warning" message={err.response.data.detail} />
    //           ),
    //           loader: "",
    //         });
    //       });
    //   });
    // });


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
                <a href="#"><i class="fa fa-google"></i>Sign Up with Google</a>
                {/* <GoogleLogin
                  clientId="http://170043377049-kct15ngvlq8dvk14d5fas47fc1ugpq4r.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={googleLogin}
                  onFailure={googleLogin}
                  cookiePolicy={'single_host_origin'}
                /> */}
                <a href="#" class="blue_bg"
                  ><i class="fa fa-facebook"></i>Sign Up with Facebook</a
                >
                <img src="images/or.svg" alt="or" class="img-fluid" />
              </div>
              <form onSubmit={login}>
                {message}
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
                  <button type="submit" class="btn btn_submit">Log In {loader}</button>
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