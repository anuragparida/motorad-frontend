import React, {useState, useEffect} from "react";
import Navbar from './../../components/Navbar';
import MobileNavbar from './../../components/MobileNavbar';
import Footer from './../../components/Footer';
import { server } from "../../env";
import axios from "axios";

const FindStore = (props) => {

  const [findSuccess, setFindSuccess] = useState(false);
  const [stores, setStores] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState({});
  const [state, setState] = useState('');
  const [country, setCountry] = useState(true); 


  const changeState = (event) => {
    setState(event.target.value);
  }

  const loadStores = async (e) => {

    setStores([]);

    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    axios
    .post(server + `/api/store/filter/${params.state}/${params.city}`, params)
    .then((rsp) => {
      console.log(rsp);
      setStores(rsp.data.payload);
      
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
      }
    });

    setCity(params.city);
    setFindSuccess(true);

  }

  const loadCities = async(e) => {
    axios
    .get(server + `/api/store/read-states`)
    .then((rsp) => {
      console.log(rsp);
      setCities(rsp.data.payload.states);
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
      }
    });
  }

  useEffect(()=>{
    loadCities();
  }, [])

  return(
    <>
    <Navbar setCountry={setCountry} country={country}/>
    <MobileNavbar/>
    <section class="find_store_sec">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="contact_map_txt mb-5">
              <h3>Find a Store</h3>
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent <br />
                vestibulum ullamcorper sapien eget fringilla.
              </p> */}
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
              <p>Selected City <span>{city}</span></p>
            </div>
            <div class="faq_txt_wrap find_store_collapses">
              <div class="bs-example">
                <div class="accordion" id="accordionExample">

                  {
                    stores.map((x, i) => 
                      <div class="card">
                        <div class="card-header" id="headingOne">
                          <h2 class="mb-0">
                            <button
                              type="button"
                              class="btn btn-link"
                              data-toggle="collapse"
                              data-target={`#collapse${i}`}
                            >
                              <span>{x.name}</span>
                              <i class="fa fa-angle-down"></i>
                            </button>
                          </h2>
                        </div>
                        <div
                          id={`collapse${i}`}
                          class={i===0?"collapsed show active":"collapse"}
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <p>
                              <span>Add:</span> {x.address}
                            </p>
                            <p><span>Mob:</span> {"ADD CONTACT TO API"}</p>
                          </div>
                        </div>
                      </div>
                    )
                  }
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

              <form onSubmit={loadStores}>
                <div class="form-group">
                  <label for="">Enter State</label>
                  <select name="state" class="form-control" required onChange={changeState}>
                    {
                      Object.keys(cities).map(x=><option value={x}>{x}</option>)
                    }
                  </select>
                </div>
                <div class="form-group">
                  <label for="">Enter City</label>
                  <select name="city" class="form-control" required>
                    {
                      state && cities[state].map(x=><option value={x}>{x}</option>)
                    }
                  </select>
                </div>
                <div class="form-group">
                  {/* <a href="javascript:void(0)" onClick={()=>{setFindSuccess(true)}} class="btn_submit">Get Started</a> */}
                  <button type="submit" class="btn_submit">Show Stores</button>
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