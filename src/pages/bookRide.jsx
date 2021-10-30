import React, {useState, useEffect} from "react";
import Navbar from './../components/Navbar';
import MobileNavbar from './../components/MobileNavbar';
import Footer from './../components/Footer';
import axios from "axios";
import { server, checkAccess } from "../env";

const BookRide = (props) => {

  const [bookSuccess, setBookSuccess] = useState(false);
  const [city, setCity] = useState("");
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadStores(city);
  }, [city]);

  const loadStores = async(city) => {
    await axios
      .post(server + "/api/store/read", {"search": city})
      .then((rsp) => {
        console.log(rsp);
        setStores(rsp.data.payload);
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  const bookRide = async(e) => {

    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    axios
    .post(server + "/api/ride/book", params)
    .then((rsp) => {
      console.log(rsp);
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
      }
    });

  }

  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <section class="emi_hero_section">
      <div class="container">
        <div class="row d-lg-none">
          <div class="col-12 mb-3">
            <img src="images/insu_m_banr.png" alt="a" class="img-fluid" />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 d-none d-lg-block">
            <div class="emi_hero_txt test_ride_hero_txt">
              <h6>TEST RIDE</h6>
              <h2>
                Book Your <br />
                <span>Test Ride</span>
              </h2>
              <p>
                Check out the EMotorad bikes in person! Share <br />
                your details below and book a test ride. <br />
                Welcome to the electric revolution.
              </p>
              <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
              <h5>SELECTED BIKE: <span> T - REX</span></h5>
            </div>
          </div>
          <div class="col-lg-6">
            {
              bookSuccess
              ?
              <div class="test_ride_succes_wrap">
              <img src="images/big_check.svg" alt="a" class="img-fluid" />
              <h5>
                Your Response has been <br />
                submitted Successfully
              </h5>

              <p>We’ll Get back to you soon</p>

              <a href="index.html">Go to HomePage</a>
            </div>
            :
            <div class="test_ride_frm">
            <div class="d-flex justify-content-between align-items-center">
              <h5>Book Your Test Ride Now</h5>
              <a href="#" class="d-none d-lg-block">or Contact Us</a>
            </div>
            <div class="emi_plan_frm">
              <form onSubmit={bookRide}>
                <div class="row">
                  <div class="col-lg-6 d-lg-none">
                    <div class="form-group">
                      <label for="">Select Bike</label>
                      <a href="#" class="mobile_bikee_selectt"
                        >T-REX
                        <img src="images/sm1.png" alt="a" class="img-fluid"
                      /></a>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group d-none d-lg-block">
                      <label for="">Select Bike</label>
                      <select name="bike" class="form-control" defaultValue="TREX" required>
                        <option value="TREX">TREX</option>
                        <option value="EMX">EMX</option>
                        <option value="DOODLE">DOODLE</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">Your Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter your name"
                        name="name"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">Your Email</label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Enter your email"
                        name="email"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">Your Contact</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Enter your number"
                        name="contact"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">Enter City</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter your city"
                        name="city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">Choose Date</label>
                      <input
                        type="date"
                        class="form-control"
                        name="rideDate"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="">Select Dealer</label>
                      <select name="dealer" class="form-control" required>
                        {
                          stores.map(x=><option value={x.id}>{x.name}</option>)
                        }
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="test_ride_submit_btn text-center">
                      <a href="javascript:void(0)" onClick={()=>{setBookSuccess(true)}}>Book Now</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
            }
          </div> 
        </div>
      </div>
    </section>
    <section class="explore_ebike_sec">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="expo_ebike_headin">
              <h5>Explore E-Bikes</h5>
            </div>
          </div>
        </div>
        <div class="row expo_bike_slider">
          <div class="col-lg-4">
            <div class="bike_explore_wrap">
              <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />

              <h3>
                T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" />
              </h3>

              <h5>FEATURES</h5>
              <table>
                <tr>
                  <td>RANGE</td>
                  <td>50+ Kms</td>
                </tr>
                <tr>
                  <td>SPEED (MAX)</td>
                  <td>25Km/hr</td>
                </tr>
                <tr>
                  <td>BRAKES</td>
                  <td>Dual Disc</td>
                </tr>
                <tr>
                  <td>BATTERY</td>
                  <td>36 Volts</td>
                </tr>
                <tr>
                  <td>CAPACITY</td>
                  <td>7.5 Ah</td>
                </tr>
                <tr>
                  <td>Starting From</td>
                  <td>Colors</td>
                </tr>
                <tr>
                  <td>Rs 36,999</td>
                  <td>
                    <i class="fa fa-circle"></i> <i class="fa fa-circle"></i>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="bike_explore_wrap">
              <img src="images/bicycle_3.png" alt="a" class="img-fluid" />

              <h3>
                EMX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" />
              </h3>

              <h5>FEATURES</h5>
              <table>
                <tr>
                  <td>RANGE</td>
                  <td>65+ Kms</td>
                </tr>
                <tr>
                  <td>SPEED (MAX)</td>
                  <td>25Km/hr</td>
                </tr>
                <tr>
                  <td>BRAKES</td>
                  <td>Dual Disc</td>
                </tr>
                <tr>
                  <td>BATTERY</td>
                  <td>36 Volts</td>
                </tr>
                <tr>
                  <td>CAPACITY</td>
                  <td>7.5 Ah</td>
                </tr>
                <tr>
                  <td>Starting From</td>
                  <td>Colors</td>
                </tr>
                <tr>
                  <td>Rs 36,999</td>
                  <td><i class="fa fa-circle" style={{"color": "#dbff00"}}></i></td>
                </tr>
              </table>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="bike_explore_wrap">
              <img src="images/bicycle_2.png" alt="a" class="img-fluid" />

              <h3>
                DOODLE
                <img src="images/arw_rgt.svg" alt="a" class="img-fluid" />
              </h3>

              <h5>FEATURES</h5>
              <table>
                <tr>
                  <td>RANGE</td>
                  <td>55+ Kms</td>
                </tr>
                <tr>
                  <td>SPEED (MAX)</td>
                  <td>25Km/hr</td>
                </tr>
                <tr>
                  <td>BRAKES</td>
                  <td>Dual Disc</td>
                </tr>
                <tr>
                  <td>BATTERY</td>
                  <td>36 Volts</td>
                </tr>
                <tr>
                  <td>CAPACITY</td>
                  <td>7.5 Ah</td>
                </tr>
                <tr>
                  <td>Starting From</td>
                  <td>Colors</td>
                </tr>
                <tr>
                  <td>Rs 36,999</td>
                  <td>
                    <i class="fa fa-circle text-dark"></i>
                    <i class="fa fa-circle" style={{"color": "#10b068"}}></i>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
export default BookRide;