import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { server, config, checkAccess } from "../env";

const MobileNavbar = (props) => {
  const [links, setLinks] = useState({});
  let subdomain = localStorage.getItem('subDomain');
  const loadLinks = async() => {
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

  useEffect(() => {
    loadLinks();
  }, []);

  return(
    <div class="mobile_menu_wrap d-lg-none" id="mySidebar">
       <div class="nav_close">
           <a href="javascript:void(0)" class="closebtn" onClick={window.closeNav}><i class="fa fa-close"></i></a>
       </div>
        <div class="mobile_main_mnu">
            <ul>
                <li>
                    <a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExamplea" aria-expanded="false" aria-controls="collapseExamplea">THE BIKES</a>
                    <ul class="mobile_submnu collapse" id="collapseExamplea">
                        {
                            (subdomain == 'india' || subdomain == '' || subdomain == 'nepal') ?
                            <>
                                <li><Link to="/trex"><img src="images/sm1.png" alt="a" class="img-fluid"/>T- REX</Link></li>
                                <li><Link to="/emx"><img src="images/sm2.png" alt="a" class="img-fluid"/>EMX</Link></li>
                                <li><Link to="/doodle"><img src="images/sm3.png" alt="a" class="img-fluid"/>DOODLE</Link></li>
                            </>
                            :(subdomain == 'uae') ?
                                <>
                                    <li><Link to="/trex"><img src="images/sm1.png" alt="a" class="img-fluid"/>T- REX</Link></li>
                                    <li><Link to="/enrg"><img src="images/uae/ENERG/White-Pulse.png" alt="a" class="img-fluid"/>ENERG</Link></li>
                                    <li><Link to="/doodle"><img src="images/sm3.png" alt="a" class="img-fluid"/>DOODLE</Link></li>
                                    <li><Link to="/trible"><img src="images/uae/TRIBLE/Blue-Pulse.png" alt="a" class="img-fluid"/>TRIBLE</Link></li>
                                </>
                            :(subdomain == 'japan') ?
                            <>
                                <li><Link to="/dolphine"><img src="images/Japan/DOLPHIN/BottomPart-BlinkingPoints/Dolphin-Pulse-part.png" alt="a" class="img-fluid"/>DOLPHIN</Link></li>
                                <li style={{ display:'none' }}><Link to="/dolphin"><img src="images/Japan/DOLPHIN/BottomPart-BlinkingPoints/Dolphin-Pulse-part.png" alt="a" class="img-fluid"/>DOLPHIN</Link></li>
                                {/* <li><Link to="/dolphin"><img src="images/Japan/DOLPHIN/BottomPart-BlinkingPoints/Dolphin-Pulse-part.png" alt="a" class="img-fluid"/>DOLPHIN</Link></li> */}
                                <li><Link to="/xplorer"><img src="images/Japan/XPLORER/Bottom Part-BlinkingPoints/Xplorer-pulse-black.png" alt="a" class="img-fluid"/>XPLORER </Link></li>
                                <li><Link to="/glyder"><img src="images/Japan/GLYDER/Glyder-pulse-black.png" alt="a" class="img-fluid"/>GLYDER</Link></li>
                            </>    
                            :
                            ''    
                        }
                        
                    </ul>
                </li>
                
                <li><a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExampleaa" aria-expanded="false" aria-controls="collapseExampleaa">ASSURANCE</a>
                
                    <ul class="mobile_submnu collapse" id="collapseExampleaa">
                        <li><Link to="/warranty">Activate Warranty</Link></li>
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
                </li>
                <li><a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExampleaaa" aria-expanded="false" aria-controls="collapseExampleaaa">EM WORLD</a>
                <ul class="mobile_submnu collapse" id="collapseExampleaaa">
                        <li><Link to="/community">Community</Link></li>
                        <li><Link to="#">Blogs</Link></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExampleaaaa" aria-expanded="false" aria-controls="collapseExampleaaaa">REACH US</a>
                    <ul class="mobile_submnu collapse" id="collapseExampleaaaa">
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
        </div>
        
        <div class="mobile_social_icons">
             <ul>
                { links.linkedin &&
                    <ul>
                        <li>Follow Us</li>
                        <li><a target="_blank" href={links.facebook}><i class="fa fa-facebook-square"></i></a></li>
                        <li><a target="_blank" href={links.twitter}><i class="fa fa-twitter"></i></a></li>
                        <li><a target="_blank" href={links.instagram}><i class="fa fa-instagram"></i></a></li>
                        <li><a target="_blank" href={links.linkedin}><i class="fa fa-linkedin-square"></i></a></li>
                    </ul>
                  }
             </ul>
         </div>
         
         <div class="mobile_ftr">
             <ul>
                 <li><Link to="/tos">Terms &amp; Conditions</Link></li>
                 <li><Link to="/privacy">Privacy Policy</Link></li>
                 <li><Link to="/cookies">Cookie Policy</Link></li>
             </ul>
         </div>
        
    </div>
  );
}
export default MobileNavbar;