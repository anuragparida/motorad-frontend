import React, { useEffect, useState } from "react";
import MobileNavbar from "../../components/MobileNavbar";
import Navbar from './../../components/Navbar';
import Footer from './../../components/Footer';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductSlider from "../../components/ProductSlider";



const Test = () => {
    const [country, setCountry] = useState(true);
    return (
        <>
            <Navbar  setCountry={setCountry} country={country}>
                <section class="product_menu_sec">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 col-4">
                                <div class="peoduct_menu_lft">
                                    <h6>T - REX</h6>
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
                                                <span class="checkmark"></span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="chck">
                                                <input type="radio" name="a" id="communitsymode" />
                                                <span class="checkmark"></span>
                                            </label>
                                        </li>
                                        <li class="d-none d-lg-block">
                                            <h6>Rs 37,133</h6>
                                        </li>
                                        <li class="d-none d-lg-block">
                                            <h6><a href="#">BUY NOW</a></h6>
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
                                    <svg viewBox="0 0 1280 720">
                                        <text text-anchor="middle" x="50%" y="50%">T-REX</text>
                                    </svg>
                                    <img
                                        src="images/the_best.png"
                                        alt="a"
                                        class="img-fluid intro"
                                    />
                                </div>

                                <div class="hero_pro_img">
                                    <div class="product_hero_txts">
                                        <img
                                            src="images/t-rex-hero-red.png"
                                            alt="a"
                                            class="img-fluid"
                                        />
                                    </div>
                                    <div class="product_hero_txt" >
                                        <img
                                            src="images/t-rex-hero-yellow.png"
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
                                The T-REX lets you make the most of the mountain bike. Now, you
                                can go further and climb higher with our powerful motor, intuitive
                                controls and lightweight, yet rigid frames. Every part has been
                                designed to seamlessly integrate into a truly magnificent
                                experience as you explore the trails.
                            </p>

                            <a href="#"
                            >WATCH IT IN ACTION
                                <img src="images/play_icon.png" alt="a" class="img-fluid"
                                /></a>
                        </div>
                    </div>
                </div>
            </div>


            {/* <section class="product_vdo_sec" id="feat_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="app">
                                <div id="bound-two" class="scroll-bound">
                                    <div class="content">
                                        <video id="v0" tabindex="0" autobuffer muted preload>
                                            <source
                                                src="images/3D-Renders/T-Rex-Full-FFMpeg.mp4"
                                                type="video/mp4"
                                            />
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
                                        <span style={{color: "#10b068"}}>Starts From Rs. 6189/Month</span>
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
                                    <a href="javascript:void(0)">ORDER NOW</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
   
            <ProductSlider  setCountry={setCountry} country={country}/>
     
            <Footer setCountry={setCountry} country={country} />

            <div class="book_ride_sticky d-lg-none">
                <div class="d-flex">
                    <p>Rs 37,133</p>
                    <a href="#">BUY NOW</a>
                </div>
            </div>
            <a href="#" class="back-top-btn d-none d-lg-block">
                <i class="fa fa-angle-up"></i>
            </a>


        </>
    );
}
export default Test;