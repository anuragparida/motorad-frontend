import React, { useEffect, useState } from "react";
import MobileNavbar from "../components/MobileNavbar";
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";
import { server, config, checkAccess } from "../env";
import WhattsApp from "../components/WhattsApp";
import ProductSlider from "../components/ProductSlider";
// import Slider from "react-slick";

// import Slider from "react-slick";


const Landing = (props) => {

    const [subdomain, setSubdomain] = useState("");
    const [country, setCountry] = useState(true);
    const [products, setProducts] = useState([]);
    const [productID, setProductID] = useState("");
    const [productPrice, setProductPrice] = useState({
        trex: "",
        emx: "",
        doodle: "",
        energ: "",
        trible: "",
        glyder: "",
        xplorer: "",
        dolphin: ""

    });

    const loadProducts = async () => {
        console.log(server)
        await axios
            .get(server + "/api/product/read", config)
            .then((rsp) => {
                console.log(rsp);
                const filteredRsp = rsp.data.payload;
                if (filteredRsp.length > 0) {
                    let domain = localStorage.getItem('subDomain');
                    if (domain == 'nepal' || domain == 'india' || domain == '') {
                        console.log(server)
                        console.log(filteredRsp);
                        setProducts(filteredRsp);
                        setProductID(rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("t-rex"))[0].id);
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
                        setProductID(rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("t-rex"))[0].id);
                        setProductPrice({
                            ...productPrice,
                            trex: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("t-rex"))[0].price,
                            energ: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("ener g"))[0].price,
                            trible: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("trible"))[0].price,
                            doodle: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"))[0].price,
                            emx: 0,
                        })
                    } else if (domain == 'japan') {
                        setProducts(filteredRsp);
                        setProductID(rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("xplorer"))[0].id);
                        setProductPrice({
                            ...productPrice,
                            xplorer: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("xplorer"))[0].price,
                            glyder: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("glyder"))[0].price,
                            dolphin: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("dolphin"))[0].price,

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
    useEffect(() => {
        AOS.init();
        loadProducts()
        let full = window.location.host
        let parts = full.split('.')
        let sub = parts[0]
        // sub = 'uae';
        sub = localStorage.getItem('subDomain');
        setSubdomain(sub);
        // setSubdomain(sub);

    }, [country]);


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    return (
        <>
            <Navbar setCountry={setCountry} country={country} />
            <MobileNavbar />

            <section class="home_hero_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 d-none d-lg-block">
                            <div class="home_hero_bike_wrap">
                                {
                                    (subdomain == '' || subdomain == "india" || subdomain == 'nepal') ?
                                        <img src="images/Hero-Main-Gif.gif" alt="a" class="img-fluid w-100" />
                                        : (subdomain == 'uae') ?
                                            <img src="images/uae/Main-hero-UAE.gif" alt="a" class="img-fluid w-100" />
                                            : (subdomain == 'japan') ?
                                                <img src="images/Japan/Top-Part/Hero-Main.gif" alt="a" class="img-fluid w-100" />
                                                :
                                                <img src="images/manin-hero-img.gif" alt="a" class="img-fluid w-100" />
                                }
                            </div>
                            <div class="home_hero_bike_title">
                                {
                                    (subdomain == '' || subdomain == "india" || subdomain == 'nepal') ?
                                        <>
                                            <Link to="/doodle"><h3 class="text-outline text-outline-hover" data-text="DOODLE">DOODLE</h3></Link>
                                            <Link to="/trex"><h3 class="text-outline text-outline-hover" data-text="T-REX">T-REX</h3></Link>
                                            <Link to="/emx"><h3 class="text-outline text-outline-hover" data-text="EMX">EMX</h3></Link>
                                        </>
                                        : (subdomain == 'uae') ?
                                            <>
                                                <Link to="/trible"><h3 class="text-outline text-outline-hover" data-text="TRIBLE">TRIBLE</h3></Link>
                                                <Link to="/trex"><h3 class="text-outline text-outline-hover" data-text="T-REX">T-REX</h3></Link>
                                                <Link to="/energ"><h3 class="text-outline text-outline-hover" data-text="ENER-G">ENER-G</h3></Link>
                                                <Link to="/doodle"><h3 class="text-outline text-outline-hover" data-text="DOODLE">DOODLE</h3></Link>
                                            </>
                                            : (subdomain == 'japan') ?
                                                <>
                                                    <Link to="/xplorer"><h3 class="text-outline text-outline-hover" data-text="XPLORER">XPLORER</h3></Link>
                                                    <Link to="/dolphin"><h3 class="text-outline text-outline-hover" data-text="DOLPHIN">DOLPHIN</h3></Link>
                                                    <Link to="/glyder"><h3 class="text-outline text-outline-hover" data-text="GLYDER">GLYDER</h3></Link>
                                                </>
                                                :
                                                <>
                                                    <Link to="/doodle"><h3 class="text-outline text-outline-hover" data-text="DOODLE">DOODLE</h3></Link>
                                                    <Link to="/trex"><h3 class="text-outline text-outline-hover" data-text="T-REX">T-REX</h3></Link>
                                                    <Link to="/emx"><h3 class="text-outline text-outline-hover" data-text="EMX">EMX</h3></Link>
                                                </>
                                }
                            </div>
                        </div>
                    </div>
                    <div class="row d-lg-none">
                        {
                            (subdomain == '' || subdomain == "india" || subdomain == 'nepal') ?
                                <>
                                    <div class="col-12">
                                        <div class="moobile_cycle mt_50">
                                            <img src="images/EMX.gif" alt="a" class="img-fluid w-100" />
                                        </div>
                                        <a href="/emx">
                                            <div class="home_hero_bike_title">

                                                <h3 class="text-outline text-outline-hover" data-text="EMX">EMX</h3>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="col-12">
                                        <div class="moobile_cycle">
                                            <img src="images/DOODLE.gif" alt="a" class="img-fluid w-100" />
                                        </div>
                                        <div class="home_hero_bike_title">

                                            <h3 class="text-outline text-outline-hover" data-text="DOODLE">DOODLE</h3>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="moobile_cycle">
                                            <img src="images/T-REX.gif" alt="a" class="img-fluid w-100" />
                                        </div>
                                        <div class="home_hero_bike_title">

                                            <h3 class="text-outline text-outline-hover" data-text="T-REX">T-REX</h3>
                                        </div>
                                    </div>
                                </>
                                : (subdomain == 'uae') ?
                                    <>

                                        <div class="col-12">
                                            <div class="moobile_cycle mt_50">
                                                <img src="images/uae/Trible.gif" alt="a" class="img-fluid w-100" />
                                            </div>
                                            <a href="/trible">
                                                <div class="home_hero_bike_title">
                                                    <h3 class="text-outline text-outline-hover" data-text="TRIBLE">TRIBLE</h3>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-12">
                                            <div class="moobile_cycle">
                                                <img src="images/uae/TREX.gif" alt="a" class="img-fluid w-100" />
                                            </div>
                                            <div class="home_hero_bike_title">
                                                <h3 class="text-outline text-outline-hover" data-text="T-REX">T-REX</h3>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="moobile_cycle">
                                                <img src="images/uae/TREX.gif" alt="a" class="img-fluid w-100" />
                                            </div>
                                            <div class="home_hero_bike_title">

                                                <h3 class="text-outline text-outline-hover" data-text="ENER-G">ENER-G</h3>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="moobile_cycle">
                                                <img src="images/uae/Doodle.gif" alt="a" class="img-fluid w-100" />
                                            </div>
                                            <div class="home_hero_bike_title">
                                                <h3 class="text-outline text-outline-hover" data-text="DOODLE">DOODLE</h3>
                                            </div>
                                        </div>
                                    </>
                                    : (subdomain == 'japan') ?
                                        <>
                                            <div class="col-12">
                                                <div class="moobile_cycle mt_50">
                                                    <img src="images/Japan/Solo-Bikes-3D/Xplorer.gif" alt="a" class="img-fluid w-100" />
                                                </div>
                                                <a href="/xplorer">
                                                    <div class="home_hero_bike_title">
                                                        <h3 class="text-outline text-outline-hover" data-text="XPLORER">XPLORER</h3>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="col-12">
                                                <div class="moobile_cycle">
                                                    <img src="images/Japan/Solo-Bikes-3D/Glyder.gif" alt="a" class="img-fluid w-100" />
                                                </div>
                                                <div class="home_hero_bike_title">
                                                    <h3 class="text-outline text-outline-hover" data-text="GLYDER">GLYDER</h3>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="moobile_cycle">
                                                    <img src="images/Japan/Solo-Bikes-3D/Dolphin.gif" alt="a" class="img-fluid w-100" />
                                                </div>
                                                <div class="home_hero_bike_title">
                                                    <h3 class="text-outline text-outline-hover" data-text="DOLPHIN">DOLPHIN</h3>
                                                </div>
                                            </div>      
                                        </>
                                        :
                                        <>
                                            <div class="col-12">
                                                <div class="moobile_cycle mt_50">
                                                    <img src="images/EMX.gif" alt="a" class="img-fluid w-100" />
                                                </div>
                                                <a href="/emx">
                                                    <div class="home_hero_bike_title">

                                                        <h3 class="text-outline text-outline-hover" data-text="EMX">EMX</h3>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="col-12">
                                                <div class="moobile_cycle">
                                                    <img src="images/DOODLE.gif" alt="a" class="img-fluid w-100" />
                                                </div>
                                                <div class="home_hero_bike_title">

                                                    <h3 class="text-outline text-outline-hover" data-text="DOODLE">DOODLE</h3>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="moobile_cycle">
                                                    <img src="images/T-REX.gif" alt="a" class="img-fluid w-100" />
                                                </div>
                                                <div class="home_hero_bike_title">

                                                    <h3 class="text-outline text-outline-hover" data-text="T-REX">T-REX</h3>
                                                </div>
                                            </div>
                                        </>
                        }
                    </div>
                </div>
            </section>
            <section class="dual_suspension_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="suspension_main_view">
                                <div class="tab-content" id="pills-tabContent">
                                    {
                                        (subdomain == 'india' || subdomain == 'nepal') ?
                                            <>
                                                <div class="tab-pane fade " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="dual_suspension_txt">
                                                                <h3>The Fat-Tyre <span>SUV</span> of EBikes</h3>
                                                                <p>Say hello to adventure with the foldable Doodle. Its size might make it seem like a fun little ride, but Doodle has power to spare when you are in the mood for adventure. Fold the SUV of e-bikes in the back of your car and get away with the ideal dune cruiser. From sandy beaches to city roads, this e-bike has the oomph and portability to tempt you into taking it wherever you may go.</p>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-10">
                                                                    <div class="row">
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                <h6>RANGE</h6>
                                                                                <p>55+ kms <br /> (40+ Km with throttle)</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                <h6>SPEED</h6>
                                                                                <p>25km/hr <br /> (Max Speed)</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                <h6>BRAKES</h6>
                                                                                <p>Advanced Dual <br /> Disc Brakes</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                <h6>BATTERY</h6>
                                                                                <p>36 Volts <br /> (10 Ah Powerful Battery)</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-12">
                                                                            <div class="suspension_bttns">
                                                                                <Link to="/doodle">Buy Now</Link>
                                                                                <Link to="/doodle">View More</Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                <a href="/doodle"><img src="images/DOODLE.gif" alt="a" class="img-fluid" /></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="dual_suspension_txt">
                                                                <h3>The Beast For <span>All Terrains</span></h3>
                                                                <p>Make adventure your friend as you master the trails on T-Rex with the power and build to navigate any road you wish to roam. Now, you can go further and climb higher with our powerful motor, intuitive controls and lightweight, yet rigid frames. Designed for all terrains, each part is designed to seamlessly integrate into the best possible ride.</p>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-10">
                                                                    <div class="row">
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                <h6>RANGE</h6>
                                                                                <p>50+ kms <br /> (35+ Km with throttle)</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                <h6>SPEED</h6>
                                                                                <p>25km/hr <br /> (Max Speed)</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                <h6>BRAKES</h6>
                                                                                <p>Advanced Dual <br /> Disc Brakes</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                <h6>BATTERY</h6>
                                                                                <p>36 Volts <br /> (7.5 Ah Powerful Battery)</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-12">
                                                                            <div class="suspension_bttns">
                                                                                <Link to="/trex">Buy Now</Link>
                                                                                <Link to="/trex">View More</Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                <a href="#"><img src="images/T-REX.gif" alt="a" class="img-fluid" /></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade show active" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="dual_suspension_txt">
                                                                <h3>India’s First <span>Dual Suspension</span> E-Bike</h3>

                                                                <p>Whether you are commuting to the office, exploring local streets or climbing the hills, EMX is the ideal mobility partner. Traverse across the landscape without any fuss or effort.  India’s first dual suspension e-bike, EMX is designed for the city, uneven roads and the slopes.</p>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-10">
                                                                    <div class="row">
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                <h6>RANGE</h6>
                                                                                <p>65+ kms <br /> (50+ Km with throttle)</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                <h6>SPEED</h6>
                                                                                <p>25km/hr <br /> (Max Speed)</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                <h6>BRAKES</h6>
                                                                                <p>Advanced Dual <br /> Disc Brakes</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6 col-6">
                                                                            <div class="suspension_wrap">
                                                                                <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                <h6>BATTERY</h6>
                                                                                <p>36 Volts <br /> (10.4 Ah Powerful Battery)</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-12">
                                                                            <div class="suspension_bttns">
                                                                                <Link to="/emx">Buy Now</Link>
                                                                                <Link to="/emx">View More</Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                <a href="#"><img src="images/EMX.gif" alt="a" class="img-fluid" /></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            : (subdomain == 'uae') ?
                                                <>
                                                    <div class="tab-pane fade " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="dual_suspension_txt">
                                                                    <h3>The <span>SUV</span> of EBikes <span>Doodle</span></h3>

                                                                    <p>Best in Class Foldable Electric Bike Its small size might make you think this is a fun little ride, but the Doodle has power to spare when you are in the mood for adventure. And when you don’t, you can fold it away. From sandy beaches to city roads, this bike has the oomph and the portability that will tempt you to take it with you wherever you may go. </p>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-lg-10">
                                                                        <div class="row">
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                    <h6>RANGE</h6>
                                                                                    <p>55+ kms <br /> (40+ Km with throttle)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                    <h6>SPEED</h6>
                                                                                    <p>25km/hr <br /> (Max Speed)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                    <h6>BRAKES</h6>
                                                                                    <p>Advanced Dual <br /> Disc Brakes</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                    <h6>BATTERY</h6>
                                                                                    <p>36 Volts <br /> (10 Ah Powerful Battery)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-12">
                                                                                <div class="suspension_bttns">
                                                                                    <Link to="/doodle">Buy Now</Link>
                                                                                    <Link to="/doodle">View More</Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                    <a href="/doodle"><img src="images/DOODLE.gif" alt="a" class="img-fluid" /></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="dual_suspension_txt">
                                                                    <h3>Designed for <span>all Terrains</span></h3>

                                                                    <p>The TREX lets you make the most of the mountain bike. Now, you can go further and climb higher with our powerful motor, intuitive controls and lightweight, yet rigid frames. Every part has been designed to seamlessly integrate into a truly magnificent experience as you explore the trails.  </p>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-lg-10">
                                                                        <div class="row">
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                    <h6>RANGE</h6>
                                                                                    <p>50+ kms <br /> (35+ Km with throttle)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                    <h6>SPEED</h6>
                                                                                    <p>25km/hr <br /> (Max Speed)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                    <h6>BRAKES</h6>
                                                                                    <p>Advanced Dual <br /> Disc Brakes</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                    <h6>BATTERY</h6>
                                                                                    <p>36 Volts <br /> (7.5 Ah Powerful Battery)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-12">
                                                                                <div class="suspension_bttns">
                                                                                    <Link to="/trex">Buy Now</Link>
                                                                                    <Link to="/trex">View More</Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                    <a href="#"><img src="images/T-REX.gif" alt="a" class="img-fluid" /></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade " id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="dual_suspension_txt">
                                                                    <h3>India’s First <span>Dual Suspension</span> TRIBLE</h3>

                                                                    <p>A lightweight tri-folding eBike, the Trible is your compion for your commute or an exciting adventure. Ride further and more often with a power-assisted ride or store it compactly and safely at home or work.</p>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-lg-10">
                                                                        <div class="row">
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                    <h6>RANGE</h6>
                                                                                    <p>50+ kms <br /> (35+ Km with throttle)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                    <h6>SPEED</h6>
                                                                                    <p>25km/hr <br /> (Max Speed)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                    <h6>BRAKES</h6>
                                                                                    <p>Advanced Dual <br /> Disc Brakes</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                    <h6>BATTERY</h6>
                                                                                    <p>36 Volts <br /> (7.5 Ah Powerful Battery)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-12">
                                                                                <div class="suspension_bttns">
                                                                                    <Link to="/emx">Buy Now</Link>
                                                                                    <Link to="/emx">View More</Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                    <a href="#"><img src="images/uae/Trible.gif" alt="a" class="img-fluid" /></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade " id="pills-energ" role="tabpanel" aria-labelledby="pills-contact-tab">

                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="dual_suspension_txt">
                                                                    <h3>India’s First <span>Dual Suspension</span> ENER-G</h3>

                                                                    <p>Designed to last for miles, Ener-G can keep going when others have given up. Packed with everything you need, this long range, dual-seater moped suits your different needs.</p>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-lg-10">
                                                                        <div class="row">
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                    <h6>RANGE</h6>
                                                                                    <p>110+ kms <br /> (90+ Km with throttle)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                    <h6>SPEED</h6>
                                                                                    <p>25km/hr <br /> (Max Speed)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                    <h6>BRAKES</h6>
                                                                                    <p>Advanced Dual <br /> Disc Brakes</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-6">
                                                                                <div class="suspension_wrap">
                                                                                    <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                    <h6>BATTERY</h6>
                                                                                    <p>48 Volts <br /> (20 Ah Powerful Battery)</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-12">
                                                                                <div class="suspension_bttns">
                                                                                    <Link to="/emx">Buy Now</Link>
                                                                                    <Link to="/emx">View More</Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                    <a href="#"><img src="images/uae/EnerG.gif" alt="a" class="img-fluid" /></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                : (subdomain == 'japan') ?
                                                    <>
                                                        <div class="tab-pane fade " id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="dual_suspension_txt">
                                                                        <h3>japan's First <span>E-Bike</span> GLYDER </h3>

                                                                        <p>A lightweight, portable, folding e-bike, Glyder is your companion on your commute or an exciting adventure. Ride further and more often with a power-assisted ride to transform your daily travel experience. When you get there, fold it up in an instant into a compact package that is small enough to fit in a car or store it safely at home or work. The aluminium 6061 frame gives it strength while keeping the weight light so that you can carry it anywhere you travel. </p>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-lg-10">
                                                                            <div class="row">
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                        <h6>RANGE</h6>
                                                                                        <p>80 kms </p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>SPEED</h6>
                                                                                        <p>25km/hr <br /> (Max Speed)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BRAKES</h6>
                                                                                        <p>Mechanic Disc Brake <br /> JAK F&R</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BATTERY</h6>
                                                                                        <p>36 Volts <br /> (14 Ah Powerful Battery)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-12">
                                                                                    <div class="suspension_bttns">
                                                                                        <Link to="/glyder">Buy Now</Link>
                                                                                        <Link to="/glyder">View More</Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                        <a href="/glyder"><img src="images/Japan/Solo-Bikes-3D/Glyder.gif" alt="a" class="img-fluid" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="dual_suspension_txt">
                                                                        <h3>The <span>SUV</span> of EBikes <span>XPLORER</span></h3>

                                                                        <p>It may be a small, fun ride, but Xplorer has power to spare when you are in the mood for adventure. And when you don’t, you can fold it away. From sandy beaches to city roads, this e-bike has the oomph and the portability that will tempt you to take it with you wherever you may go.  </p>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-lg-10">
                                                                            <div class="row">
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                        <h6>RANGE</h6>
                                                                                        <p>120 kms </p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>SPEED</h6>
                                                                                        <p>25km/hr <br /> (Max Speed)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BRAKES</h6>
                                                                                        <p>Mechanic Disc Brake</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BATTERY</h6>
                                                                                        <p>48 Volts <br /> (15 Ah Powerful Battery)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-12">
                                                                                    <div class="suspension_bttns">
                                                                                        <Link to="/xplorer">Buy Now</Link>
                                                                                        <Link to="/xplorer">View More</Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                        <a href="/xplorer"><img src="images/Japan/Solo-Bikes-3D/Xplorer.gif" alt="a" class="img-fluid" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade " id="pills-dolphin" role="tabpanel" aria-labelledby="pills-dolphin-tab">

                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="dual_suspension_txt">
                                                                        <h3>japan's First <span>E-Bike</span> DOLPHIN </h3>

                                                                        <p>A lightweight, portable, folding e-bike, Glyder is your companion on your commute or an exciting adventure. Ride further and more often with a power-assisted ride to transform your daily travel experience. When you get there, fold it up in an instant into a compact package that is small enough to fit in a car or store it safely at home or work. The aluminium 6061 frame gives it strength while keeping the weight light so that you can carry it anywhere you travel. </p>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-lg-10">
                                                                            <div class="row">
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                        <h6>RANGE</h6>
                                                                                        <p>45 kms </p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>SPEED</h6>
                                                                                        <p>25km/hr <br /> (Max Speed)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BRAKES</h6>
                                                                                        <p>Dual Dics</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BATTERY</h6>
                                                                                        <p>36 Volts <br /> (10 Ah Powerful Battery)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-12">
                                                                                    <div class="suspension_bttns">
                                                                                        <Link to="/glyder">Buy Now</Link>
                                                                                        <Link to="/glyder">View More</Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                        <a href="/glyder"><img src="images/Japan/Solo-Bikes-3D/Dolphin.gif" alt="a" class="img-fluid" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </>
                                                    :
                                                    <>
                                                        <div class="tab-pane fade " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="dual_suspension_txt">
                                                                        <h3>The <span>SUV</span> of EBikes <span>Doodle</span></h3>

                                                                        <p>Best in Class Foldable Electric Bike Its small size might make you think this is a fun little ride, but the Doodle has power to spare when you are in the mood for adventure. And when you don’t, you can fold it away. From sandy beaches to city roads, this bike has the oomph and the portability that will tempt you to take it with you wherever you may go. </p>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-lg-10">
                                                                            <div class="row">
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                        <h6>RANGE</h6>
                                                                                        <p>55+ kms <br /> (40+ Km with throttle)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>SPEED</h6>
                                                                                        <p>25km/hr <br /> (Max Speed)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BRAKES</h6>
                                                                                        <p>Advanced Dual <br /> Disc Brakes</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BATTERY</h6>
                                                                                        <p>36 Volts <br /> (10 Ah Powerful Battery)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-12">
                                                                                    <div class="suspension_bttns">
                                                                                        <Link to="/doodle">Buy Now</Link>
                                                                                        <Link to="/doodle">View More</Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                        <a href="/doodle"><img src="images/DOODLE.gif" alt="a" class="img-fluid" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="dual_suspension_txt">
                                                                        <h3>Designed for <span>all Terrains</span></h3>

                                                                        <p>The TREX lets you make the most of the mountain bike. Now, you can go further and climb higher with our powerful motor, intuitive controls and lightweight, yet rigid frames. Every part has been designed to seamlessly integrate into a truly magnificent experience as you explore the trails.  </p>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-lg-10">
                                                                            <div class="row">
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                        <h6>RANGE</h6>
                                                                                        <p>50+ kms <br /> (35+ Km with throttle)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>SPEED</h6>
                                                                                        <p>25km/hr <br /> (Max Speed)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BRAKES</h6>
                                                                                        <p>Advanced Dual <br /> Disc Brakes</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BATTERY</h6>
                                                                                        <p>36 Volts <br /> (7.5 Ah Powerful Battery)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-12">
                                                                                    <div class="suspension_bttns">
                                                                                        <Link to="/trex">Buy Now</Link>
                                                                                        <Link to="/trex">View More</Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                        <a href="#"><img src="images/T-REX.gif" alt="a" class="img-fluid" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade show active" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="dual_suspension_txt">
                                                                        <h3>India’s First <span>Dual Suspension</span> E-Bike</h3>
                                                                        {
                                                                            (subdomain == 'india' || subdomain == '') ?
                                                                                <>
                                                                                    <p>Whether you are commuting to the office, exploring local streets or climbing the hills, EMX is the ideal mobility partner. Traverse across the landscape without any fuss or effort.  India’s first dual suspension e-bike, EMX is designed for the city, uneven roads and the slopes.
                                                                                    </p><br />
                                                                                </>
                                                                                :
                                                                                <p>City riding is now a breeze as you traverse across town without any fuss or effort. The EMX is designed for the city; traffic, uneven roads and slopes included. India’s first dual suspension e-cycle.</p>
                                                                        }
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-lg-10">
                                                                            <div class="row">
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/small_bike.svg" alt="a" class="img-fluid" />
                                                                                        <h6>RANGE</h6>
                                                                                        <p>65+ kms <br /> (50+ Km with throttle)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/speed_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>SPEED</h6>
                                                                                        <p>25km/hr <br /> (Max Speed)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/park_meter.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BRAKES</h6>
                                                                                        <p>Advanced Dual <br /> Disc Brakes</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-6">
                                                                                    <div class="suspension_wrap">
                                                                                        <img src="images/battrey_icon.svg" alt="a" class="img-fluid" />
                                                                                        <h6>BATTERY</h6>
                                                                                        <p>36 Volts <br /> (10.4 Ah Powerful Battery)</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-12">
                                                                                    <div class="suspension_bttns">
                                                                                        <Link to="/emx">Buy Now</Link>
                                                                                        <Link to="/emx">View More</Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="suspension_img" data-aos="zoom-in-up" data-aos-duration="2000">
                                                                        <a href="#"><img src="images/EMX.gif" alt="a" class="img-fluid" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="suspension_viw_btnns">
                                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            {
                                                (subdomain == '' || subdomain == 'nepal') ?
                                                    <>
                                                        <li>
                                                            <a class="" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                                                <img src="images/bicycle_2.png" alt="a" class="img-fluid" />
                                                                <span>DOODLE</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
                                                                <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
                                                                <span>T-REX</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="active" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">
                                                                <img src="images/bicycle_3.png" alt="a" class="img-fluid" />
                                                                <span>EMX</span>
                                                            </a>
                                                        </li>
                                                    </>
                                                    : (subdomain == 'uae') ?
                                                        <>
                                                            <li>
                                                                <a class="active" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-home" aria-selected="true">
                                                                    <img src="images/uae/TREX.png" alt="a" class="img-fluid" />
                                                                    <span>T-REX</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a class="" id="pills-energ-tab" data-toggle="pill" href="#pills-energ" role="tab" aria-controls="pills-profile" aria-selected="false">
                                                                    <img src="images/uae/Ener-G.png" alt="a" class="img-fluid" />
                                                                    <span>ENER G</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a class="" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-contact" aria-selected="false">
                                                                    <img src="images/uae/Doodle.png" alt="a" class="img-fluid" />
                                                                    <span>DOODLE</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a class="" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">
                                                                    <img src="images/uae/Trible.png" alt="a" class="img-fluid" />
                                                                    <span>TRIBLE</span>
                                                                </a>
                                                            </li>
                                                        </>
                                                        : (subdomain == 'japan') ?
                                                            <>
                                                                <li >
                                                                    <a class="active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-contact" aria-selected="false">
                                                                        <img src="images/Japan/Bottom-Bikes/Xplorer.png" alt="a" class="img-fluid" />
                                                                        <span>XPLORER</span>
                                                                    </a>
                                                                </li>
                                                                <li >
                                                                    <a class="" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">
                                                                        <img src="images/Japan/Bottom-Bikes/Glyder.png" alt="a" class="img-fluid" />
                                                                        <span>GLYDER</span>
                                                                    </a>
                                                                </li>
                                                                <li >
                                                                    <a class="" id="pills-dolphin-tab" data-toggle="pill" href="#pills-dolphin" role="tab" aria-controls="pills-dolphin" aria-selected="false">
                                                                        <img src="images/Japan/Bottom-Bikes/Dolphin.png" alt="a" class="img-fluid" />
                                                                        <span>DOLPHIN</span>
                                                                    </a>
                                                                </li>
                                                            </>
                                                            :
                                                            <>
                                                                <li>
                                                                    <a class="" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                                                        <img src="images/bicycle_2.png" alt="a" class="img-fluid" />
                                                                        <span>DOODLE</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a class="" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
                                                                        <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
                                                                        <span>T-REX</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a class="active" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">
                                                                        <img src="images/bicycle_3.png" alt="a" class="img-fluid" />
                                                                        <span>EMX</span>
                                                                    </a>
                                                                </li>
                                                            </>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="customer_stories_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="customer_stories_head">
                                {subdomain == 'japan' ?
                                    <h2>オンラインレビュー</h2> :
                                    <h2>Online<br /> <span>Reviews</span></h2>
                                }
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="customer_stories_head">
                                <p>{subdomain == 'japan' ? "購入する前にオンラインで自転車をチェックしてみませんか？わかりました。これらは、何千ものオンラインレビューから特別に選ばれたいくつかのストーリーです。" :
                                    "Want to check out our bikes online before you buy? We get it. These are a few specially picked videos from thousands of online reviews."}</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12" data-aos="zoom-in-up" data-aos-duration="2000">
                            <img src="images/angle_rgt.svg" alt="a" class="img-fluid slidPrv" />
                            <img src="images/angle_lft.svg" alt="a" class="img-fluid slidNext" />
                            <div class="video_view_slider">
                                <div class="video_play_wrap">
                                    <div class="main_vdo_thumb">
                                        <img src="images/slide_1.png" alt="a" class="img-fluid" />
                                    </div>
                                    <div class="vdo_play_icon">
                                        <a class="venobox" data-vbtype="video" href="https://www.youtube.com/watch?v=wIYEWSz5wpg">
                                            <img src="images/vdo_play_icon.svg" alt="a" class="img-fluid" />
                                        </a>
                                    </div>
                                </div>
                                <div class="video_play_wrap">
                                    <div class="main_vdo_thumb">
                                        <img src="images/slide_2.png" alt="a" class="img-fluid" />
                                    </div>
                                    <div class="vdo_play_icon">
                                        <a class="venobox" data-vbtype="video" href="https://www.youtube.com/watch?v=irBxHBnJbIg">
                                            <img src="images/vdo_play_icon.svg" alt="a" class="img-fluid" />
                                        </a>
                                    </div>
                                </div>
                                <div class="video_play_wrap">
                                    <div class="main_vdo_thumb">
                                        <img src="images/slide_3.png" alt="a" class="img-fluid" />
                                    </div>
                                    <div class="vdo_play_icon">
                                        <a class="venobox" data-vbtype="video" href="https://www.youtube.com/watch?v=dsNDkCaAMDI">
                                            <img src="images/vdo_play_icon.svg" alt="a" class="img-fluid" />
                                        </a>
                                    </div>
                                </div>
                                <div class="video_play_wrap">
                                    <div class="main_vdo_thumb">
                                        <img src="images/slide_4.png" alt="a" class="img-fluid" />
                                    </div>
                                    <div class="vdo_play_icon">
                                        <a class="venobox" data-vbtype="video" href="https://www.youtube.com/watch?v=a0c_HzIQxwM">
                                            <img src="images/vdo_play_icon.svg" alt="a" class="img-fluid" />
                                        </a>
                                    </div>
                                </div>
                                <div class="video_play_wrap">
                                    <div class="main_vdo_thumb">
                                        <img src="images/slide_5.png" alt="a" class="img-fluid" />
                                    </div>
                                    <div class="vdo_play_icon">
                                        <a class="venobox" data-vbtype="video" href="https://www.youtube.com/watch?v=EFVPj4BWTjw">
                                            <img src="images/vdo_play_icon.svg" alt="a" class="img-fluid" />
                                        </a>
                                    </div>
                                </div>
                                <div class="video_play_wrap">
                                    <div class="main_vdo_thumb">
                                        <img src="images/slide_6.png" alt="a" class="img-fluid" />
                                    </div>
                                    <div class="vdo_play_icon">
                                        <a class="venobox" data-vbtype="video" href="https://www.youtube.com/watch?v=TNnDY5LoTmE">
                                            <img src="images/vdo_play_icon.svg" alt="a" class="img-fluid" />
                                        </a>
                                    </div>
                                </div>
                                <div class="video_play_wrap">
                                    <div class="main_vdo_thumb">
                                        <img src="images/slide_7.png" alt="a" class="img-fluid" />
                                    </div>
                                    <div class="vdo_play_icon">
                                        <a class="venobox" data-vbtype="video" href="https://www.youtube.com/watch?v=-NMJFHCz3DY">
                                            <img src="images/vdo_play_icon.svg" alt="a" class="img-fluid" />
                                        </a>
                                    </div>
                                </div>
                                <div class="video_play_wrap">
                                    <div class="main_vdo_thumb">
                                        <img src="images/slide_8.png" alt="a" class="img-fluid" />
                                    </div>
                                    <div class="vdo_play_icon">
                                        <a class="venobox" data-vbtype="video" href="https://www.youtube.com/watch?v=jGdYCJZoJMQ">
                                            <img src="images/vdo_play_icon.svg" alt="a" class="img-fluid" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="slider_btm_allss">
                                <div>
                                    <img src="images/slide_1.png" alt="a" class="img-fluid" />
                                </div>
                                <div>
                                    <img src="images/slide_2.png" alt="a" class="img-fluid" />
                                </div>
                                <div>
                                    <img src="images/slide_3.png" alt="a" class="img-fluid" />
                                </div>
                                <div>
                                    <img src="images/slide_4.png" alt="a" class="img-fluid" />
                                </div>
                                <div>
                                    <img src="images/slide_5.png" alt="a" class="img-fluid" />
                                </div>
                                <div>
                                    <img src="images/slide_6.png" alt="a" class="img-fluid" />
                                </div>
                                <div>
                                    <img src="images/slide_7.png" alt="a" class="img-fluid" />
                                </div>
                                <div>
                                    <img src="images/slide_8.png" alt="a" class="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="featured_section">
                <div class="container">
                    <div class="row mb-5">
                        <div class="col-lg-6">
                            <div class="feat_head_txt">
                                <h3>As <span>Featured</span> in</h3>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="feat_head_txt">
                                <div class="media">
                                    <div class="media-body">
                                        <h6>Awarded <span>Most <br /> Admirable EV Brand</span> 2021</h6>
                                    </div>    
                                    <img src="images/trophy_icon.svg" alt="a" class="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="feat_img">
                                <img src="images/landing-news.png" alt="691 x 691" class="img-fluid" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="row">
                                <div class="col-lg-6 col-6">
                                    <div class="brand_wrap_boxs" data-aos="zoom-in-up" data-aos-duration="2000">
                                        <p>“The design of the cycles, with light frames and wide wheel-bases,”</p>
                                        <img src="images/timesofindia.svg" alt="a" class="img-fluid" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-6">
                                    <div class="brand_wrap_boxs" data-aos="zoom-in-up" data-aos-duration="2000">
                                        <p>“A six-month-old company, Emotorad, is defying the current economy”</p>
                                        <img src="images/indianexpress.svg" alt="a" class="img-fluid" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-6">
                                    <div class="brand_wrap_boxs" data-aos="zoom-in-up" data-aos-duration="2000">
                                        <p>“The T-Rex also has an LED headlight and taillight and functions”</p>
                                        <img src="images/financialexpress.svg" alt="a" class="img-fluid" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-6">
                                    <div class="brand_wrap_boxs" data-aos="zoom-in-up" data-aos-duration="2000">
                                        <p>“The budding startup has some interesting plans for the electric”</p>
                                        <img src="images/bikedekho.svg" alt="a" class="img-fluid" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-6">
                                    <div class="brand_wrap_boxs" data-aos="zoom-in-up" data-aos-duration="2000">
                                        <p>“The company aims at introducing electric cycles at an affordable price”</p>
                                        <img src="images/mint.svg" alt="a" class="img-fluid" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-6">
                                    <div class="brand_wrap_boxs" data-aos="zoom-in-up" data-aos-duration="2000">
                                        <p>“EMotorad currently has over 90 outlets across 42 cities in India, and it aims to be”</p>
                                        <img src="images/carnbike.svg" alt="a" class="img-fluid" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-lg-12" style={{ display : 'none' }}>
                            <div class="all_brandss" data-aos="zoom-in-up" data-aos-duration="2000">
                                <a href="#">
                                    <img src="images/carnbike.svg" alt="a" class="img-fluid" />
                                </a>
                                <a href="#">
                                    <img src="images/timesofindia.svg" alt="a" class="img-fluid" />
                                </a>
                                <a href="#">
                                    <img src="images/financialexpress.svg" alt="a" class="img-fluid" />
                                </a>
                                <a href="#">
                                    <img src="images/bikedekho.svg" alt="a" class="img-fluid" />
                                </a>
                                <a href="#">
                                    <img src="images/indianexpress.svg" alt="a" class="img-fluid" />
                                </a>
                                <a href="#">
                                    <img src="images/hdauto.svg" alt="a" class="img-fluid" />
                                </a>
                                <a href="#">
                                    <img src="images/mint.svg" alt="a" class="img-fluid" />
                                </a>
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
                    {(subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                        <div class="row  expo_bike_slider">
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
                                                <td>Rs {productPrice.trex.toLocaleString()}</td>
                                                <td>
                                                    {products.
                                                        filter(prod => prod.name.toLowerCase().includes("t-rex")).map(prod => (

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
                                                <td>Rs {productPrice.emx.toLocaleString()}</td>
                                                <td>
                                                    {products.
                                                        filter(prod => prod.name.toLowerCase().includes("emx")).map(prod => (

                                                          <i class="fa fa-circle" style={{ "color": prod.color }}>  &nbsp;</i>

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
                                                <td>Rs {productPrice.doodle.toLocaleString()}</td>
                                                <td>
                                                    {products.
                                                        filter(prod => prod.name.toLowerCase().includes("doodle")).map(prod => (

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
                                        <div class="bike_explore_wrap">
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
                                                        {products.
                                                            filter(prod => prod.name.toLowerCase().includes("t-rex")).map(prod => (

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
                                        <div class="bike_explore_wrap">
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
                                                        {products.
                                                            filter(prod => prod.name.toLowerCase().includes("ener g")).map(prod => (

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
                                        <div class="bike_explore_wrap">
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
                                                        {products.
                                                            filter(prod => prod.name.toLowerCase().includes("doodle")).map(prod => (

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
                                        <div class="bike_explore_wrap">
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
                                                        {products.
                                                            filter(prod => prod.name.toLowerCase().includes("trible")).map(prod => (

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
                                {/* </Slider> */}
                            </div>   
                            : (subdomain == 'japan') ?
                                    <div class="row expo_bike_slider">

                                        <div class="col-lg-4">
                                            <Link to="/xplorer">
                                                <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                                                    <img src="images/Japan/Bottom-Bikes/Xplorer.png" alt="a" class="img-fluid" style={{ width: "185px" }} />

                                                    <h3>XPLORER <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

                                                    <h5>FEATURES</h5>
                                                    <table>
                                                        <tr>
                                                            <td>RANGE</td>
                                                            <td>120 Kms</td>
                                                        </tr>
                                                        <tr>
                                                            <td>SPEED (MAX)</td>
                                                            <td>25Km/hr</td>
                                                        </tr>
                                                        <tr>
                                                            <td>BRAKES</td>
                                                            <td>Mechanic Disc Brake</td>
                                                        </tr>
                                                        <tr>
                                                            <td>BATTERY</td>
                                                            <td>48 Volts</td>
                                                        </tr>
                                                        <tr>
                                                            <td>CAPACITY</td>
                                                            <td>15 Ah</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Starting From</td>
                                                            <td>Colors</td>
                                                        </tr>

                                                        <tr>
                                                            <td>YEN {productPrice.xplorer.toLocaleString()}</td>
                                                            <td>
                                                                {products.
                                                                    filter(prod => prod.name.toLowerCase().includes("xplorer")).map(prod => (

                                                                        <i class="fa fa-circle" style={{ "color": prod.color }}>&nbsp;</i>

                                                                    ))}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div class="explore_bttn row mx-auto">
                                                        <Link to="/xplorer">今すぐ購入</Link>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div class="col-lg-4">
                                            <Link to="/glyder">
                                                <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                                                    <img src="images/Japan/Bottom-Bikes/Glyder.png" alt="a" class="img-fluid" style={{ width: "185px" }} />

                                                    <h3>GLYDER <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

                                                    <h5>FEATURES</h5>
                                                    <table>
                                                        <tr>
                                                            <td>RANGE</td>
                                                            <td>80 Kms</td>
                                                        </tr>
                                                        <tr>
                                                            <td>SPEED (MAX)</td>
                                                            <td>25Km/hr</td>
                                                        </tr>
                                                        <tr>
                                                            <td>BRAKES</td>
                                                            <td>Mechanic Disc Brake <small>JAK F&R</small></td>

                                                        </tr>
                                                        <tr>
                                                            <td>BATTERY</td>
                                                            <td>36 Volts</td>
                                                        </tr>
                                                        <tr>
                                                            <td>CAPACITY</td>
                                                            <td>14 Ah</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Starting From</td>
                                                            <td>Colors</td>
                                                        </tr>

                                                        <tr>
                                                            <td>YEN {productPrice.glyder.toLocaleString()}</td>
                                                            <td>
                                                            {products.
                                                                filter(prod => prod.name.toLowerCase().includes("glyder")).map(prod => (

                                                                    <i class="fa fa-circle" style={{ "color": prod.color }}>&nbsp;</i>

                                                                ))}
                                                                </td>
                                                        </tr>
                                                    </table>
                                                    <div class="explore_bttn row mx-auto">
                                                        <Link to="/glyder">今すぐ購入</Link>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div class="col-lg-4">
                                            <Link to="/dolphine">
                                                <div class="bike_explore_wrap" data-aos="zoom-in-up" data-aos-duration="2000">
                                                    <img src="images/Japan/Bottom-Bikes/Dolphin.png" alt="a" class="img-fluid" style={{ width: "185px" }} />

                                                    <h3>DOLPHIN <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

                                                    <h5>FEATURES</h5>
                                                    <table>
                                                        <tr>
                                                            <td>RANGE</td>
                                                            <td>45+ Kms</td>
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
                                                            <td>YEN {productPrice.dolphin.toLocaleString()}</td>
                                                            <td>
                                                            {products.
                                                                filter(prod => prod.name.toLowerCase().includes("dolphin")).map(prod => (

                                                                    <i class="fa fa-circle" style={{ "color": prod.color }}>&nbsp;</i>

                                                                ))}
                                                                </td>
                                                        </tr>
                                                    </table>
                                                    <div class="explore_bttn row mx-auto">
                                                        <Link to="/dolphine">今すぐ購入</Link>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                :
                                <div class="row  expo_bike_slider">
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
                                                        <td>Rs 37,142</td>
                                                        <td><i class="fa fa-circle"></i> <i class="fa fa-circle"></i></td>
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
                                                        <td>Rs 52,380</td>
                                                        <td><i class="fa fa-circle" style={{ "color": "#DBFF00" }}></i></td>
                                                    </tr>
                                                </table>
                                                <div class="explore_bttn row mx-auto">
                                                    <Link to="/emx">Buy Now</Link>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div class="col-lg-4">
                                        <Link to="/trex">
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
                                                        <td>Rs 76,190</td>
                                                        <td><i class="fa fa-circle text-dark"></i> <i class="fa fa-circle" style={{ "color": "#10B068" }}></i></td>
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
            {/* <WhattsApp/> */}
            <div class="book_ride_sticky d-lg-none">
                <a href="/book">BOOK A TEST RIDE</a>
            </div>
        </>
    );
}
export default Landing;