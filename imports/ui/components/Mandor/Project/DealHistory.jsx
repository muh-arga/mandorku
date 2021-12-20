import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { formatDate } from "../../../../common/formatDate";

import { Deal } from "../../../../api/Deal";
import { Mandor } from "../../../../api/Mandor";
import { Customer } from "../../../../api/Customer";

import "/public/css/dealHistory.css";

const DealHistory = () => {
  const mandorId = sessionStorage.getItem("id");

  const { projects, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("deals");
    return {
      projects: Deal.find(
        { "mandor.id": mandorId },
        { sort: { createdAt: -1 } }
      ).fetch(),
      ready: subscription.ready(),
    };
  });

  if (!ready) {
    return <div>Loading</div>;
  }

  const tolakHandler = (deal) => {
    console.log(deal);
    Deal.update(
      { _id: deal._id },
      {
        $set: { status: "Ditolak" },
      }
    );
  };

  const terimaHandler = (deal) => {
    console.log(deal);
    Deal.update(
      { _id: deal._id },
      {
        $set: { status: "Dikerjakan" },
      }
    );
  };

  const selesaiHandler = (deal) => {
    Deal.update(
      { _id: deal._id },
      {
        $set: { status: "Menunggu" },
      }
    );
  };

  const TolakButton = ({ deal }) => (
    <button className="btn mt-2 btn-success" onClick={() => tolakHandler(deal)}>
      Tolak
    </button>
  );

  const TerimaButton = ({ deal }) => (
    <button
      className="btn mt-2 btn-success ms-2"
      onClick={() => terimaHandler(deal)}
    >
      Terima
    </button>
  );

  const SelesaiButton = ({ deal }) => (
    <button
      className="btn mt-2 btn-success"
      onClick={() => selesaiHandler(deal)}
    >
      Selesai
    </button>
  );

  const Button = ({ deal }) => {
    if (deal.status === "Ditawar") {
      return (
        <div className="d-flex flex-row">
          <TolakButton deal={deal} />
          <TerimaButton deal={deal} />
        </div>
      );
    } else if (deal.status === "Dikerjakan") {
      return <SelesaiButton deal={deal} />;
    } else {
      return "";
    }
  };

  return (
    <div className="history p-4">
      <p className="title">Riwayat Proyek</p>
      <div className="historyList p-4">
        {projects.map((project) => (
          <div className="row mb-4 p-3 d-flex flex-row" key={project._id}>
            <div className="col-md-1">
              <img src={project.customer.imgUrl} className="rounded-circle" />
            </div>{" "}
            <div className="col-md-11">
              <div className="col d-flex flex-row justify-content-end">
                <div className="col-md-10">
                  <h5>
                    <a href={`/mandor/profil-customer/${project.customer.id}`}>
                      {project.customer.name}
                    </a>
                  </h5>
                  <p className="date">
                    {formatDate(project.start)} - {formatDate(project.end)}
                  </p>
                </div>
                <div className="col-md-2 d-flex flex-column align-items-end">
                  <span className="status">Status | {project.status}</span>
                  <Button deal={project} />
                </div>
              </div>
              <div className="col-md-11 mt-3">
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealHistory;
