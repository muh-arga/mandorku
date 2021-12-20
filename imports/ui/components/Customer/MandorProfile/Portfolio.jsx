import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Portfolio } from "../../../../api/Portfolio";

import "/public/css/mandorProfile.css";

const MandorPortfolio = ({ mandor }) => {
  const { portfilios, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("portfolios");
    return {
      portfilios: Portfolio.find({ mandorId: mandor._id }).fetch(),
      ready: subscription.ready(),
    };
  });

  if (!ready) {
    return <div>Loading</div>;
  }

  return (
    <div className="portfolio p-4">
      <p className="mb-4">Portfolio</p>
      <div className="portfolioList d-flex flex-row justify-content-center flex-wrap">
        {portfilios.map((portfolio) => (
          <div className="image col-md-4 mb-4 ms-4" key={portfolio._id}>
            <img
              src={portfolio.image}
              alt={portfolio.title}
              className="rounded-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MandorPortfolio;
