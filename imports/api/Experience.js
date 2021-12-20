import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Experience = new Mongo.Collection("experience")

if (Meteor.isServer) {
    Meteor.publish("experiences", function () {
      return Experience.find({});
    });
  }

