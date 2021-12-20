import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { FlowRouter } from "meteor/kadira:flow-router";

import CustomerHero from "../components/Mandor/CustomerProfile/CustomerHero";
import Navbar from "../components/Mandor/Navbar";
import Footer from "../components/Footer";

import { Customer } from "../../api/Customer";

const MandorCustomerProfile = () => {
  const customerId = FlowRouter.getParam("id");
  const { customer, ready } = useTracker(() => {
    const subscription = Meteor.subscribe('customers')
    return {
      customer: Customer.findOne({
        _id: customerId,
      }),
      ready: subscription.ready()
    }
  }, [customerId]);

  if (!ready) {
    return <div>loading</div>
  }

  return (
    <div>
      <Navbar />
      <CustomerHero customer={customer} />
      <Footer />
    </div>
  );
};

export default MandorCustomerProfile;
