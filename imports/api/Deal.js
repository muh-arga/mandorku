import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Deal = new Mongo.Collection("deal");

if (Meteor.isServer) {
    Meteor.publish("deals", function () {
      return Deal.find({});
    });

    Meteor.methods({
      "deal-custUpdate"(customer) {
        return Deal.update(
          { "customer.id": customer._id },
          {
            $set: {
              "customer.name": customer.name,
              "customer.imgUrl": customer.imgUrl,
            }
          },
          {multi: true}
        );
      },
      "deal-manUpdate"(mandor) {
        return Deal.update(
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

