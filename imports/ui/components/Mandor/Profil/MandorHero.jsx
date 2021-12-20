import React, { useState } from "react";
import { Meteor } from "meteor/meteor"
import FileBase from "react-file-base64";

import { Mandor } from "../../../../api/Mandor";

import "/public/css/mandorProfile.css";

const MandorHero = ({ mandor }) => {
  const [showEditForm, setshowEditForm] = useState(false);
  const editForm = () => setshowEditForm(true);
  const closeEditForm = () => setshowEditForm(false);

  Meteor.call("review-manUpdate", mandor);
  Meteor.call("deal-manUpdate", mandor);

  const EditForm = () => {
    const [data, setData] = useState({
      name: mandor.name,
      moto: mandor.moto,
      profile: mandor.profile,
      salary: mandor.salary,
      address: mandor.address,
      phone: mandor.phone,
      email: mandor.email,
      imgUrl: mandor.imgUrl,
      skills: mandor.skills,
    });

    const handleCheckbox = (event) => {
      let newArray = [...data.skills, event.target.value];
      if (data.skills.includes(event.target.value)) {
        newArray = newArray.filter((day) => day !== event.target.value);
      }
      setData({ ...data, skills: newArray });
    };

    const submitHandle = (e) => {
      e.preventDefault();

      Mandor.update({ _id: mandor._id }, { $set: data });

      // window.location.reload(false);
    };

    return (
      <div className="formContainer ps-4 d-flex justify-content-center align-items-center">
        <div className="heroForm">
          <form
            className="d-flex flex-column justify-content-start"
            onSubmit={submitHandle}
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
                <div className="col-md-4 mb-3">
                  <label htmlFor="bayaran">Bayaran</label>
                  <input
                    className="form-control"
                    type="number"
                    name="bayaran"
                    id="bayaran"
                    onChange={(e) =>
                      setData({ ...data, salary: e.target.value })
                    }
                    value={data.salary}
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
                <div className="col-12">
                  <label className="mb-2">Keahlian</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Rumah"
                      id="rumah"
                      checked={data.skills.includes("Rumah") ? true : ""}
                      onChange={(e) => {
                        handleCheckbox(e);
                      }}
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
                      checked={data.skills.includes("Gedung") ? true : ""}
                      onChange={(e) => {
                        handleCheckbox(e);
                      }}
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
                      checked={data.skills.includes("Kantor") ? true : ""}
                      onChange={(e) => {
                        handleCheckbox(e);
                      }}
                    />
                    <label className="form-check-label" htmlFor="kantor">
                      Kantor
                    </label>
                  </div>
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
              src={mandor.imgUrl}
              className="img-fluid rounded-4"
              alt="Anto"
            />
            <div className="contact mt-2 d-flex flex-column">
              <div className="salary">
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
          <div className="col-md-8">
            <div className="card-body p-0 d-flex flex-row justify-content-between">
              <div className="detail col-9">
                <h4 className="card-title">{mandor.name}</h4>
                <span className="tagline">{mandor.moto}</span>
                <p className="card-text mt-2">{mandor.profile}</p>
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

export default MandorHero;
