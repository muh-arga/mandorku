import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Portfolio = new Mongo.Collection("portfolio");

if (Meteor.isServer) {
  Meteor.publish("portfolios", function () {
    return Portfolio.find({});
  });
}
