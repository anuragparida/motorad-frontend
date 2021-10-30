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

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  const refreshTokenSetup = (res) => {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
  
    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log('newAuthRes:', newAuthRes);
      // saveUserToken(newAuthRes.access_token);  <-- save new token
      localStorage.setItem('authToken', newAuthRes.id_token);
  
      // Setup the other timer after the first one
      setTimeout(refreshToken, refreshTiming);
    };
  
    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
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

                {/* <GoogleLogin
                    clientId="170043377049-kct15ngvlq8dvk14d5fas47fc1ugpq4r.apps.googleusercontent.com"
                    // render={
                    //   renderProps => {
                    //     <a href="javascript:void(0)" onClick={renderProps.onClick}><i class="fa fa-google"></i>Sign Up with Google</a>
                    //   }
                    // }
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    style={{ marginTop: '100px' }}
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