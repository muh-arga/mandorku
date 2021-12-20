import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { FlowRouter } from "meteor/kadira:flow-router";

import { Mandor } from "../../api/Mandor";

import MandorHero from "../components/Customer/MandorProfile/MandorHero";
import Navbar from "../components/Customer/Navbar";
import Footer from "../components/Footer";
import MandorPortfolio from "../components/Customer/MandorProfile/Portfolio";
import MandorExperience from "../components/Customer/MandorProfile/Experience";
import MandorReview from "../components/Customer/MandorProfile/Review";

const CustomerMandorProfil = () => {
  const mandorId = FlowRouter.getParam("id");
  const { mandor, ready } = useTracker(() => {
    const subscription = Meteor.subscribe('mandors')
    return {
      mandor: Mandor.findOne({
        _id: mandorId,
      }),
      ready: subscription.ready()
    }
  }, [mandorId]);

  if (!ready) {
    return <div>loading</div>
  }

  return (
    <div>
      <Navbar mandor={mandor}/>
      <MandorHero mandor={mandor}/>
      <MandorPortfolio mandor={mandor}/>
      <MandorExperience mandor={mandor}/>
      <MandorReview mandor={mandor}/>
      <Footer mandor={mandor}/>
    </div>
  );
};

export default CustomerMandorProfil;
