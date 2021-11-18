import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import React, {useState} from "react";


const Careers = (props) => {
  const [country, setCountry] = useState(true); 

  return(
    <>
    <Navbar setCountry={setCountry} country={country}/>
    <MobileNavbar/>
    <section class="career_section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="career_head">
              <h3>
                Your Career with EM
              </h3>
              <p>
              We work hard to build something we love to affect change in the <br /> 
              World and grow alongside you
                <br />
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-5">
            <div class="career_fltr_jobs">
              <p>
                Select your location and your department to filter jobs.
              </p>
              <div class="filtr_job_frm">
                <form action="">
                  <div class="form-group">
                    <label for="">
                      Select Location
                    </label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="form-group">
                    <label for="">
                      Select Department
                    </label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="form-group">
                    <button class="btn btn_submit" type="submit">
                      Filter Jobs
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="career_jobs_wrap">
              <div class="d-flex justify-content-between align-items-center">
                <h6>
                  .Net Developer
                </h6>
                <a href="#">
                  Posted : 14/Aug/21
                </a>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h5>
                  Experience : 1 - 5 Yrs
                </h5>
                <h5>
                  Department : Technical
                </h5>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h5>
                  Salary : Rs. 300000-500000
                </h5>
                <h5>
                  Location : Banglore, Pune
                </h5>
              </div>
              <p>
                We are looking for a .Net developer to build software using languages and technologies of the .NET framework. You will create applications from scratch, configure existing systems and provide user support. In this role, you should be able to write functional code with a sharp eye for spotting defects. You should be a team player and excellent communicator. If you are also passionate about the .NET framework and software design/architecture, we’d like to meet you. Your goal will be to work with internal teams to design, develop and maintain software.
              </p>
              <button class="btn btn_submit" type="submit" data-toggle="modal" data-target="#exampleModal">
                Apply
              </button>
            </div>
            <div class="career_jobs_wrap">
              <div class="d-flex justify-content-between align-items-center">
                <h6>
                  .Net Developer
                </h6>
                <a href="#">
                  Posted : 14/Aug/21
                </a>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h5>
                  Experience : 1 - 5 Yrs
                </h5>
                <h5>
                  Department : Technical
                </h5>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h5>
                  Salary : Rs. 300000-500000
                </h5>
                <h5>
                  Location : Banglore, Pune
                </h5>
              </div>
              <p>
                We are looking for a .Net developer to build software using languages and technologies of the .NET framework. You will create applications from scratch, configure existing systems and provide user support. In this role, you should be able to write functional code with a sharp eye for spotting defects. You should be a team player and excellent communicator. If you are also passionate about the .NET framework and software design/architecture, we’d like to meet you. Your goal will be to work with internal teams to design, develop and maintain software.
              </p>
              <button class="btn btn_submit" type="submit" data-toggle="modal" data-target="#exampleModal">
                Apply
              </button>
            </div>
            <div class="career_jobs_wrap">
              <div class="d-flex justify-content-between align-items-center">
                <h6>
                  .Net Developer
                </h6>
                <a href="#">
                  Posted : 14/Aug/21
                </a>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h5>
                  Experience : 1 - 5 Yrs
                </h5>
                <h5>
                  Department : Technical
                </h5>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h5>
                  Salary : Rs. 300000-500000
                </h5>
                <h5>
                  Location : Banglore, Pune
                </h5>
              </div>
              <p>
                We are looking for a .Net developer to build software using languages and technologies of the .NET framework. You will create applications from scratch, configure existing systems and provide user support. In this role, you should be able to write functional code with a sharp eye for spotting defects. You should be a team player and excellent communicator. If you are also passionate about the .NET framework and software design/architecture, we’d like to meet you. Your goal will be to work with internal teams to design, develop and maintain software.
              </p>
              <button class="btn btn_submit" type="submit" data-toggle="modal" data-target="#exampleModal">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
    
    <section class="modal_section">
      <div id="exampleModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="accnt_setting_modal">
                <a href="#" data-dismiss="modal">
                  <img class="img-fluid" src="images/close_icon.svg" alt="x" />
                </a>
                <div class="accnt_modal_head">
                  <h5>
                    Apply for Job
                  </h5>
                  <h5 style={{"color": "#10b068"}}>
                    .NET Developer
                  </h5>
                </div>
                <div class="emi_plan_frm accnt_modal_plan rsa_modal_txt">
                  <form>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Your Name
                          </label>
                          <input class="form-control" type="text" placeholder="Enter your Name" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Your Email
                          </label>
                          <input class="form-control" type="text" placeholder="Enter your email" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Your Contact
                          </label>
                          <input class="form-control" type="text" placeholder="Enter your contact" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Total Experience (in Yrs)
                          </label>
                          <input class="form-control" type="text" placeholder="Your experience (in Yrs)" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Select your State
                          </label>
                          <input class="form-control" type="text" placeholder="Enter Invoice numberSelect your state" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Select your city
                          </label>
                          <input class="form-control" type="text" placeholder="Select your city" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="rsa_modal_upload">
                          <a href="#">
                            <img class="img-fluid" src="images/upload_plus.svg" alt="a" />
                            Upload your Resume
                          </a>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="accnt_submit_modal text-right">
                          <button class="btn btn_submit" type="submit">
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
        </div>
      </div>
    </section>

    </>
  );
}
export default Careers;