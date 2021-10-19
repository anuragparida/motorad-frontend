import React from "react";
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';
import Footer from './Footer';

const template = (props) => {
  return(
    <>
    <Navbar/>
    <MobileNavbar/>
    <Footer/>
    </>
  );
}
export default template;