import React, {useState, useEffect} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server } from "../../env";
import axios from "axios";

const FAQ = (props) => {
  // <script>
  //       let cards = [...document.querySelectorAll(".card")];
  //       cards.forEach(card => {
  //         card.addEventListener("click", function() {
  //           cards.forEach(c => c.classList.remove("show"));
  //           this.classList.add("show")
  //         })
  //       });
  //   </script>

  const [faq, setFaq] = useState([]);
  const [country, setCountry] = useState(true); 


  const loadFAQ = async () => {
    await axios
    .get(server + "/api/faq/read")
    .then((rsp) => {
      console.log(rsp);
      setFaq(rsp.data.payload.filter(el => el.type==="General"));
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
      }
    });
  }

  useEffect(()=>{
    loadFAQ();
  }, []);

  return(
    <>
    <Navbar setCountry={setCountry} country={country}/>
    <MobileNavbar/>
    <section class="faq_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="faq_headd mb-5">
              <h3>
                Frequently Asked Questions
              </h3>
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                <br />
                vestibulum ullamcorper sapien eget fringilla.
              </p> */}
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="faq_txt_wrap">
              <div class="bs-example">
                <div id="accordionExample" class="accordion">
                  {
                    faq.map(f => {
                      return(
                        <div class="card">
                          <div id={"heading" + f.id} class="card-header">
                            <h2 class="mb-0">
                              <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse" + f.id}>
                                {f.question}
                              </button>
                            </h2>
                          </div>
                          <div id={"collapse" + f.id} class="collapse" data-parent="#accordionExample">
                            <div class="card-body">
                              <p>
                                {f.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  
                </div>
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
export default FAQ;