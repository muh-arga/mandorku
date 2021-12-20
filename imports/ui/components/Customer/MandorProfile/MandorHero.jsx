import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Deal } from "../../../../api/Deal";
import { Mandor } from "../../../../api/Mandor";
import { Customer } from "../../../../api/Customer";

import "/public/css/mandorProfile.css";

const MandorHero = ({ mandor }) => {
  const [showForm, setShowForm] = useState(false);
  const onClick = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const customerId = sessionStorage.getItem("id");

  const {customer, ready} = useTracker(() => {
    const subscription = Meteor.subscribe('customers')
    return {
      customer: Customer.findOne({_id: customerId}),
      ready: subscription.ready()
    }
  })

  if(!ready) {
    return <div>Loading</div>
  }

  const Form = () => {
    const [data, setData] = useState({
      customer: {
        id: customerId,
        name: customer.name,
        imgUrl: customer.imgUrl
      },
      mandor: {
        id: mandor._id,
        name: mandor.name,
        imgUrl: mandor.imgUrl
      },
      name: "",
      start: Date,
      end: Date,
      salary: 0,
      description: "",
      status: "Ditawar",
      createdAt: new Date()
    });

    const submitHandler = (e) => {
      e.preventDefault();

      const deal = Deal.insert(data);

      Customer.update({_id: customerId}, {
        $push: {Projects: deal}
      })

      Mandor.update({_id: mandor._id}, {
        $push: {Projects: deal}
      })

      window.location.reload(false)
    };

    return (
      <div className="formContainer ps-4 d-flex justify-content-center align-items-center">
        <div className="hireForm">
          <form
            className="d-flex flex-column justify-content-start"
            onSubmit={submitHandler}
          >
            <div className="col-12 p-4 d-flex justify-content-between align-items-start">
              <h5 className="header m-0">Review Proyek</h5>
              <button onClick={closeForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="col p-4">
              <div className="form-group row g-3 mb-3">
                <div className="col-md-12 mb-3">
                  <label htmlFor="proyek">Nama Proyek</label>
                  <input
                    required
                    className="form-control"
                    type="text"
                    name="proyek"
                    id="proyek"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="mulai">Tanggal Mulai</label>
                  <input
                    required
                    className="form-control"
                    type="date"
                    name="mulai"
                    id="mulai"
                    onChange={(e) =>
                      setData({ ...data, start: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="selesai">Tanggal Selesai</label>
                  <input
                    required
                    className="form-control"
                    type="date"
                    name="selesai"
                    id="selesai"
                    onChange={(e) => setData({ ...data, end: e.target.value })}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="bayaran">Bayaran</label>
                  <div className="input-group p-0">
                    <span className="input-group-text">Rp</span>
                    <input
                      required
                      className="form-control"
                      type="number"
                      name="bayaran"
                      id="bayaran"
                      onChange={(e) =>
                        setData({ ...data, salary: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="keterangan">Keterangan</label>
                  <textarea
                    required
                    rows="5"
                    className="form-control"
                    name="keterangan"
                    id="keterangan"
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="submitForm text-end p-4">
              <button type="submit" className="btn p-2 btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="userHero p-4">
      <div className="card p-4">
        {showForm ? <Form /> : null}
        <div className="row">
          <div className="image col-md-3">
            <img
              src={mandor.imgUrl}
              className="img-fluid rounded-4"
              alt="Mandor Photo"
            />
            <div className="contact mt-2 d-flex flex-column">
              <div className="salary">
                <i className="fas da-salary"></i>
                <span>Rp{mandor.salary} IDR/hari</span>
              </div>
              <div className="address mt-2">
                <span>{mandor.address}</span>
              </div>
              <div className="phone mt-2">
                <a href="#">{mandor.phone}</a>
              </div>
              <div className="email mt-2">
                <a href="#">{mandor.email}</a>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card-body p-0 d-flex flex-row justify-content-between">
              <div className="detail col-12">
                <div className="top d-flex flex-row justify-content-between">
                  <h4 className="card-title">{mandor.name}</h4>
                  <button className="btn" onClick={onClick}>
                    Buat Tawaran
                  </button>
                </div>
                <span className="tagline">{mandor.moto}</span>
                <p className="card-text mt-2 pe-5">{mandor.profile}</p>
                <div className="info mb-4 d-flex flex-row justify-content-start">
                  <div className="rate">
                    <img src="/img/star.png" alt="Aanto" className="photo" />
                    <span className="ms-2">{Math.round(mandor.rating*10)/10}</span>
                  </div>
                  <div className="job ms-4">
                    <img src="/img/done.png" alt="Aanto" className="photo" />
                    <span className="ms-2">{mandor.jobDone} job done</span>
                  </div>
                </div>
                <div className="skills">
                  {mandor.skills.map((skill, index) => (
                    <span className="kategori ms-2" key={index}>
                      <a href="#">{skill}</a>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MandorHero;
