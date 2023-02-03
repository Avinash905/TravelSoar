import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/adminsidebar.css";
import {
  MdDashboard,
  MdLogout,
  MdMeetingRoom,
  MdOutlineSettingsSystemDaydream,
} from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsFillBellFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { IoStatsChart } from "react-icons/io5";
import { AiFillSetting } from "react-icons/ai";
import { FaHotel } from "react-icons/fa";
import { AuthContext } from "../context/authContext";
import { toast } from "react-hot-toast";

function AdminSidebar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-main-container">
        <h4>main</h4>
        <div className="sidebar-main">
          <NavLink to={"/"}>
            <MdDashboard />
            <span>main site</span>
          </NavLink>
        </div>
      </div>
      <div className="sidebar-main-container">
        <h4>lists</h4>
        <div className="sidebar-main">
          <NavLink to={"/dashboard/user"}>
            <BiUser />
            <span>users</span>
          </NavLink>
          <NavLink to={"/dashboard/hotel"}>
            <FaHotel />
            <span>hotels</span>
          </NavLink>
          <NavLink to={"/dashboard/room"}>
            <MdMeetingRoom />
            <span>rooms</span>
          </NavLink>
        </div>
      </div>
      <div className="sidebar-main-container">
        <h4>useful</h4>
        <div className="sidebar-main">
          <NavLink to={"/dashboard/user"}>
            <IoStatsChart />
            <span>stats</span>
          </NavLink>
          <NavLink to={"/dashboard/hotel"}>
            <BsFillBellFill />
            <span>notifications</span>
          </NavLink>
        </div>
      </div>
      <div className="sidebar-main-container">
        <h4>service</h4>
        <div className="sidebar-main">
          <NavLink to={"/dashboard/user"}>
            <MdOutlineSettingsSystemDaydream />
            <span>system health</span>
          </NavLink>
          <NavLink to={"/dashboard/hotel"}>
            <CgNotes />
            <span>logs</span>
          </NavLink>
          <NavLink to={"/dashboard/room"}>
            <AiFillSetting />
            <span>settings</span>
          </NavLink>
        </div>
      </div>
      <div className="sidebar-main-container">
        <h4>user</h4>
        <div className="sidebar-main">
          <NavLink to={"/dashboard/profile"}>
            <HiOutlineUserCircle />
            <span>profile</span>
          </NavLink>
          <p onClick={logout}>
            <MdLogout />
            <span>logout</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
