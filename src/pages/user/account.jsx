import React, {useState, useEffect} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import axios from "axios";
import { server, config, checkAccess } from "../../env";
import isLoggedIn from './../../utils/checkLogin';
import Alert from './../../components/Alert';
import Loader from './../../components/Loader';

const Account = (props) => {

  const [add, setAdd] = useState([]);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState("");

  const loadAddresses = async () => {
    if(!isLoggedIn()){
      window.location.href = "/login";
    }
    else {
      await axios
      .get(server + "/api/address/read", config)
      .then((rsp) => {
        console.log(rsp);
        const localAdd = [...rsp.data.payload.filter(el => el.default === 1), ...rsp.data.payload.filter(el => el.default !== 1)]
        setAdd(localAdd);
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
    }
  }

  const loadUser = async () => {
    if(!isLoggedIn()){
      window.location.href = "/login";
    }
    else {
      await axios
      .get(server + "/api/user/profile", config)
      .then((rsp) => {
        console.log(rsp);
        setUser(rsp.data.payload);
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
    }
  }

  const setDefaultAdd = async (id) => {
    await axios
      .post(server + `/api/address/default/${id}`, {}, config)
      .then((rsp) => {
        console.log(rsp);
        window.location.reload();
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err.response);
      });
  }

  const addAddress = async (e) => {
    e.preventDefault();

    setLoader(<Loader/>);

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    params.landmark = "jk";

    axios
    .post(server + "/api/address/create", params, config)
    .then((rsp) => {
      console.log(rsp);
      setMessage(<Alert className="success" message={rsp.data.message} />);
      setLoader("");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err.response);
      setMessage(<Alert className="danger" message={err.response.data.message} />);
      setLoader("");
    });
  }

  const deleteAddress = async (id) => {
    axios
    .delete(server + `/api/address/delete/${id}`, config)
    .then((rsp) => {
      console.log(rsp);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err.response);
    });
  }

  const updateUser = async (e) => {
    e.preventDefault();

    setLoader(<Loader/>);

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    // axios UNCOMMENT THIS WHEN API DONE
    // .post(server + "/api/user/update-profile", params, config)
    // .then((rsp) => {
    //   console.log(rsp);
    //   setMessage(<Alert className="success" message={rsp.data.message} />);
    //   setLoader("");
    //   window.location.reload();
    // })
    // .catch((err) => {
    //   console.log(err.response);
    //   setMessage(<Alert className="danger" message={err.response.data.message} />);
    //   setLoader("");
    // });
  }

  useEffect(()=>{
    loadAddresses();
    loadUser();
  }, []);

  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <section class="profile_accntseting_sec">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="accnt_pro_head">
              <h2>Account Settings</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="profile_set_head">
              <h6>Your Addresses</h6>
              <p>
                Any Issues? <a href="/contact"><u>Contact Us</u></a>
              </p>
            </div>
            <div class="profile_setting_wrap">

              {
                add.map(address => (
                  <div class={address.default === 1 ? "profile_default_adrs_wrap" : "profile_default_adrs_wrap profile_presnt_adrs_wrap"}>
                    
                    <div class="d-flex justify-content-between align-items-center">
                    <a href="javascript:void(0)" onClick={()=>{
                          if(address.default !== 1) {
                            setDefaultAdd(address.id);
                          }
                        }} >
                      <label class="radiooo"
                        >{address.default === 1 ? "Default Address" : "Set as Default Address"}
                        <button class={address.default === 1 ? "checked" : ""}></button>
                        <span class="checkmark"></span>
                      </label>
                      </a>
                      {
                        address.default !== 1 &&
                        <a
                        href="javascript:void(0)"
                        onClick={()=>deleteAddress(address.id)}
                        ><img
                          src="images/edit_icon.svg"
                          alt="a"
                          class="img-fluid"
                        />
                        Delete Address</a
                      >
                      }
                    </div>
                    <form action="">
                      <div class="row">
                        <div class="col-lg-4">
                          <div class="form-group">
                            <label for="">Full Name</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Your Name"
                              value={address.name || "Needs db conf"}
                            />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="form-group">
                            <label for="">Your State</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Your State"
                              value={address.state}
                            />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="form-group">
                            <label for="">Your City</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Your City"
                              value={address.city}
                            />
                          </div>
                        </div>
                        <div class="col-lg-8">
                          <div class="form-group">
                            <label for="">Full Address</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Your Address"
                              value={address.address}
                            />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="form-group">
                            <label for="">Pincode</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Your Pincode"
                              value={address.pin}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                ))
              }
              

              <div class="more_adds_add_bttn">
                <a href="#" data-toggle="modal" data-target="#exampleModalLong">
                  <i class="fa fa-plus"></i> Add a New Address
                </a>
              </div>
            </div>
            <div class="profile_set_head mt-5">
              <h6>Your Account Details</h6>
            </div>
            <div class="accnt_detali_wrap_bttm">
              <form action="">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="">Your Name</label>
                      <div class="d-flex">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Your Name"
                          value={user.name ? user.name : "...Loading"}
                          disabled
                        />
                        <a href="#" data-toggle="modal" data-target="#exampleModal">
                          <img
                            src="images/edit_w_icon.svg"
                            alt="a"
                            class="img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="">Your Password</label>
                      <div class="d-flex">
                        <input
                          type="pasword"
                          class="form-control"
                          placeholder="Your Password"
                          value="●●●●●●●●●●"
                          disabled
                        />
                        <a href="/resetpass">
                          <img
                            src="images/edit_w_icon.svg"
                            alt="a"
                            class="img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="">Your Contact</label>
                      <div class="d-flex">
                        <input
                          type="pasword"
                          class="form-control"
                          placeholder="Your Contact"
                          value={user.contact ? user.contact : "...Loading"}
                          disabled
                        />
                        <a href="#" data-toggle="modal" data-target="#exampleModal">
                          <img
                            src="images/edit_w_icon.svg"
                            alt="a"
                            class="img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    <section class="modal_section">
      <div
        class="modal fade"
        id="exampleModalLong"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="accnt_setting_modal">
                <a href="#" data-dismiss="modal" aria-label="Close">
                  <img src="images/close_icon.svg" alt="x" class="img-fluid" />
                </a>
                <div class="accnt_modal_head">
                  <h5>Add Address</h5>
                  <label class="radiooo"
                    >Set as Default Address
                    <input type="radio" name="radio" />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="emi_plan_frm accnt_modal_plan">
                  <form onSubmit={addAddress}>
                    {message}
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">Your Name</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter your Name"
                            name="name"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">Select State</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Select your state"
                            name="state"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">Your City</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Select your city"
                            name="city"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">Pincode</label>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Enter your pincode"
                            name="pin"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="">Your Address</label>
                          <textarea
                            cols="30"
                            rows="10"
                            class="form-control"
                            placeholder="Enter your address"
                            style={{"min-height": "80px"}}
                            name="address"
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="accnt_submit_modal">
                          <button type="submit" class="btn btn_submit">
                            Add Address
                            {loader}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="modal_section">
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="accnt_setting_modal">
              <a href="#" data-dismiss="modal" aria-label="Close">
                <img src="images/close_icon.svg" alt="x" class="img-fluid" />
              </a>
              <div class="accnt_modal_head">
                <h5>Add Address</h5>
                <label class="radiooo"
                  >Set as Default Address
                  <input type="radio" name="radio" />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="emi_plan_frm accnt_modal_plan">
                <form onSubmit={updateUser}>
                  {message}
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="">Your Name</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter your Name"
                          name="name"
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
                          placeholder="Enter contact number"
                          name="contact"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="accnt_submit_modal">
                        <button type="submit" class="btn btn_submit">
                          Update Details
                          {loader}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    </>
  );
}
export default Account;