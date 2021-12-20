import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { FlowRouter } from "meteor/kadira:flow-router";

import { Customer } from "../../../api/Customer";
import "/public/css/navbar.css";

const Navbar = () => {
  const id = sessionStorage.getItem("id");
  const path = FlowRouter.getRouteName();

  const { customer, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("customers");
    return {
      customer: Customer.findOne({ _id: id }),
      ready: subscription.ready(),
    };
  });

  if (!ready) {
    return <div>Loading</div>;
  }

  const logout = (e) => {
    e.preventDefault();

    sessionStorage.clear();
    FlowRouter.go("/");
  };

  return (
    <div className="navbar p-4 d-flex flex-row justify-content-between align-items-center">
      <h3 className="col-4 m-0">
        <b>MandorKu</b>
      </h3>
      <ul className="col-4 m-0 p-0 d-flex flex-row justify-content-center">
        <li>
          <a href="/customer/" className={path === "Customer Home"? "active" : ""}>Beranda</a>
        </li>
        <li>
          <a href="/customer/mandor" className={path === "Mandor"? "active" : ""}>Mandor</a>
        </li>
        <li>
          <a href="/customer/proyek" className={path === "Proyek"? "active" : ""}>Proyek</a>
        </li>
        <li>
          <a href="/customer/profil" className={path === "Customer Profile"? "active" : ""}>Profil</a>
        </li>
        <span className="nav-indicator"></span>
      </ul>
      <div className="col-4 d-flex flex-row justify-content-end align-items-center">
        <span className="name me-3">{customer.name}</span>
        <div className="btn-group">
          <button
            className="btn btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenu2"
          >
            <li>
              <button className="dropdown-item" type="button" onClick={logout}>
                Log out
              </button>
            </li>
          </ul>
        </div>
        <img
          src={customer.imgUrl}
          alt="Photo profile"
          className="rounded-circle"
        />
      </div>
    </div>
  );
};

export default Navbar;
