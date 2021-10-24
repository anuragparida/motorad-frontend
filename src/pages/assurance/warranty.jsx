import React, {useState} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import axios from 'axios';
import { server } from "../../env";

const Warranty = (props) => {
  // <script>
  //       $(document).ready(function(){
  //         $('.warenty_purchased span').click(function(){
  //           $('.warenty_purchased span').removeClass("actv");
  //           $(this).addClass("actv");
  //        });
            
  //       });
  //   </script>

  const [sendSuccess, setSendSuccess] = useState(false);

  const sendWarranty = async (e) => {

    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

      params.dealerType = "online";
      params.bike = 3;

      console.log(params);

    axios
    .post(server + "/api/warranty/create", params)
    .then((rsp) => {
      console.log(rsp);
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
      }
    });

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
                      <h6>WARRANTY</h6>
                       <h2>Activate your <br/> <span>Warranty</span></h2>
                       <p>Activate your warranty for peace of mind and ride <br/> assured that your vehicle is covered and protected.</p>
                       <div class="hero_btn">
                           <a href="#">Activate</a>
                           <a href="#">Explore RSA</a>
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
     <section class="emi_hero_btm_sec">
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
       <section class="emi_plan_select_sec warrenty_section">
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
                                         <select name="" id="" class="form-control">
                                             <option value="">T-REX</option>
                                             <option value="">EMX</option>
                                             <option value="">DOODLE</option>
                                         </select>
                                     </div>
                                </div>
                                <div class="col-lg-6">
                                     <div class="form-group">
                                         <label for="">Your Name</label>
                                         <input type="text" class="form-control" name="name" placeholder="Enter your  Name" required/>
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
                                         <label for="">Your Contact</label>
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
                                         <span class="actv">Dealer</span>
                                         <span href="#">Online</span>
                                     </div>
                                </div>
                                <div class="col-lg-6">
                                     <div class="form-group">
                                         <label for="">Select Store</label>
                                         <select name="dealerName" id="" class="form-control" defaultValue="Balaji">
                                             <option value="Balaji">Balaji Cycle Store</option>
                                             <option value="">Balaji Cycle House</option>
                                             <option value="">Balaji Cycle Store</option>
                                         </select>
                                     </div>
                                </div>
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
                        <a href="#"><img src="images/download_w_icon.svg" alt="a" class="img-fluid"/> Download Document</a>
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