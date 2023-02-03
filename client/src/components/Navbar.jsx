import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  IoBedOutline,
  IoAirplaneOutline,
  IoCarSportOutline,
} from "react-icons/io5";
import { MdTravelExplore, MdOutlineAttractions } from "react-icons/md";
import { BiTaxi } from "react-icons/bi";
import "../styles/navbar.css";
import { AuthContext } from "../context/authContext";
import { toast } from "react-hot-toast";

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
  };

  return (
    <nav className="flex-center">
      <div className="navbar-container">
        <div className="navbar-top">
          <h2>
            <NavLink to={"/"} className="navbar-title">
              TravelSoar
            </NavLink>
          </h2>

          <div className="navbar-top-btn-container flex-center">
            {user ? (
              <>
                <h2 className="navbar-name">{user.username}</h2>
                <button className="btn btn-invert" onClick={logout}>
                  logout
                </button>
              </>
            ) : (
              <>
                <NavLink className="btn btn-invert" to={"/login"}>
                  register
                </NavLink>
                <NavLink className="btn btn-invert" to={"/login"}>
                  sign in
                </NavLink>
              </>
            )}
          </div>
        </div>
        <div className="navbar-bottom">
          <NavLink to={"/"}>
            <div className="navbar-bottom-links">
              <IoBedOutline />
              <span>Stays</span>
            </div>
          </NavLink>
          <NavLink to={"/"}>
            <div className="navbar-bottom-links">
              <IoAirplaneOutline />
              <span>Flights</span>
            </div>
          </NavLink>
          <NavLink to={"/"}>
            <div className="navbar-bottom-links">
              <MdTravelExplore />
              <span>Flight + Hotels</span>
            </div>
          </NavLink>
          <NavLink to={"/"}>
            <div className="navbar-bottom-links">
              <IoCarSportOutline />
              <span>Car rentals</span>
            </div>
          </NavLink>
          <NavLink to={"/"}>
            <div className="navbar-bottom-links">
              <MdOutlineAttractions />
              <span>Attractions</span>
            </div>
          </NavLink>
          <NavLink to={"/"}>
            <div className="navbar-bottom-links">
              <BiTaxi />
              <span>Airport taxis</span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
