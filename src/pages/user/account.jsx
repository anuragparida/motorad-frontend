import React, {useState, useEffect} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import axios from "axios";
import { server, config, checkAccess } from "../../env";
import isLoggedIn from './../../utils/checkLogin';

const Account = (props) => {

  const [add, setAdd] = useState([]);

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

  const setDefaultAdd = async (id) => {
    console.log("y")
    await axios
      .post(server + `/api/address/default/${id}`, config)
      .then((rsp) => {
        console.log(rsp);
        window.location.reload();
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  useEffect(()=>{
    loadAddresses();
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
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        ><img
                          src="images/edit_icon.svg"
                          alt="a"
                          class="img-fluid"
                        />
                        Edit Address</a
                      >
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
                              value="Ekansh Sharma"
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
                              value="Maharashtra"
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
                              value="Pune"
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
                              value="At post Jambe, taluka Mulshi, 169/2 Sangawade Road,"
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
                              value="123456"
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
                          value="Ekansh Sharma"
                          disabled
                        />
                        <a href="#">
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
                        <a href="#">
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
                          value="9876543210"
                          disabled
                        />
                        <a href="#">
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
                  <form>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">Your Name</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter your Name"
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
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">Pincode</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter your pincode"
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="">Your Address</label>
                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            class="form-control"
                            placeholder="Enter your address"
                            style={{"min-height": "80px"}}
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="accnt_submit_modal">
                          <button type="submit" class="btn btn_submit">
                            Add Address
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