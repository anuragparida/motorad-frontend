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