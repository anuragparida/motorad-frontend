import React, { useState, useEffect } from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import axios from "axios";
import { server, config, checkAccess } from "../../env";
import isLoggedIn from './../../utils/checkLogin';
import Alert from './../../components/Alert';
import Loader from './../../components/Loader';

const Overview = (props) => {

  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const [reviewId, setReviewId] = useState([]);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState("");
  const [stars, setStars] = useState(5);

  const domain = localStorage.getItem('subDomain');

  const loadOrders = async () => {
    if (!isLoggedIn()) {
      window.location.href = "/login";
    }
    else {
      await axios
        .post(server + "/api/order/my-orders", {}, config)
        .then((rsp) => {
          console.log(rsp);
          setOrders(rsp.data.payload.filter(order => order.status === 1));
        })
        .catch((err) => {
          checkAccess(err);
          console.error(err);
        });
    }
  }

  const loadReviews = async () => {
    if (!isLoggedIn()) {
      window.location.href = "/login";
    }
    else {
      await axios
        .post(server + "/api/order/review/my-reviews", {}, config)
        .then((rsp) => {
          console.log(rsp);
          setReviews(rsp.data.payload);
        })
        .catch((err) => {
          checkAccess(err);
          console.error(err);
        });
    }
  }

  const loadUser = async () => {
    if (!isLoggedIn()) {
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

  const convertDate = (warrantyDate) => {
    let warranty = warrantyDate.split("-");
    var year = parseInt(warranty[0]) + parseInt(1);
    var month = warranty[1];
    var day = warranty[2];
    var date = year + '-' + month + '-' + day;
    return date;
  }

  useEffect(() => {
    loadOrders();
    loadUser();
    loadReviews();
  }, []);

  const sendReview = async (e) => {
    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    params.order = reviewId[0];
    params.product = reviewId[1];
    params.rating = stars;

    axios
      .post(server + "/api/order/review/create", params, config)
      .then((rsp) => {
        console.log(rsp);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
        }
      });
  }

  return (
    <>
      <Navbar />
      <MobileNavbar />
      <section class="warrenty_actved_section">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="accnt_pro_head">
                <h2>Welcome <span>{user.name ? user.name : "User"}</span></h2>
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

              {
                orders.length > 0 ?
                  orders.map(order => (
                    order.products.map(product => (
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
                                    <h6>{product.name}</h6>
                                    <p>Color : <i class="fa fa-circle" style={{ "color": product.color }}></i></p>
                                  </span>
                                  <span>
                                    <p>QTY</p>
                                    <h6>{product.amount}</h6>
                                  </span>
                                </div>
                              </div>
                              <div class="cycle_details_btm">
                                <p>Frame Number</p>
                                <h6 class="text-dark">{order.frame_number || "Pending"}</h6>
                              </div>
                            </div>
                            <div class="col-lg-3">
                              <div class="cycle_details_top text-right">
                                <p>Date of Purchase</p>
                                <h6>{order.created_at.split("T")[0]}</h6>
                              </div>
                              <div class="cycle_details_btm">
                                <p>Tracking Number</p>
                                <h6>{order.tracking || "Pending"}</h6>
                              </div>
                            </div>
                            <div class="col-lg-3">
                              <div class="cycle_details_top text-center">
                                <p>Warranty Valid Upto</p>
                                <h6>
                                  {
                                    convertDate(order.created_at.split("T")[0])
                                    // order.created_at.split("T")[0]
                                  }</h6>
                              </div>
                              <div class="cycle_details_btm text-left">
                                <p>Carrier</p>
                                <a href={order.career || "#"} target="_blank">
                                  <h6>
                                    <u>{order.career ? order.career.substring(0, 10) : "Pending"}</u>
                                    <img
                                      src="images/arw_rgt.svg"
                                      alt="->"
                                      class="img-fluid"
                                    />
                                  </h6>
                                </a>
                              </div>
                            </div>
                            <div class="col-lg-3">
                              <div class="cycle_details_top text-center">
                                <p>TOTAL</p>
                                <h6>{
                                  (domain == 'india') ?
                                    '₹ '
                                    : (domain == 'uae') ?
                                      'AED '
                                      : (domain == 'japan') ?
                                        'YEN '
                                        : (domain == 'nepal') ?
                                          'NPR '
                                          :
                                          ''
                                } {order.price}</h6>
                              </div>
                              <div class="cycle_details_btm text-center">
                                <p>Date of Delivery</p>
                                <h6 class="text-dark">{order.date_of_delivery || "Pending"}</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="warentty_bttns">
                          <a href="#" data-toggle="modal" data-target="#exampleModalLong"
                            onClick={() => setReviewId([order.id, product.id])}
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
                    ))

                  ))
                  :
                  <div class="state_boxs_wrap">
                    <p>
                      You have not placed any orders
                      <a href="/"
                      >Explore Products
                        <img src="images/arw_rgt.svg" alt="->" class="img-fluid"
                        /></a>
                    </p>
                  </div>
              }



              <div class="profile_set_head mt-5">
                <h6>Your Reviews</h6>
              </div>
              <div class="reviews_boxs_wrap">

                {
                  reviews.length > 0 ?
                    reviews.map(review => (
                      <>
                        <div class="media">
                          <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
                          <div class="media-body">
                            <div class="d-flex mt-0 justify-content-between">
                              <ul>
                                <li><i class="fa fa-star" style={{ "color": review.rating >= 1 ? "#10b068" : "grey" }}></i></li>
                                <li><i class="fa fa-star" style={{ "color": review.rating >= 2 ? "#10b068" : "grey" }}></i></li>
                                <li><i class="fa fa-star" style={{ "color": review.rating >= 3 ? "#10b068" : "grey" }}></i></li>
                                <li><i class="fa fa-star" style={{ "color": review.rating >= 4 ? "#10b068" : "grey" }}></i></li>
                                <li><i class="fa fa-star" style={{ "color": review.rating >= 5 ? "#10b068" : "grey" }}></i></li>
                              </ul>
                              <span>{review.created_at.split("T")[0]}</span>
                            </div>

                            <p>
                              {review.message}
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
                          {/* <a href="#">Edit</a> */}
                        </div>
                      </>
                    ))
                    :
                    <div class="state_boxs_wrap">
                      <p>
                        Place an order to add reviews!
                      </p>
                    </div>
                }

              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <section class="modal_section_2">
        <div
          class="modal fade"
          id="exampleModalLong"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
          style={{ "z-index": "9999" }}
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="accnt_setting_modal">
                  <a href="#" data-dismiss="modal" aria-label="Close">
                    <img src="images/close_icon.svg" alt="x" class="img-fluid" />
                  </a>
                  <div class="accnt_modal_head">
                    <h5>Add Review</h5>
                    {reviewId}
                    <ul>
                      <li><a href="javascript:void(0)" onClick={() => setStars(1)}><i class="fa fa-star" style={{ "color": stars >= 1 ? "#10b068" : "grey" }}></i></a></li>
                      <li><a href="javascript:void(0)" onClick={() => setStars(2)}><i class="fa fa-star" style={{ "color": stars >= 2 ? "#10b068" : "grey" }}></i></a></li>
                      <li><a href="javascript:void(0)" onClick={() => setStars(3)}><i class="fa fa-star" style={{ "color": stars >= 3 ? "#10b068" : "grey" }}></i></a></li>
                      <li><a href="javascript:void(0)" onClick={() => setStars(4)}><i class="fa fa-star" style={{ "color": stars >= 4 ? "#10b068" : "grey" }}></i></a></li>
                      <li><a href="javascript:void(0)" onClick={() => setStars(5)}><i class="fa fa-star" style={{ "color": stars >= 5 ? "#10b068" : "grey" }}></i></a></li>
                    </ul>
                  </div>
                  <div class="emi_plan_frm accnt_modal_plan">
                    <form onSubmit={sendReview}>
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="form-group">
                            <label for="">Your Review</label>
                            <textarea
                              name="message"
                              cols="30"
                              rows="10"
                              class="form-control"
                              placeholder="Enter your review"
                              style={{ "min-height": "180px" }}
                              required
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