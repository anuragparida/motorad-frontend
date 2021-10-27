import React, {useState, useEffect} from "react";
import Navbar from '../../components/Navbar';
import MobileNavbar from '../../components/MobileNavbar';
import Footer from '../../components/Footer';
import AOS from 'aos';
import axios from "axios";
import { server, config, checkAccess } from "../../env";
import isLoggedIn from './../../utils/checkLogin';
// import ScriptTag from 'react-script-tag';

const ProductDOODLE = (props) => {

  const [products, setProducts] = useState([]);
  const [productID, setProductID] = useState("");

  useEffect(() => {
    AOS.init();
    loadProducts();
    window.enterView({
      selector: "section",
      enter: function (el) {
        el.classList.add("entered");
      },
    });

    var frameNumber = 0,
      playbackConst = 1000,
      vid = document.getElementById("v0");
    function scrollPlay() {
      var frameNumber = window.pageYOffset / playbackConst;
      vid.currentTime = frameNumber;
      window.requestAnimationFrame(scrollPlay);
    }

    window.requestAnimationFrame(scrollPlay);
  }, []);

  const loadProducts = async() => {
    await axios
      .get(server + "/api/product/read", config)
      .then((rsp) => {
        console.log(rsp);
        const filteredRsp = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"));
        if (filteredRsp.length > 0) {
          console.log(filteredRsp);
          setProducts(filteredRsp);
          setProductID(rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"))[0].id);
        }
        else {
          //   setProducts([{color: "green", id: 1}, {color: "black", id: 2}])
        //   setProductID(1);
        alert("Products not set correctly. Please Contact Admin.");
        }
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  const addToCart = async () => {
    if(!isLoggedIn()){
      window.location.href = "/login";
    }
    else{
      await axios
        .get(server + "/api/cart/read", config)
        .then((rsp) => {
          console.log(rsp);
          updateCart(rsp.data.payload[0]);
        })
        .catch((err) => {
          checkAccess(err);
          console.error(err);
        });
    }
  }

  const updateCart = async (payload) => {
    const params = {
      "product": [
        ...payload.product.filter(element => element.id !== productID),
        {
          "id": productID,
          "amount": 1
        }
      ],
      "accessories": payload.accessories
    };
    console.log("param", params)
    await axios
      .put(server + "/api/cart/update", params, config)
      .then((rsp) => {
        console.log(rsp.data); //CHANGE THIS
        window.location.href = "/cart";
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  return(
    <>
    <Navbar>
    <section class="product_menu_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-4">
              <div class="peoduct_menu_lft">
                <h6>DOODLE</h6>
                <ul class="d-none d-lg-block">
                  <li><i class="fa fa-star-o"></i></li>
                  <li><i class="fa fa-star-o"></i></li>
                  <li><i class="fa fa-star-o"></i></li>
                  <li><i class="fa fa-star-o"></i></li>
                  <li><i class="fa fa-star-o"></i></li>
                  <li><span>(1351+)</span></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-5 d-none d-lg-block">
              <div class="product_man_menu custm_scrl">
                <ul>
                  <li><a href="#feat_sec">Features</a></li>
                  <li><a href="#gal_sec">Gallery</a></li>
                  <li><a href="#spe_sec">Specifications</a></li>
                  <li><a href="#ship_sec">Shipping</a></li>
                  <li><a href="#rev_sec">Reviews</a></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-8">
              <div class="product_menu_setclr">
                <ul>
                  <li><p>Select Color</p></li>
                  <li>
                    <label class="chck">
                      <input type="radio" name="a" id="communitymode" checked />
                      <span
                        class="checkmark"
                        style={{"background-color": "#343a40"}}
                      ></span>
                    </label>
                  </li>
                  <li>
                    <label class="chck">
                      <input type="radio" name="a" id="communitsymode" />
                      <span
                        class="checkmark"
                        style={{"background-color": "#88cf93"}}
                      ></span>
                    </label>
                  </li>
                  <li class="d-none d-lg-block">
                    <h6>Rs 76,000</h6>
                  </li>
                  <li class="d-none d-lg-block">
                    <h6><a href="javascript:void(0)" onClick={addToCart}>BUY NOW</a></h6>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Navbar>
    <MobileNavbar/>
    <section class="product_hero_sec">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="pro_hero_txts_big">
              <div class="pro_hero_lft_imgs">
                <img
                  src="images/intro.png"
                  alt="a"
                  class="img-fluid the_best"
                />
                <svg viewBox="0 0 1400 720">
                  <text text-anchor="middle" x="50%" y="50%">DOODLE</text></svg
                ><br />
                <img
                  src="images/the_best.png"
                  alt="a"
                  style={{"padding-top": "10px"}}
                  class="img-fluid intro"
                />
              </div>

              <div class="hero_pro_img">
                <div class="product_hero_txts">
                  <img
                    src="images/Doodle-Black.png"
                    alt="a"
                    class="img-fluid"
                  />
                </div>
                <div class="product_hero_txt" style={{"display": "none"}}>
                  <img
                    src="images/Doodle-Green.png"
                    alt="a"
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="pr_hero_btm d-none d-lg-block">
              <a href="#feat_sec">
                <img src="images/mouse_icon.svg" alt="a" class="img-fluid" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="product_hero_btm">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p>
              Best in Class Foldable Electric Bike Its small size might make you
              think this is a fun little ride, but the Doodle has power to spare
              when you are in the mood for adventure. And when you don’t, you
              can fold it away. From sandy beaches to city roads, this bike has
              the oomph and the portability that will tempt you to take it with
              you wherever you may go.
            </p>

            <a href="#"
              >WATCH IT IN ACTION
              <img src="images/play_icon.png" alt="a" class="img-fluid"
            /></a>
          </div>
        </div>
      </div>
    </div>
    <section class="product_vdo_sec" id="feat_sec">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="app">
              <div id="bound-two" class="scroll-bound">
                <div class="content">
                  <video id="v0" tabindex="0" autobuffer muted preload>
                    <source
                      src="images/3D-Renders/Doodle-Full-FFMpeg.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="images/3D-Renders/Doodle-Mobile-FFMpeg.mp4"
                      type="video/mp4"
                      class="d-lg-none"
                    />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="glory_section" id="gal_sec">
      <div class="container">
        <div class="row justify-content-end">
          <div class="col-lg-11">
            <div class="row">
              <div class="col-lg-4 col-12">
                <div
                  class="glory_txt"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <h6>GALLERY</h6>
                  <h3>
                    IN ALL <br />
                    ITS GLORY
                  </h3>
                  <p>
                    Even as you hit the slopes, stay centred with absolute
                    control on a ride adapted just for you.
                  </p>
                </div>
                <div
                  class="glory_img mt-5 pt-3 d-none d-lg-block"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src="images/glory_img_sqr.png"
                    alt="a"
                    class="img-fluid"
                  />
                </div>
                <div
                  class="glory_img d-none d-lg-block"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src="images/glory_img_sqr.png"
                    alt="a"
                    class="img-fluid"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-6">
                <div
                  class="glory_img_lng mb-0 d-none d-lg-block"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src="images/glory_img_long.png"
                    alt="a"
                    class="img-fluid"
                  />
                </div>
                <div
                  class="glory_img mt-5"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src="images/glory_img_sqr.png"
                    alt="a"
                    class="img-fluid"
                  />
                </div>
                <div
                  class="glory_img"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src="images/glory_img_sqr.png"
                    alt="a"
                    class="img-fluid"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-6 d-lg-none">
                <div
                  class="glory_img mt-5"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src="images/glory_img_sqr.png"
                    alt="a"
                    class="img-fluid"
                  />
                </div>
                <div
                  class="glory_img"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src="images/glory_img_sqr.png"
                    alt="a"
                    class="img-fluid"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-12">
                <div
                  class="glory_img_lng text-left d-none d-lg-block"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img
                    src="images/glory_img_long.png"
                    alt="a"
                    class="img-fluid"
                  />
                </div>
                <div
                  class="glory_img_lng text-left d-none d-lg-block"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img src="images/long_img_2.png" alt="a" class="img-fluid" />
                </div>
                <div
                  class="glory_lng_ttx"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <p>
                    Best in Class <br />
                    Foldable Electric Bike. <br />
                    <br />Experience the bike in real life.
                  </p>
                  <a href="#">TEST RIDE</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="product_specification" id="spe_sec">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="product_specific">
              <h6>SPECIFICATIONS</h6>
              <h4>
                POWERFUL TO <br />
                THE CORE
              </h4>
            </div>
            <div class="product_spe_slider">
              <div
                class="product_specific_img"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <img
                  src="images/doodle-pulse-black.png"
                  alt="a"
                  class="img-fluid"
                />
                <div class="spe_dot_1 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>
                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_2 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>
                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_3 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_4 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_5 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_6 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_7 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_8 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_9 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_10 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_11 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
              </div>

              <div
                class="product_specific_img"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <img
                  src="images/doodle-pulse-green.png"
                  alt="a"
                  class="img-fluid"
                />
                <div class="spe_dot_1 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>
                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_2 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>
                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_3 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_4 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_5 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_6 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_7 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_8 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_9 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_10 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
                <div class="spe_dot_11 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="block_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-11">
            <div class="row">
              <div class="col-lg-3 col-6">
                <div
                  class="block_wrapp"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                  <h6>QUICK FIX</h6>
                  <p>
                    Plug and play electronic <br />
                    parts
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div
                  class="block_wrapp"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img src="images/energy_icon.svg" alt="a" class="img-fluid" />
                  <h6>LASTING BATTERY</h6>
                  <p>Long-lasting portable <br />batterycharge in 4 hours</p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div
                  class="block_wrapp"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img src="images/note_icon.svg" alt="a" class="img-fluid" />
                  <h6>NO PAPERS</h6>
                  <p>
                    No registration <br />
                    No licence
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div
                  class="block_wrapp"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <img src="images/care_icon.svg" alt="a" class="img-fluid" />
                  <h6>AFTER SALES CARE</h6>
                  <p>
                    Lifetime warranty <br />
                    Replacement guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="technical_spe_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-11">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <div class="technicalspe_head">
                  <h5>TECHNICAL SPECIFICATIONS</h5>
                </div>
              </div>
              <div class="col-lg-6 d-none d-lg-block">
                <div class="technicalspe_head text-right">
                  <a href="#"
                    ><img
                      src="images/download_icon.svg"
                      alt="a"
                      class="img-fluid"
                    />
                    DOWNLOAD BROCHURE</a
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div
                class="col-lg-12"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <div class="technical_d_flex">
                  <div class="technical_specific_box">
                    <h6>Frame</h6>
                    <p>
                      16" Unisex Aluminium <br />
                      Alloy 6061
                    </p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Suspension</h6>
                    <p>
                      Front with 60 mm <br />
                      travel and lock-out
                    </p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Rim</h6>
                    <p>
                      Aluminium Alloy double <br />
                      wall 36-Hole
                    </p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Tyres</h6>
                    <p>
                      20" x 4.0" <br />
                      Kenda*
                    </p>
                  </div>
                  <div class="technical_specific_box mr-0">
                    <h6>Derailleurs</h6>
                    <p>
                      7-Speed Shimano <br />
                      Tourney
                    </p>
                  </div>
                </div>
                <div class="technical_d_flex">
                  <div class="technical_specific_box">
                    <h6>Shifters</h6>
                    <p>
                      Shimano thumb <br />
                      shifter
                    </p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Saddle</h6>
                    <p>
                      Double-stitched <br />
                      PU hydrodyme <br />
                      soft cushion saddle
                    </p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Pedals</h6>
                    <p>Aluminium Alloy</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Brakes</h6>
                    <p>Dual Disc</p>
                  </div>
                  <div class="technical_specific_box mr-0">
                    <h6>Crank Set</h6>
                    <p>Aluminium Alloy</p>
                  </div>
                </div>
                <div class="technical_d_flex">
                  <div class="technical_specific_box">
                    <h6>BB Set</h6>
                    <p>Squared tapered</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Stand</h6>
                    <p>
                      Chainstay mounted <br />
                      boot type
                    </p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Handlebar</h6>
                    <p>
                      580 mm Aluminium <br />
                      Alloy
                    </p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Stem</h6>
                    <p>110 mm</p>
                  </div>
                  <div class="technical_specific_box mr-0">
                    <h6>Seat Post</h6>
                    <p>Adjustable</p>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="tech_bttns">
                  <a href="#">VIEW ALL FEATURES</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="product_review_sec" id="rev_sec">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="pro_review_head">
              <h5>REVIEWS</h5>
              <h3>WHAT OUR CUSTOMERS SAY</h3>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-11 d-none d-lg-block">
            <div
              class="customer_rev_flexs"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <div class="customer_rev_wapp">
                <div class="d-flex justify-content-between">
                  <h6>Ajay Khatri</h6>
                  <span>Apr 03, 2021</span>
                </div>

                <p>
                  I had never drove the E cycle in my life, The E-motorad Trex
                  is the first which I bought. And I am very happy with the
                  model. Really it's very cost saving and alternative to
                  vehicle.I am very much satisfied with Trex and suggest
                  everyone switch to electric
                </p>

                <ul>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                </ul>
              </div>
              <div class="customer_rev_wapp">
                <div class="d-flex justify-content-between">
                  <h6>Sandeep Bhardwaj</h6>
                  <span>Apr 03, 2021</span>
                </div>

                <p>
                  Product is good and delivered on time. But they send me rear
                  mudguard without attachment. And there is no marking for
                  height adjustment on saddle/seat rod which is shown in there
                  individual emotorad site.
                </p>

                <ul class="mt-5">
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                </ul>
              </div>
              <div class="customer_rev_wapp">
                <div class="d-flex justify-content-between">
                  <h6>Kamal K</h6>
                  <span>Apr 03, 2021</span>
                </div>

                <p>
                  The best in its class. Really amazed with the product..It
                  exceeds all my expectations. I'm getting a good range without
                  any flaws. Acceleration is very linear and comfortable.
                  Peddling is effortless and smooth. Overall a very good
                  product.
                </p>

                <ul>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                </ul>
              </div>
            </div>
            <div class="flex_rev_boxs">
              <a href="#"
                >Read all reviews
                <img src="images/arrw_rgt.svg" alt="a" class="img-fluid"
              /></a>
            </div>
          </div>
          <div class="col-12 d-lg-none">
            <div class="rev_sliders">
              <div class="customer_rev_wapp">
                <div class="d-flex justify-content-between">
                  <h6>Ajay Khatri</h6>
                  <span>Apr 03, 2021</span>
                </div>

                <p>
                  I had never drove the E cycle in my life, The E-motorad Trex
                  is the first which I bought. And I am very happy with the
                  model. Really it's very cost saving and alternative to
                  vehicle.I am very much satisfied with Trex and suggest
                  everyone switch to electric
                </p>

                <ul>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                </ul>
              </div>
              <div class="customer_rev_wapp">
                <div class="d-flex justify-content-between">
                  <h6>Sandeep Bhardwaj</h6>
                  <span>Apr 03, 2021</span>
                </div>

                <p>
                  Product is good and delivered on time. But they send me rear
                  mudguard without attachment. And there is no marking for
                  height adjustment on saddle/seat rod which is shown in there
                  individual emotorad site.
                </p>

                <ul class="mt-5">
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                </ul>
              </div>
              <div class="customer_rev_wapp">
                <div class="d-flex justify-content-between">
                  <h6>Kamal K</h6>
                  <span>Apr 03, 2021</span>
                </div>

                <p>
                  The best in its class. Really amazed with the product..It
                  exceeds all my expectations. I'm getting a good range without
                  any flaws. Acceleration is very linear and comfortable.
                  Peddling is effortless and smooth. Overall a very good
                  product.
                </p>

                <ul>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="shiping_section" id="ship_sec">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="shiping_head">
              <h3>SHIPPING</h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="shiping_lft_wrap">
              <p>
                *Increased shipping demand nationwide may cause delays in
                tracking updates from delivery partners and delays in shipping
                hubs. Shipping estimates may slightly delayed beyond the normal
                timelines.
              </p>

              <h5>DELIVERY OPTIONS</h5>

              <form action="">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Pincode"
                  />
                  <a href="#">CHECK</a>
                </div>
              </form>
              <div class="shiping_day">
                <h6>
                  <img
                    src="images/clock_ic.svg"
                    alt="a"
                    class="img-fluid"
                  /><span>Free Delivery:</span> 8 to 10 working days
                </h6>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="shiping_lft_wrap">
              <p>
                Delivery time is dependent on your distance from Pune (our
                warehouse location). We typically ship within 48 hours depending
                upon the shipping conditions across India
              </p>

              <h5>BUY ON EMI</h5>

              <div class="shiping_day">
                <h6>
                  <img
                    src="images/ticket_icon.svg"
                    alt="a"
                    class="img-fluid"
                  />No Cost EMI Available,
                  <span style={{"color": "#10b068"}}>Starts From Rs. 6189/Month</span>
                </h6>
                <a href="#"
                  >EXPLORE EMI OPTIONS
                  <img src="images/arw_rgt.svg" alt="a" class="img-fluid"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="order_now_sec">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="order_now_txt_wrap">
              <div class="ordr_nw_lft">
                <h6>Order your Doodle Now</h6>
                <p class="d-none d-lg-block">
                  Take a Test Drive to see how powerful it is
                </p>
              </div>
              <div class="ordr_nw_rgt">
                <a href="#">TEST RIDE</a>
                <a href="#">ORDER NOW</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="explore_ebike_sec">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="expo_ebike_headin text-left">
              <h5>Explore E-Bikes</h5>
            </div>
          </div>
        </div>
        <div class="row expo_bike_slider">
          <div class="col-lg-4">
            <div
              class="bike_explore_wrap"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />

              <h3>
                T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" />
              </h3>
              <p
                style={{"font-size": "15px", "line-height": "21px", "margin-bottom": "15px"}}
              >
                The TREX lets you make the most of the mountain bike. Go further
                and climb higher with our powerful motor, intuitive controls.
              </p>
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
            <div
              class="bike_explore_wrap"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <img src="images/bicycle_3.png" alt="a" class="img-fluid" />

              <h3>
                EMX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" />
              </h3>
              <p
                style={{"font-size": "15px", "line-height": "21px", "margin-bottom": "15px"}}
              >
                City riding is now a breeze as you traverse across town without
                any fuss or effort. The EMX is designed for the city; traffic,
                uneven roads and slopes included.
              </p>
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
            <div
              class="bike_explore_wrap"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <img src="images/bicycle_2.png" alt="a" class="img-fluid" />

              <h3>
                DOODLE
                <img src="images/arw_rgt.svg" alt="a" class="img-fluid" />
              </h3>
              <p
                style={{"font-size": "15px", "line-height": "21px", "margin-bottom": "15px"}}
              >
                Best in Class Foldable Electric Bike Its small size might make
                you think this is a fun little ride, but the Doodle has power to
                spare when you are in the mood for adventure.
              </p>
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
    <div class="book_ride_sticky d-lg-none">
      <div class="d-flex">
        <p>Rs 76,000</p>
        <a href="#">BUY NOW</a>
      </div>
    </div>
    <div class="wapp_sticky">
      <a href="#"><img src="images/wapp.svg" alt="a" class="img-fluid" /></a>
    </div>
    <a href="#" class="back-top-btn d-none d-lg-block">
      <i class="fa fa-angle-up"></i>
    </a>
    {/* <ScriptTag isHydrating={true} type="text/javascript" src="js/videoScroll.js" /> */}
    
    </>
  );
}
export default ProductDOODLE;