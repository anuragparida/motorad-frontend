import React, {useState, useRef} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { Link } from 'react-router-dom';

const BuySmart = (props) => {

  const formRef = useRef(null);
  const resultRef = useRef(null);

  const [results, setResults] = useState(Array(6).fill("To be Calculated"));

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scrollToResults = () => {
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const calcResults = async (e) => {

    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    console.log(params);

    const u = ((365 * params.d * params.b * params.a2)/50) + ((365 * params.d * params.b * params.a1)/15)
    const x = (365 * params.d * params.c * params.b) * ((params.a2/50) + (params.a1/15));
    const y = (params.d * params.b) * ((params.a1 * 121.66) + (params.a2 * 182.5));
    const z = (params.b * params.d * 36.5);
    const v = (21 * params.b * 365 * params.d) * (params.a2 + (10 * params.a1));
    const w = x + y - z;

    setResults([u, x, y, z, v, w]);

    scrollToResults();

  }

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
              <a href="javascript:void(0)" onClick={scrollToForm}>Save Now</a>
                <Link to="/emi">
                  Explore EMI Options
                </Link>
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
    <section class="emi_plan_select_sec warrenty_section" ref={formRef}>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="emi_plan_head">
              <h6>
                Save Even After Buying
              </h6>
            </div>
            <div class="emi_plan_frm">
              <form onSubmit={calcResults}>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Number of cars used
                      </label>
                      <input class="form-control" placeholder="Enter number of cars used" type="number" name="a1" required/>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Number of scooters/Motorcycles used
                      </label>
                      <input class="form-control" type="number" name="a2" required placeholder="Enter number of scooters/motorcyles used" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Average kms Travelled Daily
                      </label>
                      <input class="form-control" type="number" name="b" required placeholder="Enter kms travelled daily" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="">
                        Petrol Price
                      </label>
                      <input class="form-control" type="number" name="c" required placeholder="Enter Petrol Price in your area" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="">
                        Years of Usage
                      </label>
                      <input class="form-control" type="number" name="d" required placeholder="Enter Frame Number" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="plan_submit_btn text-center">
                      <button type="submit">
                        Submit
                      </button>
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
    <section class="save_section" ref={resultRef}>
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
                {results[0]} (Liters)
              </p>
            </div>
            <div class="save_wrap_boxs">
              <h6>
                Petrol Cost Saved
              </h6>
              <p>
                {results[1]} (Rs.)
              </p>
            </div>
            <div class="save_wrap_boxs">
              <h6>
                Maintanace Cost Saved
              </h6>
              <p>
                {results[2]} (Rs.)
              </p>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="save_wrap_boxs">
              <h6>
                Electricity Consumed Cost
              </h6>
              <p>
                {results[3]} (Rs.)
              </p>
            </div>
            <div class="save_wrap_boxs">
              <h6>
                Reduction In Carbon Emission
              </h6>
              <p>
                {results[4]} (GMS of CO2)
              </p>
            </div>
            <div class="save_wrap_boxs">
              <h6>
                Total Money Saved
              </h6>
              <p>
                {results[5]} (Rs.)
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