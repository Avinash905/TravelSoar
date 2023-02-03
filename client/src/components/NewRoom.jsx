import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "../styles/newhotel.css";
import axios from "axios";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function NewRoom() {
  const { data, loading } = useFetch(`/hotel/getallhotels`);
  const [formDetails, setFormDetails] = useState({
    title: "",
    price: "",
    maxPeople: "",
    desc: "",
    roomNumbers: "",
    hotelId: "",
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
      const { title, price, maxPeople, desc, roomNumbers, hotelId } =
        formDetails;
      if (!title || !price || !maxPeople || !desc || !roomNumbers || !hotelId) {
        return toast.error("Input field should not be empty");
      }
      const rooms = roomNumbers.split(",").map((ele) => ({ number: ele }));
      console.log("roomNumbers", rooms);
      const { data } = await toast.promise(
        axios.post(
          `/room/createroom/${hotelId}`,
          {
            title,
            price,
            maxPeople,
            desc,
            roomNumbers: rooms,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Adding rooms...",
          success: "Rooms added successfully",
          error: "Unable to add rooms",
          loading: "Adding rooms...",
        }
      );
      return;
    } catch (error) {}
  };

  return (
    <>
      <div className="dashboard-container">
        <AdminSidebar />
        {loading ? (
          <h2 className="loading">Loading...</h2>
        ) : (
          <div className="register-container flex-center new-user-container">
            <h2 className="form-heading">Add new room</h2>
            <form onSubmit={formSubmit} className="register-form">
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="Enter title"
                value={formDetails.title}
                onChange={inputChange}
              />
              <input
                type="number"
                name="price"
                className="form-input"
                placeholder="Enter price"
                value={formDetails.price}
                onChange={inputChange}
              />
              <input
                type="number"
                name="maxPeople"
                className="form-input"
                placeholder="Enter max people"
                value={formDetails.maxPeople}
                onChange={inputChange}
              />
              <input
                type="text"
                name="roomNumbers"
                className="form-input"
                placeholder="Enter room numbers (comma separated)"
                value={formDetails.roomNumbers}
                onChange={inputChange}
              />
              <textarea
                name="desc"
                className="desc"
                cols="10"
                rows="5"
                value={formDetails.desc}
                placeholder="Enter description"
                onChange={inputChange}
              ></textarea>
              <select
                name="hotelId"
                id="hotelId"
                value={formDetails.hotelId}
                onChange={inputChange}
              >
                <option value="">Select hotel</option>
                {data.map((ele) => {
                  return (
                    <option value={ele._id} key={ele._id}>
                      {ele.name}
                    </option>
                  );
                })}
              </select>

              <button
                type="submit"
                className="btn form-btn"
                onClick={formSubmit}
              >
                add hotel
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default NewRoom;
