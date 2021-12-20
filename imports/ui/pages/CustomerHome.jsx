import React from "react";
import HomeHero from "../components/Customer/Home/HomeHero";
import Navbar from "../components/Customer/Navbar";
import HomeService from "../components/Customer/Home/HomeService";
import HomeMandor from "../components/Customer/Home/HomeMandor";
import Footer from "../components/Footer";
import AboutUs from "../components/Customer/Home/AboutUs";

const CustomerHome = () => {
  return (
    <div>
      <Navbar />
      <HomeHero />
      <HomeService />
      <HomeMandor />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default CustomerHome;
