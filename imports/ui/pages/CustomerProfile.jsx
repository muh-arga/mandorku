import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Customer } from "../../api/Customer";

import CustomerHero from "../components/Customer/profile/CutomerHero";
import Navbar from "../components/Customer/Navbar";
import Footer from "../components/Footer";

const CustomerProfile = () => {
  const customerId = sessionStorage.getItem("id");

  const { customer, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("customers");
    return {
      customer: Customer.findOne({ _id: customerId }),
      ready: subscription.ready(),
    };
  });

  if (!ready) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Navbar />
      <CustomerHero customer={customer}/>
      <Footer />
    </div>
  );
};

export default CustomerProfile;
