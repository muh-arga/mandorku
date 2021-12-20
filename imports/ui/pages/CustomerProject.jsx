import React from "react";
import Navbar from "../components/Customer/Navbar";
import Footer from "../components/Footer";
import DealHistory from "../components/Customer/Project/DealHistory";

const CustomerProject = () => {
    return(
        <div>
            <Navbar />
            <DealHistory />
            <Footer />
        </div>
    )
}

export default CustomerProject;