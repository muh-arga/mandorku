import React from "react";
import "/public/css/footer.css";

const Footer = () => {
    return(
        <div className="footer py-2">
            <div className="row mt-4 py-4 container-fluid d-flex flex-row align-items-start justify-content-center">
                <div className="col-3 d-flex flex-column align-items-center">
                    <h3><b>MandorKu</b></h3>
                </div>
                <div className="col-3 d-flex flex-column align-items-start">
                    <h6 className="header mb-3">About Us</h6>
                    <a href="#">Services</a>
                    <a href="#">Popular Mandor</a>
                    <a href="#">About Us</a>
                </div>
                <div className="col-3 d-flex flex-column align-items-start">
                    <h6 className="header mb-3">Links</h6>
                    <a href="#">Instagram</a>
                    <a href="#">Facebook</a>
                    <a href="#">Twitter</a>
                </div>
                <div className="col-3 d-flex flex-column align-items-start">
                    <h6 className="header mb-3">Get In Touch</h6>
                    <a href="#">+6281340796947</a>
                    <a href="#">info@mandorku.com</a>
                    <p></p>
                </div>
            </div>

        </div>
    )
}

export default Footer