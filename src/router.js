import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./pages/landing";
import EMI from "./pages/assurance/emi";
import RSA from "./pages/assurance/rsa";
import Insurance from "./pages/assurance/insurance";
import BuySmart from "./pages/assurance/buySmart";
import Community from "./pages/world/community";
import Careers from "./pages/reach/careers";
import About from "./pages/reach/about";
import FAQ from "./pages/reach/faq";
import Partner from "./pages/reach/partner";
import Contact from "./pages/reach/contact";
import Warranty from "./pages/assurance/warranty";
import TOS from "./pages/extra/tos";
import Cookies from "./pages/extra/cookies";
import Privacy from "./pages/extra/privacy";
import Cart from "./pages/cart";
import FindStore from "./pages/reach/findStore";
import BookRide from "./pages/bookRide";
import AllProducts from "./pages/products/allProducts";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/settings" component={Settings} />
            <Route path="/orders" component={Order} /> */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/bikes" component={AllProducts} />
        <Route path="/emi" component={EMI} />
        <Route path="/warranty" component={Warranty} />
        <Route path="/insurance" component={Insurance} />
        <Route path="/buysmart" component={BuySmart} />
        <Route path="/rsa" component={RSA} />
        <Route path="/community" component={Community} />
        <Route path="/careers" component={Careers} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={FAQ} />
        <Route path="/store" component={FindStore} />
        <Route path="/partner" component={Partner} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms" component={TOS} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/book" component={BookRide} />
        <Route path="/cart" component={Cart} />
        <Route path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}
