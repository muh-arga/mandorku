import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { formatDate } from "../../../../common/formatDate";
import StarsRating from "stars-rating";

import { Deal } from "../../../../api/Deal";
import { Mandor } from "../../../../api/Mandor";
import { Customer } from "../../../../api/Customer";
import { Review } from "../../../../api/Review";

import "/public/css/dealHistory.css";
import { rating } from "../../../../common/rating";

const DealHistory = () => {
  const customerId = sessionStorage.getItem("id");

  const [showForm, setShowForm] = useState(false);

  const [reviewedProject, setReviewedProject] = useState({});

  const onClick = (deal) => {
    setReviewedProject(deal);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const { projects, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("deals");
    return {
      projects: Deal.find(
        { "customer.id": customerId },
        { sort: { createdAt: -1 } }
      ).fetch(),
      ready: subscription.ready(),
    };
  });

  if (!ready) {
    return <div>Loading</div>;
  }

  const batalHandler = (deal) => {
    Customer.update(
      { _id: deal.customer.id },
      {
        $pull: { Projects: deal._id },
      }
    );

    Mandor.update(
      { _id: deal.mandor.id },
      {
        $pull: { Projects: deal._id },
      }
    );

    Deal.remove({ _id: deal._id });
  };

  const selesaiHandler = (deal) => {
    Deal.update(
      { _id: deal._id },
      {
        $set: { status: "Diulas" },
      }
    );
  };

  const BatalButton = ({ deal }) => (
    <button className="btn mt-2 btn-success" onClick={() => batalHandler(deal)}>
      Batal
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

  const ReviewButton = ({ deal }) => (
    <button className="btn mt-2 btn-success" onClick={() => onClick(deal)}>
      Review
    </button>
  );

  const Button = ({ deal }) => {
    if (deal.status === "Ditawar") {
      return <BatalButton deal={deal} />;
    } else if (deal.status === "Menunggu") {
      return <SelesaiButton deal={deal} />;
    } else if (deal.status === "Diulas") {
      return <ReviewButton deal={deal} />;
    } else {
      return "";
    }
  };

  const Form = () => {
    const [data, setData] = useState({
      customer: {
        id: customerId,
        name: reviewedProject.customer.name,
        imgUrl: reviewedProject.customer.imgUrl,
      },
      mandor: {
        id: reviewedProject.mandor.id,
        name: reviewedProject.mandor.name,
        imgUrl: reviewedProject.mandor.imgUrl,
      },
      deal: {
        id: reviewedProject._id,
        name: reviewedProject.name,
      },
      review: "",
      rate: 0,
      createdAt: new Date(),
    });

    const ratingChanged = (newRating) => {
      setData({ ...data, rate: newRating });
    };

    const reviewHandler = (e) => {
      e.preventDefault();
      Deal.update(
        { _id: reviewedProject._id },
        {
          $set: { status: "Selesai" },
        }
      );

      Review.insert(data);

      window.location.reload(false)
    };

    return (
      <div className="formContainer ps-4 d-flex justify-content-center align-items-center">
        <div className="reviewForm">
          <form
            className="d-flex flex-column justify-content-start"
            onSubmit={reviewHandler}
          >
            <div className="col-12 p-4 d-flex justify-content-between align-items-start">
              <h5 className="header m-0">Buat Penawaran</h5>
              <button onClick={closeForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="col p-4">
              <div className="form-group row g-3 mb-3">
                <div className="col-md-12 mb-3">
                  <label htmlFor="ulasan">Ulasan</label>
                  <textarea
                    required
                    rows="5"
                    className="form-control"
                    name="ulasan"
                    id="ulasan"
                    onChange={(e) =>
                      setData({ ...data, review: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group row g-3 mb-3">
                <div className="col-md-12 mb-3">
                  <label htmlFor="ulasan">Rate</label>
                  <StarsRating
                    count={5}
                    size={40}
                    onChange={ratingChanged}
                    value={data.rate}
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
    <div className="history p-4">
      {showForm ? <Form /> : null}
      <p className="title">Riwayat Proyek</p>
      <div className="historyList p-4">
        {projects.map((project) => (
          <div className="row mb-4 p-3 d-flex flex-row" key={project._id}>
            <div className="col-md-1">
              <img src={project.mandor.imgUrl} className="rounded-circle" />
            </div>
            <div className="col-md-11">
              <div className="col d-flex flex-row justify-content-end">
                <div className="col-md-10">
                  <h5>
                    <a href={`/customer/profil-mandor/${project.mandor.id}`}>
                      {project.mandor.name}
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
