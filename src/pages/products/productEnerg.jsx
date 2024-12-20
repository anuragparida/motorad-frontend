import React, { useState, useEffect, useLayoutEffect } from "react";
import Navbar from '../../components/Navbar';
import MobileNavbar from '../../components/MobileNavbar';
import Footer from '../../components/Footer';
import AOS from 'aos';
import axios from "axios";
import { server, config, checkAccess } from "../../env";
import isLoggedIn from './../../utils/checkLogin';
import { render } from "react-dom";
import classnames from "classnames";
import { Link } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { VideoScroll } from 'react-video-scroll'
import ProductSlider from "../../components/ProductSlider";
import PageLoader from "../../components/PageLoader";
import {Helmet} from "react-helmet";


let images = [0, 1, 2, 3, 4];



const ProductEnerg = (props) => {

    const [pincodes, setPincodes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState([]);
    const [currProduct, setCurrProduct] = useState({});
    const [productID, setProductID] = useState("");
    const [deviceType, setDeviceType] = useState("");
    const [delivery, setDelivery] = useState(true);
    const [subdomain, setSubdomain] = useState("");
    const [country, setCountry] = useState(true);
    const [productPrice, setProductPrice] = useState({
        trex: "",
        emx: "",
        doodle: "",
        energ: "",
        trible: "",
    });
    const [allProducts, setAllProducts] = useState([]);
    const [loader, setLoader] = useState(false);

    const EnergySEO = {
        "@context": "https://schema.org/", 
        "@type": "Product", 
        "name": "ENER-G",
        "image": "https://uae.emotorad.in/images/uae/ENERG/Top-Part/White.png",
        "description": "Designed to last for miles, Ener-G can keep going when others have given up. Packed with everything you need, this long range, dual-seater moped suits your different needs.",
        "brand": "EMotorad",
        "offers": {
          "@type": "Offer",
          "url": "https://uae.emotorad.in/energ",
          "priceCurrency": "AED",
          "price": "3,599",
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

    const setStyles = (wrapperEl, videoEl, playbackRate) => {
        wrapperEl.style.marginTop = `calc(180% - ${Math.floor(videoEl.duration) *
            playbackRate +
            'px'})`
        wrapperEl.style.marginBottom = `calc(180% - ${Math.floor(videoEl.duration) *
            playbackRate +
            'px'})`
    }


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
        (async () => {
            setLoader(true)
            AOS.init();
            await loadProducts();
            await loadPincodes();
            await loadReviews();
            window.enterView({
                selector: "section",
                enter: function (el) {
                    el.classList.add("entered");
                },
            });

            var frameNumber = 0,
                playbackConst = 100,
                vid = document.getElementById("v0");
            function scrollPlay() {
                var frameNumber = window.pageYOffset / playbackConst;
                // console.log(vid);
                if (vid != null) {
                    vid.currentTime = frameNumber;
                    window.requestAnimationFrame(scrollPlay);
                }
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
            // if(sub == 'http://localhost:3000') {
            //     sub = '';
            // }
            // setSubdomain(sub);
            sub = localStorage.getItem('subDomain');
            setSubdomain(sub);
            setLoader(false)
        })()
    }, [country]);

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
                console.log(rsp);
                const filteredRsp = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("ener g"));
                const allProducts = rsp.data.payload;
                setAllProducts(allProducts)
                if (filteredRsp.length > 0) {
                    let domain = localStorage.getItem('subDomain');
                    if (domain == 'nepal' || domain == 'india' || domain == '') {
                        console.log(filteredRsp);
                        setProducts(filteredRsp);
                        setProductID(rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("ener g"))[0].id);
                        setCurrProduct(rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("ener g"))[0]);
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
                        setProductID(rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("ener g"))[0].id);
                        setCurrProduct(rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("ener g"))[0]);
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

    const changeColor = (id) => {
        if(id == 5) {
            document.getElementsByClassName("checkmark").className = "whitechecked";
        } else {
            document.getElementsByClassName("checkmark").className = 'checkmark';
        }
    }

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(EnergySEO)}
                </script>
            </Helmet>
            <PageLoader loader={loader} />
            <Navbar setCountry={setCountry} country={country}>
                <section class="product_menu_sec">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 col-4">
                                <div class="peoduct_menu_lft">
                                    <h6>ENER - G</h6>
                                    <ul class="d-none d-lg-block">
                                    <li><i class="fa fa-star" style={{ "color": reviews.reduce((r, t)=>r+t.rating, 0) >= 1 ? "green" : "grey" }}></i></li>
                                        <li><i class="fa fa-star" style={{ "color": reviews.reduce((r, t)=>r+t.rating, 0) >= 2 ? "green" : "grey" }}></i></li>
                                        <li><i class="fa fa-star" style={{ "color": reviews.reduce((r, t)=>r+t.rating, 0) >= 3 ? "green" : "grey" }}></i></li>
                                        <li><i class="fa fa-star" style={{ "color": reviews.reduce((r, t)=>r+t.rating, 0) >= 4 ? "green" : "grey" }}></i></li>
                                        <li><i class="fa fa-star" style={{ "color": reviews.reduce((r, t)=>r+t.rating, 0) >= 5 ? "green" : "grey" }}></i></li>
                                        <li><span>({Math.floor(Math.random() * (50-20+1) + 20)}+)</span></li>
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

                                        {products.map(prod => (
                                            <li>
                                                <label class="chck">
                                                    <input type="radio" checked={prod.id === productID} onChange={() => {
                                                        setProductID(prod.id); changeColor(prod.id);
                                                        setCurrProduct(prod);
                                                    }} />    
                                                    <span class="checkmark whitechecked" style={{ "background": prod.color }}></span>
                                                </label>
                                            </li>
                                        ))}

                                        <li class="d-none d-lg-block">
                                            <h6>AED {productPrice.energ.toLocaleString()}</h6>
                                        </li>
                                        <li class="d-none d-lg-block">
                                        {
                                                currProduct.stock === "yes" ?
                                                <h6>{products.length > 0 && <a href="javascript:void(0)" onClick={addToCart}>BUY NOW</a>}</h6>
                                                :
                                                <h6>{products.length > 0 && <a href="javascript:void(0)" class="disabled">Out of Stock</a>}</h6>
                                            }
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
                                        <text text-anchor="middle" x="50%" y="50%">ENER-G</text>
                                    </svg>
                                    <img
                                        src="images/uae/ENERG/SERIOUS_UTILITY.png"
                                        alt="a"
                                        class="img-fluid intro"
                                    />
                                </div>

                                <div class="hero_pro_img">
                                    <div class="product_hero_txts">
                                        {
                                            products.length > 0 &&
                                                products.find(prod => prod.id === productID) ?
                                                <img
                                                    src={"https://uae-api.emotorad.com/" + products.find(prod => prod.id === productID).banner}
                                                    alt="a"
                                                    class="img-fluid"
                                                />
                                                :


                                                <img
                                                    src="images/uae/ENERG/Top-Part/White.png"
                                                    alt="a"
                                                    class="img-fluid"
                                                />
                                        }
                                    </div>
                                    {/* <div class="product_hero_txt" style={{ "display": "none" }}>
                    <img
                      src="images/t-rex-hero-yellow.png"
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
                            Designed to last for miles, ENER-G can keep going when others have given up. Packed with everything you need, this long-range, 2-seater mini scooter is a perfect motorcycle replacement that you can ride all day. With this one e-bike, you can do anything you want, handle your daily tasks and any type of riding that comes your way. This moped-style utility bike possesses cargo and passenger features with a large headlight, indicators and an 8" LCD display.
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
                                                {/* {images.map((image) => (
                      <div  
                        className={classnames("image", `image_${image}`, {
                          image_visible: visibleImagesMap[image]
                        })}
                        key={image}
                      />
                    ))} */}
                                                {images.map((image) => (
                                                    <div className={classnames("image imageRotate", `image_energ_${image}`, {
                                                        image_visible: visibleImagesMap[image]
                                                    })}
                                                        key={image}
                                                        id={"image_energ_" + image}
                                                    // style={{backgroundPosition: 'calc(100% + 30px) calc(100% + 30px);' }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    : ""
                // <section class="product_vdo_sec" id="feat_sec">

                //     <div class="container">
                //         <div class="row">
                //             <div class="col-lg-12">
                //                 <div class="app">
                //                     <div id="bound-two" class="scroll-bound">
                //                         <div class="content">
                //                             <video id="v0" tabindex="0" autobuffer muted preload>
                //                                 <source
                //                                     src="images/uae/ENERG/EnerG-Mobile.mp4"
                //                                     type="video/mp4"
                //                                     class="d-lg-none"
                //                                 />
                //                             </video>
                //                             {/* <VideoScroll
                //                                 onLoad={props =>
                //                                     setStyles(props.wrapperEl, props.videoEl, props.playbackRate)
                //                                 }
                //                                 playbackRate={200}
                //                                 style={{ position: 'relative' }}
                //                                 >
                //                                 <video
                //                                     tabIndex="0"
                //                                     autobuffer="autobuffer"
                //                                     preload="preload"
                //                                     style={{ width: '100%', objectFit: 'contain' }}
                //                                     playsInline
                //                                 >
                //                                     <source type="video/mp4" src="images/uae/ENERG/EnerG-Mobile.mp4" />
                //                                 </video>
                //                             </VideoScroll> */}
                //                         </div>
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </section>

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
                      src="images/3D-Renders/T-Rex-Mobile-FFMpeg.mp4"
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
                                        <h3>
                                        Beauty in <br />
                                        Functionality
                                        </h3>
                                        <p>
                                        The ideal solution for your requirements, ENER-G packs some 
                                        serious utility to suit your needs.
                                        </p>
                                    </div>
                                    <div
                                        class="glory_img mt-5 pt-3 d-none d-lg-block"
                                        data-aos="fade-up"
                                        data-aos-duration="2000"
                                    >
                                        <img
                                            src="images/Showcase/UAE/Energ/ENERG_Y_FOOTER.jpg"
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
                                            src="images/Showcase/UAE/Energ/ENERY_2.jpg"
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
                                            src="images/Showcase/UAE/Energ/ENERY_6.jpg"
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
                                            src="images/Showcase/UAE/Energ/ENERY_4.jpg"
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
                                            src="images/Showcase/UAE/Energ/ENERG_Y_FOOTER.jpg"
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
                                            src="images/Showcase/UAE/Energ/ENERG_Y_FOOTER.jpg"
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
                                            src="images/Showcase/UAE/Energ/ENERY_2.jpg"
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
                                            src="images/Showcase/UAE/Energ/ENERG_W_03.jpg"
                                            alt="a"
                                            class="img-fluid"
                                        />
                                    </div>
                                    <div
                                        class="glory_img_lng text-left d-none d-lg-block"
                                        data-aos="fade-up"
                                        data-aos-duration="2000"
                                    >
                                        <img src="images/Showcase/UAE/Energ/ENERG_W.jpg" alt="a" class="img-fluid" />
                                    </div>
                                    <div
                                        class="glory_lng_ttx"
                                        data-aos="fade-up"
                                        data-aos-duration="2000"
                                    >
                                        <p>
                                            ENER-G is a workhorse in <br /> 
                                            a small package A delivery vehicle a <br /> 
                                            two-seater mini-scooter <br />
                                            and much more <br />
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
                            <div class="">
                            {/* product_spe_slider */}
                                <div
                                    class="product_specific_img"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                >
                                    <img src="images/uae/ENERG/White-Pulse.png" alt="a" class="img-fluid" />
                                    {/* <div class="spe_dot_1 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>
                    <div class="spe_dot_ol">
                      <h6>Motor</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                    <div class="spe_dot_2 d-none d-lg-block" style={{ marginTop: "75px" }}>
                                        <div class="dot" style={{ marginLeft: "-40px" }}>
                                            <div class="dot-pulse"></div>
                                        </div>
                                        <div class="spe_dot_ol">
                                            <h6>Motor</h6>
                                            <p>250W 36V Rear Hub BLDC</p>
                                        </div>
                                    </div>
                                    <div class="spe_dot_3 d-none d-lg-block" style={{ marginTop: "60px" }}>
                                        <div class="dot" style={{ marginLeft: "30px" }}>
                                            <div class="dot-pulse"></div>
                                        </div>

                                        <div class="spe_dot_ol">
                                            <h6>Pedal Asist Sensor</h6>
                                            <p>5-level Pedal Asist Sensor</p>
                                        </div>
                                    </div>
                                    {/* <div class="spe_dot_4 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery 12</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                    {/* <div class="spe_dot_5 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                    <div class="spe_dot_6 d-none d-lg-block" style={{ marginTop: "70px" }}>
                                        <div class="dot" style={{ marginLeft: "-130px" }}>
                                            <div class="dot-pulse"></div>
                                        </div>

                                        <div class="spe_dot_ol">
                                            <h6>Lithium-Ion Battery</h6>
                                            <p>20 Ah 36 volt Lithium-ion detachable battery </p>
                                        </div>
                                    </div>
                                    {/* <div class="spe_dot_7 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                    <div class="spe_dot_8 d-none d-lg-block front_light" style={{ marginTop: "-40px" }}>
                                        <div class="dot" style={{ marginLeft: "-25px" }}>
                                            <div class="dot-pulse"></div>
                                        </div>

                                        <div class="spe_dot_ol">
                                            <h6>Front and rear lights</h6>
                                            <p>High Luminostly LED</p>
                                            <p>light with throttle</p>
                                            <p>integrated Horn</p>
                                        </div>
                                    </div>
                                    {/* <div class="spe_dot_9 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                    <div class="spe_dot_10 d-none d-lg-block" style={{ marginTop: "50px" }}>
                                        <div class="dot" style={{ marginLeft: "-40px" }}>
                                            <div class="dot-pulse"></div>
                                        </div>

                                        <div class="spe_dot_ol">
                                            <h6>LCD Display</h6>
                                            <p>8-inch Multifunctional</p>
                                            <p>LCD Display</p>
                                        </div>
                                    </div>
                                    <div class="spe_dot_11 d-none d-lg-block" style={{ marginTop: "25px" }}>
                                        <div class="dot" style={{ marginLeft: "-30px" }}>
                                            <div class="dot-pulse"></div>
                                        </div>

                                        <div class="spe_dot_ol">
                                            <h6>E-braks</h6>
                                            <p>Front and rear</p>
                                            <p>E-breaks for power</p>
                                            <p>Cutoff while braking</p>
                                        </div>
                                    </div>
                                    <div class="spe_dot_7 d-none d-lg-block" style={{ marginTop: "120px" }}>
                                        <div class="dot">
                                            <div class="dot-pulse"></div>
                                        </div>

                                        <div class="spe_dot_ol">
                                            <h6>Tyres</h6>
                                            <p>14 x 2.5" tyres</p>
                                        </div>
                                    </div>

                                </div>

                                {/* <div
                                    class="product_specific_img"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                >
                                    <img src="images/t-rex-yellow.png" alt="a" class="img-fluid" /> */}
                                {/* <div class="spe_dot_1 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>
                    <div class="spe_dot_ol">
                      <h6>Motor</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                {/* sec <div class="spe_dot_2 d-none d-lg-block motor">
                                        <div class="dot">
                                            <div class="dot-pulse"></div>
                                        </div>
                                        <div class="spe_dot_ol">
                                            <h6>Derailleurs</h6>
                                            <p>7- Speed  Shimano</p>
                                            <p>Tourney</p>
                                        </div>
                                    </div> */}
                                {/* <div class="spe_dot_3 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Pedal Asist Sensor</h6>
                      <p>5-level Pedal Asist Sensor</p>
                    </div>
                  </div> */}
                                {/* sec--<div class="spe_dot_4 d-none d-lg-block saddle">
                                        <div class="dot">
                                            <div class="dot-pulse"></div>
                                        </div>

                                        <div class="spe_dot_ol">
                                            <h6>Saddle</h6>
                                            <p>Double stitched PU</p>
                                            <p>hydrodyme soft</p>
                                            <p>cushion saddle</p>
                                        </div>
                                    </div>
                                    <div class="spe_dot_5 d-none d-lg-block">
                                        <div class="dot">
                                            <div class="dot-pulse"></div>
                                        </div>

                                        <div class="spe_dot_ol">
                                            <h6>Frame</h6>
                                            <p>17" Aluminium Alloy</p>
                                            <p>6061 Hardtail</p>
                                        </div>
                                    </div> */}
                                {/* <div class="spe_dot_6 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}

                                {/* sec-- <div class="spe_dot_7 d-none d-lg-block">
                                        <div class="dot">
                                            <div class="dot-pulse"></div>
                                        </div>

                                        <div class="spe_dot_ol">
                                            <h6>Tyres</h6>
                                            <p>26" x 2" Chanyoung tyres</p>
                                        </div>
                                    </div>
                                    <div class="spe_dot_8 d-none d-lg-block">
                                        <div class="dot">
                                            <div class="dot-pulse"></div>
                                        </div>

                                        <div class="spe_dot_ol">
                                            <h6>Suspension</h6>
                                            <p>Front Suspension with</p>
                                            <p>100mm travel and</p>
                                            <p>lock-out</p>
                                        </div>
                                    </div>
                                    <div class="spe_dot_9 d-none d-lg-block">
                                        <div class="dot">
                                            <div class="dot-pulse"></div>
                                        </div>

                                        <div class="spe_dot_ol">
                                            <h6>Brakes</h6>
                                            <p>Dual Disk Brakes for</p>
                                            <p>greater stopping power</p>
                                        </div>
                                    </div> */}
                                {/* <div class="spe_dot_10 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>LCD Display</h6>
                      <p>3-inch Multifunctional</p>
                      <p>LCD Display</p>
                    </div>
                  </div>  */}
                                {/* <div class="spe_dot_11 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>E-breaks</h6>
                      <p>Front and rear</p>
                      <p>E-breaks for power</p>
                      <p>Cutoff while braking</p>
                    </div>
                  </div>   */}
                                {/* <div class="spe_dot_1 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>
                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                {/* <div class="spe_dot_2 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>
                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                {/* <div class="spe_dot_3 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                {/* <div class="spe_dot_4 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                {/* <div class="spe_dot_5 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                {/* <div class="spe_dot_6 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                {/*<div class="spe_dot_7 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div>
                  <div class="spe_dot_8 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div>
                  <div class="spe_dot_9 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div>
                  <div class="spe_dot_10 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div>
                  <div class="spe_dot_11 d-none d-lg-block">
                    <div class="dot">
                      <div class="dot-pulse"></div>
                    </div>

                    <div class="spe_dot_ol">
                      <h6>Battery</h6>
                      <p>7.5Ah 36V Lithium-Ion</p>
                    </div>
                  </div> */}
                                {/* </div> */}



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
                                            Steel
                                        </p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Suspension</h6>
                                        <p>
                                            Front with 100 mm <br />
                                            travel and lock-out
                                        </p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Rim</h6>
                                        <p>
                                            Magnesium Aluminium Alloy
                                        </p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Tyres</h6>
                                        <p>
                                            14X2.5" Tyres
                                        </p>
                                    </div>
                                    <div class="technical_specific_box mr-0">
                                        <h6>Derailleurs</h6>
                                        <p>
                                            3 Level - Low,<br />
                                            Medium and High Tourney
                                        </p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Shifters</h6>
                                        <p>
                                            Automatic
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
                                        <p>Dual Mechanical Disc<br />
                                            Brakes with Ceramic pads,<br />
                                            Zoom brake lever

                                        </p>
                                    </div>
                                    <div class="technical_specific_box mr-0">
                                        <h6>Crank </h6>
                                        <p>Aluminium Alloy</p>
                                    </div>
                                    <div class="technical_specific_box ">
                                        <h6>Display</h6>
                                        <p>	8" multifunctional <br />LCD display</p>
                                    </div>
                                    <div class="technical_specific_box ">
                                        <h6>Charger</h6>
                                        <p>2A charger, <br />4-5 hrs to fully <br /> charge the battery</p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Handlebar</h6>
                                        <p>
                                            64 cm Aluminium <br />
                                            Alloy
                                        </p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>IP certification</h6>
                                        <p>IP65</p>
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
                                        <p>28.3kg</p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Front Hub</h6>
                                        <p>Quick-release</p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Battery</h6>
                                        <p>20 Ah <br /> Lithium-Ion </p>
                                    </div>
                                    <div class="technical_specific_box mr-0">
                                        <h6>Top speed</h6>
                                        <p>25 km/hr</p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Range</h6>
                                        <p>110+ Km on Throttle<br />50+ Km on PAS</p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Motor</h6>
                                        <p>	48V, 350W, BLDC <br />Rear Hub Motor</p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Lights</h6>
                                        <p>LED headlamps <br />
                                            LED head and rear <br /> lamps with integrated horn
                                        </p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Rider weight</h6>
                                        <p>Up to 150Kg</p>
                                    </div>
                                    <div class="technical_specific_box">
                                        <h6>Rider height</h6>
                                        <p>4'5" and above</p>
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
                                    {/* <div class="technical_specific_box mr-0">
                                        <h6>Crank </h6>
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
                                    </div> */}

                                    {/* <div class="technical_specific_box">
                                        <h6>Stem</h6>
                                        <p>110 mm</p>
                                    </div>
                                

                                
                           
                                
                              
                               

                              
                              
                                    <div class="technical_specific_box">
                                        <h6>Charger</h6>
                                        <p>2A charger, <br />3-4 hrs to fully <br /> charge the battery</p>
                                    </div>
                                  
                                    <div class="technical_specific_box mr-0">
                                        <h6>Display</h6>
                                        <p>3" LCD 866 <br /> display</p>
                                    </div>


                          
                               
                             
                                    <div class="technical_specific_box mr-0">
                                        <div style={{ display: 'none' }}>
                                            <h6>Display</h6>
                                            <p>3" LCD 866 <br /> display</p>
                                        </div>
                                    </div> */}


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

                                { 
                                    (subdomain == 'india')  ?
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
                                    :
                                    ''
                                }    
                                <div class="shiping_day">
                                    <h6>
                                        <img
                                            src="images/clock_ic.svg"
                                            alt="a"
                                            class="img-fluid"
                                        />{
                                            delivery ?
                                                <><span>Free Delivery:</span> 2 to 3 working days</>
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
                                        />
                                        { 
                                            (subdomain == 'india')  ?
                                                <>
                                                No Cost EMI Available,
                                                <span style={{ "color": "#10b068" }}>Starts From Rs. 6189/Month</span>
                                                </>
                                            :'EMI Available'
                                        }    
                                    </h6>
                                    { 
                                            (subdomain == 'india')  ?
                                                <>
                                                    <a href="/emi">EXPLORE EMI OPTIONS
                                                        <img src="images/arw_rgt.svg" alt="a" class="img-fluid"/>
                                                    </a>
                                                </>   
                                            :
                                            ''     
                                    }            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section class="order_now_sec" style={{ "background-image": "url(images/trex/trexL.jpg)" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="order_now_txt_wrap">
                                <div class="ordr_nw_lft">
                                    <h6>Order your T-Rex Now</h6>
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
            <section class="explore_ebike_sec d-none">
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

            <ProductSlider setCountry={setCountry} country={country} />
            <Footer setCountry={setCountry} country={country} />
            <div class="book_ride_sticky d-lg-none">
                <div class="d-flex">

                    <a href="javascript:void(0)" onClick={addToCart}><p>       {
                        (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                            'Rs '
                            : (subdomain == 'uae') ?
                                'AED '
                                :
                                'Rs '
                    } {productPrice.energ.toLocaleString()}</p> BUY NOW</a>
                </div>
                <a href="#" class="back-top-btn d-none d-lg-block">
                    <i class="fa fa-angle-up"></i>
                </a>
            </div>
        </>
    );
}
export default ProductEnerg;