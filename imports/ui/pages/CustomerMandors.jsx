import React from "react";
import Navbar from "../components/Customer/Navbar";
import Footer from "../components/Footer";
import MandorList from "../components/Customer/Mandors/MandorList";
import "/public/css/mandors.css";

const CustomerMandors = () => {
  return (
    <div>
      <Navbar />
      <div className="container container-fluid p-0 d-flex flex-row justify-content-start">
        <MandorList />
      </div>
      <Footer />
    </div>
  );
};

export default CustomerMandors;
