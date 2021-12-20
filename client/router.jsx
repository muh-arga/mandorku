import React from "react";
import { FlowRouter } from "meteor/kadira:flow-router";
import { mount } from "react-mounter";

import CustomerHome from "/imports/ui/pages/CustomerHome";
import CustomerMandors from "../imports/ui/pages/CustomerMandors";
import CustomerMandorProfil from "../imports/ui/pages/CustomerMandorProfile";
import CustomerProject from "../imports/ui/pages/CustomerProject";
import CustomerProfile from "../imports/ui/pages/CustomerProfile";

import MandorHome from "../imports/ui/pages/MandorHome";
import MandorProject from "../imports/ui/pages/MandorProject";
import MandorProfile from "../imports/ui/pages/MandorProfil";
import MandorCustomerProfile from "../imports/ui/pages/MandorCustomerProfile";

import { App } from "/imports/ui/App";
import Login from "../imports/ui/pages/Login";
import Register from "../imports/ui/pages/Register";

const costumerRoute = FlowRouter.group({
  prefix: "/customer",
  name: "Customer",
});

const mandorRoute = FlowRouter.group({
  prefix: "/mandor",
  name: "Mandor",
});

FlowRouter.route("/", {
  name: "Login",
  action() {
    if (sessionStorage.getItem("role") === "customer")
      FlowRouter.go("/customer");
    else if (sessionStorage.getItem("role") === "mandor")
      FlowRouter.go("/mandor");
    else {
      mount(App, {
        content: <Login />,
      });
    }
  },
});

FlowRouter.route("/daftar", {
  name: "Login",
  action() {
    if (sessionStorage.getItem("role") === "customer")
      FlowRouter.go("/customer");
    else if (sessionStorage.getItem("role") === "mandor")
      FlowRouter.go("/mandor");
    else {
      mount(App, {
        content: <Register />,
      });
    }
  },
});

costumerRoute.route("/", {
  name: "Customer Home",
  action() {
    if (sessionStorage.getItem("role") === "customer") {
      mount(App, {
        content: <CustomerHome />,
      });
    } else if (sessionStorage.getItem("role") === "mandor")
      FlowRouter.go("/mandor");
    else FlowRouter.go("/");
  },
});

costumerRoute.route("/mandor", {
  name: "Mandor",
  action() {
    if (sessionStorage.getItem("role") === "customer") {
      mount(App, {
        content: <CustomerMandors />,
      });
    } else if (sessionStorage.getItem("role") === "mandor")
      FlowRouter.go("/mandor");
    else FlowRouter.go("/");
  },
});

costumerRoute.route("/profil-mandor/:id", {
  name: "Profil Mandor",
  action() {
    if (sessionStorage.getItem("role") === "customer") {
      mount(App, {
        content: <CustomerMandorProfil />,
      });
    } else if (sessionStorage.getItem("role") === "mandor")
      FlowRouter.go("/mandor");
    else FlowRouter.go("/");
  },
});

costumerRoute.route("/proyek", {
  name: "Proyek",
  action() {
    if (sessionStorage.getItem("role") === "customer") {
      mount(App, {
        content: <CustomerProject />,
      });
    } else if (sessionStorage.getItem("role") === "mandor")
      FlowRouter.go("/mandor");
    else FlowRouter.go("/");
  },
});

costumerRoute.route("/profil", {
  name: "Customer Profile",
  action() {
    if (sessionStorage.getItem("role") === "customer") {
      mount(App, {
        content: <CustomerProfile />,
      });
    } else if (sessionStorage.getItem("role") === "mandor")
      FlowRouter.go("/mandor");
    else FlowRouter.go("/");
  },
});

mandorRoute.route("/", {
  name: "Mandor Home",
  action() {
    if (sessionStorage.getItem("role") === "mandor") {
      mount(App, {
        content: <MandorHome />,
      });
    } else if (sessionStorage.getItem("role") === "customer")
      FlowRouter.go("/customer");
    else FlowRouter.go("/");
  },
});

mandorRoute.route("/proyek", {
  name: "Mandor Project",
  action() {
    if (sessionStorage.getItem("role") === "mandor") {
      mount(App, {
        content: <MandorProject />,
      });
    } else if (sessionStorage.getItem("role") === "customer")
      FlowRouter.go("/customer");
    else FlowRouter.go("/");
  },
});

mandorRoute.route("/profil", {
  name: "Mandor Profile",
  action() {
    if (sessionStorage.getItem("role") === "mandor") {
      mount(App, {
        content: <MandorProfile />,
      });
    } else if (sessionStorage.getItem("role") === "customer")
      FlowRouter.go("/customer");
    else FlowRouter.go("/");
  },
});

mandorRoute.route("/profil-customer/:id", {
  name: "Profil Customer",
  action() {
    if (sessionStorage.getItem("role") === "mandor") {
      mount(App, {
        content: <MandorCustomerProfile />,
      });
    } else if (sessionStorage.getItem("role") === "customer")
      FlowRouter.go("/customer");
    else FlowRouter.go("/");
  },
});
