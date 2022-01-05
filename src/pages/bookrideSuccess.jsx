import React, {useState} from "react";
import Navbar from '../components/Navbar';
import MobileNavbar from '../components/MobileNavbar';
import Footer from '../components/Footer';
import {Helmet} from "react-helmet";

const BookSuccess = (props) => {

  const [country, setCountry] = useState(true);

  const subdomain = localStorage.getItem('subDomain');
  return(
    <>
    {
                (subdomain == 'india') ?
                    <Helmet>
                        <script innerHTML={{ __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '1034452493992700');`
                                
                                }}
                                />
                                 
                        
                    </Helmet>
                : (subdomain == 'uae') ?
                    <Helmet>
                        <script
                        dangerouslySetInnerHTML={{ __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '598631247954691');
                        fbq('track', 'Lead');`
                        }}
                        />
                        <noscript>{`<img height="1" width="1" style="display:none"
                        src="https://www.facebook.com/tr?id=598631247954691&ev=Lead&noscript=1"
                        />`}</noscript>
                    </Helmet>
                : (subdomain == 'japan') ?
                    <Helmet>
                        <script
                        dangerouslySetInnerHTML={{ __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '264188729053706');
                        fbq('track', 'Lead');`
                        }}
                        />
                        <noscript>{`<img height="1" width="1" style="display:none"
                        src="https://www.facebook.com/tr?id=264188729053706&ev=Lead&noscript=1"
                        />`}</noscript>
                    </Helmet>        
                : (subdomain == 'nepal') ?
                    <Helmet>
                        <script
                        dangerouslySetInnerHTML={{ __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '3068496336696715');
                        fbq('track', 'Lead');`
                        }}
                        />
                        <noscript>{`<img height="1" width="1" style="display:none"
                        src="https://www.facebook.com/tr?id=3068496336696715&ev=Lead&noscript=1"
                        />`}</noscript>
                    </Helmet>    
                : ''    
            }
    <Navbar setCountry={setCountry} country={country}/>
    <MobileNavbar/>
    <section class="order_success_sec">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-7">
            <div class="order_placed_wrap">
              <img src="images/big_check.svg" alt="a" class="img-fluid" />
              <h3>
                Your Test Ride has been <br /> booked successfully
              </h3>
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                id ullamcorper sem. Phasellus vitae dui erat. Donec ligula erat,
                venenatis vitae molestie vel, dapibus nec libero.
              </p> */}
              <div class="ordr_placed_btnns">
                <a href="/">Go to HomePage</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <Footer setCountry={setCountry} country={country}/>
    </>
  );
}
export default BookSuccess;