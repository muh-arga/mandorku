import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Customer } from "../../../api/Customer";
import { Mandor } from "../../../api/Mandor";
import bcrypt from "bcryptjs";
import { FlowRouter } from "meteor/kadira:flow-router";

import "/public/css/customerLogin.css";
import { read } from "@popperjs/core";

const CustomerLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [active, setActive] = useState("customer");
  const setCustomer = () => setActive("customer");
  const setMandor = () => setActive("mandor");

  const loginCustomer = (e) => {
    e.preventDefault();

    const customer = Customer.findOne({email: user.email})
    const ready = Meteor.subscribe('customers')

    if (!ready) {
      return <div>Loading</div>;
    }

    if (customer === undefined) return;

    bcrypt.compare(user.password, customer.password, function (err, res) {
      if (res) {
        sessionStorage.setItem("role", "customer");
        sessionStorage.setItem("name", customer.name);
        sessionStorage.setItem("id", customer._id);
        FlowRouter.go("/customer");
      }
    });
  };

  const loginMandor = async (e) => {
    e.preventDefault();

    const mandor = Mandor.findOne({email: user.email})
    const ready = Meteor.subscribe('mandors')

    if (!ready) {
      return <div>Loading</div>;
    }

    if (mandor === undefined) return;

    bcrypt.compare(user.password, mandor.password, function (err, res) {
      if (res) {
        sessionStorage.setItem("role", "mandor");
        sessionStorage.setItem("name", mandor.name);
        sessionStorage.setItem("id", mandor._id);
        FlowRouter.go("/mandor");
      }
    });
  };

  return (
    <div className="customerLogin d-flex flex-column allign-items-center justify-content-center">
      <div className="logo col-md-12 mb-3 text-center">
        <h3>MandorKu</h3>
      </div>
      <div className="container p-0 col-md-12 mb-3 d-flex flex-column">
        <div className="loginNav col-12 d-flex flex-row">
          <a
            className={`col-6 text-center border-start ${
              active === "customer" ? "active" : ""
            }`}
            onClick={setCustomer}
          >
            Customer
          </a>
          <a
            className={`col-6 text-center border-end ${
              active === "mandor" ? "active" : ""
            }`}
            onClick={setMandor}
          >
            Mandor
          </a>
        </div>
        <div className="form col-12">
          <h5>Login {active === "customer" ? "Customer" : "Mandor"}</h5>
          <p>Login untuk mengakses dengan akun anda</p>
          <form onSubmit={active === "customer" ? loginCustomer : loginMandor}>
            <div className="input-group mb-3 mt-4">
              <span className="input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fas fa-key"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Passsword"
                aria-label="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Ingat Saya
              </label>
            </div>
            <button className="btn mt-3">Login</button>
          </form>
        </div>
      </div>
      <div className="toRegister col-md-12 text-center">
        <p>
          Belum punya akun?{" "}
          <span>
            <a href="/daftar">Daftar</a>
          </span>
        </p>
        <a href="#">Lupa Password?</a>
      </div>
    </div>
  );
};

export default CustomerLogin;
