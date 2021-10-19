import React from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';

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
  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <section class="faq_section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="faq_headd mb-5">
              <h3>
                Frequently Asked Questions
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                <br />
                vestibulum ullamcorper sapien eget fringilla.
              </p>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="faq_txt_wrap">
              <div class="bs-example">
                <div id="accordionExample" class="accordion">
                  <div class="card">
                    <div id="headingOne" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne">
                          What is the life of the battery?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseOne" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div id="headingTwo" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwo">
                          Is EMI available?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseTwo" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div id="headingThree" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree">
                          Where can I buy the bike?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseThree" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div id="headingThreea" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThreea">
                          What servicing is required?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseThreea" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div id="headingThreeas" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThreeas">
                          What is the warranty policy?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseThreeas" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div id="headingThreeasv" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThreeasv">
                          Is the bike waterproof?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseThreeasv" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div id="headingThreeasx" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThreeasx">
                          Is the battery removable?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseThreeasx" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div id="headingThreeasb" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThreeasb">
                          What is the range of the bike?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseThreeasb" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div id="headingThreeasbf" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThreeasbf">
                          How much do the bikes weight?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseThreeasbf" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div id="headingThreeasbfg" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThreeasbfg">
                          What all riding modes are there?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseThreeasbfg" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div id="headingThreeasbfgk" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThreeasbfgk">
                          Cost to charge the complete battery?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseThreeasbfgk" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div id="headingThreeasbfgkr" class="card-header">
                      <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThreeasbfgkr">
                          How long does it take to charge the battery?
                        </button>
                      </h2>
                    </div>
                    <div id="collapseThreeasbfgkr" class="collapse" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula, arcu a dictum dignissim, diam nulla porta mi, vitae sollicitudin mi lacus eu mi. Vestibulum in urna vel sapien semper egestas. Morbi ut pharetra urna. Aliquam fringilla vel neque bibendum molestie.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
    </>
  );
}
export default FAQ;