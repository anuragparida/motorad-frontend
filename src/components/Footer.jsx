import React from "react";
import { Link } from 'react-router-dom';

const Footer = (props) => {
  return(
    <>
     <footer class="footer_section">
         <div class="container">
             <div class="row">
                 <div class="col-lg-5">
                     <div class="ftr_logo">
                         <img src="images/ftr_logo.svg" alt="a" class="img-fluid"/>
                         
                         <p>EMotorad (EM) is an electric vehicles company that strives to bring futuristic e-bikes at an affordable price for adventure seekers, daily commuters, or casual riders.</p>
                         
                         <h6>Support</h6>
                         <a href="#"> <img src="images/ques_icon.svg" alt="a" class="img-fluid"/>Contact Support</a>
                     </div>
                 </div>
                 <div class="col-lg-7">
                     <div class="row">
                         <div class="col-lg-3 col-6">
                             <div class="ftr_links">
                                 <h6>About</h6>
                                 <ul>
                                     <li><a href="about-us.html">Our Story</a></li>
                                     <li><a href="contact.html">Contact Us</a></li>
                                     <li><a href="carrer.html">Careers</a></li>
                                     <li><a href="community.html">Community</a></li>
                                     <li><a href="faq.html">FAQs</a></li>
                                 </ul>
                             </div>
                         </div>
                         <div class="col-lg-3 col-6">
                             <div class="ftr_links">
                                 <h6>Products</h6>
                                 <ul>
                                     <li><a href="#">T-REX</a></li>
                                     <li><a href="emi.html">EMX</a></li>
                                     <li><a href="#">DOODLE</a></li>
                                     <li><a href="all-products.html">All Products</a></li>
                                 </ul>
                             </div>
                         </div>
                         <div class="col-lg-3 col-6">
                             <div class="ftr_links">
                                 <h6>Assurance</h6>
                                 <ul>
                                     <li><a href="warrenty.html">Warranty</a></li>
                                     <li><a href="insuarence.html">Insurance</a></li>
                                     <li><a href="rsa.html">RSA</a></li>
                                     <li><a href="emi.html">EMI</a></li>
                                     <li><a href="buy-smart.html">Buy Smart</a></li>
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
                             <li><a href="#"><img src="images/india-flag.png" alt="a" class="img-fluid"/> India</a>
                                 <ul class="assurance_drop_dwn_5">
                                    <li><a href="#"><img src="images/india-flag.png" alt="a" class="img-fluid"/> India</a></li>
                                    <li><a href="#"><img src="images/uae.png" alt="a" class="img-fluid"/> UAE</a></li>
                                    <li><a href="#"><img src="images/japan.png" alt="a" class="img-fluid"/> Japan</a></li>
                                    <li><a href="#"><img src="images/nepal.png" alt="a" class="img-fluid"/> Nepal</a></li>
                                </ul>
                             </li>
                             <li><a href="#">&copy; 2021 EMotorad, All Rights Reserved</a></li>
                             <li><a href="https://flamecloud.co.uk/">Designed &amp; Developed by <img src="images/fc.svg" alt="a" class="img-fluid"/></a></li>
                         </ul>
                     </div>
                 </div>
                 <div class="col-lg-4 ordr_1">
                      <div class="header_social_icons">
                         <ul>
                             <li>Follow Us</li>
                             <li><a href="#"><i class="fa fa-facebook-square"></i></a></li>
                             <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                             <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                             <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
                         </ul>
                     </div>
                 </div>
             </div>
         </div>
     </section>
     </>
  );
}
export default Footer;