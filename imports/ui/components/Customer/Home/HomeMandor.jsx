import React from "react";
import { Meteor } from "meteor/meteor";
import "/public/css/homeMandor.css";
import { useTracker } from "meteor/react-meteor-data";
import { Mandor } from "../../../../api/Mandor";

const homeMandor = () => {
  const { mandors, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("mandors");
    return {
      mandors: Mandor.find({}, { sort: { rating: -1 }, limit: 4 }).fetch(),
      ready: subscription.ready(),
    };
  });

  if(!ready){
    return <div>Loading</div>
  }

  return (
    <div className="homeMandor p-4 d-flex flex-column justify-content-center">
      <p className="title" id="popularMandor">
        Mandor Populer
      </p>
      <h2>Mandor Populer Saat Ini</h2>
      <div className="row d-flex flex-row flex-wrap justify-content-center">
        {mandors.map((mandor) => (
          <div
            className="card mb-3 ms-5"
            style={{ maxWidth: 500 + "px" }}
            key={mandor._id}
          >
            <div className="row g-0">
              <div className="image col-md-5">
                <img
                  src={mandor.imgUrl}
                  className="img-fluid rounded-4"
                  alt="Mandor"
                />
              </div>
              <div className="col-md-7">
                <div className="card-body ms-4 mt-2">
                  <div className="skills">
                    {mandor.skills.map((skill) => (
                      <span className="kategori ms-2" key={skill}>
                        <a href="#">{skill}</a>
                      </span>
                    ))}
                  </div>
                  <h5 className="salary mt-2">Rp{mandor.salary}/hari</h5>
                  <h4 className="card-title mt-2 mb-0">
                    <a href={`/customer/profil-mandor/${mandor._id}`}>
                      {mandor.name}
                    </a>
                  </h4>
                  <span className="address">{mandor.address}</span>
                  <p className="card-text mt-2">{mandor.moto}</p>
                  <div className="info d-flex flex-row justify-content-start">
                    <div className="rate">
                      <img src="/img/star.png" alt="Aanto" className="photo" />
                      <span className="ms-2">{Math.round(mandor.rating*10)/10}</span>
                    </div>
                    <div className="job ms-4">
                      <img src="/img/done.png" alt="Aanto" className="photo" />
                      <span className="ms-2">{mandor.jobDone} job done</span>
                    </div>
                  </div>
                  <div className="detail mt-4 d-flex align-content-end">
                    <a href={`/customer/profil-mandor/${mandor._id}`}>
                      <button className="btn">View Profil</button>
                    </a>
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

export default homeMandor;
