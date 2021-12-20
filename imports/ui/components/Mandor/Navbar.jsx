import React from "react";
import { Meteor } from "meteor/meteor"
import { useTracker } from "meteor/react-meteor-data"

import { Mandor } from "../../../api/Mandor";

import "/public/css/navbar.css";

const Navbar = () => {
  const id = sessionStorage.getItem("id")
  const path = FlowRouter.getRouteName();

  const {mandor, ready} = useTracker(() => {
    const subscription = Meteor.subscribe('mandors')
    return{
      mandor: Mandor.findOne({_id: id}),
      ready: subscription.ready()
    }
  })

  if(!ready){
    return <div>Loading</div>
  }

  const logout = (e) => {
    e.preventDefault()

    sessionStorage.clear()
    FlowRouter.go('/')
  }
  return (
    <div className="navbar p-4 d-flex flex-row justify-content-start align-items-center">
      <h3 className="col-4">
        <b>MandorKu</b>
      </h3>
      <ul className="col-4 m-0 p-0 d-flex flex-row justify-content-center">
        <li className="nav-item">
          <a href="/mandor/" className={path === "Mandor Home"? "active" : ""}>Beranda</a>
        </li>
        <li className="nav-item">
          <a href="/mandor/proyek" className={path === "Mandor Project"? "active" : ""}>Proyek</a>
        </li>
        <li className="nav-item">
          <a href="/mandor/profil" className={path === "Mandor Profile"? "active" : ""}>Profil</a>
        </li>
      </ul>
      <div className="col-4 d-flex flex-row justify-content-end align-items-center">
        <span className="name me-3">{mandor.name}</span>
        <div className="btn-group">
          <button
            className="btn btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenu2"
          >
            <li>
              <button className="dropdown-item logout" type="button" onClick={logout}>
                Log out
              </button>
            </li>
          </ul>
        </div>
        <img
          src={mandor.imgUrl}
          alt="Photo profile"
          className="rounded-circle"
        />
      </div>
    </div>
  );
};

export default Navbar;
