import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { formatDate } from "../../../../common/formatDate";

import { Experience } from "../../../../api/Experience";

import "/public/css/mandorProfile.css";

const MandorExperience = ({ mandor }) => {
  const experiences = mandor.Experiences;

  const { experience, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("experiences");
    return {
      experience: Experience.find({
        _id: { $in: experiences },
      }).fetch(),
      ready: subscription.ready(),
    };
  });

  if (!ready) {
    return <div>Loading</div>;
  }

  return (
    <div className="experience p-4">
      <p>Pengalaman</p>
      <div className="experienceList p-4">
        {experience.map((experience, index) => (
          <div
            className="row mb-4 d-flex flex-column align-items-start"
            key={index}
          >
            <div className="col d-flex flex-row justify-content-between">
              <h4>{experience.name}</h4>
            </div>
            <h5>{experience.position}</h5>
            <span>
              {formatDate(experience.start)} - {formatDate(experience.end)}
            </span>
            <p>{experience.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MandorExperience;
