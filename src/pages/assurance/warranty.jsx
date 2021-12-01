import React, {useState, useEffect, useRef} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import axios from 'axios';
import { server, checkAccess, formDataConfig } from "../../env";

const Warranty = (props) => {

  const [sendSuccess, setSendSuccess] = useState(false);
  const [dealerType, setDealerType] = useState("dealer");

  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);

  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const domain = localStorage.getItem('subDomain');

  const loadProducts = async() => {
    await axios
      .get(server + "/api/product/read")
      .then((rsp) => {
        console.log(rsp);
        if (domain == 'nepal' || domain == 'india' || domain == '') {
            const filteredDoodle = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"));
            const filteredEmx = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("emx"));
            const filteredTrex = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("t-rex"));
            if (filteredTrex.length > 0 && filteredEmx.length > 0 && filteredDoodle.length > 0) {
            console.log("filter", filteredDoodle, filteredEmx, filteredTrex);
            setProducts([filteredTrex[0].id, filteredEmx[0].id, filteredDoodle[0].id]);
            }
        } else if (domain == 'uae') {
            const filteredTrex = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("t-rex"));
            const filteredTrible = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("trible"));
            const filteredDoodle = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("doodle"));
            const filteredEnerg = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("ener g"));
            if (filteredTrex.length > 0 && filteredTrible.length > 0 && filteredDoodle.length > 0 && filteredEnerg.length > 0) {
                console.log("filter", filteredDoodle, filteredTrex, filteredTrible, filteredEnerg);
                setProducts([filteredTrex[0].id, filteredTrible[0].id, filteredDoodle[0].id], filteredEnerg[0].id);
            }
        } else if (domain == 'japan') {
            const filteredXplorer = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("xplorer"));
            const filteredGlyder = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("glyder"));
            const filteredDolphin = rsp.data.payload.filter(prod => prod.name.toLowerCase().includes("dolphin"));
            if (filteredXplorer.length > 0 && filteredGlyder.length > 0 && filteredDolphin.length > 0) {
                console.log("filter", filteredXplorer, filteredGlyder, filteredDolphin);
                setProducts([filteredXplorer[0].id, filteredGlyder[0].id, filteredDolphin[0].id]);
            }
        }
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  const loadStores = async() => {
    await axios
      .post(server + "/api/store/read")
      .then((rsp) => {
        console.log(rsp);
        setStores(rsp.data.payload)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const sendWarranty = async (e) => {

    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

      params.dealerType = dealerType;
      if (domain == 'nepal' || domain == 'india' || domain == '') {
        params.bike = params.bike === "trex" ? products[0] : params.bike === "emx" ? products[1] : products[2];
      } else if (domain == 'uae') {
        params.bike = params.bike === "TREX" ? products[0] : params.bike === "TRIBLE" ? products[1] ? products[0] : params.bike === "DOODLE" : products[3];
      } else if (domain == 'japan') {
        params.bike = params.bike === "XPLORER" ? products[0] : params.bike === "GLYDER" ? products[1] : products[2];
      }

      if (domain == 'india' || domain == '') {
        params.contact = "+91" + params.contact;
      } else if (domain == 'uae') {
        params.contact = "+971" + params.contact;
      } else if (domain == 'japan') {
        params.contact = "+81" + params.contact;
      } else if (domain == 'nepal') {
        params.contact = "+977" + params.contact;
      }

      delete params.invoice;

      console.log(params);

      let formData = new FormData();
    
      for (const [key, value] of Object.entries(params)) {
        formData.append(key, value);
      }

      formData.append("invoice", e.target.elements.invoice.files[0]);
      console.log(e.target.elements.invoice.files[0]);

      for (var value of formData.values()) {
        // console.log(value);
     }

    axios
    .post(server + "/api/warranty/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          responseType: "json",
        },
      })
    .then((rsp) => {
      console.log(rsp);
      setSendSuccess(true);
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
      }
    });

  }

  useEffect(()=>{
    loadProducts();
    loadStores();
  }, [])

  return(
    <>
    <Navbar/>
    <MobileNavbar/>
     <section class="emi_hero_section">
         <div class="container">
             <div class="row justify-content-center">
                 <div class="col-lg-5">
                     <div class="emi_hero_txt">
                      <h6>WARRANTY</h6>
                       <h2>Activate your <br/> <span>Warranty</span></h2>
                       <p>Activate your warranty for peace of mind and ride <br/> assured that your vehicle is covered and protected.</p>
                       <div class="hero_btn rsa_hero_btn">
                           <a href="javascript:void(0)" onClick={scrollToForm}>Activate</a>
                           <a href="files/warranty.pdf" download>
                           <img class="img-fluid" src="images/download_w_icon.svg" alt="a" />
                                Download
                            </a>
                       </div>
                   </div>
                 </div>
                 <div class="col-lg-6">
                     <div class="emi_hero_img">
                         <img src="images/warrenty_hero.png" alt="a" class="img-fluid"/>
                     </div>
                 </div>
             </div>
         </div>
     </section>
     <section class="emi_hero_btm_sec" ref={formRef}>
         <div class="container">
             <div class="row justify-content-center">
                 <div class="col-lg-11">
                     <div class="row">
                         <div class="col-lg-3 col-6">
                             <div class="rsa_hero_btm_wrapp">
                                <img src="images/small_bike.svg" alt="a" class="img-fluid"/>
                                 <p>Lifetime Frame <br/> Guarantee</p>
                             </div>
                         </div>
                         <div class="col-lg-3 col-6">
                             <div class="rsa_hero_btm_wrapp">
                                <img src="images/light_icon.svg" alt="a" class="img-fluid"/>
                                 <p>1-Year Warranty <br/> On Electronic Parts</p>
                             </div>
                         </div>
                         <div class="col-lg-3 col-6">
                             <div class="rsa_hero_btm_wrapp">
                                <img src="images/call_icon.svg" alt="a" class="img-fluid"/>
                                 <p>Priority Support <br/> For Customers</p>
                             </div>
                         </div>
                         <div class="col-lg-3 col-6">
                             <div class="rsa_hero_btm_wrapp">
                                <img src="images/lock_2.svg" alt="a" class="img-fluid"/>
                                 <p>Overall Vehicle <br/> Protection</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </section>
     {
       ! sendSuccess ?
       <section class="emi_plan_select_sec warrenty_section" >
         <div class="container">
             <div class="row justify-content-center">
                 <div class="col-lg-10">
                     <div class="emi_plan_head">
                         <h6>Please Select A Bike For Warranty</h6>
                     </div>
                     <div class="emi_plan_frm">
                         <form onSubmit={sendWarranty}>
                             <div class="row">
                                <div class="col-lg-6">
                                     <div class="form-group">
                                         <label for="">Select A Bike</label>
                                         <select name="bike" class="form-control" required>
                                            { 
                                                (domain == 'nepal' || domain == 'india' || domain == '') ?
                                                    <>
                                                        <option value="trex">T-REX</option>
                                                        <option value="emx">EMX</option>
                                                        <option value="doodle">DOODLE</option>
                                                    </>
                                                : (domain == 'uae') ?    
                                                    <>
                                                        <option value="TREX">TREX</option>
                                                        <option value="ENERG">ENERG</option>
                                                        <option value="DOODLE">DOODLE</option>
                                                        <option value="TRIBLE">TRIBLE</option>
                                                    </>
                                                : (domain == 'japan') ?        
                                                    <>
                                                        <option value="XPLORER">XPLORER</option>
                                                        <option value="GLYDER">GLYDER</option>
                                                        <option value="DOLPHIN">DOLPHIN</option>
                                                    </>
                                                :
                                                ''    
                                            }
                                         </select>
                                     </div>
                                </div>
                                <div class="col-lg-6">
                                     <div class="form-group">
                                         <label for="">Your Name</label>
                                         <input type="text" class="form-control" name="name" placeholder="Enter your Name" required/>
                                     </div>
                                </div>
                                <div class="col-lg-6">
                                     <div class="form-group">
                                         <label for="">Your Email</label>
                                         <input type="email" class="form-control" name="email" placeholder="Enter Email Address" required/>
                                     </div>
                                </div>
                                <div class="col-lg-6">
                                     <div class="form-group">
                                         <label for="">Your Contact ({domain === "nepal" ? "+977" : domain === "uae" ? "+971" : domain === "japan" ? "+81" : "+91"})</label>
                                         <input type="number" class="form-control" name="contact" placeholder="Enter Contact Number" required/>
                                     </div>
                                </div>
                                <div class="col-lg-6">
                                     <div class="form-group">
                                         <label for="">Frame Number</label>
                                         <input type="text" class="form-control" name="frameNumber" placeholder="Enter Frame Number" required/>
                                     </div>
                                </div>
                                <div class="col-lg-6">
                                     <div class="form-group">
                                         <label for="">Date of Purchase</label>
                                         <input type="date" class="form-control" name="dateOfPurchase" placeholder="24-09-2021" required/>
                                     </div>
                                </div>
                                <div class="col-lg-6">
                                     <div class="warenty_purchased">
                                         <label for="">Purchased from</label>
                                         <span class={dealerType==="dealer" ? "actv" : ""} onClick={()=>{setDealerType("dealer")}}>Dealer</span>
                                         <span class={dealerType==="online" ? "actv" : ""} onClick={()=>{setDealerType("online")}}>Online</span>
                                     </div>
                                </div>
                                {
                                    dealerType === "dealer" ?
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="">Select Store</label>
                                            <select name="dealerName" id="" class="form-control" defaultValue="Balaji">
                                                {
                                                stores.map(x=><option value={x.id}>{x.name}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    :
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="">Select Store</label>
                                            <select name="dealerName" id="" class="form-control" defaultValue="">
                                                <option value="">Select Store</option>
                                                {
                                                ["Amazon", "Flipkart"].map(x=><option value={x}>{x}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                }
                                
                                <div class="col-lg-6">
                                    <div class="warrent_invoice_upload">
                                      <label class="upload-area">
                                        <input type="file" name="invoice"/>
                                        <span class="upload-button">
                                          <img src="images/plus_circle.svg" alt="a" class="img-fluid"/>
                                        </span>
                                      </label>
                                        <p> Upload your Invoice </p>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="plan_submit_btn text-right">
                                        {/* <a href="javascript:void(0)" onClick={()=>{setSendSuccess(true)}}>Submit</a> */}
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                             </div>
                         </form>
                     </div>
                 </div>
             </div>
         </div>
     </section>
       :
       <section class="warrenty_succes_section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="warenty_succes_wrap">
                        <img src="images/chec_big-cir.svg" alt="a" class="img-fluid"/>
                        <h5>Your Response has been <br/> submitted Successfully</h5>
                    </div>
                    <div class="warenty_suc_btn">
                        <a href="files/warranty.pdf"><img src="images/download_w_icon.svg" alt="a" class="img-fluid"/> Download Document</a>
                        <a href="index.html">Go to HomePage</a>
                    </div>
                </div>
            </div>
        </div>
      </section>
     }
     
    <Footer/>
    </>
  );
}
export default Warranty;