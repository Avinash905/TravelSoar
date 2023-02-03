import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/hotelcard.css";

function HotelCard({ ele }) {
  return (
    <div className="hotel-card">
      <div className="card-img-container flex-center">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/228058913.webp?k=9ddc8770cd955ef20b6c02a45a6f2478f2d7d9360c7ab5a411a15a99788c9f3a&o=&s=1"
          alt="hotel name"
        />
      </div>
      <div className="card-hotel-details">
        <h2 className="card-hotel-heading">{ele.name}</h2>
        <span className="card-hotel-distance">{ele.distance}</span>
        <span className="card-hotel-badge">free</span>
        <h4 className="card-hotel-sub-heading">
          Studio appartment with air conditioning
        </h4>
        <p>{ele.desc}</p>
        <span className="green-color-bold">
          Free cancellation • No prepayment needed
        </span>
        <p className="green-color">
          You can cancel later, so lock in this great price today.
        </p>
      </div>
      <div className="card-amount">
        <div className="card-amount-top">
          <span className="card-hotel-praise">Excellent</span>
          <span className="card-hotel-rating">{ele.rating}</span>
        </div>
        <div className="card-amount-bottom">
          <span className="card-hotel-price">₹{ele.cheapestPrice}</span>
          <span className="card-tax-text">Includes taxes and fees</span>
          <NavLink to={`/hotel/${ele._id}`}>
            <div className="btn">see availability</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
