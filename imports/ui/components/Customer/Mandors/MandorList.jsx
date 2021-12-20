import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Mandor } from "../../../../api/Mandor";

const MandorList = () => {
  const [filter, setFilter] = useState({
    skill: "",
    address: "",
  });

  const [filteredMandors, setFilteredMandors] = useState("")

  let { mandors, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("mandors");
    return {
      mandors: Mandor.find().fetch(),
      ready: subscription.ready(),
    };
  });

  if (!ready) {
    return <div>Loading</div>;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const mandor = Mandor.find({
      $and: [
        { skills: { $regex: filter.skill, $options: "i" } },
        { address: { $regex: filter.address, $options: "i" } },
      ],
    }).fetch();

    setFilteredMandors(mandor)

  };
  
  const handleReset = () => {
    setFilter({...filter, skill: "", address: ""})
  }


  return (
    <div className="container container-fluid p-0 d-flex flex-row justify-content-start">
      <div className="col-3 p-0">
        <div className="filter p-4 mt-5">
          <h5>Cari lebih spesifik</h5>
          <div className="detail mt-5">
            <form onSubmit={submitHandler}>
              <div className="skill d-flex flex-column">
                <label className="form-label" htmlFor="skill">
                  Keahlian
                </label>
                <select
                  name="skill"
                  className="form-select"
                  onChange={(e) =>
                    setFilter({ ...filter, skill: e.target.value })
                  }
                  value={filter.skill}
                >
                  <option value="" disabled>
                    Pilih keahlian...
                  </option>
                  <option value="Rumah">Rumah</option>
                  <option value="Gedung">Gedung</option>
                  <option value="Kantor">Kantor</option>
                </select>
              </div>
              <div className="location mt-4 d-flex flex-column">
                <label className="form-label" htmlFor="location">
                  Lokasi
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  onChange={(e) =>
                    setFilter({ ...filter, address: e.target.value })
                  }
                  value={filter.address}
                />
              </div>
              <div className="submit mt-3">
                <button type="submit" className="btn">
                  Filter
                </button>
                <button className="btn ms-2" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-9 p-0 ms-4">
        <List mandors={filteredMandors === "" ? mandors: filteredMandors} />
      </div>
    </div>
  );
};

const List = ({ mandors }) => {
  const [keyword, setKeyword] = useState("");
  key = keyword;
  let listMandor = mandors;
  if (keyword !== "") {
    listMandor = Mandor.find({
      $or: [{ name: { $regex: keyword, $options: "i" } }],
    }).fetch();
  }

  return (
    <div className="mandorList mt-5">
      <form action="">
        <div className="input-group p-4">
          <input
            type="text"
            className="form-control"
            placeholder="Cari Mandor"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <span className="input-group-text">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </form>
      <div className="container container-fluid  p-0 d-flex flex-column align-items-start">
        {listMandor.map((mandor) => (
          <div className="card mb-3 p-4" key={mandor._id}>
            <div className="row">
              <div className="image col-md-2">
                <img
                  src={mandor.imgUrl}
                  className="img-fluid rounded-4"
                  alt="Foto"
                />
              </div>
              <div className="col-md-10">
                <div className="card-body p-0 d-flex flex-row justify-content-between">
                  <div className="detail col-9">
                    <h4 className="card-title mb-0">
                      <a href={`/customer/profil-mandor/${mandor._id}`}>
                        {mandor.name}
                      </a>
                    </h4>
                    <span className="address">{mandor.address}</span>
                    <p className="card-text mt-2">{mandor.moto}</p>
                    <div className="info mb-2 d-flex flex-row justify-content-start">
                      <div className="rate">
                        <img src="/img/star.png" alt="Rate" className="photo" />
                        <span className="ms-2">
                          {Math.round(mandor.rating * 10) / 10}
                        </span>
                      </div>
                      <div className="job ms-4">
                        <img
                          src="/img/done.png"
                          alt="Job Done"
                          className="photo"
                        />
                        <span className="ms-2">{mandor.jobDone} job done</span>
                      </div>
                    </div>
                    <div className="skills">
                      {mandor.skills.map((skill) => (
                        <span className="kategori ms-2" key={skill}>
                          <a href="#">{skill}</a>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="salaryDetail col-3 d-flex flex-column align-items-end">
                    <h5 className="salary mt-2">Rp{mandor.salary}</h5>
                    <span>IDR/hari</span>
                    <div className="detail mt-4">
                      <a href={`/customer/profil-mandor/${mandor._id}`}>
                        <button className="btn">View Profil</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MandorList;
