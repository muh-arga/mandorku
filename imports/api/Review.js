import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Review = new Mongo.Collection("review");

if (Meteor.isServer) {
    Meteor.publish("reviews", function () {
      return Review.find({});
    });

    Meteor.methods({
      "review-custUpdate"(customer) {
        return Review.update(
          { "customer.id": customer._id },
          {
            $set: {
              "customer.name": customer.name,
              "customer.imgUrl": customer.imgUrl,
            },
          },
          {multi: true}
        );
      },
      "review-manUpdate"(mandor) {
        return Review.update(
          { "mandor.id": mandor._id },
          {
            $set: {
              "mandor.name": mandor.name,
              "mandor.imgUrl": mandor.imgUrl,
            },
          },
          {multi: true}
        );
      },
    });
  }

