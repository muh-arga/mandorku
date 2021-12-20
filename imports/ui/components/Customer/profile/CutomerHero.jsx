import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import FileBase from "react-file-base64";

import { Customer } from "../../../../api/Customer";

import "/public/css/mandorProfile.css";

const CustomerHero = ({ customer }) => {
  const [showEditForm, setshowEditForm] = useState(false);
  const editForm = () => setshowEditForm(true);
  const closeEditForm = () => setshowEditForm(false);

  Meteor.call("review-custUpdate", customer);

  Meteor.call("deal-custUpdate", customer);

  const EditForm = () => {
    const [data, setData] = useState({
      name: customer.name,
      email: customer.email,
      address: customer.address,
      phone: customer.phone,
      moto: customer.moto,
      profile: customer.profile,
      imgUrl: customer.imgUrl,
    });

    const submitHandler = (e) => {
      e.preventDefault();

      Customer.update({ _id: customer._id }, { $set: data });

      // window.location.reload(false);
    };

    return (
      <div className="formContainer ps-4 d-flex justify-content-center align-items-center">
        <div className="heroForm">
          <form
            className="d-flex flex-column justify-content-start"
            onSubmit={submitHandler}
          >
            <div className="col-12 p-4 d-flex justify-content-between align-items-start">
              <p className="m-0">Edit Profil</p>
              <button onClick={closeEditForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="col p-4">
              <div className="form-group row g-3">
                <div className="col-md-12 mb-3">
                  <label htmlFor="nama">Nama</label>
                  <input
                    className="form-control"
                    type="text"
                    name="nama"
                    id="nama"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    value={data.name}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="moto">Moto Profesional</label>
                  <input
                    className="form-control"
                    type="text"
                    name="moto"
                    id="moto"
                    onChange={(e) => setData({ ...data, moto: e.target.value })}
                    value={data.moto}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="profil">Profil</label>
                  <textarea
                    rows="5"
                    className="form-control"
                    name="profil"
                    id="profil"
                    onChange={(e) =>
                      setData({ ...data, profile: e.target.value })
                    }
                    value={data.profile}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="alamat">Alamat</label>
                  <input
                    className="form-control"
                    type="text"
                    name="alamat"
                    id="alamat"
                    onChange={(e) =>
                      setData({ ...data, address: e.target.value })
                    }
                    value={data.address}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="telepon">No Hp</label>
                  <input
                    className="form-control"
                    type="text"
                    name="telepon"
                    id="telepon"
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    value={data.phone}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    value={data.email}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <FileBase
                    type="file"
                    id="img-file"
                    name="image"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setData({ ...data, imgUrl: base64 })
                    }
                    className="position-absolute"
                  />
                </div>
              </div>
            </div>
            <div className="submitForm text-end p-4">
              <button className="btn p-2 btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="userHero p-4">
      <div className="card p-4">
        {showEditForm ? <EditForm /> : null}
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
          <div className="col-md-1 text-end">
            <button onClick={editForm}>
              <i className="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHero;
