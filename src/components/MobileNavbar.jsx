import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { server, config, checkAccess } from "../env";
import isLoggedIn from './../utils/checkLogin';
import Cookies from 'js-cookie';

const MobileNavbar = (props) => {
  const [links, setLinks] = useState({});
  const [logged, setLogged] = useState(false);
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

  const logout = () => {
    Cookies.remove("token");
    window.location.reload();
  }

  useEffect(() => {
    loadLinks();
    setLogged(isLoggedIn());
  }, []);

  return(
    <div class="mobile_menu_wrap d-lg-none" id="mySidebar">
       <div class="nav_close">
           <a href="javascript:void(0)" class="closebtn" onClick={window.closeNav}><i class="fa fa-close"></i></a>
       </div>
        <div class="mobile_main_mnu">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExamplea" aria-expanded="false" aria-controls="collapseExamplea">THE BIKES</a>
                    <ul class="mobile_submnu collapse" id="collapseExamplea">
                        {
                            (subdomain == 'india' || subdomain == '' || subdomain == 'nepal') ?
                            <>
                                <li><a href="/trex"><img src="images/sm1.png" alt="a" class="img-fluid"/>T- REX</a></li>
                                <li><a href="/emx"><img src="images/sm2.png" alt="a" class="img-fluid"/>EMX</a></li>
                                <li><a href="/doodle"><img src="images/sm3.png" alt="a" class="img-fluid"/>DOODLE</a></li>
                            </>
                            :(subdomain == 'uae') ?
                                <>
                                    <li><a href="/trex"><img src="images/sm1.png" alt="a" class="img-fluid"/>T- REX</a></li>
                                    <li><a href="/enrg"><img src="images/uae/ENERG/White-Pulse.png" alt="a" class="img-fluid"/>ENERG</a></li>
                                    <li><a href="/doodle"><img src="images/sm3.png" alt="a" class="img-fluid"/>DOODLE</a></li>
                                    <li><a href="/trible"><img src="images/uae/TRIBLE/Blue-Pulse.png" alt="a" class="img-fluid"/>TRIBLE</a></li>
                                </>
                            :(subdomain == 'japan') ?
                            <>
                                <li><a href="/dolphine"><img src="images/Japan/DOLPHIN/BottomPart-BlinkingPoints/Dolphin-Pulse-part.png" alt="a" class="img-fluid"/>DOLPHIN</a></li>
                                <li style={{ display:'none' }}><a href="/dolphin"><img src="images/Japan/DOLPHIN/BottomPart-BlinkingPoints/Dolphin-Pulse-part.png" alt="a" class="img-fluid"/>DOLPHIN</a></li>
                                {/* <li><Link to="/dolphin"><img src="images/Japan/DOLPHIN/BottomPart-BlinkingPoints/Dolphin-Pulse-part.png" alt="a" class="img-fluid"/>DOLPHIN</Link></li> */}
                                <li><a href="/xplorer"><img src="images/Japan/XPLORER/Bottom Part-BlinkingPoints/Xplorer-pulse-black.png" alt="a" class="img-fluid"/>XPLORER </a></li>
                                <li><a href="/glyder"><img src="images/Japan/GLYDER/Glyder-pulse-black.png" alt="a" class="img-fluid"/>GLYDER</a></li>
                            </>    
                            :
                            ''    
                        }
                        
                    </ul>
                </li>
                
                <li><a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExampleaa" aria-expanded="false" aria-controls="collapseExampleaa">ASSURANCE</a>
                
                    <ul class="mobile_submnu collapse" id="collapseExampleaa">
                        <li><a href="/warranty">Activate Warranty</a></li>
                        {
                                (subdomain == 'india' || subdomain == '') ?
                                <>
                                    <li><a href="/insurance">Insurance</a></li>
                                    <li><a href="/rsa">RSA</a></li>
                                    <li><a href="/emi">EMI</a></li>
                                </>
                                :
                                ''
                        }
                        <li><a href="/buysmart">Buy Smart</a></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExampleaaa" aria-expanded="false" aria-controls="collapseExampleaaa">EM WORLD</a>
                <ul class="mobile_submnu collapse" id="collapseExampleaaa">
                        <li><a href="/community">Community</a></li>
                        <li><a href="https://blog.emotorad.com/">Blogs</a></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseExampleaaaa" aria-expanded="false" aria-controls="collapseExampleaaaa">REACH US</a>
                    <ul class="mobile_submnu collapse" id="collapseExampleaaaa">
                        <li>
                             <a href="/about">About Us</a>
                         </li>
                         <li>
                             <a href="/faq">FAQs</a>
                         </li>
                         <li>
                             <a href="/partner">Partner with Us</a>
                         </li>
                         <li>
                             <a href="/store">Find a Store</a>
                         </li>
                         <li>
                             <a href="/careers">Careers</a>
                         </li>
                         <li>
                             <a href="/contact">Contact Us</a>
                         </li>
                    </ul>
                </li>
                <li>
                    <a href="/cart">Cart</a>
                </li>
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
                            <a href="/signup">{subdomain == 'japan' ? "サインアップ " : "Sign Up"}</a>
                        </li>
                        <li>
                            <a href="/login">{subdomain == 'japan' ? "ログインする" : "Log In"}</a>
                        </li>
                        </>                            
                }           
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
                 <li><a href="/terms">Terms &amp; Conditions</a></li>
                 <li><a href="/privacy">Privacy Policy</a></li>
                 <li><a href="/cookies">Cookie Policy</a></li>
             </ul>
         </div>
        
    </div>
  );
}
export default MobileNavbar;