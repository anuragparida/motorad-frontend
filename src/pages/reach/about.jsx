import React, {useEffect} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';

const About = (props) => {

  useEffect(()=>{
    window.aboutUsReadMore();
  }, [])
  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <section class="about_team_sec">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="aboutus_head_txt">
              <h3>
                Our
                <br />
                Dedicated Team
              </h3>
              <img class="img-fluid" src="images/dedicated_team_img.png" alt="a" />
            </div>
          </div>
        </div>
        <div class="row justify-content-end">
          <div class="col-lg-5">
            <div class="dedicated_team_img">
              <div class="dedicated_team_head_txt">
                <h6>
                  Our Story
                </h6>
                <p>
                  EMotorad (EM) is an electric vehicles company that strives to bring futuristic e-bikes at an affordable price for adventure seekers, daily commuters, or casual riders. EM has been courageously and compassionately riding the e-bikes market to new heights, with the launch of their first dual suspension bike EMX, followed by a fat-tyre foldable ebike, Doodle, and a mountain bike, TREX. They provide customized parts with the latest technology.
                </p>
              </div>
              <img class="img-fluid" src="images/founders.jpg" alt="a" />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="dedicated_team_txt">
              <h5>
                Our Vision &amp; Mission
              </h5>
              <p>
                EMotorad (EM) believes 'electric' is the future of mobility and with the Indian Market yet to reach anywhere close to its fullest potential, the Indian automotive segment has already taken a significant step towards its autonomous future. EM hopes to play a critical role in spreading awareness of the same, engaging end consumers and delivering the products fitting their requirements at a price they can afford, we like to call it affordable luxury.
              </p>
              <p>
                The company aims to bring across top quality electric cycles which would currently cost much higher in the Indian market at an affordable price utilising its local sourcing and manufacturing capabilities. EM strongly believes in the fact that the local setup will not only help reduce the pricing but will also bring about innovations and job creations in various parts of the country where we plan to expand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <p>
       
    </p>
    <section class="expert_team_sec">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="expert_team_head">
              <h5>
                Our Expert Team
              </h5>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3">
            <div class="expert_team_wrap">
              <img class="img-fluid" src="images/rajib.jpg" alt="a" />
              <div class="d-flex justify-content-between mt-3">
                <h5>
                  Rajib Gangopadhyay
                </h5>
                <a href="https://www.linkedin.com/in/rajib-gangopadhyay-5135281b">
                  <img class="img-fluid" src="images/linkedin_icon.svg" alt="in" />
                </a>
              </div>
              <h6>
                FOUNDER
              </h6>
              <div class="article">
                <p class="mb-0">
                EM is founded by Mr. Rajib Gangopadhyay, who has a rich experience of international 
                </p>
                <p class="moretext">
                business and sales of EBikes for 7+ years. He has placed EBike as a product in 72+ countries in the B2B space successfully. Rajib is a manufacturing enthusiast with an in-depth knowledge of Mobility and Electric Vehicles. Rajib's International exposure and Leadership are two major boosters to the organization.
                </p>
              </div>
              <a href="javascript:void(0)" class="moreless-button">
                Read more
              </a>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="expert_team_wrap">
              <img class="img-fluid" src="images/kunal.jpg" alt="a" />
              <div class="d-flex justify-content-between mt-3">
                <h5>
                  Kunal Gupta
                </h5>
                <a href="https://www.linkedin.com/in/kunal-gupta-300784b1">
                  <img class="img-fluid" src="images/linkedin_icon.svg" alt="in" />
                </a>
              </div>
              <h6>
                CO-FOUNDER &amp; CEO
              </h6>
              <div class="article1">
                <p class="mb-0">
                EM is led by Kunal Gupta, CEO and Key Decision-Maker who has been the COO 
                </p>
                <p class="moretext1">
                of a leading start-up in the mobility industry in the past. Kunal, an expert in building brands has been a mentor and leader at various organizations in the past. His management and business intelligence are the key to setting up this organization from ground zero.
                </p>
              </div>
              <a href="javascript:void(0)" class="moreless-button1">
                Read more
              </a>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="expert_team_wrap">
              <img class="img-fluid" src="images/aditya.jpg" alt="a" />
              <div class="d-flex justify-content-between mt-3">
                <h5>
                  Aditya Oza
                </h5>
                <a href="https://www.linkedin.com/in/aditya-oza-30356090">
                  <img class="img-fluid" src="images/linkedin_icon.svg" alt="in" />
                </a>
              </div>
              <h6>
                CO-FOUNDER &amp; CMO
              </h6>
              <div class="article2">
                <p class="mb-0">
                Aditya holds the post of CMO. Aditya excelled in execution working for top players 
                </p>
                <p class="moretext2">
                in various industries during his time in Dubai and Abu Dhabi. He brings in his expertise in product marketing to send out the right message to the right audience. His passion and speed make him a marketing powerhouse.
                </p>
              </div>
              <a href="javascript:void(0)" class="moreless-button2">
                Read more
              </a>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="expert_team_wrap">
              <img class="img-fluid" src="images/sumedh.jpg" alt="a" />
              <div class="d-flex justify-content-between mt-3">
                <h5>
                  Sumedh Battewar
                </h5>
                <a href="https://www.linkedin.com/in/sumedh-battewar-39a647147">
                  <img class="img-fluid" src="images/linkedin_icon.svg" alt="in" />
                </a>
              </div>
              <h6>
                CO-FOUNDER &amp; CBO
              </h6>
              <div class="article3">
                <p class="mb-0">
                Sumedh heads the business development wing at EM. An engineering mind with marketing 
                </p>
                <p class="moretext3">
                and sales experience leading IoT products and EV products for the past 5+ years. His relentless passion perfectly complements his drive for practicality in any situation.
                </p>
              </div>
              <a href="javascript:void(0)" class="moreless-button3">
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
    </>
  );
}
export default About;