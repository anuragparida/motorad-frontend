import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import { server, config, checkAccess } from "../env";
import Slider from "react-slick";

export default function ProductSlider(props) {
    const [subdomain, setSubdomain] = useState("");
    const [allproducts, setAllProducts] = useState([]);
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

    let settingsIndia, settingsUAE, settingsJapan;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent)
    ) {
        settingsIndia = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 1000,
            autoplay: true,
        };
        settingsUAE = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 1000,
            autoplay: true,
        };
        settingsJapan = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 1000,
            autoplay: true,
        };
    } else {
        settingsIndia = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplaySpeed: 1000,
            autoplay: true,
        };
        settingsUAE = {
            dots: true,
            infinite: false,
            speed: 500,
            autoplaySpeed: 1000,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: true,
        };
        settingsJapan = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplaySpeed: 1000,
            autoplay: true,
            adaptiveHeight: true,
        };
    }


    const loadProducts = async () => {
        let domain = localStorage.getItem('subDomain');
        let server;
        if (domain == 'nepal' || domain == 'india' || domain == '') {
            server = 'https://api.emotorad.com';
        } else if (domain == 'uae') {
            server = 'https://uae-api.emotorad.com';
        } else if (domain == 'japan') {
            server = 'https://japan-api.emotorad.com';
        } else {
            server = 'https://api.emotorad.com';
        }
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
                        setAllProducts(filteredRsp);
                        setProductPrice({
                            ...productPrice,
                            trex: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("t-rex"))[0].price,
                            emx: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("emx"))[0].price,
                            doodle: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"))[0].price,
                            energ: 0,
                            trible: 0,
                        })
                    } else if (domain == 'uae') {
                        setAllProducts(filteredRsp);
                        setProductPrice({
                            ...productPrice,
                            trex: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("t-rex"))[0].price,
                            energ: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("ener g"))[0].price,
                            trible: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("trible"))[0].price,
                            doodle: rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"))[0].price,
                            emx: 0,
                        })
                    } else if (domain == 'japan') {
                        setAllProducts(filteredRsp);
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
        // AOS.init();
        loadProducts()
        let full = window.location.host
        let parts = full.split('.')
        let sub = parts[0]
        // sub = 'uae';
        sub = localStorage.getItem('subDomain');
        setSubdomain(sub);
        // setSubdomain(sub);

    }, [props.country]);

    return (
        <div style={{ width: "100%" }} >
            {/* <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider> */}
            <section class="explore_ebike_sec">
                <div class="container">
                    <div class="">
                        <div class="col-12">
                            <div class="expo_ebike_headin text-left">
                                <h5>Explore E-Bikes</h5>
                            </div>
                        </div>
                    </div>

                    {(subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                        <Slider {...settingsIndia}>
                            <div className="india_slick"> 
                                <Link to="/trex">
                                    <div class="bike_explore_wrap" >
                                        <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />

                                        <h3 className="carousal_box_title">T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                                                    {allproducts.
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
                            <div className="india_slick">
                                <Link to="/emx">
                                    <div class="bike_explore_wrap" >
                                        <img src="images/bicycle_3.png" alt="a" class="img-fluid" />

                                        <h3 className="carousal_box_title">EMX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                                                    {allproducts.
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
                            <div className="india_slick">
                                <Link to="/doodle">
                                    <div class="bike_explore_wrap" >
                                        <img src="images/bicycle_2.png" alt="a" class="img-fluid" />

                                        <h3 className="carousal_box_title">DOODLE <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                                                    {allproducts.
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
                        </Slider>
                        : (subdomain == 'uae') ?
                            <Slider {...settingsUAE}>
                                <div className="">
                                    <Link to="/trex">
                                        <div class="bike_explore_wrap">
                                            <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
                                            <h3 className="carousal_box_title">T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>
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
                                                        {allproducts.
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
                                <div className="">
                                    <Link to="/energ">
                                        <div class="bike_explore_wrap">
                                            <img src="images/uae/Ener-G.png" alt="a" class="img-fluid" />

                                            <h3 className="carousal_box_title">ENER G <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                                                        {allproducts.
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
                                <div className="">
                                    <Link to="/doodle">
                                        <div class="bike_explore_wrap">
                                            <img src="images/bicycle_2.png" alt="a" class="img-fluid" />

                                            <h3 className="carousal_box_title">DOODLE <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                                                        {allproducts.
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
                                <div className="">
                                    <Link to="/trible">
                                        <div class="bike_explore_wrap">
                                            <img src="images/uae/Trible.png" alt="a" class="img-fluid" />

                                            <h3 className="carousal_box_title">TRIBLE
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
                                                        {allproducts.
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
                            </Slider>

                            : (subdomain == 'japan') ?
                                <Slider {...settingsJapan}>
                                    <div>
                                        <Link to="/xplorer">
                                            <div class="bike_explore_wrap" >
                                                <img src="images/Japan/Bottom-Bikes/Xplorer.png" alt="a" class="img-fluid" style={{ width: "185px" }} />
                                                <h3 className="carousal_box_title">XPLORER <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>
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
                                                            {allproducts.
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
                                    <div>
                                        <Link to="/glyder">
                                            <div class="bike_explore_wrap" >
                                                <img src="images/Japan/Bottom-Bikes/Glyder.png" alt="a" class="img-fluid" style={{ width: "185px" }} />

                                                <h3 className="carousal_box_title">GLYDER <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                                                        <td>Mechanic Disc Brake</td>
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
                                                            {allproducts.
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
                                    <div>
                                        <Link to="/dolphine">
                                            <div class="bike_explore_wrap" >
                                                <img src="images/Japan/Bottom-Bikes/Dolphin.png" alt="a" class="img-fluid" style={{ width: "185px" }} />

                                                <h3 className="carousal_box_title">DOLPHIN <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                                                            {allproducts.
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
                                </Slider>
                                : (subdomain == 'nepal') ?
                                    <Slider {...settingsIndia}>
                                        <div>
                                            <Link to="/trex">
                                                <div class="bike_explore_wrap" >
                                                    <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />

                                                    <h3 className="carousal_box_title">T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                                                                {allproducts.
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
                                        <div>
                                            <Link to="/emx">
                                                <div class="bike_explore_wrap" >
                                                    <img src="images/bicycle_3.png" alt="a" class="img-fluid" />

                                                    <h3 className="carousal_box_title">EMX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                                                                {allproducts.
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
                                        <div>
                                            <Link to="/doodle">
                                                <div class="bike_explore_wrap" >
                                                    <img src="images/bicycle_2.png" alt="a" class="img-fluid" />

                                                    <h3 className="carousal_box_title">DOODLE <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></h3>

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
                                                                {allproducts.
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
                                    </Slider>
                                    : ''
                    }



                </div>
            </section>

        </div>
    );
}