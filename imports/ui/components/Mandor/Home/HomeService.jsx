import React from "react";
import "/public/css/homeService.css";

const HomeService = () => {
  return (
    <div className="homeService d-flex flex-column justify-content-center">
      <p className="title" id="services">
        Layanan
      </p>
      <h2>Nikmati Layana Kami</h2>
      <div className="row d-flex flex-row flex-wrap justify-content-center">
        <div className="col-4 d-flex flex-column align-items-center">
          <img src="/img/branding.png" alt="Gambar"/>
          <h4 className="mt-3">Personal Branding</h4>
          <p className="text-center">Tunjukan pengalamanmu hingga customer melirikmu</p>
        </div>
        <div className="col-4 d-flex flex-column align-items-center">
          <img src="/img/deal.png" alt="Gambar"/>
          <h4 className="mt-3">Penawaran</h4>
          <p className="text-center">Dapatkan penawaran dari costumer dan kerjakan proyekmu</p>
        </div>
        <div className="col-4 d-flex flex-column align-items-center">
          <img src="/img/review.png" alt="Gambar"/>
          <h4 className="mt-3">Ulasan</h4>
          <p className="text-center">Dapatkan ulasan dan rating dari customer mengenai kinerjamu</p>
        </div>
      </div>
    </div>
  );
};

export default HomeService;
