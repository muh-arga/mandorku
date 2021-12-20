import React, { useState } from "react";
import { Meteor } from "meteor/meteor"
import { useTracker } from "meteor/react-meteor-data"
import bcrypt from "bcryptjs";
import { Customer } from "../../../api/Customer";
import { FlowRouter } from "meteor/kadira:flow-router";

const RegisterCustomer = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    moto: "",
    profile: "",
    imgUrl: "/img/profile.png",
    created_at: new Date(),
  });

  const {customerExist, ready} = useTracker(() => {
    const subscription = Meteor.subscribe('customers')
    return{
      customerExist: Customer.findOne({email: customer.email}),
      ready: subscription.ready()
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerExist) {
      Customer.insert(customer);
      FlowRouter.go("/");
    }
  };

  const hashPassword = (password) => bcrypt.hashSync(password, 10);

  return (
    <React.Fragment>
      <h5>Daftar sebagai Customer</h5>
      <form className="row g-3 mt-2" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Nama
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            placeholder="Nama"
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            required
            type="email"
            className="form-control"
            id="email"
            placeholder="example@gmail.com"
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setCustomer({
                ...customer,
                password: hashPassword(e.target.value),
              })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="address" className="form-label">
            Alamat
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="address"
            placeholder="Enrekang, Sulawesi Selatan"
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />
        </div>
        <div className="form-check col-md-12">
          <input
            required
            className="form-check-input
              required me-2"
            type="checkbox"
            id="gridCheck"
          />
          <label className="form-check-label" htmlFor="gridCheck">
            Saya setuju dengan syarat dan kesepakatan
          </label>
        </div>
        <div className="col-md-12">
          <button className="btn mt-3">Daftar</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default RegisterCustomer;
