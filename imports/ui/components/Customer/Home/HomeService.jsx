import React from "react";
import "/public/css/homeService.css";

const HomeService = () => {
  return (
    <div className="homeService p-4 d-flex flex-column justify-content-center">
      <p className="title" id="services">
        Layanan
      </p>
      <h2>Nikmati Layanan Kami</h2>
      <div className="row d-flex flex-row flex-wrap justify-content-center">
        <div className="col-4 d-flex flex-column align-items-center">
          <img src="/img/find.png" alt="Gambar"/>
          <h4 className="mt-3">Cari Mandor</h4>
          <p className="text-center">Temukan mandor terbaik untuk mengerjakan bangunanmu</p>
        </div>
        <div className="col-4 d-flex flex-column align-items-center">
          <img src="/img/deal.png" alt="Gambar"/>
          <h4 className="mt-3">Penawaran</h4>
          <p className="text-center">Buat penawaran dan kesepakatan dengan mandormu</p>
        </div>
        <div className="col-4 d-flex flex-column align-items-center">
          <img src="/img/review.png" alt="Gambar"/>
          <h4 className="mt-3">Ulasan</h4>
          <p className="text-center">Dapatkan ulasan dan rating untuk kinerja mandormu</p>
        </div>
      </div>
    </div>
  );
};

export default HomeService;
