import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import Navbar from "../components/Mandor/Navbar";
import Footer from "../components/Footer";
import MandorHero from "../components/Mandor/Profil/MandorHero";
import MandorExperience from "../components/Mandor/Profil/MandorExperience";
import PortfolioPage from "../components/Mandor/Profil/Portfolio";
import ReviewPage from "../components/Mandor/Profil/Review";
import { Mandor } from "../../api/Mandor";

const MandorProfile = () => {
  const mandorId = sessionStorage.getItem("id")

  const {mandor, ready} = useTracker(() => {
    const subscription = Meteor.subscribe('mandors')
    return {
      mandor: Mandor.findOne({_id: mandorId}),
      ready: subscription.ready()
    }
  }, [mandorId]) 

  if(!ready)
    return <div>Loading</div>

  return (
    <div>
      <Navbar mandor={mandor}/>
      <MandorHero mandor={mandor}/>
      <PortfolioPage mandor={mandor}/>
      <MandorExperience mandor={mandor}/>
      <ReviewPage mandor={mandor}/>
      <Footer mandor={mandor}/>
    </div>
  );
};

export default MandorProfile;
