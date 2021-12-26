import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import StarsRating from "stars-rating";
import { formatDate } from "../../../../common/formatDate";

import { Review } from "../../../../api/Review";
import { Mandor } from "../../../../api/Mandor";

import "/public/css/mandorProfile.css";

const MandorReview = ({ mandor }) => {
  const { reviews, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("reviews");

    return {
      reviews: Review.find(
        { "mandor.id": mandor._id },
        { sort: { createdAt: -1 } }
      ).fetch(),
      ready: subscription.ready(),
    };
  });

  if (!ready) {
    return <div>Loading</div>;
  }

  let rate = 0;
  let total;
  reviews.map((review, index) => {
    if(review.rate >= 0)
    rate += review.rate;
    total = index;
  });
  total = total + 1
  rate = rate / total;

  Mandor.update({ _id: mandor._id }, { $set: { rating: rate, jobDone: total} });

  return (
    <div className="review p-4">
      <p>Ulasan</p>
      <div className="reviewList p-4">
        {reviews.map((review) => (
          <div
            className="row mb-5 d-flex flex-row justify-content-start"
            key={review._id}
          >
            <div className="col-md-1">
              <img src={review.customer.imgUrl} className="rounded-circle" />
            </div>
            <div className="col-md-11 d-flex flex-column">
              <div className="colmd-12 d-flex flex-row align-items-end justify-content-between">
                <div className="col-md-4">
                  <p>{review.customer.name}</p>
                  <StarsRating
                    count={5}
                    value={review.rate}
                    size={23}
                    edit={false}
                  />
                </div>
                <div className="col-md-8 text-end">
                  <span>{formatDate(review.createdAt)}</span>
                </div>
              </div>
              <div className="col-md-12 mt-4 mb-4">
                <p>{review.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MandorReview;
