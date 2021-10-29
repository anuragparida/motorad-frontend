import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server, config, checkAccess } from "../env";
import isLoggedIn from './../utils/checkLogin';
import Cookies from 'js-cookie';

const Navbar = (props) => {

  const [links, setLinks] = useState({});
  const [logged, setLogged] = useState(false);

  const loadLinks = async() => {
    await axios
      .get(server + "/api/social/read", config)
      .then((rsp) => {
        console.log(rsp);
        setLinks(rsp.data.payload.reduce((t, e) => ({ ...t, [e.name]: e.link }), {}));
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

  useEffect(() => {
    loadLinks();
    setLogged(isLoggedIn());
  }, []);
  

  return(
    <div class="navbar_static">
     <header class="header_social_sec">
         <div class="container-fluid">
             <div class="row">
                 <div class="col-lg-6">
                     <div class="header_social_icons">
                       { links.linkedin &&
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
                 <div class="col-lg-6">
                     <div class="header_rgt_links">
                         <ul>
                            <li>
                                <a href="javascript:void(0)"><img src="images/india-flag.png" alt="a" class="img-fluid"/> India</a>
                                <ul class="assurance_drop_dwn_5">
                                    <li><a href="#"><img src="images/india-flag.png" alt="a" class="img-fluid"/> India</a></li>
                                    <li><a href="#"><img src="images/uae.png" alt="a" class="img-fluid"/> UAE</a></li>
                                    <li><a href="#"><img src="images/japan.png" alt="a" class="img-fluid"/> Japan</a></li>
                                    <li><a href="#"><img src="images/nepal.png" alt="a" class="img-fluid"/> Nepal</a></li>
                                </ul>
                            </li>
                             <li><a href="mailtocontactus@emotorad.com:">contactus@emotorad.com</a></li>
                             <li><a href="#">+91-8686050590</a></li>
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
                  <img src="images/logo-main.svg" alt="logo" class="img-fluid"/>
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={window.openNav}>
                <span class="fa fa-bars"></span>
              </button>
              <div class="collapse navbar-collapse d-none d-lg-block" id="navbarNav">
                <ul class="navbar-nav mr-auto custm_scrl">
                  <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">THE BIKES</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link drp_dwn_clk" href="javascript:void(0)">ASSURANCE</a>
                     <ul class="assurance_drop_dwn">
                         <li>
                             <Link to="/warranty">Activate Warranty</Link>
                         </li>
                         <li>
                             <Link to="/insurance">Insurance</Link>
                         </li>
                         <li>
                            <Link to="/rsa">Roadside Assistance</Link>
                         </li>
                         <li>
                             <Link to="/emi">EMI</Link>
                         </li>
                         <li>
                             <Link to="/buysmart">Buy Smart</Link>
                         </li>
                     </ul>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link drp_dwn_clk_2" href="javascript:void(0)">EM WORLD</a>
                    
                     <ul class="assurance_drop_dwn_2">
                         <li>
                             <Link to="/community">Community</Link>
                         </li>
                         <li>
                             <a href="#">Blogs</a>
                         </li>
                     </ul>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link drp_dwn_clk_3" href="javascript:void(0)">REACH US</a>
                    
                     <ul class="assurance_drop_dwn_3">
                         <li>
                            <Link to="/about">About Us</Link>
                         </li>
                         <li>
                            <Link to="/faq">FAQs</Link>
                         </li>
                         <li>
                            <Link to="/partner">Partner with Us</Link>
                         </li>
                         <li>
                            <Link to="/store">Find a Store</Link>
                         </li>
                         <li>
                            <Link to="/careers">Careers</Link>
                         </li>
                         <li>
                            <Link to="/contact">Contact Us</Link>
                         </li>
                     </ul>
                  </li>
                </ul>
                  <form class="form-inline">
                      <Link to="/book" class="head_bttn">BOOK A TEST RIDE</Link>
                       <ul>
                           {/* <li><a href="javascript:void(0)"><img src="images/search_icon.svg" alt="logo" class="img-fluid"/></a></li> */}
                           <li>
                               <a href="javascript:void(0)" class="drp_dwn_clk_4">
                                   {
                                       logged ?
                                       <img src="images/user_2_icon.svg" alt="logo" class="img-fluid"/>
                                       :
                                       <img src="images/user_icon.svg" alt="logo" class="img-fluid"/>
                                   }
                                </a>
                               <ul class="assurance_drop_dwn_4">
                                   {
                                       logged ?
                                       <li>
                                            <a href="javascript:void(0)" onClick={logout}>Logout</a>
                                        </li>
                                        :
                                        <>
                                            <li>
                                                <Link to="/signup">Sign Up</Link>
                                            </li>
                                            <li>
                                                <Link to="/login">Log In</Link>
                                            </li>
                                        </>
                                   }
                                 
                             </ul>
                           </li>
                           <li>
                               <Link to="/cart">
                               {
                                    logged ?
                                    <img src="images/trolly_green.svg" alt="logo" class="img-fluid"/>
                                    :
                                    <img src="images/troli_icon.svg" alt="logo" class="img-fluid"/>
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
                <div class="col-lg-3">
                    <div class="bog_drop_wraps">
                        <img src="images/cycle_warenty.png" alt="a" class="img-fluid"/>
                        <Link to="/trex">T-REX <img src="images/arw_rgt.svg" alt="a" class="img-fluid"/></Link>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="bog_drop_wraps">
                        <img src="images/bicycle_3.png" alt="a" class="img-fluid"/>
                        <Link to="/emx">EMX <img src="images/arw_rgt.svg" alt="a" class="img-fluid"/></Link>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="bog_drop_wraps">
                        <img src="images/bicycle_2.png" alt="a" class="img-fluid"/>
                        <Link to="/doodle">DOODLE <img src="images/arw_rgt.svg" alt="a" class="img-fluid"/></Link>
                    </div>
                </div>
                <div class="col-12">
                    <div class="big_dop_btn">
                        <a href="/bikes">View all Products <img src="images/arw_rgt.svg" alt="a" class="img-fluid"/></a>
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