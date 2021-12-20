import React from "react";
import HomeHero from "../components/Customer/Home/HomeHero";
import Navbar from "../components/Mandor/Navbar";
import HomeService from "../components/Mandor/Home/HomeService";
import Footer from "../components/Footer";
import AboutUs from "../components/Mandor/Home/AboutUs";

const MandorHome = () => {
  return (
    <div>
      <Navbar />
      <HomeHero />
      <HomeService />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default MandorHome;
