import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { formatDate } from "../../../../common/formatDate";

import { Mandor } from "../../../../api/Mandor";
import { Experience } from "../../../../api/Experience";

import "/public/css/mandorProfile.css";

const MandorExperience = ({ mandor }) => {
  const [showForm, setShowForm] = useState(false);
  const onClick = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const [showEditForm, setshowEditForm] = useState(false);

  const [editedExId, setEditedExId] = useState("");

  const editForm = (experienceId) => {
    setEditedExId(experienceId);
    setshowEditForm(true);
  };

  const closeEditForm = () => setshowEditForm(false);

  const experiences = mandor.Experiences;

  const { experience, ready} = useTracker(() => {
    const subscription = Meteor.subscribe("experiences");
    return {
      experience: Experience.find({
        _id: { $in: experiences },
      }).fetch(),
      ready: subscription.ready(),
    };
  });

  if(!ready){
    return <div>Loading</div>
  }

  const delData = (experienceId) => {
    Mandor.update({_id: mandor._id}, {
      $pull: {Experience: experienceId}
    })
    
    Experience.remove({ _id: experienceId });
  };

  const Form = () => {
    const [experience, setExperience] = useState({
      name: "",
      position: "",
      start: Date,
      end: Date,
      description: "",
    });

    const onSubmit = (e) => {
      e.preventDefault();

      Mandor.update(
        { _id: mandor._id },
        {
          $push: {
            Experiences: Experience.insert(experience),
          },
        }
      );

      setExperience({
        ...experience,
        name: "",
        position: "",
        start: "",
        end: "",
        description: "",
      });
    };

    return (
      <div className="formContainer ps-4 d-flex justify-content-center align-items-center">
        <div className="experienceForm">
          <form
            className="d-flex flex-column justify-content-start"
            onSubmit={onSubmit}
          >
            <div className="col-12 p-4 d-flex justify-content-between align-items-start">
              <p className="m-0">Tambah Pengalaman</p>
              <button onClick={closeForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="col p-4">
              <div className="form-group mb-3">
                <label htmlFor="proyek">Nama Proyek</label>
                <input
                  required
                  className="form-control"
                  type="text"
                  name="proyek"
                  id="proyek"
                  onChange={(e) =>
                    setExperience({ ...experience, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group row g-3">
                <div className="col-md-12 mb-3">
                  <label htmlFor="posisi">Posisi</label>
                  <input
                    required
                    className="form-control"
                    type="text"
                    name="posisi"
                    id="posisi"
                    onChange={(e) =>
                      setExperience({ ...experience, position: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="mulai">Tanggal Mulai</label>
                  <input
                    required
                    className="form-control"
                    type="date"
                    name="mulai"
                    id="mulai"
                    onChange={(e) =>
                      setExperience({ ...experience, start: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="selesai">Tanggal Selesai</label>
                  <input
                    required
                    className="form-control"
                    type="date"
                    name="selesai"
                    id="selesai"
                    onChange={(e) =>
                      setExperience({ ...experience, end: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="keterangan">Keterangan</label>
                  <textarea
                    required
                    rows="5"
                    className="form-control"
                    name="keterangan"
                    id="keterangan"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="submitForm text-end p-4">
              <button className="btn p-2 btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const EditForm = () => {
    const editedEx = useTracker(() => Experience.findOne({ _id: editedExId }));

    const [exData, setExData] = useState({
      name: editedEx.name,
      position: editedEx.position,
      start: editedEx.start,
      end: editedEx.end,
      description: editedEx.description,
    });

    const editSubmit = (e) => {
      e.preventDefault();

      Experience.update(
        { _id: editedExId },
        {
          $set: exData,
        }
      );

      window.location.reload(false);
    };

    return (
      <div className="formContainer ps-4 d-flex justify-content-center align-items-center">
        <div className="experienceForm">
          <form
            className="d-flex flex-column justify-content-start"
            onSubmit={editSubmit}
          >
            <div className="col-12 p-4 d-flex justify-content-between align-items-start">
              <p className="m-0">Edit Pengalaman</p>
              <button onClick={closeEditForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="col p-4">
              <div className="form-group mb-3">
                <label htmlFor="proyek">Nama Proyek</label>
                <input
                  required
                  className="form-control"
                  type="text"
                  name="proyek"
                  id="proyek"
                  value={exData.name}
                  onChange={(e) =>
                    setExData({ ...exData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group row g-3">
                <div className="col-md-12 mb-3">
                  <label htmlFor="posisi">Posisi</label>
                  <input
                    required
                    className="form-control"
                    type="text"
                    name="posisi"
                    id="posisi"
                    value={exData.position}
                    onChange={(e) =>
                      setExData({ ...exData, position: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="mulai">Tanggal Mulai</label>
                  <input
                    required
                    className="form-control"
                    type="date"
                    name="mulai"
                    id="mulai"
                    value={exData.start}
                    onChange={(e) =>
                      setExData({ ...exData, start: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="selesai">Tanggal Selesai</label>
                  <input
                    required
                    className="form-control"
                    type="date"
                    name="selesai"
                    id="selesai"
                    value={exData.end}
                    onChange={(e) =>
                      setExData({ ...exData, end: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="keterangan">Keterangan</label>
                  <textarea
                    required
                    rows="5"
                    className="form-control"
                    name="keterangan"
                    id="keterangan"
                    value={exData.description}
                    onChange={(e) =>
                      setExData({ ...exData, description: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="submitForm text-end p-4">
              <button type="submit" className="btn p-2  ms-2">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="experience p-4">
      {showForm ? <Form /> : null}
      {showEditForm ? <EditForm /> : null}
      <p>Pengalaman</p>
      <div className="add mb-3 px-4 d-flex justify-content-end">
        <button className="btn" onClick={onClick}>
          Tambah experience
        </button>
      </div>
      <div className="experienceList p-4">
      {experience.map((experience, index) => (
          <div
            className="row mb-4 d-flex flex-column align-items-start"
            key={index}
          >
            <div className="col d-flex flex-row justify-content-between">
              <h4>{experience.name}</h4>
              <div className="action">
                <button
                  type="button"
                  className="me-3"
                  onClick={() => delData(experience._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
                <button onClick={() => editForm(experience._id)}>
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </div>
            <h5>
              {experience.position}
            </h5>
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
