import React,{useState,useEffect} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server, config, checkAccess } from "../../env";
import axios from "axios";

const AllProducts = (props) => {
  const [subdomain, setSubdomain] = useState("");
  const [country, setCountry] = useState(true);
  const [products, setProducts] = useState([]);

  const loadProducts = async() => {
    await axios
      .get(server + "/api/product/read", config)
      .then((rsp) => {
        console.log(rsp);
        setProducts(rsp.data.payload);
        window.cartSliderInit(Math.min(4, rsp.data.payload.filter(prod=>prod.type==="accessory").length));
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  const addToCart = async (id) => {
    const params = {
      "id": id
    };
    await axios
      .post(server + "/api/cart/add", params, config)
      .then((rsp) => {
        console.log(rsp.data); //CHANGE THIS
        window.location.href = "/cart";
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  useEffect(() => {
    let sub = ""
    sub = localStorage.getItem('subDomain');
    setSubdomain(sub);
    loadProducts();
  }, [country]);


  return(
    <>
    <Navbar setCountry={setCountry} country={country}/>
    <MobileNavbar/>
    {(subdomain == ""|| subdomain =="nepal"||subdomain == "india") ?
        <section class="all_prodcuts_hero_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="all_pro_slider">
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/product_hero_bg.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/black_cycle.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>DOODLE</h5>
                        <h3>
                          The
                          <span
                            >Fat-tyre <br />
                            SUV</span
                          >
                          of E-Bike
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/slide_vg_2.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/s_cycle_2.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>T-REX</h5>
                        <h3>
                         The Beast For All <span>Terrains</span>
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/slide_vg_3.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/s_cycle_3.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>EMX</h5>
                        <h3>
                          India’s 1st
                          <span
                            >Dual <br />
                            Suspension</span
                          >
                          E-Bike
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
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
    
    :(subdomain == "uae")? 
    <section class="all_prodcuts_hero_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="all_pro_slider">
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/all_products_pages/UAE/TREX/TREX-BG.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/all_products_pages/UAE/TREX/T-REX-Black.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>T-REX</h5>
                        <h3>
                        The Beast For All 
                        <span> Terrains</span>
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/all_products_pages/UAE/Doodle/Doodle-BG.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/all_products_pages/UAE/Doodle/Doodle-Black.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>DOODLE</h5>
                        <h3>
                        The Fat-Tyre SUV<br/> of <span> E-Bikes</span>
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/all_products_pages/UAE/ENER-G/Ener-G-BG.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/all_products_pages/UAE/ENER-G/Ener-G-White.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>ENER-G</h5>
                        <h3>
                        Transforming Delivery Commute
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/all_products_pages/UAE/Trible/Trible-BG.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/all_products_pages/UAE/Trible/Trible-Blue.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>TRIBLE</h5>
                        <h3>
                        Your Ultra  <span> Compact </span>  Travel <span> Companion</span>
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
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
      :(subdomain == "japan")?
      <section class="all_prodcuts_hero_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="all_pro_slider">
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/all_products_pages/Japan/Xplorer/Xplorer-BG.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/all_products_pages/Japan/Xplorer/Xplorer.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>XPLORER</h5>
                        <h3>
                        Portable Performance Anywhere
                          <span> Anywhere</span>
                          
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/all_products_pages/Japan/Glyder/Glyder-BG.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/all_products_pages/Japan/Glyder/Glyder.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>GLYDER</h5>
                        <h3>
                        Your <span>Travel</span> and <span>Outdoor</span> Partner 
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/all_products_pages/Japan/Dolphin/Dolphin-BG.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/all_products_pages/Japan/Dolphin/Dolphin.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>DOLPHIN</h5>
                        <h3>
                        Ultra <span>Compact</span> Travel <span>Companion </span>
                          E-Bike
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
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
      :
      <section class="all_prodcuts_hero_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="all_pro_slider">
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/product_hero_bg.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/black_cycle.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>DOODLE</h5>
                        <h3>
                          The
                          <span
                            >Fat-tyre <br />
                            SUV</span
                          >
                          of E-Bike
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/slide_vg_2.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/s_cycle_2.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>T-REX</h5>
                        <h3>
                         The Beast For All <span>Terrains</span>
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="all_products_hero_bgs"
                  style={{
                    "background": "url(images/slide_vg_3.png)",
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                  }}
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="emi_hero_img">
                        <img
                          src="images/s_cycle_3.png"
                          alt="a"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="emi_hero_txt product_hero_txt">
                        <h5>EMX</h5>
                        <h3>
                          India’s 1st
                          <span
                            >Dual <br />
                            Suspension</span
                          >
                          E-Bike
                        </h3>
                        <div class="hero_btn pro_bttns">
                          <a href="#">Buy Now</a>
                          <a href="#">Learn More</a>
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
    }

    <section class="product_list_section" style={{ display : 'none' }}>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="product_list_head">
              <h5>You Might Be Interested In</h5>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="pro_arw_icons">
              <img 
                src="images/angl_lft.png"
                alt="a"
                class="img-fluid slidPrv_2"
              />
              <img
                src="images/angl_rgt.png"
                alt="a"
                class="img-fluid slidNext_2"
              />
            </div>
          </div>
        </div>
        <div class="row product_slides">
          <div class="col-lg-3">
            <div class="products_wrap">
              <img src="images/healmate_icon.svg" alt="a" class="img-fluid" />
              <div class="d-flex justify-content-between">
                <h6>EM Bike Helmet</h6>
                <h6>₹ 1,790</h6>
              </div>
              <a href="/cart"
                ><img src="images/cart_icon.svg" alt="a" class="img-fluid" />
                Add to Cart</a
              >
            </div>
          </div>
          <div class="col-lg-3">
            <div class="products_wrap">
              <img src="images/gloves.png" alt="a" class="img-fluid" />
              <div class="d-flex justify-content-between">
                <h6>EM Bike Helmet</h6>
                <h6>₹ 1,790</h6>
              </div>
              <a href="/cart"
                ><img src="images/cart_icon.svg" alt="a" class="img-fluid" />
                Add to Cart</a
              >
            </div>
          </div>
          <div class="col-lg-3">
            <div class="products_wrap">
              <img src="images/jacket.png" alt="a" class="img-fluid" />
              <div class="d-flex justify-content-between">
                <h6>EM Bike Helmet</h6>
                <h6>₹ 1,790</h6>
              </div>
              <a href="/cart"
                ><img src="images/cart_icon.svg" alt="a" class="img-fluid" />
                Add to Cart</a
              >
            </div>
          </div>
          <div class="col-lg-3">
            <div class="products_wrap">
              <img src="images/pump.png" alt="a" class="img-fluid" />
              <div class="d-flex justify-content-between">
                <h6>EM Bike Helmet</h6>
                <h6>₹ 1,790</h6>
              </div>
              <a href="/cart"
                ><img src="images/cart_icon.svg" alt="a" class="img-fluid" />
                Add to Cart</a
              >
            </div>
          </div>

          <div class="col-lg-3">
            <div class="products_wrap">
              <img src="images/gloves.png" alt="a" class="img-fluid" />
              <div class="d-flex justify-content-between">
                <h6>EM Bike Helmet</h6>
                <h6>₹ 1,790</h6>
              </div>
              <a href="/cart"
                ><img src="images/cart_icon.svg" alt="a" class="img-fluid" />
                Add to Cart</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>


    <section class="product_list_section cart_product_sec">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="product_list_head">
                <h5>You Might Be Interested In</h5>
              </div>
            </div>
            <div class="col-lg-12">
            <div class="pro_arw_icons">
              <img
                src="images/angl_lft.png"
                alt="a"
                class="img-fluid slidPrv_2"
              />
              <img
                src="images/angl_rgt.png"
                alt="a"
                class="img-fluid slidNext_2"
              />
            </div>
          </div>
          </div>
          
          <div class="row product_slidess">
            {
              products.filter(prod=>prod.type==="accessory").map(prod=>(
                <div class="col-lg-3">
                  <div class="products_wrap">
                    <img src={`${server}${prod.banner}`} alt="a" class="img-fluid" />
                    <div class="d-flex justify-content-between">
                      <h6>{prod.name}</h6>
                      <h6>₹ {prod.price}</h6>
                    </div>
                    <a href="javascript:void(0)" onClick={()=>{
                      addToCart(prod.id)
                    }}
                      ><img src="images/cart_icon.svg" alt="a" class="img-fluid" />
                      Add to Cart</a
                    >
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    <Footer setCountry={setCountry} country={country}/>
    </>
  );
}
export default AllProducts;