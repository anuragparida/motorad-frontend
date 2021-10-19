import React, {useState} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';

const FindStore = (props) => {

  const [findSuccess, setFindSuccess] = useState(false);

  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <section class="find_store_sec">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="contact_map_txt mb-5">
              <h3>Find a Store</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent <br />
                vestibulum ullamcorper sapien eget fringilla.
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          {
            findSuccess
            ?
            <div class="col-lg-6">
            <div class="find_store_heads mb-4">
              <a href="javascript:void(0)" onClick={()=>{setFindSuccess(false)}} class="btn_submit">
                <h5>
                  <img src="images/arrw_lft.svg" alt="a" class="img-fluid" /> Go
                  Back
                </h5>
              </a>
              <p>Selected City <span>Mumbai</span></p>
            </div>
            <div class="faq_txt_wrap find_store_collapses">
              <div class="bs-example">
                <div class="accordion" id="accordionExample">
                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h2 class="mb-0">
                        <button
                          type="button"
                          class="btn btn-link"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                        >
                          <span>Emotorad Cycles Limited etc</span>
                          <i class="fa fa-angle-down"></i>
                        </button>
                      </h2>
                    </div>
                    <div
                      id="collapseOne"
                      class="collapsed show active"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div class="card-body">
                        <p>
                          <span>Add:</span> At post Jambe, taluka Mulshi, 169/2
                          Sangawade Road, Pune - 411033, Maharashtra
                        </p>
                        <p><span>Mob:</span> 9876543210</p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingTwo">
                      <h2 class="mb-0">
                        <button
                          type="button"
                          class="btn btn-link"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                        >
                          <span>Emotorad Cycles Limited etc</span>
                          <i class="fa fa-angle-down"></i>
                        </button>
                      </h2>
                    </div>
                    <div
                      id="collapseTwo"
                      class="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <div class="card-body">
                        <p>
                          <span>Add:</span> At post Jambe, taluka Mulshi, 169/2
                          Sangawade Road, Pune - 411033, Maharashtra
                        </p>
                        <p><span>Mob:</span> 9876543210</p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingThree">
                      <h2 class="mb-0">
                        <button
                          type="button"
                          class="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                        >
                          <span>Emotorad Cycles Limited etc</span>
                          <i class="fa fa-angle-down"></i>
                        </button>
                      </h2>
                    </div>
                    <div
                      id="collapseThree"
                      class="collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordionExample"
                    >
                      <div class="card-body">
                        <p>
                          <span>Add:</span> At post Jambe, taluka Mulshi, 169/2
                          Sangawade Road, Pune - 411033, Maharashtra
                        </p>
                        <p><span>Mob:</span> 9876543210</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div class="col-lg-6">
            <div class="find_store_txt_wrap">
              <p>
                Select your State and your City to find an <br />
                EMotorad Store near you.
              </p>

              <form>
                <div class="form-group">
                  <label for="">Select State</label>
                  <input type="text" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="">Select City</label>
                  <input type="text" class="form-control" />
                </div>
                <div class="form-group">
                  <a href="javascript:void(0)" onClick={()=>{setFindSuccess(true)}} class="btn_submit">Get Started</a>
                </div>
              </form>
            </div>
          </div>
          }
          
          <div class="col-lg-6">
            <div class="find_store_img">
              <img src="images/map_pic.png" alt="a" class="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
export default FindStore;