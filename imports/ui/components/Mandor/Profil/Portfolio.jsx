import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import FileBase from "react-file-base64";

import { Portfolio } from "../../../../api/Portfolio";

import "/public/css/mandorProfile.css";

const PortfolioPage = ({ mandor }) => {
  const [showForm, setShowForm] = useState(false);
  const onClick = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const [showEditForm, setShowEditForm] = useState(false);
  const [editedPortfolio, setEditedPortfolio] = useState("");

  const editForm = (portfolio) => {
    setEditedPortfolio(portfolio);
    setShowEditForm(true);
  };
  const closeEditForm = () => setShowEditForm(false);

  const handleDelete = (portId) => {
    Portfolio.remove({_id: portId})

  }

  const { portfolios, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("portfolios");
    return {
      portfolios: Portfolio.find({ mandorId: mandor._id }).fetch(),
      ready: subscription.ready(),
    };
  });

  if (!ready) {
    return <div>Loading</div>;
  }

  const Form = () => {
    const [data, setData] = useState({
      mandorId: mandor._id,
      title: "",
      description: "",
      image: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();

      Portfolio.insert(data);
    };
    return (
      <div className="formContainer ps-4 d-flex justify-content-center align-items-center">
        <div className="experienceForm">
          <form
            className="d-flex flex-column justify-content-start"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="col-12 p-4 d-flex justify-content-between align-items-start">
              <p className="m-0">Tambah Portolio</p>
              <button onClick={closeForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="col p-4">
              <div className="form-group mb-3">
                <label htmlFor="judul">Judul</label>
                <input
                  className="form-control"
                  type="text"
                  name="judul"
                  id="judul"
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="keterangan">Keterangan</label>
                <textarea
                  className="form-control"
                  rows="5"
                  name="keterangan"
                  id="keterangan"
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="gambar">Gambar</label>
                <FileBase
                  type="file"
                  id="img-file"
                  name="image"
                  multiple={false}
                  onDone={({ base64 }) => setData({ ...data, image: base64 })}
                  className="position-absolute"
                />
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
    const [portData, setPortData] = useState({
      mandorId: mandor._id,
      title: editedPortfolio.title,
      description: editedPortfolio.description,
      image: editedPortfolio.image,
    });

    const handleEditSubmit = (e) => {
      e.preventDefault();

      Portfolio.update({ _id: editedPortfolio._id }, { $set: portData });

      window.location.reload(false);
    };
    return (
      <div className="formContainer ps-4 d-flex justify-content-center align-items-center">
        <div className="experienceForm">
          <form
            className="d-flex flex-column justify-content-start"
            encType="multipart/form-data"
            onSubmit={handleEditSubmit}
          >
            <div className="col-12 p-4 d-flex justify-content-between align-items-start">
              <p className="m-0">Tambah Portolio</p>
              <button onClick={closeEditForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="col p-4">
              <div className="form-group mb-3">
                <label htmlFor="judul">Judul</label>
                <input
                  className="form-control"
                  type="text"
                  name="judul"
                  id="judul"
                  onChange={(e) =>
                    setPortData({ ...portData, title: e.target.value })
                  }
                  value={portData.title}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="keterangan">Keterangan</label>
                <textarea
                  className="form-control"
                  rows="5"
                  name="keterangan"
                  id="keterangan"
                  onChange={(e) =>
                    setPortData({ ...portData, description: e.target.value })
                  }
                  value={portData.description}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gambar">Gambar</label>
                <FileBase
                  type="file"
                  id="img-file"
                  name="image"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPortData({ ...portData, image: base64 })
                  }
                  className="position-absolute"
                />
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

  return (
    <div className="portfolio p-4">
      {showForm ? <Form /> : null}
      {showEditForm ? <EditForm /> : null}
      <p className="mb-4">Portfolio</p>
      <div className="add mb-3 px-4 d-flex justify-content-end">
        <button className="btn" onClick={onClick}>
          Tambah Data
        </button>
      </div>
      <div className="portfolioList d-flex flex-row justify-content-center flex-wrap">
        {portfolios.map((portfolio) => (
          <div className="image col-md-4 mb-4 ms-4" key={portfolio._id}>
            <img
              src={portfolio.image}
              alt={portfolio.title}
              className="rounded-3"
            />
            <div className="overlay"></div>
            <div className="action">
              <button className="p-2" onClick={() => handleDelete(portfolio._id)}>
                <i className="fas fa-trash"></i>
              </button>
              <button className="p-2" onClick={() => editForm(portfolio)}>
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <p className="title">{portfolio.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
