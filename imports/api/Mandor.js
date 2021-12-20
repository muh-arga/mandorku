import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { Deal } from "./Deal";
import { Review } from "./Review";

export const Mandor = new Mongo.Collection("mandor");

if (Meteor.isServer) {
  Meteor.publish("mandors", function () {
    return [Mandor.find({}), Deal.find({}), Review.find({})];
  });
}
