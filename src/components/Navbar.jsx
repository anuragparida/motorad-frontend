import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server, config, checkAccess } from "../env";
import isLoggedIn from './../utils/checkLogin';
import Cookies from 'js-cookie';
import PageLoader from "./PageLoader";

const Navbar = (props) => {

    const [links, setLinks] = useState({});
    const [cartHasItem, setCartHasItem] = useState(false);
    const [logged, setLogged] = useState(false);

    const [subdomain, setSubdomain] = useState("");
    const [countryName, setcountryName] = useState("");
    const [countryflag, setcountryflag] = useState("images/india-flag.png");
    const [loading, setloading] = useState(false);


    const reviewSEO = {
        "@context": "https://schema.org/",
        "@type": "AggregateRating",
        "itemReviewed": {
            "@type": "Organization",
            "name": "Emotorad",
            "telephone": "+91 8686050590",
        },
        "ratingValue": "4.7",
        "bestRating": "5",
        "ratingCount": "1500"
    }

    const webpageSEO = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Emotorad",
        "description": "The company aims to bring across top quality electric cycles which would currently cost way higher in the Indian market at an affordable price utilizing its local sourcing and manufacturing capabilities."
    }

    const websiteSEO = {
        "@context": "https://schema.org/",
        "@type": "WebSite",
        "name": "Emotorad",
        "url": "https://emotorad.in/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "{search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }

    const organizationSEO = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Emotorad",
        "url": "https://www.emotorad.com/",
        "logo": "https://emotorad.in/images/logo-main.svg"
    }


    const loadLinks = async () => {
        await axios
            .get(server + "/api/social/read", config)
            .then((rsp) => {
                // console.log(rsp);
                setLinks(rsp.data.payload.reduce((t, e) => ({ ...t, [e.name]: e.link }), {}));
            })
            .catch((err) => {
                checkAccess(err);
                console.error(err);
            });
    }

    const checkCart = async () => {
        await axios
            .get(server + "/api/cart/read", config)
            .then((rsp) => {
                // console.log(rsp);
                setCartHasItem(rsp.data.payload.product.length > 0);
            })
            .catch((err) => {
                checkAccess(err);
                console.error(err);
            });
    }

    const logout = () => {
        Cookies.remove("token");
        window.location.reload();
    }
    const getCountry = (e) => {
        if (e.target.firstElementChild.alt == 'uae') {
            document.location.href = 'https://uae.emotorad.in/';
        } else if (e.target.firstElementChild.alt == 'india') {
            document.location.href = 'https://emotorad.in/';
        } else if (e.target.firstElementChild.alt == 'japan') {
            document.location.href = 'https://japan.emotorad.in/';
        } else if (e.target.firstElementChild.alt == 'nepal') {
            document.location.href = 'https://nepal.emotorad.in/';
        }
        localStorage.setItem('subDomain', e.target.firstElementChild.alt);
        localStorage.setItem('countryflag', e.target.firstElementChild.src);

        let sub = localStorage.getItem('subDomain');
        setSubdomain(sub);
        props.setCountry(!props.country)
        setcountryName(e.target.firstElementChild.alt.toUpperCase())
        // console.log(e.target.firstElementChild)
        setcountryflag(e.target.firstElementChild.src)
    }
    const defaultCountry = () => {
        let uaeflag = "images/uae.png";
        let indiaflag = "images/india-flag.png";
        let japanflag = "images/japan.png";
        let nepalflag = "images/nepal.png";

        let full = window.location.host
        let parts = full.split('.')
        let sub = parts[0];    
        //sub = 'uae';
        if(sub == 'uae') {
            localStorage.setItem('subDomain', "uae")
            let getsub = localStorage.getItem('subDomain');
            setSubdomain(getsub);
            setcountryName(getsub.toUpperCase())
            setcountryflag(uaeflag)
        } else if (sub == 'japan') {
            localStorage.setItem('subDomain', "japan")
            let getsub = localStorage.getItem('subDomain');
            setSubdomain(getsub);
            setcountryName(getsub.toUpperCase())
            setcountryflag(japanflag)
        } else if (sub == 'nepal') {
            localStorage.setItem('subDomain', "nepal")
            let getsub = localStorage.getItem('subDomain');
            setSubdomain(getsub);
            setcountryName(getsub.toUpperCase())
            setcountryflag(nepalflag)
        } else {
            localStorage.setItem('subDomain', "india")
            let getsub = localStorage.getItem('subDomain');
            setSubdomain(getsub);
            setcountryName(getsub.toUpperCase())
            setcountryflag(indiaflag)
        }

    }

    useEffect(() => {
        loadLinks();
        setLogged(isLoggedIn());
        if (isLoggedIn()) {
            checkCart();
        }
        // setTimeout(() => {
        //     setloading(true)
        // }, 2000);
        // console.log("domiain is " + subdomain)
        let full = window.location.host
        let parts = full.split('.')
        let sub = parts[0]
        // let getsub = localStorage.getItem('subDomain');
        // let getflag = localStorage.getItem('countryflag') ? localStorage.getItem('countryflag') :"images/india-flag.png";
        // sub = getsub ? getsub : localStorage.setItem('subDomain', "uae")
        // setSubdomain("uae");
        // setcountryName(sub?sub.toUpperCase():"UAE")
        // setcountryflag(getflag)
        defaultCountry()
    }, [loading]);


    return (
        <div class="navbar_static">
            {/* <PageLoader loading={loading}/> */}
            {
                (subdomain == '' || subdomain == 'india' || subdomain == 'nepal') ?
                    <script type="application/ld+json">
                        {JSON.stringify(reviewSEO)}
                        {JSON.stringify(webpageSEO)}
                        {JSON.stringify(websiteSEO)}
                        {JSON.stringify(organizationSEO)}
                    </script>
                    :
                    ''
            }
            <header class="header_social_sec">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="header_social_icons">
                                {links.linkedin &&
                                    <ul>
                                        <li>{subdomain == 'japan' ? 'フォローする' : 'Follow Us'}</li>
                                        <li><a target="_blank" href={subdomain == 'japan' ? "https://www.facebook.com/EMotoradEbikeJapan" : links.facebook}><i class="fa fa-facebook-square"></i></a></li>
                                        <li><a target="_blank" href={links.twitter}><i class="fa fa-twitter"></i></a></li>
                                        <li><a target="_blank" href={subdomain == 'japan' ? "https://instagram.com/emotorad_ebike_japan?utm_medium=copy_link" : links.instagram}><i class="fa fa-instagram"></i></a></li>
                                        <li><a target="_blank" href={links.linkedin}><i class="fa fa-linkedin-square"></i></a></li>
                                    </ul>
                                }
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="header_rgt_links">
                                <ul>
                                    <li>

                                        <a href="javascript:void(0)"><img src={countryflag} alt="a" class="img-fluid" /> {countryName}</a>
                                        <ul class="assurance_drop_dwn_5">
                                            <li onClick={(e) => getCountry(e)}><a href="javascript:void(0)"><img src="images/india-flag.png" alt="india" class="img-fluid" />India</a></li>
                                            <li onClick={(e) => getCountry(e)} ><a href="javascript:void(0)"><img src="images/uae.png" alt="uae" class="img-fluid" />UAE</a></li>
                                            <li onClick={(e) => getCountry(e)}><a href="javascript:void(0)"><img src="images/japan.png" alt="japan" class="img-fluid" />Japan</a></li>
                                            <li onClick={(e) => getCountry(e)}><a href="javascript:void(0)"><img src="images/nepal.png" alt="nepal" class="img-fluid" />Nepal</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="mailtocontactus@emotorad.com:">{subdomain == 'japan' ? 'connect_japan@emotorad.com' : "contactus@emotorad.com"}</a></li>
                                    <li><a href="#">{subdomain == 'japan' ? '+81 90 3683 8540' : "+91-8686050590"}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section class="nav_section">
                <div class="container">
                    <nav class="navbar px-0 navbar-expand-lg navbar-light">
                        <a class="navbar-brand" href="/">
                            <img src="images/logo-main.svg" alt="logo" class="img-fluid" />
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={window.openNav}>
                            <span class="fa fa-bars"></span>
                        </button>
                        <div class="collapse navbar-collapse d-none d-lg-block" id="navbarNav">
                            <ul class="navbar-nav mr-auto custm_scrl">
                                <li class="nav-item">
                                    <a class="nav-link" href="javascript:void(0)"><Link to="/">HOME</Link></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">{subdomain == 'japan' ? 'バイク' : 'THE BIKES'}</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link drp_dwn_clk" href="javascript:void(0)">{subdomain == 'japan' ? 'ご購入者の方へ' : 'ASSURANCE'}</a>
                                    <ul class="assurance_drop_dwn">
                                        <li>
                                            <Link to="/warranty">{subdomain == 'japan' ? '保証を有効にする' : 'Activate Warranty'}</Link>
                                        </li>
                                        {
                                            (subdomain == 'india' || subdomain == '') ?
                                                <li>
                                                    <Link to="/insurance">{subdomain == 'japan' ? '保 険' : 'Insurance'}</Link>
                                                </li>
                                                :
                                                ''
                                        }
                                        {
                                            (subdomain == 'india' || subdomain == '') ?
                                                <li>
                                                    <Link to="/rsa">{subdomain == 'japan' ? '道端での援助' : 'Roadside Assistance'}</Link>
                                                </li>
                                                :
                                                ''
                                        }
                                        {
                                            (subdomain == 'india' || subdomain == '') ?
                                                <li>
                                                    <Link to="/emi">EMI</Link>
                                                </li>
                                                : ""}
                                        <li>
                                            <Link to="/buysmart">{subdomain == 'japan' ? 'スマートに購入' : 'Buy Smart'}</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link drp_dwn_clk_2" href="javascript:void(0)">EM WORLD</a>

                                    <ul class="assurance_drop_dwn_2">
                                        <li>
                                            <Link to="/community">{subdomain == "japan" ? "コミュニティ" : "Community"}</Link>
                                        </li>
                                        <li>
                                            <a href="https://blog.emotorad.in/" target="blank">{subdomain == "japan" ? "ブログ" : "Blogs"}</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link drp_dwn_clk_3" href="javascript:void(0)">{subdomain == 'japan' ? 'お問い合わせ' : 'REACH US'}</a>

                                    <ul class="assurance_drop_dwn_3">
                                        <li>
                                            <Link to="/about">{subdomain == 'japan' ? "私たちに関しては" : "About Us"}</Link>
                                        </li>
                                        <li>
                                            <Link to="/faq">FAQs</Link>
                                        </li>
                                        <li>
                                            <Link to="/partner">{subdomain == 'japan' ? "私たちとパートナー" : "Partner with Us"}</Link>
                                        </li>
                                        <li>
                                            <Link to="/store">{subdomain == 'japan' ? "お店を探す" : "Find a Store"}</Link>
                                        </li>
                                        <li>
                                            <Link to="/careers">{subdomain == 'japan' ? "キャリア" : "Careers"}</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">{subdomain == 'japan' ? "お問い合わせ" : "Contact Us"}</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <form class="form-inline">
                                <Link to="/book" class="head_bttn">{subdomain == 'japan' ? '試乗を予約する' : "BOOK A TEST RIDE"}</Link>
                                <ul>
                                    {/* <li><a href="javascript:void(0)"><img src="images/search_icon.svg" alt="logo" class="img-fluid"/></a></li> */}
                                    <li>
                                        <a href="javascript:void(0)" class="drp_dwn_clk_4">
                                            {
                                                logged ?
                                                    <img src="images/user_2_icon.svg" alt="logo" class="img-fluid" />
                                                    :
                                                    <img src="images/user_icon.svg" alt="logo" class="img-fluid" />
                                            }
                                        </a>
                                        <ul class="assurance_drop_dwn_4" style={{ "right": logged ? "55px" : "70px" }}>
                                            {
                                                logged ?
                                                    <>
                                                        <li>
                                                            <a href="/overview">Overview</a>
                                                        </li>
                                                        <li>
                                                            <a href="/account">Settings</a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:void(0)" onClick={logout}>Logout</a>
                                                        </li>
                                                    </>
                                                    :
                                                    <>
                                                        <li>
                                                            <Link to="/signup">{subdomain == 'japan' ? "サインアップ " : "Sign Up"}</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/login">{subdomain == 'japan' ? "ログインする" : "Log In"}</Link>
                                                        </li>
                                                    </>
                                            }

                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="/cart">
                                            {
                                                logged && cartHasItem ?
                                                    <img src="images/trolly_green.svg" alt="logo" class="img-fluid" />
                                                    :
                                                    <img src="images/troli_icon.svg" alt="logo" class="img-fluid" />
                                            }

                                        </Link>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </nav>
                </div>

                <div class="big_dropdown_wrap collapse" id="collapseExample">
                    <div class="container">
                        <div class="row justify-content-center">
                            {(subdomain === '' || subdomain === 'nepal') ?
                                <>
                                    <div class="col-lg-3">
                                        <div class="bog_drop_wraps">
                                            <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
                                            <Link to="/trex">T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="bog_drop_wraps">
                                            <img src="images/bicycle_3.png" alt="a" class="img-fluid" />
                                            <Link to="/emx">EMX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="bog_drop_wraps">
                                            <img src="images/bicycle_2.png" alt="a" class="img-fluid" />
                                            <Link to="/doodle">DOODLE <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                        </div>
                                    </div>
                                </>
                                : (subdomain === 'uae') ?
                                    <>
                                        <div class="col-lg-3">
                                            <div class="bog_drop_wraps">
                                                <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
                                                <Link to="/trex">T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="bog_drop_wraps">
                                                <img src="images/bicycle_2.png" alt="a" class="img-fluid" />
                                                <Link to="/doodle">DOODLE <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="bog_drop_wraps">
                                                <img src="images/uae/Ener-G.png" alt="a" class="img-fluid" style={{ height: '139px' }} />
                                                <Link to="/energ">ENER G <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="bog_drop_wraps">
                                                <img src="images/uae/Trible.png" alt="a" class="img-fluid" style={{ height: '139px' }} />
                                                <Link to="/trible">TRIBLE <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                            </div>
                                        </div>
                                    </>
                                    : (subdomain === 'japan') ?
                                        <>
                                            <div class="col-lg-3">
                                                <div class="bog_drop_wraps">
                                                    <img src="images/Japan/XPLORER/Xplorer-pulse-black.png" alt="a" class="img-fluid" style={{ height: '139px' }} />
                                                    <Link to="/xplorer">XPLORER <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                                </div>
                                            </div>
                                            <div class="col-lg-3">
                                                <div class="bog_drop_wraps">
                                                    <img src="images/Japan/GLYDER/Glyder-pulse-black.png" alt="a" class="img-fluid" style={{ height: '139px' }} />
                                                    <Link to="/glyder">GLYDER <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                                </div>
                                            </div>
                                            <div class="col-lg-3">
                                                <div class="bog_drop_wraps">
                                                    <img src="images/Japan/DOLPHIN/BottomPart-BlinkingPoints/Dolphin-Pulse-part.png" alt="a" class="img-fluid" style={{ height: '139px' }} />
                                                    <Link to="/dolphine">DOLPHIN <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div class="col-lg-3">
                                                <div class="bog_drop_wraps">
                                                    <img src="images/cycle_warenty.png" alt="a" class="img-fluid" />
                                                    <Link to="/trex">T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                                </div>
                                            </div>
                                            <div class="col-lg-3">
                                                <div class="bog_drop_wraps">
                                                    <img src="images/bicycle_3.png" alt="a" class="img-fluid" />
                                                    <Link to="/emx">EMX <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                                </div>
                                            </div>
                                            <div class="col-lg-3">
                                                <div class="bog_drop_wraps">
                                                    <img src="images/bicycle_2.png" alt="a" class="img-fluid" />
                                                    <Link to="/doodle">DOODLE <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></Link>
                                                </div>
                                            </div>
                                        </>
                            }
                            <div class="col-12">
                                <div class="big_dop_btn">
                                    <a href="/bikes">View all Products <img src="images/arw_rgt.svg" alt="a" class="img-fluid" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {props.children}
        </div>
    );
}
export default Navbar;