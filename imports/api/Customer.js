import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { Deal } from "./Deal";
import { Review } from "./Review";

export const Customer = new Mongo.Collection("customer");

if (Meteor.isServer) {
  Meteor.publish("customers", function () {
    return [Customer.find({}), Deal.find({}), Review.find({})];
  });
}
