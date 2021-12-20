import React, { useState } from "react";

import "/public/css/mandorProfile.css";

const CustomerHero = ({ customer }) => {
  return (
    <div className="userHero p-4">
      <div className="card p-4">
        <div className="row">
          <div className="image col-md-3">
            <img
              src={customer.imgUrl}
              className="img-fluid rounded-4"
              alt="Anto"
            />
            <div className="contact mt-2 d-flex flex-column">
              <div className="address mt-2">
                <span>{customer.address}</span>
              </div>
              <div className="phone mt-2">
                <a href="#">{customer.phone}</a>
              </div>
              <div className="email mt-2">
                <a href="#">{customer.email}</a>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body p-0 d-flex flex-row justify-content-between">
              <div className="detail col-9">
                <h4 className="card-title">{customer.name}</h4>
                <span className="tagline">{customer.moto}</span>
                <p className="card-text mt-2">{customer.profile}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHero;
