import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "../styles/newhotel.css";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function NewHotel() {
  const [formDetails, setFormDetails] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    title: "",
    desc: "",
    rating: "",
    cheapestPrice: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        name,
        city,
        type,
        address,
        distance,
        title,
        desc,
        rating,
        cheapestPrice,
      } = formDetails;
      if (
        !name ||
        !city ||
        !type ||
        !address ||
        !distance ||
        !title ||
        !desc ||
        !rating ||
        !cheapestPrice
      ) {
        return toast.error("Input field should not be empty");
      }
      const { data } = await toast.promise(
        axios.post("/hotel/createhotel", {
          name,
          city,
          type,
          address,
          distance,
          title,
          desc,
          rating,
          cheapestPrice,
        }),
        {
          pending: "Adding hotel...",
          success: "Hotel added successfully",
          error: "Unable to add hotel",
          loading: "Adding hotel...",
        }
      );
      return;
    } catch (error) {}
  };

  return (
    <>
      <div className="dashboard-container">
        <AdminSidebar />
        <div className="register-container flex-center new-user-container">
          <h2 className="form-heading">Add new hotel</h2>
          <form onSubmit={formSubmit} className="register-form">
            <div className="form-same-row">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter name"
                value={formDetails.name}
                onChange={inputChange}
              />
              <input
                type="text"
                name="city"
                className="form-input"
                placeholder="Enter city name"
                value={formDetails.city}
                onChange={inputChange}
              />
            </div>
            <div className="form-same-row">
              <input
                type="text"
                name="address"
                className="form-input"
                placeholder="Enter address"
                value={formDetails.address}
                onChange={inputChange}
              />
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="Enter title"
                value={formDetails.title}
                onChange={inputChange}
              />
            </div>
            <div className="form-same-row">
              <input
                type="text"
                name="distance"
                className="form-input"
                placeholder="Enter distance"
                value={formDetails.distance}
                onChange={inputChange}
              />
              <input
                type="number"
                name="cheapestPrice"
                className="form-input"
                placeholder="Enter cheapest room price"
                value={formDetails.cheapestPrice}
                onChange={inputChange}
              />
            </div>
            <textarea
              name="desc"
              className="desc"
              cols="10"
              rows="5"
              value={formDetails.desc}
              placeholder="Enter description"
              onChange={inputChange}
            ></textarea>
            <div className="form-same-row">
              <select
                name="rating"
                id="rating"
                value={formDetails.rating}
                onChange={inputChange}
              >
                <option value="5">5 star</option>
                <option value="4">4 star</option>
                <option value="3">3 star</option>
                <option value="2">2 star</option>
                <option value="1">1 star</option>
              </select>
              <select
                name="type"
                id="type"
                value={formDetails.type}
                onChange={inputChange}
              >
                <option value="hotel">Hotel</option>
                <option value="villa">Villa</option>
                <option value="resort">Resort</option>
                <option value="appartment">Appartment</option>
              </select>
            </div>
            <button type="submit" className="btn form-btn">
              add hotel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewHotel;
