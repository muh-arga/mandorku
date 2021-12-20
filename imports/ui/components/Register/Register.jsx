import React, { useState } from "react";
import RegisterCustomer from "./RegisterCustomer";
import RegsiterMandor from "./RegisterMandor";
import "/public/css/register.css";

const RegisterPage = () => {
  const [active, setActive] = useState("customer");
  const setCustomer = () => setActive("customer");
  const setMandor = () => setActive("mandor");

  return (
    <div className="register d-flex flex-column allign-items-center justify-content-center">
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
          {active === "customer" ? <RegisterCustomer /> : <RegsiterMandor />}
        </div>
      </div>
      <div className="toRegister col-md-12 text-center">
        <p>
          Sudah punya akun?{" "}
          <span>
            <a href="/">Login</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
