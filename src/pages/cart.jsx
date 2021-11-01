import React, {useState, useEffect} from "react";
import Navbar from './../components/Navbar';
import MobileNavbar from './../components/MobileNavbar';
import Footer from './../components/Footer';
import axios from "axios";
import { server, config, checkAccess } from "../env";
import isLoggedIn from './../utils/checkLogin';
import Alert from './../components/Alert';
import Loader from './../components/Loader';

const Cart = (props) => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [add, setAdd] = useState([]);

  const [displayData, setDisplayData] = useState([]);

  const [netAmount, setNetAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [coupon, setCoupon] = useState({});

  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState("");

  const razorPayPaymentHandler = async (params) => {

    setLoader(<Loader/>);

    await axios
        .post(server + '/api/order/create', params, config)
        .then((rsp) => {
          console.log(rsp);
          const orderPayload = rsp.data.payload;
          const options = {
            key: '',
            name: "EMotorad",
            description: orderPayload.id,
            order_id: orderPayload.id,
            handler: async (response) => {
              try {
                const paymentId = response.razorpay_payment_id;
               axios
                .post(server + `/api/payment/razorpay/capture/${paymentId}?orderId=${orderPayload.localId}`, {}, config)
                .then((rsp) => {
                  // const successObj = JSON.parse(rsp.data)
                  // const captured = successObj.captured;
                  // console.log("App -> razorPayPaymentHandler -> captured", successObj)
                  // if(captured){
                      console.log('success')
                      setMessage(<Alert className="success" message={rsp.data.message} />);
                      setLoader("");
                      setOrderSuccess(true);
                  // }
                })
                .catch((err) => {
                  setMessage(<Alert className="danger" message={rsp.data.message} />);
                  setLoader("");
                  console.log(err.response);
                });
               
              } catch (err) {
                console.log(err);
              }
            },
            theme: {
              color: "#10B068",
            },
          };
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        })
        .catch((err) => {
          setMessage(<Alert className="warning" message={"Please Contact Admin"} />);
          setLoader("");
          checkAccess(err);
          console.error(err.response);
        });
    
  }

  const loadCart = async() => {
    if(!isLoggedIn()){
      window.location.href = "/login";
    }
    else {
      await axios
      .get(server + "/api/cart/read", config)
      .then((rsp) => {
        console.log(rsp);
        setCart(rsp.data.payload[0]);
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
    }
  }

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

  const loadAddresses = async () => {
    if(!isLoggedIn()){
      window.location.href = "/login";
    }
    else {
      await axios
      .get(server + "/api/address/read", config)
      .then((rsp) => {
        console.log(rsp);
        const localAdd = [...rsp.data.payload.filter(el => el.default === 1), ...rsp.data.payload.filter(el => el.default !== 1)]
        setAdd(localAdd);
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
    }
  }

  const addToCart = async (id) => {
    const params = {
      "product": [
        ...cart.product.filter(element => element.id !== id),
        {
          "id": id,
          "amount": 1
        }
      ],
      "accessories": cart.accessories
    };
    console.log("param", params)
    await axios
      .put(server + "/api/cart/update", params, config)
      .then((rsp) => {
        console.log(rsp.data); //CHANGE THIS
        window.location.href = "/cart";
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  const calculateAmount = (netAmount) => {
    setTotalAmount(Math.ceil(netAmount * 1.05));
  }

  useEffect(() => {
    loadCart();
    loadProducts();
    loadAddresses();
  }, []);

  useEffect(() => {
    let localCart = [], localAmount = 0;
    if(cart && "id" in cart && products.length > 0) {
      console.log(cart, products);

      let localProduct = {}
      cart.product.forEach((element) => {

        localProduct = products.filter(elem => elem.id === element.id)[0];
        localProduct.quantity = element.amount;
        localCart.push(localProduct);

        localAmount += localProduct.price2 * localProduct.quantity;

      });
      setNetAmount(localAmount)
      console.log("local", localCart)
      setDisplayData(localCart);
    }
  }, [cart, products]);

  useEffect(() => {
    console.log(displayData)
    calculateAmount(netAmount);
  }, [netAmount]);

  const checkCoupon = (e) => {
    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});
      
    setLoader(<Loader/>);

    axios
    .get(server + `/api/coupon/read/${params.code}`)
    .then((rsp) => {
      console.log(rsp);
      if(rsp.data.payload){
        setCoupon(rsp.data.payload);
        setMessage(<Alert className="success" message={"Coupon Applied"} />);
        setLoader("");
      }
      else {
        setMessage(<Alert className="danger" message={"Invalid Coupon"} />);
        setLoader("");
      }
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
        setMessage(<Alert className="danger" message={err.response.data.message} />);
        setLoader("");
      }
    });
  }

  const updateCart = async (params) => {
    await axios
      .put(server + "/api/cart/update", params, config)
      .then((rsp) => {
        console.log(rsp.data);
        // window.location.href = "/cart";
        window.location.reload();
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  }

  const changeQuantity = async (id, type, amount) => {
    let params = {}
    if (type==="plus") {
      params = {
        "product": [
          ...cart.product.filter(element => element.id !== id),
          {id: id, amount: amount + 1}
        ],
        "accessories": []
      };
    }
    else {
      params = {
        "product": [
          ...cart.product.filter(element => element.id !== id),
          {"id": id, "amount": amount > 0 ? amount - 1 : 0}
        ],
        "accessories": []
      };
    }
    updateCart(params);
  }

  const deleteItem = async (id) => {
    const params = {
      "product": [
        ...cart.product.filter(element => element.id !== id),
      ],
      "accessories": []
    };
    console.log("params", params);
    updateCart(params);
  }

  const handleSelectAddress = async(e) => {
    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    if (cart.product.length > 0) {
      razorPayPaymentHandler(params);
    }
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
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                id ullamcorper sem. Phasellus vitae dui erat. Donec ligula erat,
                venenatis vitae molestie vel, dapibus nec libero.
              </p> */}
              <div class="ordr_placed_btnns">
                <a href="index.html">Go to HomePage</a>
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
                      displayData.length > 0 ?
                      displayData.map((item) =>
                        <tr>
                          <td>
                            <img
                              // src="images/cycle_warenty.png"
                              src={`${server}${item.banner}`}
                              alt="a"
                              class="img-fluid"
                            />
                          </td>
                          <td>
                            <h5>{item.name}</h5>
                            <p>Color : <i class="fa fa-circle" style={{"color": item.color}}></i></p>
                          </td>
                          <td>
                            <h5>₹ {item.price2}</h5>
                          </td>
                          <td>
                            <div class="incre">
                              <a href="javascript:void(0)" class="button-container"
                              onClick={() => {
                                changeQuantity(item.id, "minus", item.quantity)
                              }}>
                                <i class="fa fa-minus cart-qty-minus"></i>
                              </a>
                              <input
                                type="text"
                                name="qty"
                                class="qty"
                                maxlength="12"
                                value={item.quantity}
                                class="input-text qty"
                              />

                              <a href="javascript:void(0)" class="button-container"
                              onClick={() => {
                                changeQuantity(item.id, "plus", item.quantity)
                              }}>
                                <i class="fa fa-plus cart-qty-plus"></i>
                              </a>
                            </div>
                          </td>
                          <td>
                            <h5>₹ {item.price2 * item.quantity}</h5>
                          </td>
                          <td>
                            <a href="javascript:void(0)"
                            onClick={() => {
                              deleteItem(item.id)
                            }}
                              ><img
                                src="images/close_ic.png"
                                alt="x"
                                class="img-fluid"
                            /></a>
                          </td>
                        </tr>
                      )
                      :
                      <tr>
                        <td colspan="5">
                          <div class="state_boxs_wrap">
                          <p>
                            No items in your cart!
                            <a href="/"
                              >Explore Products</a>
                          </p>
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-lg-4">
              {message}
              <div class="cart_invo_wrap">
                <h4>Have a coupon?</h4>
                <form onSubmit={checkCoupon}>
                  <div class="copun_enter_input">
                      <input type="text" placeholder="Enter Coupon Code" name="code" required/>
                      <button type="submit">Apply</button>
                  </div>
                </form>
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
                  <button class="btn btn_submit" data-toggle="modal" data-target="#exampleModalLong" onClick={()=>{
                    // createOrder()
                    // setOrderSuccess(true)
                    // razorPayPaymentHandler();
                    }}>
                    <span>₹ {totalAmount} </span>
                    <span
                      >Checkout
                      <img src="images/arrw_w_rgt.svg" alt="a" class="img-fluid"
                    /></span>
                    {loader}
                  </button>
                </div>
                <div class="continue_shoping_btn">
                  <a href="/">Continue Shopping</a>
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
                    <img src="images/healmate_icon.svg" alt="a" class="img-fluid" />
                    <div class="d-flex justify-content-between">
                      <h6>{prod.name}</h6>
                      <h6>₹ {prod.price2}</h6>
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
    </>
  }
    
    <Footer/>
    <section class="modal_section_2">
      <div
        class="modal fade"
        id="exampleModalLong"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="accnt_setting_modal">
                <a href="#" data-dismiss="modal" aria-label="Close">
                  <img src="images/close_icon.svg" alt="x" class="img-fluid" />
                </a>
                <div class="accnt_modal_head">
                  <h5>Select Address</h5>
                  {/* <ul>
                    <li><a href="javascript:void(0)"><i class="fa fa-star"></i></a></li>
                  </ul> */}
                  <div class="more_adds_add_bttn cart_adds_add">
                        <a href="#" data-toggle="modal" data-target="#exampleModalLong">
                          <i class="fa fa-plus"></i> Add a New Address
                        </a>
                      </div>
                </div>
                <div class="emi_plan_frm accnt_modal_plan">
                  <form onSubmit={handleSelectAddress}>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="">Select Your Address</label>
                          <select name="address" class="form-control" required>
                            {
                              add.map(x=><option value={x.id} title={x.address}>{x.address.substring(0, 60) + "..."}</option>)
                            }
                          </select>
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="accnt_submit_modal">
                          <button type="submit" class="btn btn_submit" data-dismiss="modal">
                            Place Order
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
export default Cart;