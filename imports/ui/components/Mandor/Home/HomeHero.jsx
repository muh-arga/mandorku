import React from "react";
import "/public/css/hero.css";

const HomeHero = () => {
  return (
    <div className="hero" id="hero">
      <div className="text d-flex flex-column justify-content-center">
        <h1 className="text-center">Bangun profilmu dan dapatkan penawaran customer</h1>
        <a href="#" className="btn">
          <button className="btn">Lebih Lanjut</button>
        </a>
      </div>
    </div>
  );
};

export default HomeHero;
