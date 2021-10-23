import React, {useState, useEffect} from "react";
import Navbar from './../components/Navbar';
import MobileNavbar from './../components/MobileNavbar';
import Footer from './../components/Footer';

const Cart = (props) => {

  const [displayCart, setDisplayCart] = useState([]);

  const [netAmount, setNetAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const updateDisplayCart = () => {
    const loadCart = JSON.parse(localStorage.getItem("cart")) || [];
    const localCart = [];
    let localAmount = 0;
    for (const item of loadCart) {
      if (item[0] === "trex") {
        localCart.push(["T - REX", item[1], 37133, 1, "images/cycle_warenty.png"]);
        localAmount += 37133;
      } else if (item[0] === "emx") {
        localCart.push(["EMX", item[1], 52371, 1, "images/bicycle_2.png"]);
        localAmount += 52371;
      } else if (item[0] === "doodle") {
        localCart.push(["DOODLE", item[1], 76000, 1, "images/bicycle_3.png"]);
        localAmount += 76000;
      }
    }
    setDisplayCart(localCart);
    setNetAmount(localAmount);
    calculateAmount(netAmount);
    console.log(loadCart, localCart);
  }

  const calculateAmount = (netAmount) => {
    setTotalAmount(Math.ceil(netAmount * 1.05));
  }

  useEffect(() => {
    updateDisplayCart();
  }, []);

  const addToCart = (cart, bike) => {
    localStorage.setItem("cart", cart.push(bike)); //UPDATE
  }

  const createOrder = async () => {
    //setOrderSuccess(true);
  }

  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    {orderSuccess ?
    <section class="order_success_sec">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-7">
            <div class="order_placed_wrap">
              <img src="images/big_check.svg" alt="a" class="img-fluid" />
              <h3>
                Your Order is <br />
                placed Successfully.
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                id ullamcorper sem. Phasellus vitae dui erat. Donec ligula erat,
                venenatis vitae molestie vel, dapibus nec libero.
              </p>
              <div class="ordr_placed_btnns">
                <a href="index.html">Go to HomePage</a>
                <a href="#">View Your Orders</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    :
    <>
    <section class="cart_section">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="cart_head">
                <h3>Your Cart</h3>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8">
              <div class="cart_product_feature">
                <table>
                  <thead>
                    <tr>
                      <th width="30%"></th>
                      <th>PRODUCT</th>
                      <th>PRICE</th>
                      <th>QTY</th>
                      <th>AMOUNT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      displayCart.map((item) =>
                        <tr>
                          <td>
                            <img
                              src={item[4]}
                              alt="a"
                              class="img-fluid"
                            />
                          </td>
                          <td>
                            <h5>{item[0]}</h5>
                            <p>Color : <i class="fa fa-circle" style={{"color": item[1]}}></i></p>
                          </td>
                          <td>
                            <h5>₹ {item[2]}</h5>
                          </td>
                          <td>
                            <div class="incre">
                              <a href="javascript:void(0)" class="button-container">
                                <i class="fa fa-minus cart-qty-minus"></i>
                              </a>
                              <input
                                type="text"
                                name="qty"
                                class="qty"
                                maxlength="12"
                                value={item[3]}
                                class="input-text qty"
                              />

                              <a href="javascript:void(0)" class="button-container">
                                <i class="fa fa-plus cart-qty-plus"></i>
                              </a>
                            </div>
                          </td>
                          <td>
                            <h5>₹ {item[2] * item[3]}</h5>
                          </td>
                          <td>
                            <a href="javascript:void(0)"
                            onClick={() => {
                              setDisplayCart(displayCart.filter(i => i !== item))
                            }}
                              ><img
                                src="images/close_ic.png"
                                alt="x"
                                class="img-fluid"
                            /></a>
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="cart_invo_wrap">
                <h4>Have a coupon?</h4>
                <div class="copun_enter_input">
                  <input type="text" placeholder="Enter Coupon Code" />
                  <a href="#">Apply</a>
                </div>
                <div class="subtotal_tab">
                  <table>
                    <tr>
                      <td>Subtotal :</td>
                      <td>₹ {netAmount}</td>
                    </tr>
                    <tr>
                      <td>Discount :</td>
                      <td>- ₹0.00</td>
                    </tr>
                    <tr>
                      <td>GST (5%):</td>
                      <td>₹ {Math.ceil(totalAmount * 5 / 105)}</td>
                    </tr>
                    <tr>
                      <td>Total :</td>
                      <td>₹ {totalAmount}</td>
                    </tr>
                  </table>
                </div>
                <div class="total_invo_btn">
                  <button type="submit" class="btn btn_submit" onClick={()=>{
                    // createOrder()
                    setOrderSuccess(true)
                    }}>
                    <span>₹ {totalAmount} </span>
                    <span
                      >Checkout
                      <img src="images/arrw_w_rgt.svg" alt="a" class="img-fluid"
                    /></span>
                  </button>
                </div>
                <div class="continue_shoping_btn">
                  <a href="#">Continue Shopping</a>
                </div>
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
          </div>
          <div class="row">
            <div class="col-lg-3">
              <div class="products_wrap">
                <img src="images/healmate_icon.svg" alt="a" class="img-fluid" />
                <div class="d-flex justify-content-between">
                  <h6>EM Bike Helmet</h6>
                  <h6>₹ 1,790</h6>
                </div>
                <a href="#"
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
                <a href="#"
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
                <a href="#"
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
                <a href="#"
                  ><img src="images/cart_icon.svg" alt="a" class="img-fluid" />
                  Add to Cart</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  }
    
    <Footer/>
    </>
  );
}
export default Cart;