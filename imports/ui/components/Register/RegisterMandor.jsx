import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import bcrypt from "bcryptjs";
import { Mandor } from "../../../api/Mandor";
import { FlowRouter } from "meteor/kadira:flow-router";

const RegsiterMandor = () => {
  const [mandor, setMandor] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    imgUrl: "/img/profile.png",
    moto: "",
    profile: "",
    salary: 0,
    jobDone: 0,
    skills: [],
    Expereiences: [],
    rating: 0,
    created_at: new Date(),
  });

  const { mandorExist, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("mandors");
    return {
      mandorExist: Mandor.findOne({ email: mandor.email }),
      ready: subscription.ready(),
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(mandorExist);
    if (!mandorExist) {
      Mandor.insert(mandor);
      FlowRouter.go("/");
    }
  };

  const handleCheckbox = (event) => {
    let newArray = [...mandor.skills, event.target.value];
    if (mandor.skills.includes(event.target.value)) {
      newArray = newArray.filter(day => day !== event.target.value);
    }
    setMandor({...mandor,
      skills: newArray
    });
  };

  const hashPassword = (password) => bcrypt.hashSync(password, 10);

  return (
    <React.Fragment>
      <h5>Daftar sebagai Mandor</h5>
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
            onChange={(e) => setMandor({ ...mandor, name: e.target.value })}
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
            onChange={(e) => setMandor({ ...mandor, email: e.target.value })}
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
              setMandor({ ...mandor, password: hashPassword(e.target.value) })
            }
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="phone" className="form-label">
            No HP
          </label>
          <input
            required
            type="phone"
            className="form-control"
            id="phone"
            placeholder="0812345678910"
            onChange={(e) => setMandor({ ...mandor, phone: e.target.value })}
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
            onChange={(e) => setMandor({ ...mandor, address: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label className="mb-2">Keahlian</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Rumah"
              id="rumah"
              onChange={(e) => {handleCheckbox(e)}}
            />
            <label className="form-check-label" htmlFor="rumah">
              Rumah
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Gedung"
              id="gedung"
              onChange={(e) => {handleCheckbox(e)}}
            />
            <label className="form-check-label" htmlFor="gedung">
              Gedung
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Kantor"
              id="kantor"
              onChange={(e) => {handleCheckbox(e)}}
            />
            <label className="form-check-label" htmlFor="kantor">
              Kantor
            </label>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="salary" className="form-label">
            Bayaran
          </label>
          <div className="input-group">
            <span className="input-group-text">Rp</span>
            <input
              required
              type="number"
              className="form-control"
              id="salary"
              onChange={(e) => setMandor({ ...mandor, salary: e.target.value })}
            />
          </div>
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

export default RegsiterMandor;
