import React, { useState, useEffect } from "react";
import Navbar from './../components/Navbar';
import MobileNavbar from './../components/MobileNavbar';
import Footer from './../components/Footer';
import axios from "axios";
import { server, config, checkAccess } from "../env";
import { Link } from 'react-router-dom';
import AOS from 'aos';

const BookRide = (props) => {

    const [bookSuccess, setBookSuccess] = useState(false);
    const [city, setCity] = useState("");
    const [stores, setStores] = useState([]);
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState(true);
    const [subdomain, setSubdomain] = useState("");
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

    const [bike, setBike] = useState('');

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
        //AOS.init();
        if (city)
            loadStores(city);
        let sub = localStorage.getItem('subDomain');
        setSubdomain(sub);
        loadProducts()
    }, [city, country]);

    useEffect(() => {
        AOS.init();
    },[])

    const loadCities = async (e) => {
        axios
            .get(server + `/api/store/read-states`)
            .then((rsp) => {
                // console.log(rsp);
                setCities(rsp.data.payload.cities);
            })
            .catch((err) => {
                // console.log(err.response);
                if (err.response) {
                }
            });
    }

    useEffect(() => {
        //AOS.init()
        loadCities();
        let sub = localStorage.getItem('subDomain');
        setSubdomain(sub);
    }, [country])

    const changeBike = (event) => {
        let domain = localStorage.getItem('subDomain');
        if (domain == 'nepal' || domain == 'india' || domain == '') {
            if (event.target.value === "TREX") {
                setBike('trex');
            } else if (event.target.value === "EMX") {
                setBike('emx');
            } else if (event.target.value === "DOODLE") {
                setBike('doodle');
            }
        } else if (domain == 'uae') {
            if (event.target.value === "TREX") {
                setBike('trex');
            } else if (event.target.value === "DOODLE") {
                setBike('doodle');
            } else if (event.target.value === "ENERG") {
                setBike('energ');
            } else if (event.target.value === "TRIBLE") {
                setBike('trible');
            }
        } else if (domain == 'japan') {
            if (event.target.value === "XPLORER") {
                setBike('xplorer');
            } else if (event.target.value === "GLYDER") {
                setBike('glyder');
            } else if (event.target.value === "DOLPHIN") {
                setBike('dolphin');
            } else if (event.target.value === "XPLORER") {
                setBike('xplorer');
            }
        }

    }

    const loadStores = async (city) => {
        await axios
            .post(server + "/api/store/read", { "search": city })
            .then((rsp) => {
                // console.log(rsp);
                setStores(rsp.data.payload);
            })
            .catch((err) => {
                checkAccess(err);
                console.error(err);
            });
    }

    const bookRide = async (e) => {

        e.preventDefault();

        var params = Array.from(e.target.elements)
            .filter((el) => el.name)
            .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

        axios
            .post(server + "/api/ride/book", params)
            .then((rsp) => {
                // console.log(rsp);
                setBookSuccess(true)
            })
            .catch((err) => {
                // console.log(err.response);
                if (err.response) {
                }
            });

    }

    return (
        <>
            <Navbar setCountry={setCountry} country={country} />
            <MobileNavbar />
            <section class="emi_hero_section">
                <div class="container">
                    <div class="row d-lg-none">
                    </div>
                    <div class="row">
                        <div class="col-lg-6 d-none d-lg-block">
                            <div class="emi_hero_txt test_ride_hero_txt">
                                <h6>TEST RIDE</h6>
                                <h2>
                                    Book Your <br />
                                    <span>Test Ride</span>
                                </h2>
                                <p>
                                    Check out the EMotorad bikes in person! Share <br />
                                    your details below and book a test ride. <br />
                                    Welcome to the electric revolution.
                                </p>
                                {
                                    (subdomain == 'india' || subdomain == 'nepal') ?

                                        (bike === "trex") ?
                                            <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
                                            : (bike === "emx") ?
                                                <img src="images/bicycle_3.png" alt="a" class="img-fluid" />
                                                : (bike === "doodle") ?
                                                    <img src="images/bicycle_2.png" alt="a" class="img-fluid" />
                                                    : ''
                                        : (subdomain == 'uae') ?
                                            (bike === "trex") ?
                                                <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
                                                : (bike === "trible") ?
                                                    <img src="images/uae/Trible.png" style={{ width: '215px', height: '139px' }} alt="a" class="img-fluid" />
                                                    : (bike === "energ") ?
                                                        <img src="images/uae/Ener-G.png" style={{ width: '215px', height: '139px' }} alt="a" class="img-fluid" />
                                                        : (bike === "doodle") ?
                                                            <img src="images/bicycle_2.png" alt="a" class="img-fluid" />
                                                            : ''
                                            : (subdomain == 'japan') ?
                                                (bike === "xplorer") ?
                                                    <img src="images/Japan/XPLORER/Xplorer-pulse-black.png" style={{ width: '215px', height: '139px' }} alt="a" class="img-fluid" />
                                                    : (bike === "glyder") ?
                                                        <img src="images/Japan/GLYDER/Glyder-pulse-black.png" style={{ width: '215px', height: '139px' }} alt="a" class="img-fluid" />
                                                        : (bike === "dolphin") ?
                                                            <img src="images/Japan/GLYDER/Glyder-pulse-black.png" style={{ width: '215px', height: '139px' }} alt="a" class="img-fluid" />
                                                            : ''
                                                : ''
                                }
                                {
                                    (bike != '') ?
                                        <h5>SELECTED BIKE: <span> {bike === "trex" ? "T - REX" : bike === "emx" ? "EMX" : bike === 'doodle' ? 'DOODLE' : bike === 'energ' ? 'ENERG' : bike === 'trible' ? 'TRIBLE' : bike === 'xplorer' ? 'XPLORER' : bike === 'dolphin' ? 'DOLPHIN' : bike === 'glyder' ? 'GLYDER' : ''}</span></h5>
                                        :
                                        ''
                                }


                            </div>
                        </div>
                        <div class="col-lg-6">
                            {
                                bookSuccess
                                    ?
                                    <div class="test_ride_succes_wrap">
                                        <img src="images/big_check.svg" alt="a" class="img-fluid" />
                                        <h5>
                                            Your Response has been <br />
                                            submitted Successfully
                                        </h5>

                                        <p>We’ll Get back to you soon</p>

                                        <a href="index.html">Go to HomePage</a>
                                    </div>
                                    :
                                    <div class="test_ride_frm">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <h5>Book Your Test Ride Now</h5>
                                            <a href="/contact" class="d-none d-lg-block">or Contact Us</a>
                                        </div>
                                        <div class="emi_plan_frm">
                                            <form onSubmit={bookRide}>
                                                <div class="row">
                                                    <div class="col-lg-6 d-lg-none">
                                                        <div class="form-group">
                                                            {/* <label for="">Select Bike</label> */}
                                                            <a href="#" class="mobile_bikee_selectt">
                                                                {
                                                                    (subdomain == 'india' || subdomain == 'nepal' || subdomain == '') ?
                                                                        bike === "trex" ?
                                                                            <img src="images/sm1.png" alt="a" class="img-fluid" />
                                                                            : bike === "emx" ?
                                                                                <img src="images/sm2.png" alt="a" class="img-fluid" />
                                                                                :
                                                                                <img src="images/sm3.png" alt="a" class="img-fluid" />
                                                                        : (subdomain == 'uae') ?
                                                                            bike == 'trex' ?
                                                                                <img src="images/sm1.png" alt="a" class="img-fluid" />
                                                                                : bike == 'doodle' ?
                                                                                    <img src="images/sm3.png" alt="a" class="img-fluid" />
                                                                                    : bike == 'energ' ?
                                                                                        <img src="images/uae/ENERG/White-Pulse.png" alt="a" class="img-fluid" />
                                                                                        : bike == 'trible' ?
                                                                                            <img src="images/uae/TRIBLE/Blue-Pulse.png" alt="a" class="img-fluid" />
                                                                                            :
                                                                                            ''
                                                                            : (subdomain == 'japan') ?
                                                                                bike == 'xplorer' ?
                                                                                    <img src="images/Japan/Bottom-Bikes/Xplorer.png" alt="a" class="img-fluid" />
                                                                                    : bike == 'dolphin' ?
                                                                                        <img src="images/Japan/Bottom-Bikes/Dolphin.png" alt="a" class="img-fluid" />
                                                                                        : bike == 'glyder' ?
                                                                                            <img src="images/Japan/Bottom-Bikes/Glyder.png" alt="a" class="img-fluid" />
                                                                                            :
                                                                                            ''
                                                                                : ''
                                                                }
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-6">
                                                        <div class="form-group d-lg-block">
                                                            <label for="">Select Bike</label>
                                                            <select name="bike" class="form-control" defaultValue="" required onChange={changeBike}>
                                                                <option value="">Select Bike</option>
                                                                {
                                                                    (subdomain == 'india' || subdomain == '' || subdomain == 'nepal') ?
                                                                        <>
                                                                            <option value="TREX">TREX</option>
                                                                            <option value="EMX">EMX</option>
                                                                            <option value="DOODLE">DOODLE</option>
                                                                        </>
                                                                        : (subdomain == 'uae') ?
                                                                            <>
                                                                                <option value="TREX">TREX</option>
                                                                                <option value="ENERG">ENERG</option>
                                                                                <option value="DOODLE">DOODLE</option>
                                                                                <option value="TRIBLE">TRIBLE</option>
                                                                            </>
                                                                            : (subdomain == 'japan') ?
                                                                                <>
                                                                                    <option value="XPLORER">XPLORER</option>
                                                                                    <option value="GLYDER">GLYDER</option>
                                                                                    <option value="DOLPHIN">DOLPHIN</option>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <option value="TREX">TREX</option>
                                                                                    <option value="EMX">EMX</option>
                                                                                    <option value="DOODLE">DOODLE</option>
                                                                                </>
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="">Your Name</label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter your name"
                                                                name="name"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="">Your Email</label>
                                                            <input
                                                                type="email"
                                                                class="form-control"
                                                                placeholder="Enter your email"
                                                                name="email"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            {
                                                                (subdomain == '' || subdomain == 'india') ?
                                                                    <label for="">Your Contact (+91)</label>
                                                                    : (subdomain == 'uae') ?
                                                                        <label for="">Your Contact (+971)</label>
                                                                        : (subdomain == 'japan') ?
                                                                            <label for="">Your Contact (+81)</label>
                                                                            : (subdomain == 'nepal') ?
                                                                                <label for="">Your Contact (+977)</label>
                                                                                :
                                                                                <label for="">Your Contact (+91)</label>
                                                            }
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                placeholder="Enter your number"
                                                                name="contact"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="">Enter City</label>

                                                            <select name="city" class="form-control" required onChange={e => setCity(e.target.value)}>
                                                                {
                                                                    <>
                                                                        <option value="">Select City</option>
                                                                        {
                                                                            cities.map(x => <option value={x}>{x}</option>)
                                                                        }
                                                                    </>
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="">Choose Date</label>
                                                            <input
                                                                type="date"
                                                                class="form-control"
                                                                name="rideDate"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <label for="">Select Dealer</label>
                                                            <select name="dealer" class="form-control" required>
                                                                {
                                                                    stores.map(x => <option value={x.id}>{x.name}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12">
                                                        <div class="test_ride_submit_btn text-center">
                                                            <button type="submit">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                            }
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
                                                    <td>Mechanic Disc Brake <small style={{ position: "unset" }}>JAK F&R</small></td>

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
                                                <Link to="/doodle">今すぐ購入</Link>
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

            <Footer />
        </>
    );
}
export default BookRide;