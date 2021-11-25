import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { server, config, checkAccess } from "../env";
import WhattsApp from "./WhattsApp";

const Footer = (props) => {
    const [countryName, setcountryName] = useState("");
    const [countryflag, setcountryflag] = useState("images/india-flag.png");
    const [links, setLinks] = useState({});
    const [subdomain, setSubdomain] = useState("");

    let domain = localStorage.getItem('subDomain');

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
    const getCountry = (e) => {
        if (e.target.firstElementChild.alt == 'uae') {
            document.location.href = 'https://uae.emotorad.com/';
        } else if (e.target.firstElementChild.alt == 'india') {
            document.location.href = 'https://emotorad.com/';
        } else if (e.target.firstElementChild.alt == 'japan') {
            document.location.href = 'https://japan.emotorad.com/';
        } else if (e.target.firstElementChild.alt == 'nepal') {
            document.location.href = 'https://nepal.emotorad.com/';
        }
        localStorage.setItem('subDomain', e.target.firstElementChild.alt);
        localStorage.setItem('countryflag', e.target.firstElementChild.src);

        let sub = localStorage.getItem('subDomain');
        //sub = 'uae';
        setSubdomain(sub);
        //props.setCountry(!props.country)
        setcountryName(e.target.firstElementChild.alt.toUpperCase())
        // console.log(e.target.firstElementChild)
        setcountryflag(e.target.firstElementChild.src)
    }

    const setFlag = (sub) => {
        let uaeflag = "images/uae.png";
        let indiaflag = "images/india-flag.png";
        let japanflag = "images/japan.png";
        let nepalflag = "images/nepal.png";
        switch (sub) {
            case 'uae':
                setcountryflag(uaeflag)
                break;
            case 'india':
                setcountryflag(indiaflag)
                break;
            case 'japan':
                setcountryflag(japanflag)
                break;
            case 'nepal':
                setcountryflag(nepalflag)
                break;
            default:
                setcountryflag(indiaflag)
                break;

        }

    }

    useEffect(() => {
        loadLinks();
        let sub = localStorage.getItem('subDomain');
        // let full = window.location.host
        // let parts = full.split('.')
        // let sub = parts[0];   
        setFlag(sub)
        setcountryName(sub.toUpperCase())
    }, [props.country]);

    return (
        <>
            <WhattsApp />

            <footer class="footer_section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="ftr_logo">
                                <img src="images/ftr_logo.svg" alt="a" class="img-fluid" />

                                <p>EMotorad (EM) is an electric vehicles company that strives to bring futuristic e-bikes at an affordable price for adventure seekers, daily commuters, or casual riders.</p>

                                <h6>Support</h6>
                                <Link to="/contact"> <img src="images/ques_icon.svg" alt="a" class="img-fluid" />Contact Support</Link>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="row">
                                <div class="col-lg-3 col-6">
                                    <div class="ftr_links">
                                        <h6>About</h6>
                                        <ul>
                                            <li><Link to="/about">Our Story</Link></li>
                                            <li><Link to="/contact">Contact Us</Link></li>
                                            <li><Link to="/careers">Careers</Link></li>
                                            <li><Link to="/community">Community</Link></li>
                                            <li><Link to="/faq">FAQs</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-6">
                                    <div class="ftr_links">
                                        <h6>Products</h6>
                                        <ul>
                                            <li><Link to="/trex">T-REX</Link></li>
                                            <li><Link to="/emx">EMX</Link></li>
                                            <li><Link to="/doodle">DOODLE</Link></li>
                                            <li><a href="/bikes">All Products</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-6">
                                    <div class="ftr_links">
                                        <h6>Assurance</h6>
                                        <ul>
                                            <li><Link to="/warranty">Warranty</Link></li>
                                            {
                                                (subdomain == 'india' || subdomain == '') ?
                                                    <>
                                                        <li><Link to="/insurance">Insurance</Link></li>
                                                        <li><Link to="/rsa">RSA</Link></li>
                                                        <li><Link to="/emi">EMI</Link></li>
                                                    </>
                                                    :
                                                    ''
                                            }
                                            <li><Link to="/buysmart">Buy Smart</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-6">
                                    <div class="ftr_links">
                                        <h6>Policy</h6>
                                        <ul>
                                            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
                                            <li><Link to="/privacy">Privacy Policy</Link></li>
                                            <li><Link to="/cookies">Cookie Policy</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <section class="footer_btm_sec pb-5 pb-md-3">
                <div class="container">
                    <div class="row pb-3 pb-md-0">
                        <div class="col-lg-8 ordr_2">
                            <div class="ftr_btm_lft">
                                <ul>
                                    <li><Link to="#"><img src={countryflag} alt="a" class="img-fluid" /> {countryName}</Link>
                                        <ul class="assurance_drop_dwn_5">
                                            {/* <li><Link to="#"><img src="images/india-flag.png" alt="a" class="img-fluid" /> India</Link></li>
                                            <li><Link to="#"><img src="images/uae.png" alt="a" class="img-fluid" /> UAE</Link></li>
                                            <li><Link to="#"><img src="images/japan.png" alt="a" class="img-fluid" /> Japan</Link></li>
                                            <li><Link to="#"><img src="images/nepal.png" alt="a" class="img-fluid" /> Nepal</Link></li> */}
                                            <li onClick={(e) => getCountry(e)}><a href="javascript:void(0)"><img src="images/india-flag.png" alt="india" class="img-fluid" />India</a></li>
                                            <li onClick={(e) => getCountry(e)} ><a href="javascript:void(0)"><img src="images/uae.png" alt="uae" class="img-fluid" />UAE</a></li>
                                            <li onClick={(e) => getCountry(e)}><a href="javascript:void(0)"><img src="images/japan.png" alt="japan" class="img-fluid" />Japan</a></li>
                                            <li onClick={(e) => getCountry(e)}><a href="javascript:void(0)"><img src="images/nepal.png" alt="nepal" class="img-fluid" />Nepal</a></li>
                                        </ul>
                                    </li>
                                    <li><Link to="#">&copy; 2021 EMotorad, All Rights Reserved</Link></li>
                                    <li><a href="https://flamecloud.co.uk/">Designed &amp; Developed by <img src="images/fc.svg" alt="a" class="img-fluid" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-4 ordr_1">
                            <div class="header_social_icons">
                                {links.linkedin &&
                                    <ul>
                                        <li>Follow Us</li>
                                        <li><a target="_blank" href={links.facebook}><i class="fa fa-facebook-square"></i></a></li>
                                        <li><a target="_blank" href={links.twitter}><i class="fa fa-twitter"></i></a></li>
                                        <li><a target="_blank" href={links.instagram}><i class="fa fa-instagram"></i></a></li>
                                        <li><a target="_blank" href={links.linkedin}><i class="fa fa-linkedin-square"></i></a></li>
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Footer;