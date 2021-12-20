import React from "react";
import { Meteor } from "meteor/meteor";
import { Review } from "../api/Review";
import { Experience } from "../api/Experience";

export const rating = (mandorId) => {
  const subscription = Meteor.subscribe('experiences');
  const reviews = Review.find({'mandor.id': mandorId}).fetch()
  const ready = subscription.ready()

  if(!ready){
    console.log("loading")
  }

  let rate = 0;
  let total = 0;

//   reviews.map((review, index) => {
//       total += review.rate;
//       total = index
//       console.log(review.rate)
//   })

  rate = rate/(total+1)

  return reviews
};
