import React from "react";
import "/public/css/hero.css";

const HomeHero = () => {
  return (
    <div className="hero p-4" id="hero">
      <div className="text d-flex flex-column justify-content-center">
        <h1 className="text-center">Temukan mandormu dan mulai membagun</h1>
        <a href="#services" className="btn">
          <button className="btn">Lebih Lanjut</button>
        </a>
      </div>
    </div>
  );
};

export default HomeHero;


