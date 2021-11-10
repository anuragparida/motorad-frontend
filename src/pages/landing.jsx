import React, { useEffect, useState } from "react";
import MobileNavbar from "../components/MobileNavbar";
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
// import Slider from "react-slick";


const Landing = (props) => {

    const [subdomain, setSubdomain] = useState("");
    const [country, setCountry] = useState(true);

    useEffect(() => {

        AOS.init();
        let full = window.location.host
        let parts = full.split('.')
        let sub = parts[0]
        // sub = 'uae';
        sub =  localStorage.getItem('subDomain');
        setSubdomain(sub);
        // setSubdomain(sub);

    }, [country]);

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
                                    (subdomain == '' || subdomain == 'nepal') ?
                                        <img src="images/manin-hero-img.gif" alt="a" class="img-fluid w-100" />
                                        : (subdomain == 'uae') ?
                                            <img src="images/uae/Main-hero-UAE.gif" alt="a" class="img-fluid w-100" />
                                            :
                                            <img src="images/manin-hero-img.gif" alt="a" class="img-fluid w-100" />
                                }
                            </div>
                            <div class="home_hero_bike_title">
                                {
                                    (subdomain == '' || subdomain == 'nepal') ?
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
                            (subdomain == '' || subdomain == 'nepal') ?
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
                                        (subdomain == '' || subdomain == 'nepal') ?
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

                                                                <p>City riding is now a breeze as you traverse across town without any fuss or effort. The EMX is designed for the city; traffic, uneven roads and slopes included. India’s first dual suspension e-cycle.</p>
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

                                                                    <p>City riding is now a breeze as you traverse across town without any fuss or effort. The EMX is designed for the city; traffic, uneven roads and slopes included. India’s first dual suspension e-cycle.</p>
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
                                <h2>Our Customer <br /> <span>Stories</span></h2>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="customer_stories_head">
                                <p>We make amazing e-bikes for some amazing people to ride further and more often. These are a few specially picked stories from thousands of customers.</p>
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
                                        <h6>Awarded <span>Most <br /> Admirable Brand</span> 2021</h6>
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
                        <div class="col-lg-12">
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
            <section class="explore_ebike_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="expo_ebike_headin">
                                <h5>Explore E-Bikes</h5>
                            </div>
                        </div>
                    </div>
                    {(subdomain == '' || subdomain == 'nepal') ?
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
                        : (subdomain == 'uae') ?
                        <>
                            <div class="row expo_bike_slider_uae">
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
                                                    <td>AED 3,499</td>
                                                    <td><i class="fa fa-circle"></i> <i class="fa fa-circle"></i></td>
                                                </tr>
                                            </table>
                                            <div class="explore_bttn row mx-auto">
                                                <Link to="/trex">Buy Now</Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div class="col-lg-3">
                                    <Link to="/emx">
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
                                                    <td>AED 3,599</td>
                                                    <td><i class="fa fa-circle" style={{ "color": "#DBFF00" }}></i></td>
                                                </tr>
                                            </table>
                                            <div class="explore_bttn row mx-auto">
                                                <Link to="/energ">Buy Now</Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div class="col-lg-3">
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
                                                    <td>AED 4,599</td>
                                                    <td><i class="fa fa-circle text-dark"></i> <i class="fa fa-circle" style={{ "color": "#10B068" }}></i></td>
                                                </tr>
                                            </table>
                                            <div class="explore_bttn row mx-auto">
                                                <Link to="/doodle">Buy Now</Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div class="col-lg-3">
                                    <Link to="/trex">
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
                                                    <td>AED 3,399</td>
                                                    <td><i class="fa fa-circle text-dark"></i> <i class="fa fa-circle" style={{ "color": "#10B068" }}></i></td>
                                                </tr>
                                            </table>
                                            <div class="explore_bttn row mx-auto">
                                                <Link to="/trible">Buy Now</Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>
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

            <Footer />

            <div class="book_ride_sticky d-lg-none">
                <a href="/book">BOOK A TEST RIDE</a>
            </div>
        </>
    );
}
export default Landing;