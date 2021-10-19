import React from "react";
import { Link } from 'react-router-dom';

const MobileNavbar = (props) => {
  return(
    <div class="mobile_menu_wrap d-lg-none" id="mySidebar">
       <div class="nav_close">
           <a href="javascript:void(0)" class="closebtn" onclick="closeNav()"><i class="fa fa-close"></i></a>
       </div>
        <div class="mobile_main_mnu">
            <ul>
                <li>
                    <a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExamplea" aria-expanded="false" aria-controls="collapseExamplea">THE BIKES</a>
                    <ul class="mobile_submnu collapse" id="collapseExamplea">
                        <li><a href="#"><img src="images/sm1.png" alt="a" class="img-fluid"/>T- REX</a></li>
                        <li><a href="#"><img src="images/sm2.png" alt="a" class="img-fluid"/>EMX</a></li>
                        <li><a href="#"><img src="images/sm3.png" alt="a" class="img-fluid"/>DOODLE</a></li>
                    </ul>
                </li>
                
                <li><a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExampleaa" aria-expanded="false" aria-controls="collapseExampleaa">ASSURANCE</a>
                
                    <ul class="mobile_submnu collapse" id="collapseExampleaa">
                        <li><a href="warrenty.html">Activate Warranty</a></li>
                        <li><a href="insuarence.html">Insurance</a></li>
                        <li><a href="rsa.html">RSA</a></li>
                        <li><Link to="/emi">EMI</Link></li>
                        <li><a href="buy-smart.html">Buy Smart</a></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExampleaaa" aria-expanded="false" aria-controls="collapseExampleaaa">EM WORLD</a>
                <ul class="mobile_submnu collapse" id="collapseExampleaaa">
                        <li><a href="community.html">Community</a></li>
                        <li><a href="buy-smart.html">Blogs</a></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExampleaaaa" aria-expanded="false" aria-controls="collapseExampleaaaa">REACH US</a>
                    <ul class="mobile_submnu collapse" id="collapseExampleaaaa">
                        <li>
                             <a href="about-us.html">About Us</a>
                         </li>
                         <li>
                             <a href="faq.html">FAQs</a>
                         </li>
                         <li>
                             <a href="partner.html">Partner with Us</a>
                         </li>
                         <li>
                             <a href="find-store.html">Find a Store</a>
                         </li>
                         <li>
                             <a href="carrer.html">Careers</a>
                         </li>
                         <li>
                             <a href="contact.html">Contact Us</a>
                         </li>
                    </ul>
                </li>
            </ul>
        </div>
        
        <div class="mobile_social_icons">
             <ul>
                 <li><a href="#"><i class="fa fa-facebook-square"></i></a></li>
                 <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                 <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                 <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
             </ul>
         </div>
         
         <div class="mobile_ftr">
             <ul>
                 <li><a href="tos.html">Terms &amp; Conditions</a></li>
                 <li><a href="privacy.html">Privacy Policy</a></li>
                 <li><a href="cookie.html">Cookie Policy</a></li>
             </ul>
         </div>
        
    </div>
  );
}
export default MobileNavbar;