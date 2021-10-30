import React, {useState, useEffect} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';

const Overview = (props) => {
  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <section class="warrenty_actved_section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="accnt_pro_head">
              <h2>Welcome <span>Ekansh</span></h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="profile_set_head">
              <h6>Your Recent Orders</h6>
              <p>
                Any Issues? <a href="#"><u>Contact Us</u></a>
              </p>
            </div>
            <div class="warenty_actv_box_wrap">
              <div class="bicycle_img">
                <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
              </div>
              <div class="cycle_wanrety_details">
                <div class="row">
                  <div class="col-lg-3">
                    <div class="cycle_details_top">
                      <div class="d-flex justify-content-between">
                        <span>
                          <h6>T - REX</h6>
                          <p>Color : <i class="fa fa-circle"></i></p>
                        </span>
                        <span>
                          <p>QTY</p>
                          <h6>1</h6>
                        </span>
                      </div>
                    </div>
                    <div class="cycle_details_btm">
                      <p>Frame Number</p>
                      <h6 class="text-dark">EMM04200105</h6>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="cycle_details_top text-right">
                      <p>Date of Purchase</p>
                      <h6>27-09-2021</h6>
                    </div>
                    <div class="cycle_details_btm">
                      <p>Tracking Number</p>
                      <h6>100004847989</h6>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="cycle_details_top text-center">
                      <p>Warranty Valid Upto</p>
                      <h6>01-10-2021</h6>
                    </div>
                    <div class="cycle_details_btm text-left">
                      <p>Carrier</p>
                      <h6>
                        <u>DTDC</u>
                        <img
                          src="images/arw_rgt.svg"
                          alt="->"
                          class="img-fluid"
                        />
                      </h6>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="cycle_details_top text-center">
                      <p>TOTAL</p>
                      <h6>₹ 37,133</h6>
                    </div>
                    <div class="cycle_details_btm text-center">
                      <p>Date of Delivery</p>
                      <h6 class="text-dark">01-10-2021</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="warentty_bttns">
                <a href="#" data-toggle="modal" data-target="#exampleModalLong"
                  ><img
                    src="images/plus_icon.svg"
                    alt="->"
                    class="img-fluid"
                  />Add Review</a
                >
                <a href="#"
                  ><img
                    src="images/download_w_icon.svg"
                    alt="a"
                    class="img=fluid"
                  />Invoice</a
                >
                <a href="#"
                  ><img
                    src="images/download_w_icon.svg"
                    alt="a"
                    class="img=fluid"
                  />Warranty Doc</a
                >
              </div>
            </div>
            <div class="profile_set_head mt-5">
              <h6>Your Reviews</h6>
            </div>
            <div class="reviews_boxs_wrap">
              <div class="media">
                <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
                <div class="media-body">
                  <div class="d-flex mt-0 justify-content-between">
                    <ul>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                    </ul>
                    <span>28 - 09 - 2021</span>
                  </div>

                  <p>
                    I am so happy with this product, It's a very good electric
                    bicycle in every aspect, excellent looks, colour, digital
                    display, light provision. It is very easy in operation,
                    friendly use, quality is excellent, battery power is also
                    good &amp; most important it is removable, so we can charge
                    wherever we want, no need to carry the whole bicycle. I got
                    exactly what I was looking for daily office commute of 25km
                    distance. It is worth for money, will surely suggest others
                    to buy the same.
                  </p>
                </div>
              </div>
              <div
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  brdr_bttm
                "
              >
                <h6>T - REX</h6>
                <a href="#">Edit</a>
              </div>
              <div class="media">
                <img src="images/bicycle_2.png" alt="a" class="img-fluid" />
                <div class="media-body">
                  <div class="d-flex mt-0 justify-content-between">
                    <ul>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                    </ul>
                    <span>28 - 09 - 2021</span>
                  </div>

                  <p>
                    I am so happy with this product, It's a very good electric
                    bicycle in every aspect, excellent looks, colour, digital
                    display, light provision. It is very easy in operation,
                    friendly use, quality is excellent, battery power is also
                    good &amp; most important it is removable, so we can charge
                    wherever we want, no need to carry the whole bicycle. I got
                    exactly what I was looking for daily office commute of 25km
                    distance. It is worth for money, will surely suggest others
                    to buy the same.
                  </p>
                </div>
              </div>
              <div
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  brdr_bttm
                "
              >
                <h6>DOODLE</h6>
                <a href="#">Edit</a>
              </div>
              <div class="media">
                <img src="images/bicycle_3.png" alt="a" class="img-fluid" />
                <div class="media-body">
                  <div class="d-flex mt-0 justify-content-between">
                    <ul>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                    </ul>
                    <span>28 - 09 - 2021</span>
                  </div>

                  <p>
                    I am so happy with this product, It's a very good electric
                    bicycle in every aspect, excellent looks, colour, digital
                    display, light provision. It is very easy in operation,
                    friendly use, quality is excellent, battery power is also
                    good &amp; most important it is removable, so we can charge
                    wherever we want, no need to carry the whole bicycle. I got
                    exactly what I was looking for daily office commute of 25km
                    distance. It is worth for money, will surely suggest others
                    to buy the same.
                  </p>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h6>EMX</h6>
                <a href="#">Edit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    <section class="modal_section_2">
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
                  <h5>Add Review for T - REX</h5>
                  <ul>
                    <li><i class="fa fa-star"></i></li>
                    <li><i class="fa fa-star"></i></li>
                    <li><i class="fa fa-star"></i></li>
                    <li><i class="fa fa-star"></i></li>
                    <li><i class="fa fa-star"></i></li>
                  </ul>
                </div>
                <div class="emi_plan_frm accnt_modal_plan">
                  <form>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="">Your Review</label>
                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            class="form-control"
                            placeholder="Enter your review"
                            style={{"min-height": "180px"}}
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="accnt_submit_modal">
                          <button type="submit" class="btn btn_submit">
                            Submit
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
export default Overview;