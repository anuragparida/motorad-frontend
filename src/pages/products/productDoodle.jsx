import React, { useState, useEffect, useLayoutEffect } from "react";
import Navbar from '../../components/Navbar';
import MobileNavbar from '../../components/MobileNavbar';
import Footer from '../../components/Footer';
import AOS from 'aos';
import axios from "axios";
import { server, config, checkAccess } from "../../env";
import isLoggedIn from './../../utils/checkLogin';
// import ScriptTag from 'react-script-tag';
import classnames from "classnames";
import { Link } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ProductSlider from "../../components/ProductSlider";

let images = [0, 1, 2, 3, 4];

const ProductDOODLE = (props) => {

  const [pincodes, setPincodes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [productID, setProductID] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [delivery, setDelivery] = useState(true);
  const [country, setCountry] = useState(true);
  const [subdomain, setSubdomain] = useState("");
  const [productPrice, setProductPrice] = useState({
    trex: "",
    emx: "",
    doodle: "",
    energ: "",
    trible: "",
  });
  const [allProducts, setAllProducts] = useState([]);

  const articleStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Doodle",
    "image": "https://emotorad.in/images/Doodle-Black.png",
    "description": "Best in Class Foldable Electric Bike Its small size might make you think this is a fun little ride, but the Doodle has power to spare when you are in the mood for adventure. And when you don’t, you can fold it away. From sandy beaches to city roads, this bike has the oomph and the portability that will tempt you to take it with you wherever you may go.",
    "brand": "EMotorad",
    "offers": {
      "@type": "Offer",
      "url": "https://emotorad.in/doodle",
      "priceCurrency": "INR",
      "price": "76000",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "1500"
    }
  }

  const [visibleImagesMap, setVisibleImagesMap] = useState(
    images.reduce((map, image) => {
      map[image] = false;
      return map;
    }, {})
  );

  const loadReviews = async () => {
    await axios
      .post(server + "/api/order/review/read")
      .then((rsp) => {
        console.log(rsp);
        setReviews(rsp.data.payload);
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;

      const newVisibleImagesMap = images.reduce((map, image) => {
        map[image] = scrollTop >= image * viewportHeight;
        return map;
      }, {});

      console.log(newVisibleImagesMap);
      setVisibleImagesMap(newVisibleImagesMap);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init();
    loadProducts();
    loadPincodes();
    loadReviews();
    window.enterView({
      selector: "section",
      enter: function (el) {
        el.classList.add("entered");
      },
    });

    var frameNumber = 0,
      playbackConst = 150,
      vid = document.getElementById("v0");
    function scrollPlay() {
      var frameNumber = window.pageYOffset / playbackConst;
      // vid.currentTime = frameNumber;
      window.requestAnimationFrame(scrollPlay);
    }

    window.requestAnimationFrame(scrollPlay);
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      setDeviceType("Mobile");
    } else {
      setDeviceType("Desktop");
    }

    let full = window.location.host
    let parts = full.split('.')
    let sub = parts[0]
    // sub = 'uae';
    sub = localStorage.getItem('subDomain');
    setSubdomain(sub);
  }, [!country]);

  const loadPincodes = async () => {
    await axios
      .get(server + "/api/pin-code/read", config)
      .then((rsp) => {
        console.log(rsp);
        setPincodes(rsp.data.payload[0].code.split(","));
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  const loadProducts = async () => {
    await axios
      .get(server + "/api/product/read", config)
      .then((rsp) => {
        const filteredRsp = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"));
        // console.log(filteredRsp)
        const allProducts = rsp.data.payload;
        setAllProducts(allProducts)
        if (filteredRsp.length > 0) {
          let domain = localStorage.getItem('subDomain');
          if (domain == 'nepal' || domain == 'india' || domain == '') {
            // console.log(filteredRsp);
            setProducts(filteredRsp);
            setProductID(rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"))[0].id);
            setProductPrice({
              ...productPrice,
              trex: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("t-rex"))[0].price,
              emx: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("emx"))[0].price,
              doodle: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"))[0].price,
              energ: 0,
              trible: 0,
            })
          } else if (domain == 'uae') {
            setProducts(filteredRsp);
            setProductID(rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"))[0].id);
            setProductPrice({
              ...productPrice,
              trex: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("t-rex"))[0].price,
              energ: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("ener g"))[0].price,
              trible: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("trible"))[0].price,
              doodle: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"))[0].price,
              emx: 0,
            })
          }

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
    if (!isLoggedIn()) {
      window.location.href = "/login";
    }
    else {
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
      "id": productID,
    };
    console.log("param", params)
    await axios
      .post(server + "/api/cart/add", params, config)
      .then((rsp) => {
        console.log(rsp.data); //CHANGE THIS
        window.location.href = "/cart";
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  return (
    <>
      <Navbar setCountry={setCountry} country={country}>

        {
          (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
            <script type="application/ld+json">
              {JSON.stringify(articleStructuredData)}
            </script>
            :
            ''
        }

        <section class="product_menu_sec">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-4">
                <div class="peoduct_menu_lft">
                  <h6>DOODLE</h6>
                  <ul class="d-none d-lg-block">
                    {/* <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li> */}
                    {/* <li><span>(1351+)</span></li> */}
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

                    {
                      products.map(prod => (
                        <li>
                          <label class="chck">
                            <input type="radio" checked={prod.id === productID} onChange={() => {
                              setProductID(prod.id);
                            }} />
                            <span class="checkmark" style={{ "background": prod.color == "light-green" ? "green" : prod.color }}></span>
                          </label>
                        </li>
                      ))
                    }

                    <li class="d-none d-lg-block">
                      {
                        (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                          <h6>Rs {productPrice.doodle.toLocaleString()}</h6>
                          : (subdomain == 'uae') ?
                            <h6>AED 3,499</h6>
                            :
                            <h6>Rs 37,133</h6>
                      }
                    </li>
                    <li class="d-none d-lg-block">
                      <h6>{products.length > 0 && <a href="javascript:void(0)" onClick={addToCart}>BUY NOW</a>}</h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Navbar>
      <MobileNavbar />
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
                    <text text-anchor="middle" x="50%" y="50%">DOODLE</text></svg><br />
                  <img
                    src="images/THE_ADVENTURER.png"
                    alt="a"
                    style={{ "padding-top": "10px" }}
                    class="img-fluid intro"
                  />
                </div>

                <div class="hero_pro_img">
                  <div class="product_hero_txts">

                    {
                      (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                        products.length > 0 &&
                          products.find(prod => prod.id === productID) ?
                          <img
                            src={products.find(prod => prod.id === productID).banner === "/uploads/product_banner/doodle-pulse-black.png" ? "images/Doodle-Black.png" : "images/Doodle-Green.png"}
                            alt="a"
                            class="img-fluid"
                          />
                          :
                          <img
                            src="images/Doodle-Green.png"
                            alt="a"
                            class="img-fluid"
                          />
                        : (subdomain == 'uae') ?
                          products.length > 0 &&
                            products.find(prod => prod.id === productID) ?
                            <img
                              src={products.find(prod => prod.id === productID).banner === "/uploads/product_banner/Doodle-Black.png" ? "images/Doodle-Black.png" : "images/Doodle-Green.png"}
                              alt="a"
                              class="img-fluid"
                            />
                            :
                            <img
                              src="images/Doodle-Green.png"
                              alt="a"
                              class="img-fluid"
                            />
                          : ""
                    }
                  </div>
                  {/* <div class="product_hero_txt" style={{"display": "none"}}>
                  <img
                    src="images/Doodle-Green.png"
                    alt="a"
                    class="img-fluid"
                  />
                </div> */}
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
                Your weekend rides just got better with the foldable Doodle. Its size might make it seem like a fun little ride, but Doodle has power to spare when you are in the mood for adventure. Fold the SUV of e-bikes in the back of your car and get away with the ideal dune cruiser. From sandy beaches to city roads, this e-bike has the oomph and portability to tempt you into taking it wherever you may go.
              </p>

              <a href="#"
              >WATCH IT IN ACTION
                <img src="images/play_icon.png" alt="a" class="img-fluid"
                /></a>
            </div>
          </div>
        </div>
      </div>


      {
        (deviceType == 'Desktop') ?
          <section class="product_vdo_sec">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div className="app">
                    <div className="sticky">
                      <div className="frame">
                        {images.map((image) => (
                          <div className={classnames("image imageRotate", `image_doodle_${image}`, {
                            image_visible: visibleImagesMap[image]
                          })}
                            key={image}
                            id={"image_" + image}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          :
          <section class="product_vdo_sec" id="feat_sec">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="app">
                    <div id="bound-two" class="scroll-bound">
                      <div class="content">
                        <video id="v0" tabindex="0" autobuffer muted preload>
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
      }

      {/* <section class="product_vdo_sec" id="feat_sec" style={{ display: 'none' }}>
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
    </section> */}



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
                    <h6 className="galleryTitle">GALLERY</h6>
                    <h3 style={{ fontSize: '40px', lineHeight: '45px' }}>
                      THE ULTIMATE <br />
                      EYE-CATCHER
                    </h3>
                    <p>
                      Foldable, reliable and comfortable take form in the trifecta of perfection that is Doodle.
                    </p>
                  </div>
                  <div
                    class="glory_img mt-5 pt-3 d-none d-lg-block"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    <img
                      src="images/doodle/11zon_resized.jpg"
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
                      src="images/doodle/11zon_resized_7.jpg"
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
                      src="images/doodle/11zon_resized_2.jpg"
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
                      src="images/doodle/11zon_resized_5.jpg"
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
                      src="images/doodle/11zon_resized_6.jpg"
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
                      src="images/doodle/11zon_resized_7.jpg"
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
                      src="images/doodle/11zon_resized.jpg"
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
                      src="images/doodle/11zon_resized_3.jpg"
                      alt="a"
                      class="img-fluid"
                    />
                  </div>
                  <div
                    class="glory_img_lng text-left d-none d-lg-block"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    <img src="images/doodle/11zon_resized_4.jpg" alt="a" class="img-fluid" />
                  </div>
                  <div
                    class="glory_lng_ttx"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    <p>
                      Doodle is your partner <br /> on any adventure. <br /> <br />
                      Experience the power of <br /> an e-bike in real life.
                    </p>
                    <a href="/book">TEST RIDE</a>
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
                  {/* <div class="spe_dot_1 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>
                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div> */}
                  <div class="spe_dot_2 d-none d-lg-block doodle_motor">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>
                    <div class="spe_dot_ol">
                      <h6>Motor</h6>
                      <p>250W 36V Rear Hub BLDC</p>
                    </div>
                  </div>
                  <div class="spe_dot_3 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Pedal Asist Sensor</h6>
                      <p>5-Level Pedal Asist Sensor</p>
                    </div>
                  </div>
                  {/* <div class="spe_dot_4 d-none d-lg-block">
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
                </div> */}
                  <div class="spe_dot_6 d-none d-lg-block doodle_battery">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>10.4 Ah 36 Volt</p>
                      <p>Lithium-ion</p>
                      <p>Detachable Battery</p>
                    </div>
                  </div>
                  {/* <div class="spe_dot_7 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div> */}
                  <div class="spe_dot_8 d-none d-lg-block doodle_lights">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Lights</h6>
                      <p>High Luminosity Front</p>
                      <p>Rear LED Lights</p>
                      <p>With Integrated Horn</p>
                    </div>
                  </div>
                  {/* <div class="spe_dot_9 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div> */}
                  <div class="spe_dot_10 d-none d-lg-block doodle_display">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>LCD Display</h6>
                      <p>3-Inch Multifunctional</p>
                      <p>LCD Display</p>
                    </div>
                  </div>
                  <div class="spe_dot_11 d-none d-lg-block doodle_breaks">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>E-Braks</h6>
                      <p>Front And Rear</p>
                      <p>E-braks For Power</p>
                      <p>Cutoff While Braking</p>
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

                  {/* <div class="spe_dot_1 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>
                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div> */}
                  <div class="spe_dot_2 d-none d-lg-block doodle_derailliurs">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>
                    <div class="spe_dot_ol">
                      <h6>Motor</h6>
                      <p>250W 36V Rear Hub BLDC</p>
                    </div>
                  </div>
                  <div class="spe_dot_3 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Pedal Asist Sensor</h6>
                      <p>5-Level Pedal Asist Sensor</p>
                    </div>
                  </div>
                  <div class="spe_dot_4 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Saddle</h6>
                      <p>Double-stitched PU</p>
                      <p>hydrodyne soft</p>
                      <p>cushion saddle</p>
                    </div>
                  </div>
                  {/*<div class="spe_dot_5 d-none d-lg-block">
                  <div class="dot">
                    <div class="dot-pulse"></div>
                  </div>

                  <div class="spe_dot_ol">
                    <h6>Battery</h6>
                    <p>10 36V Lithium-Ion</p>
                  </div>
                </div> */}
                  <div class="spe_dot_6 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>10.4 Ah 36 Volt</p>
                      <p>Lithium-ion</p>
                      <p>Detachable Battery</p>
                    </div>
                  </div>
                  <div class="spe_dot_7 d-none d-lg-block doodle_tyre">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>10 36V Lithium-Ion</p>
                    </div>
                  </div>
                  <div class="spe_dot_8 d-none d-lg-block doodle_spe_light">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Lights</h6>
                      <p>High Luminosity Front</p>
                      <p>Rear LED Lights</p>
                      <p>With Integrated Horn</p>
                    </div>
                  </div>
                  <div class="spe_dot_9 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Disk Brakes</h6>
                      <p>Front and rear disk</p>
                      <p>brakes for greater</p>
                      <p>stopping power</p>
                    </div>
                  </div>
                  <div class="spe_dot_10 d-none d-lg-block doodle_spe_display">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>LCD Display</h6>
                      <p>3-Inch Multifunctional</p>
                      <p>LCD Display</p>
                    </div>
                  </div>
                  <div class="spe_dot_11 d-none d-lg-block doodle_spe_break">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>E-Braks</h6>
                      <p>Front And Rear</p>
                      <p>E-braks For Power</p>
                      <p>Cutoff While Braking</p>
                    </div>
                  </div>

                  {/* <div class="spe_dot_1 d-none d-lg-block">
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
                </div> */}



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
                  style={{ display: 'flex', flexWrap: 'wrap' }}
                >
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
                  <div class="technical_specific_box">
                    <h6>Mudguards</h6>
                    <p>Yes</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Bike weight</h6>
                    <p>30kg</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Front Hub</h6>
                    <p>Quick-release</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Battery</h6>
                    <p>10 Ah 36V <br /> Lithium-Ion </p>
                  </div>
                  <div class="technical_specific_box mr-0">
                    <h6>Top speed</h6>
                    <p>25 km/hr</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Range</h6>
                    <p>35+ Km on Throttle<br />50+ Km on PAS</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Motor</h6>
                    <p>36V, 250W, <br /> BLDC <br /> Rear Hub Motor</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Charger</h6>
                    <p>2A charger, <br />3-4 hrs to fully <br /> charge the battery</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>IP certification</h6>
                    <p>IP 65 protected</p>
                  </div>
                  <div class="technical_specific_box mr-0">
                    <h6>Display</h6>
                    <p>3" LCD 866 <br /> display</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Operation <br /> Modes</h6>
                    <p>a. Mechanical <br />
                      b. 5 levels of <br />
                      pedal assist <br />
                      c. Throttle mode <br />
                      d. Cruise mode <br />
                      e. Walk mode</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Lights</h6>
                    <p>LED head and <br /> rear lamps <br /> withintegrated horn
                    </p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Rider weight</h6>
                    <p>Up to 120Kg</p>
                  </div>
                  <div class="technical_specific_box">
                    <h6>Rider height</h6>
                    <p>4'10" to 6'4"</p>
                  </div>
                  <div class="technical_specific_box mr-0">
                    <div style={{ display: 'none' }}>
                      <h6>Display</h6>
                      <p>3" LCD 866 <br /> display</p>
                    </div>
                  </div>



                </div>
                {/* <div class="col-12">
                <div class="tech_bttns">
                  <a href="#">VIEW ALL FEATURES</a>
                </div>
              </div> */}
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

          {
            reviews.length > 0 ?
              <Carousel>
                {
                  reviews.map(r => (
                    <div>
                      <div class="customer_rev_wapp">
                        <div class="d-flex justify-content-between">
                          <h6>{r.userName}</h6>
                          <span>{r.created_at.split("T")[0]}</span>
                        </div>
                        <p>
                          {r.message}
                        </p>

                        <ul>
                          <li><i class="fa fa-star" style={{ "color": r.rating >= 1 ? "#10b068" : "grey" }}></i></li>
                          <li><i class="fa fa-star" style={{ "color": r.rating >= 2 ? "#10b068" : "grey" }}></i></li>
                          <li><i class="fa fa-star" style={{ "color": r.rating >= 3 ? "#10b068" : "grey" }}></i></li>
                          <li><i class="fa fa-star" style={{ "color": r.rating >= 4 ? "#10b068" : "grey" }}></i></li>
                          <li><i class="fa fa-star" style={{ "color": r.rating >= 5 ? "#10b068" : "grey" }}></i></li>
                        </ul>
                      </div>
                    </div>
                  ))
                }
              </Carousel>
              :
              <></>
          }



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
                      id="pincode_inp"
                    />
                    <a href="javascript:void(0)" onClick={() => {
                      if (pincodes.includes(document.getElementById("pincode_inp").value)) {
                        setDelivery(true)
                      } else {
                        setDelivery(false)
                      }
                    }}>CHECK</a>
                  </div>
                </form>
                <div class="shiping_day">
                  <h6>
                    <img
                      src="images/clock_ic.svg"
                      alt="a"
                      class="img-fluid"
                    />{
                      delivery ?
                        <><span>Free Delivery:</span> 8 to 10 working days</>
                        :
                        <><span>Unfortunately,</span> we don't deliver to your location</>
                    }
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
                    <span style={{ "color": "#10b068" }}>Starts From Rs. 6189/Month</span>
                  </h6>
                  <a href="/emi"
                  >EXPLORE EMI OPTIONS
                    <img src="images/arw_rgt.svg" alt="a" class="img-fluid"
                    /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="order_now_sec" style={{ "background-image": "url(images/doodle/doodleL.jpg)" }}>
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
                  <a href="/book">TEST RIDE</a>
                  <a href="javascript:void(0)" onClick={addToCart}>ORDER NOW</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="explore_ebike_sec d-none" >
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="expo_ebike_headin">
                <h5>Explore E-Bikes</h5>
              </div>
            </div>
          </div>
          {
            (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
              <div class="row expo_bike_slider">
                <div class="col-lg-4">
                  <Link to="/trex">
                    <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                      <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />

                      <h3>T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                          <td>
                            {
                              (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                                'Rs '
                                : (subdomain == 'uae') ?
                                  'AED '
                                  :
                                  'Rs '
                            }
                            {productPrice.doodle.toLocaleString()}
                          </td>
                          <td>
                            {allProducts.filter(prod => prod.name.toLowerCase().includes("t-rex")).
                              map(prod => (

                                <i class="fa fa-circle" style={{ "color": prod.color }}>&nbsp;</i>

                              ))}
                          </td>
                        </tr>
                      </table>
                      <div class="explore_bttn row mx-auto">
                        <Link to="/trex">Buy Now</Link>
                      </div>
                    </div>
                  </Link>
                </div>

                <div class="col-lg-4">
                  <Link to="/emx">
                    <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                      <img src="images/bicycle_3.png" alt="a" class="img-fluid" />

                      <h3>EMX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                          <td>10.4 Ah</td>
                        </tr>
                        <tr>
                          <td>Starting From</td>
                          <td>Colors</td>
                        </tr>
                        <tr>
                          <td>
                            {
                              (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                                'Rs '
                                : (subdomain == 'uae') ?
                                  'AED '
                                  :
                                  'Rs '
                            }
                            {productPrice.emx.toLocaleString()}
                          </td>
                          <td>
                            {allProducts.filter(prod => prod.name.toLowerCase().includes("emx")).
                              map(prod => (

                                <i class="fa fa-circle" style={{ "color": prod.color }}>&nbsp;</i>

                              ))}
                          </td>
                        </tr>
                      </table>
                      <div class="explore_bttn row mx-auto">
                        <Link to="/emx">Buy Now</Link>
                      </div>
                    </div>
                  </Link>
                </div>

                <div class="col-lg-4">
                  <Link to="/doodle">
                    <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                      <img src="images/bicycle_2.png" alt="a" class="img-fluid" />

                      <h3>DOODLE <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                          <td>10 Ah</td>
                        </tr>
                        <tr>
                          <td>Starting From</td>
                          <td>Colors</td>
                        </tr>
                        <tr>
                          <td>
                            {
                              (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                                'Rs '
                                : (subdomain == 'uae') ?
                                  'AED '
                                  :
                                  'Rs '
                            }
                            {productPrice.doodle.toLocaleString()}
                          </td>
                          <td>
                            {products.
                              map(prod => (

                                <i class="fa fa-circle" style={{ "color": prod.color }}>&nbsp;</i>

                              ))}
                          </td>
                        </tr>
                      </table>
                      <div class="explore_bttn row mx-auto">
                        <Link to="/doodle">Buy Now</Link>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              : (subdomain == 'uae') ?
                <div class="row expo_bike_slider">
                  <div class="col-lg-3">
                    <Link to="/trex">
                      <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                        <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />

                        <h3>T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                            <td>AED {productPrice.trex.toLocaleString()}</td>
                            <td>
                              {allProducts.filter(prod => prod.name.toLowerCase().includes("t-rex")).
                                map(prod => (

                                  <i class="fa fa-circle" style={{ "color": prod.color }}>&nbsp;</i>

                                ))}
                            </td>
                          </tr>
                        </table>
                        <div class="explore_bttn row mx-auto">
                          <Link to="/trex">Buy Now</Link>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div class="col-lg-3">
                    <Link to="/energ">
                      <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                        <img src="images/uae/Ener-G.png" alt="a" class="img-fluid" />

                        <h3>ENER G <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

                        <h5>FEATURES</h5>
                        <table>
                          <tr>
                            <td>RANGE</td>
                            <td>110+ Kms</td>
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
                            <td>48 Volts</td>
                          </tr>
                          <tr>
                            <td>CAPACITY</td>
                            <td>20 Ah</td>
                          </tr>
                          <tr>
                            <td>Starting From</td>
                            <td>Colors</td>
                          </tr>
                          <tr>
                            <td>AED {productPrice.energ.toLocaleString()}</td>
                            <td>
                              {allProducts.filter(prod => prod.name.toLowerCase().includes("ener g")).
                                map(prod => (

                                  <i class="fa fa-circle" style={{ "color": prod.color }}>&nbsp;</i>

                                ))}
                            </td>
                          </tr>
                        </table>
                        <div class="explore_bttn row mx-auto">
                          <Link to="/energ">Buy Now</Link>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div class="col-lg-3">
                    <Link to="/doodle">
                      <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                        <img src="images/bicycle_2.png" alt="a" class="img-fluid" />

                        <h3>DOODLE <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                            <td>10 Ah</td>
                          </tr>
                          <tr>
                            <td>Starting From</td>
                            <td>Colors</td>
                          </tr>
                          <tr>
                            <td>AED {productPrice.doodle.toLocaleString()}</td>
                            <td>
                              {allProducts.filter(prod => prod.name.toLowerCase().includes("doodle")).
                                map(prod => (

                                  <i class="fa fa-circle" style={{ "color": prod.color }}>&nbsp;</i>

                                ))}
                            </td>
                          </tr>
                        </table>
                        <div class="explore_bttn row mx-auto">
                          <Link to="/doodle">Buy Now</Link>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div class="col-lg-3">
                    <Link to="/trible">
                      <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                        <img src="images/uae/Trible.png" alt="a" class="img-fluid" />

                        <h3>TRIBLE
                          <img src="images/arw_rgt.svg" alt="a" class="img-fluid" />
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
                            <td>AED {productPrice.trible.toLocaleString()}</td>
                            <td>
                              {allProducts.filter(prod => prod.name.toLowerCase().includes("trible")).
                                map(prod => (

                                  <i class="fa fa-circle" style={{ "color": prod.color }}>&nbsp;</i>

                                ))}
                            </td>
                          </tr>
                        </table>
                        <div class="explore_bttn row mx-auto">
                          <Link to="/trible">Buy Now</Link>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                :
                <div class="row expo_bike_slider">
                  <div class="col-lg-4">
                    <Link to="/trex">
                      <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                        <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />

                        <h3>T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                            <td>
                              {/* Colors */}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {
                                (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                                  'Rs '
                                  : (subdomain == 'uae') ?
                                    'AED '
                                    :
                                    'Rs '
                              }
                              {productPrice.doodle.toLocaleString()}
                            </td>
                            <td>
                              {/* <i class="fa fa-circle"></i> <i class="fa fa-circle"></i> */}
                            </td>
                          </tr>
                        </table>
                        <div class="explore_bttn row mx-auto">
                          <Link to="/trex">Buy Now</Link>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div class="col-lg-4">
                    <Link to="/energ">
                      <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                        <img src="images/uae/Ener-G.png" alt="a" class="img-fluid" width="75%" />
                        <h3>ENER G <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                            <td>10.4 Ah</td>
                          </tr>
                          <tr>
                            <td>Starting From</td>
                            <td>
                              {/* Colors */}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {
                                (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                                  'Rs '
                                  : (subdomain == 'uae') ?
                                    'AED '
                                    :
                                    'Rs '
                              }
                              {productPrice.energ.toLocaleString()}
                            </td>
                            <td>
                              {/* <i class="fa fa-circle" style={{ "color": "#DBFF00" }}></i> */}
                            </td>
                          </tr>
                        </table>
                        <div class="explore_bttn row mx-auto">
                          <Link to="/energ">Buy Now</Link>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div class="col-lg-4">
                    <Link to="/doodle">
                      <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                        <img src="images/bicycle_2.png" alt="a" class="img-fluid" />

                        <h3>DOODLE <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                            <td>10 Ah</td>
                          </tr>
                          <tr>
                            <td>Starting From</td>
                            <td>
                              {/* Colors */}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {
                                (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                                  'Rs '
                                  : (subdomain == 'uae') ?
                                    'AED '
                                    :
                                    'Rs '
                              }
                              {productPrice.doodle.toLocaleString()}
                            </td>
                            <td>
                              {/* <i class="fa fa-circle text-dark"></i> <i class="fa fa-circle" style={{ "color": "#10B068" }}></i> */}
                            </td>
                          </tr>
                        </table>
                        <div class="explore_bttn row mx-auto">
                          <Link to="/doodle">Buy Now</Link>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
          }
        </div>
      </section>

      <ProductSlider />
      <Footer />
      <div class="book_ride_sticky d-lg-none">
        <div class="d-flex">

          <a href="javascript:void(0)" onClick={addToCart}><p>   
                {
            (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
              'Rs '
              : (subdomain == 'uae') ?
                'AED '
                :
                'Rs '
          } {productPrice.doodle.toLocaleString()}</p> BUY NOW</a>
        </div>
      </div>
      <a href="#" class="back-top-btn d-none d-lg-block">
        <i class="fa fa-angle-up"></i>
      </a>
      {/* <ScriptTag isHydrating={true} type="text/javascript" src="js/videoScroll.js" /> */}

    </>
  );
}
export default ProductDOODLE;