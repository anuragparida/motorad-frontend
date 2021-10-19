import React from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';

const BuySmart = (props) => {
  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <section class="emi_hero_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="emi_hero_txt">
              <h6>
                BUY SMART
              </h6>
              <h2>
                Save Big With
                <br />
                Our EBikes
              </h2>
              <p>
                It's about more than just a firm handshake. Commit
                <br />
                to a cleaner, greener and more affordable future.
              </p>
              <div class="hero_btn">
                <a href="#">
                  Save Now
                </a>
                <a href="#">
                  Explore EMI Options
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="emi_hero_img">
              <img class="img-fluid" src="images/rsa_hero.png" alt="a" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <p>
       
    </p>
    <section class="emi_plan_select_sec warrenty_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="emi_plan_head">
              <h6>
                Save Even After Buying
              </h6>
            </div>
            <div class="emi_plan_frm">
              <form>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Number of cars used
                      </label>
                      <input class="form-control" type="text" placeholder="Enter number of cars used" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Number of scooters/Motorcycles used
                      </label>
                      <input class="form-control" type="text" placeholder="Enter number of scooters/motorcyles used" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Average kms Travelled Daily
                      </label>
                      <input class="form-control" type="text" placeholder="Enter kms travelled daily" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Petrol Price
                      </label>
                      <input class="form-control" type="text" placeholder="Enter Petrol Price in your area" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="">
                        Years of Usage
                      </label>
                      <input class="form-control" type="text" placeholder="Enter Frame Number" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="plan_submit_btn text-center">
                      <a href="#">
                        Submit
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <p>
       
    </p>
    <section class="save_section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="save_buy_head">
              <h3>
                Save Big with EMotorad
              </h3>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-3">
            <div class="save_wrap_boxs">
              <h6>
                Petrol Saved
              </h6>
              <p>
                To be Calculated
              </p>
            </div>
            <div class="save_wrap_boxs">
              <h6>
                Maintanace Cost Saved
              </h6>
              <p>
                To be Calculated
              </p>
            </div>
            <div class="save_wrap_boxs">
              <h6>
                Reduction In Carbon Emission
              </h6>
              <p>
                To be Calculated
              </p>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="save_wrap_boxs">
              <h6>
                Petrol Cost Saved
              </h6>
              <p>
                To be Calculated
              </p>
            </div>
            <div class="save_wrap_boxs">
              <h6>
                Electricity Consumed Cost
              </h6>
              <p>
                To be Calculated
              </p>
            </div>
            <div class="save_wrap_boxs">
              <h6>
                Total Money Saved
              </h6>
              <p>
                To be Calculated
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
    </>
  );
}
export default BuySmart;